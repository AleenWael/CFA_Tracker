"""Daily study email for the CFA tracker.

Runs every hour from GitHub Actions (.github/workflows/daily-email.yml).
Reads the tracker's progress from Firestore and, once a day at the hour set
on the website, emails what is overdue first (only the components still to
do), then the rest of the day's plan, each with a rough time estimate and a
total to get back on track, followed by practice questions, recall checks
and what's coming up.

Email goes out through Resend (resend.com), so no access to your own
mailbox is needed. On Resend's free plan, without a domain of your own, it
can only send to the address the Resend account was created with.

Environment:
  RESEND_API_KEY      a Resend API key with sending access
  EMAIL_TO            your email address (the one you signed up to Resend with)
  FORCE=true          send now, ignoring the hour and "already sent today"
  DRY_RUN=true        print the email instead of sending it
"""

import datetime as dt
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from html import escape
from pathlib import Path
from zoneinfo import ZoneInfo

API_KEY = "AIzaSyCgogkes28WealR-DbEe07l3ZWWidDUnS8"
PROJECT = "cfa-tracker-fbb69"
COLLECTION = "cfa2027"
SITE_URL = "https://aleenwael.github.io/CFA_Tracker/"
RESEND_URL = os.environ.get("RESEND_URL", "https://api.resend.com/emails")
SENDER = "CFA Tracker <onboarding@resend.dev>"  # Resend's shared test sender
BASE = f"https://firestore.googleapis.com/v1/projects/{PROJECT}/databases/(default)/documents/{COLLECTION}"

# key: (code, colour, name) — keep in step with TOPICS in index.html.
TOPICS = {
    "fsa": ("FSA", "#B5485E", "Financial Statement Analysis"),
    "eq": ("EQ", "#2E7D53", "Equities"),
    "fi": ("FI", "#2A7E89", "Fixed Income"),
    "et": ("ET", "#95509F", "Ethics"),
    "cf": ("CF", "#9C7526", "Corporate Finance"),
    "pc": ("PC", "#B5574A", "Portfolio Construction"),
    "de": ("DE", "#5B7392", "Derivatives & Risk Mgmt"),
    "ai": ("AI", "#6273C4", "Alternative Investments"),
    "ec": ("EC", "#7557B5", "Economics"),
    "qm": ("QM", "#2F5FA8", "Quantitative Methods"),
    "rv": ("REV", "#3F5E5A", "Revision"),
    "rev": ("MOCK", "#555B63", "Mock Exams"),
}
REVIEW_TOPICS = ("rv", "rev")
CONTENT_HOURS = 250  # same estimate as the website: ~250 h for all content, split by module weight


# ---------- Firestore ----------
def _decode(v):
    if "mapValue" in v:
        return {k: _decode(x) for k, x in v["mapValue"].get("fields", {}).items()}
    if "arrayValue" in v:
        return [_decode(x) for x in v["arrayValue"].get("values", [])]
    if "integerValue" in v:
        return int(v["integerValue"])
    if "doubleValue" in v:
        return float(v["doubleValue"])
    if "nullValue" in v:
        return None
    for k in ("stringValue", "booleanValue", "timestampValue"):
        if k in v:
            return v[k]
    return None


def load_docs():
    docs, token = {}, None
    while True:
        q = {"pageSize": 300, "key": API_KEY}
        if token:
            q["pageToken"] = token
        with urllib.request.urlopen(f"{BASE}?{urllib.parse.urlencode(q)}", timeout=30) as r:
            data = json.load(r)
        for d in data.get("documents", []):
            docs[d["name"].rsplit("/", 1)[1]] = {k: _decode(v) for k, v in d.get("fields", {}).items()}
        token = data.get("nextPageToken")
        if not token:
            return docs


def mark_sent(day):
    q = urllib.parse.urlencode({"updateMask.fieldPaths": "lastEmailOn", "key": API_KEY})
    body = json.dumps({"fields": {"lastEmailOn": {"stringValue": day}}}).encode()
    req = urllib.request.Request(f"{BASE}/_settings?{q}", data=body, method="PATCH",
                                 headers={"Content-Type": "application/json"})
    urllib.request.urlopen(req, timeout=30).read()


# ---------- components ----------
def load_components():
    path = Path(__file__).resolve().parent.parent / "components.js"
    out = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        m = re.match(r"\s*'([a-z]+-\d+)':\s*\[(.*)\],?\s*$", line)
        if m:
            out[m.group(1)] = [s.replace("\\'", "'") for s in re.findall(r"'((?:[^'\\]|\\.)*)'", m.group(2))]
    return out


# ---------- building the email ----------
def add_days(day, n):
    return (dt.date.fromisoformat(day) + dt.timedelta(days=n)).isoformat()


def pretty(day):
    d = dt.date.fromisoformat(day)
    return f"{d:%a} {d.day} {d:%b}"


def fmt_min(m):
    h, r = divmod(int(m), 60)
    return (f"{h} h" + (f" {r} min" if r else "")) if h else f"{r} min"


def round5(m):
    return max(5, int(round(m / 5.0)) * 5)


def num(v):
    try:
        return None if v in ("", None) else float(v)
    except (TypeError, ValueError):
        return None


def studied(c):
    return bool(c.get("done")) if c.get("topic") in REVIEW_TOPICS else bool(c.get("study"))


def recall_due(c, today):
    if c.get("topic") in REVIEW_TOPICS or not c.get("pq") or not c.get("pqOn"):
        return None
    if not c.get("recall1On") and add_days(c["pqOn"], 7) <= today:
        return "1-week recall"
    if c.get("recall1On") and not c.get("recall2On") and add_days(c["recall1On"], 21) <= today:
        return "1-month recall"
    return None


def tag(c):
    """(code, number, colour) shown for an item; revision entries show the module they revise."""
    if c.get("topic") == "rv" and c.get("ref"):
        key, n = c["ref"].split("-")
        if key in TOPICS:
            return TOPICS[key][0], int(n), TOPICS[key][1]
    code, colour, _ = TOPICS[c["topic"]]
    return code, c.get("num"), colour


def pending_steps(c, comps, mpw):
    """What is left on an item, as (label, minutes) pairs. Mirrors minutesLeft() on the website."""
    mod = (c.get("weight") or 1) * mpw
    topic = c.get("topic")
    if topic == "rv":
        steps = [("Re-read your notes and the module summary", round5(0.2 * mod))]
        if num(c.get("cfaiScore")) is None:
            steps.append(("CFA Institute practice set", 20))
        if num(c.get("kapScore")) is None:
            steps.append(("Kaplan practice set", 20))
        return steps
    if topic == "rev":
        return [(c.get("title", ""), 270 if c.get("title", "").lower().startswith("mock exam") else 180)]
    names = comps.get(c["id"], [])
    done = c.get("parts") or {}
    if names:  # each component includes its Kaplan module quiz
        per = round5(mod / len(names))
        return [(n + " + quiz", per) for i, n in enumerate(names) if not (done.get(str(i)) or done.get(i))]
    steps = [("Study the module", round5(0.8 * mod))]
    if not c.get("pq"):
        steps.append(("Practice questions", round5(0.2 * mod)))
    return steps


def build(docs, comps, today):
    settings = docs.get("_settings", {})
    items = [dict(v, id=k) for k, v in docs.items() if k != "_settings" and v.get("topic") in TOPICS]
    items.sort(key=lambda c: c.get("order", 0))
    content = [c for c in items if c.get("topic") not in REVIEW_TOPICS]
    total_w = sum(c.get("weight") or 1 for c in content)
    mpw = CONTENT_HOURS * 60 / total_w if total_w else 150

    overdue = sorted((c for c in items if c.get("date") and c["date"] < today and not studied(c)),
                     key=lambda c: (c["date"], c.get("order", 0)))
    todays = [c for c in items if c.get("date") == today and not studied(c)]
    recalls = [c for c in items if recall_due(c, today)]
    need_qs = [c for c in content if c.get("study") and not c.get("pq")]
    upcoming = sorted((c for c in items if c.get("date", "") > today and not studied(c)),
                      key=lambda c: (c["date"], c.get("order", 0)))[:4]

    left = {c["id"]: pending_steps(c, comps, mpw) for c in overdue + todays}
    mins = {k: sum(m for _, m in v) for k, v in left.items()}
    late_min = sum(mins[c["id"]] for c in overdue)
    today_min = sum(mins[c["id"]] for c in todays)
    total_min = late_min + today_min

    exam = settings.get("exam", "2027-02-22")
    days_left = (dt.date.fromisoformat(exam) - dt.date.fromisoformat(today)).days
    n_studied = sum(1 for c in content if c.get("study"))

    def short(c):
        code, n, _ = tag(c)
        return ("Revise " if c.get("topic") == "rv" else "") + f"{code} {n}"

    if overdue:
        subject = f"CFA {pretty(today)}: {len(overdue)} overdue, ≈ {fmt_min(total_min)} to get back on track"
    elif todays:
        subject = (f"CFA {pretty(today)}: " + ", ".join(short(c) for c in todays[:3])
                   + ("…" if len(todays) > 3 else "") + f" (≈ {fmt_min(today_min)})")
    else:
        subject = f"CFA {pretty(today)}: on track, nothing new today"

    text, html = [], []
    grey, amber, red = "#6F7782", "#A8591A", "#B23A2B"

    # headline
    if total_min:
        headline = f"≈ {fmt_min(total_min)} " + ("to get back on track" if overdue else "for today")
        split = (f"Overdue ≈ {fmt_min(late_min)} + today ≈ {fmt_min(today_min)}" if overdue and todays else "")
    else:
        headline, split = "You're on track. Nothing is due today.", ""
    stats = f"{days_left} days to the exam · {n_studied}/{len(content)} modules studied"
    text += [headline] + ([split] if split else []) + [stats]
    html.append(f'<div style="font-size:22px;font-weight:700;margin:0 0 4px">{escape(headline)}</div>')
    if split:
        html.append(f'<div style="color:{grey};font-size:13.5px">{escape(split)}</div>')
    html.append(f'<div style="color:{grey};font-size:13px;margin:2px 0 6px">{escape(stats)}</div>')

    def chip(c):
        code, n, colour = tag(c)
        if c.get("topic") == "rv":
            return (f'<span style="border:1.5px solid {colour};color:{colour};border-radius:4px;padding:0 5px;'
                    f'font:600 12px monospace">↻ {code} {n}</span>')
        return (f'<span style="background:{colour};color:#fff;border-radius:4px;padding:1px 6px;'
                f'font:600 12px monospace">{code} {n}</span>')

    def heading(title, minutes=None, colour=grey):
        label = title + (f" · ≈ {fmt_min(minutes)}" if minutes else "")
        text.append(f"\n{label.upper()}")
        html.append(f'<h3 style="font:700 12px sans-serif;letter-spacing:.08em;text-transform:uppercase;'
                    f'color:{colour};margin:24px 0 10px;padding-top:12px;border-top:1px solid #E3E1DB">{escape(label)}</h3>')

    def item(c, note):
        code, n, _ = tag(c)
        title = ("Revise: " if c.get("topic") == "rv" else "") + c.get("title", "")
        names = comps.get(c["id"], []) if c.get("topic") not in REVIEW_TOPICS else []
        done_n = sum(1 for i in range(len(names)) if (c.get("parts") or {}).get(str(i)))
        meta = " · ".join(x for x in [note, f"{done_n}/{len(names)} components done" if names else "",
                                       f"≈ {fmt_min(mins[c['id']])} left"] if x)
        text.append(f"- {code} {n} {title} ({meta})")
        html.append(f'<div style="margin:0 0 14px">{chip(c)} <b>{escape(title)}</b>'
                    f'<div style="color:{grey};font-size:12.5px;margin:3px 0 0">{escape(meta)}</div>')
        steps = left[c["id"]]
        if steps:
            html.append('<table style="border-collapse:collapse;margin:6px 0 0 4px;font-size:13.5px">')
            for label, m in steps:
                text.append(f"    [ ] {label}  ≈ {fmt_min(m)}")
                html.append(f'<tr><td style="padding:2px 10px 2px 0;vertical-align:top">☐ {escape(label)}</td>'
                            f'<td style="padding:2px 0;color:{grey};white-space:nowrap;vertical-align:top">≈ {fmt_min(m)}</td></tr>')
            html.append("</table>")
        html.append("</div>")

    if overdue:
        heading(f"Overdue ({len(overdue)})", late_min, red)
        for c in overdue[:8]:
            item(c, f"was due {pretty(c['date'])}")
        if len(overdue) > 8:
            rest = overdue[8:]
            more = f"+ {len(rest)} more overdue (≈ {fmt_min(sum(mins[c['id']] for c in rest))}), see the tracker"
            text.append(more)
            html.append(f'<p style="color:{red};margin:0 0 8px">{escape(more)}</p>')

    heading("Rest of today's plan", today_min, amber)
    if todays:
        for c in todays:
            item(c, "today")
    else:
        text.append("Nothing new is scheduled today.")
        html.append('<p style="margin:0 0 8px">Nothing new is scheduled today.</p>')

    def simple(title, rows, note):
        if not rows:
            return
        heading(title)
        for c in rows:
            code, n, _ = tag(c)
            extra = note(c)
            title = ("Revise: " if c.get("topic") == "rv" else "") + c.get("title", "")
            text.append(f"- {code} {n} {title}" + (f" ({extra})" if extra else ""))
            html.append(f'<div style="margin:0 0 8px">{chip(c)} {escape(title)}'
                        + (f' <span style="color:{grey};font-size:12.5px">· {escape(extra)}</span>' if extra else "")
                        + "</div>")

    def missing_quizzes(c):
        names = comps.get(c["id"], [])
        if not names:
            return f"≈ {fmt_min(round5(0.2 * (c.get('weight') or 1) * mpw))}"
        q = c.get("quiz") or {}
        return f"{sum(1 for i in range(len(names)) if num(q.get(str(i))) is None)} of {len(names)} quiz scores missing"
    simple("Quiz scores still to log", need_qs[:5], missing_quizzes)
    simple("Recall checks", recalls[:5], lambda c: f"{recall_due(c, today)} · ≈ 10 min")
    simple("Coming up", upcoming, lambda c: pretty(c["date"]))

    text.append("\nTimes are rough: about 250 hours for all the content, more for heavier modules; each component includes its quiz.")
    text.append(f"Open the tracker: {SITE_URL}")
    html.append(f'<p style="margin:26px 0 8px"><a href="{SITE_URL}" style="background:#1E4E8C;color:#fff;'
                f'padding:9px 16px;border-radius:7px;text-decoration:none;font-weight:600">Open the tracker</a></p>'
                f'<p style="color:#A7ADB5;font-size:11.5px;margin:12px 0 0">Times are rough estimates: about 250 hours '
                f'for all the content, split by module weight.</p>')
    body_html = ('<div style="font-family:-apple-system,Segoe UI,sans-serif;font-size:14px;color:#1F2328;'
                 'max-width:560px">' + "".join(html) + "</div>")
    return subject, "\n".join(text), body_html


def send(api_key, to, subject, text, html):
    body = json.dumps({"from": SENDER, "to": [to], "subject": subject, "text": text, "html": html}).encode()
    req = urllib.request.Request(RESEND_URL, data=body, method="POST", headers={
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "User-Agent": "cfa-tracker-daily-email/1.0",
    })
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", "replace")
        hint = ""
        if e.code == 403:
            hint = " EMAIL_TO must be the same address you signed up to Resend with."
        elif e.code == 401:
            hint = " The RESEND_API_KEY secret is missing or wrong."
        raise RuntimeError(f"Resend refused the email ({e.code}): {detail}.{hint}") from None


def main():
    force = os.environ.get("FORCE", "").lower() == "true"
    dry = os.environ.get("DRY_RUN", "").lower() == "true"
    api_key, to = os.environ.get("RESEND_API_KEY", "").strip(), os.environ.get("EMAIL_TO", "").strip()

    docs = load_docs()
    settings = docs.get("_settings", {})
    tz_name = settings.get("tz") or "UTC"
    try:
        now = dt.datetime.now(ZoneInfo(tz_name))
    except Exception:
        now = dt.datetime.now(dt.timezone.utc)
    today = now.date().isoformat()
    hour = int(settings.get("emailHour", 7))

    if not force:
        if settings.get("emailOn") is False:
            print("Daily email is turned off on the website.")
            return
        if now.hour < hour:
            print(f"Not time yet: {now:%H:%M} in {tz_name}, sending at {hour:02d}:00.")
            return
        if settings.get("lastEmailOn") == today:
            print(f"Already sent today ({today}).")
            return

    subject, text, html = build(docs, load_components(), today)
    if dry:
        print(f"Subject: {subject}\nTo: {to or '(not set)'}\n\n{text}")
        return
    if not (api_key and to):
        print("::warning::Email secrets are not set yet (RESEND_API_KEY, EMAIL_TO). See the README.")
        return

    send(api_key, to, subject, text, html)
    if not force:
        mark_sent(today)
    print(f"Sent: {subject}")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:  # surface a readable error in the Actions log
        print(f"::error::{type(e).__name__}: {e}")
        sys.exit(1)
