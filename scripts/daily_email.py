"""Daily study email for the CFA tracker.

Runs every hour from GitHub Actions (.github/workflows/daily-email.yml).
Reads the tracker's progress from Firestore and, once a day at the hour set
on the website, emails the modules scheduled for that day, anything overdue,
practice questions still to do and recall checks that are due.

Environment:
  GMAIL_USER          Gmail address that sends the email
  GMAIL_APP_PASSWORD  16-character Google app password for that account
  EMAIL_TO            where to send it (defaults to GMAIL_USER)
  FORCE=true          send now, ignoring the hour and "already sent today"
  DRY_RUN=true        print the email instead of sending it
"""

import datetime as dt
import json
import os
import re
import smtplib
import sys
import urllib.parse
import urllib.request
from email.message import EmailMessage
from html import escape
from pathlib import Path
from zoneinfo import ZoneInfo

API_KEY = "AIzaSyCgogkes28WealR-DbEe07l3ZWWidDUnS8"
PROJECT = "cfa-tracker-fbb69"
COLLECTION = "cfa2027"
SITE_URL = "https://aleenwael.github.io/CFA_Tracker/"
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
    "rev": ("FINAL", "#555B63", "Final Review & Mock Exams"),
}


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


def studied(c):
    return bool(c.get("done")) if c.get("topic") == "rev" else bool(c.get("study"))


def recall_due(c, today):
    if c.get("topic") == "rev" or not c.get("pq") or not c.get("pqOn"):
        return None
    if not c.get("recall1On") and add_days(c["pqOn"], 7) <= today:
        return "1-week recall"
    if c.get("recall1On") and not c.get("recall2On") and add_days(c["recall1On"], 21) <= today:
        return "1-month recall"
    return None


def build(docs, comps, today):
    settings = docs.get("_settings", {})
    items = [dict(v, id=k) for k, v in docs.items() if k != "_settings" and v.get("topic") in TOPICS]
    items.sort(key=lambda c: c.get("order", 0))

    todays = [c for c in items if c.get("date") == today and not studied(c)]
    overdue = sorted((c for c in items if c.get("date") and c["date"] < today and not studied(c)),
                     key=lambda c: (c["date"], c.get("order", 0)))
    recalls = [(c, recall_due(c, today)) for c in items if recall_due(c, today)]
    need_qs = [c for c in items if c.get("topic") != "rev" and c.get("study") and not c.get("pq")]
    upcoming = sorted((c for c in items if c.get("date", "") > today and not studied(c)),
                      key=lambda c: (c["date"], c.get("order", 0)))[:4]

    exam = settings.get("exam", "2027-02-22")
    days_left = (dt.date.fromisoformat(exam) - dt.date.fromisoformat(today)).days
    content = [c for c in items if c.get("topic") != "rev"]
    n_studied = sum(1 for c in content if c.get("study"))

    n_today = len(todays)
    subject = f"CFA today ({pretty(today)}): " + (
        ", ".join(f"{TOPICS[c['topic']][0]} {c['num']}" for c in todays[:4]) + ("…" if n_today > 4 else "")
        if n_today else ("catch up on overdue modules" if overdue else "nothing new scheduled"))

    text, html = [], []
    head = f"{days_left} days to the exam · {n_studied}/{len(content)} modules studied"
    text.append(head)
    html.append(f'<p style="color:#6F7782;margin:0 0 16px">{escape(head)}</p>')

    def chip(c):
        code, colour, _ = TOPICS[c["topic"]]
        return (f'<span style="background:{colour};color:#fff;border-radius:4px;padding:1px 6px;'
                f'font:600 12px monospace">{code} {c.get("num")}</span>')

    def section(title, rows, show_parts=False, tag=None):
        if not rows:
            return
        text.append(f"\n{title.upper()}")
        html.append(f'<h3 style="font:700 12px sans-serif;letter-spacing:.08em;text-transform:uppercase;'
                    f'color:#6F7782;margin:22px 0 8px">{escape(title)}</h3>')
        for c in rows:
            extra = tag(c) if tag else ""
            code = TOPICS[c["topic"]][0]
            text.append(f"- {code} {c.get('num')} {c.get('title', '')}" + (f" ({extra})" if extra else ""))
            html.append(f'<div style="margin:0 0 10px">{chip(c)} <b>{escape(c.get("title", ""))}</b>'
                        + (f' <span style="color:#A8591A;font-size:12px">{escape(extra)}</span>' if extra else ""))
            names = comps.get(c["id"], []) if show_parts else []
            if names:
                done = c.get("parts") or {}
                html.append('<ul style="margin:6px 0 0;padding-left:22px;color:#1F2328;font-size:13.5px">')
                for i, name in enumerate(names):
                    tick = bool(done.get(str(i)) or done.get(i))
                    text.append(f"    [{'x' if tick else ' '}] {name}")
                    style = "color:#A7ADB5;text-decoration:line-through" if tick else ""
                    html.append(f'<li style="{style}">{escape(name)}</li>')
                html.append("</ul>")
            html.append("</div>")

    if todays:
        section("Today's modules", todays, show_parts=True)
    else:
        text.append("\nNothing new is scheduled today.")
        html.append('<p style="margin:0 0 8px">Nothing new is scheduled today.</p>')
    section("Overdue", overdue[:6], show_parts=not todays, tag=lambda c: f"was due {pretty(c['date'])}")
    section("Practice questions to do", need_qs[:5])
    section("Recall checks", [c for c, _ in recalls][:5], tag=lambda c: recall_due(c, today))
    section("Coming up", upcoming, tag=lambda c: pretty(c["date"]))

    text.append(f"\nOpen the tracker: {SITE_URL}")
    html.append(f'<p style="margin:26px 0 0"><a href="{SITE_URL}" style="background:#1E4E8C;color:#fff;'
                f'padding:9px 16px;border-radius:7px;text-decoration:none;font-weight:600">Open the tracker</a></p>')
    body_html = ('<div style="font-family:-apple-system,Segoe UI,sans-serif;font-size:14px;color:#1F2328;'
                 'max-width:560px">' + "".join(html) + "</div>")
    return subject, "\n".join(text), body_html


def main():
    force = os.environ.get("FORCE", "").lower() == "true"
    dry = os.environ.get("DRY_RUN", "").lower() == "true"
    user, password = os.environ.get("GMAIL_USER", ""), os.environ.get("GMAIL_APP_PASSWORD", "")
    to = os.environ.get("EMAIL_TO") or user

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
    if not (user and password and to):
        print("::warning::Email secrets are not set yet (GMAIL_USER, GMAIL_APP_PASSWORD). See the README.")
        return

    msg = EmailMessage()
    msg["Subject"], msg["From"], msg["To"] = subject, f"CFA Tracker <{user}>", to
    msg.set_content(text)
    msg.add_alternative(html, subtype="html")
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=30) as smtp:
        smtp.login(user, password)
        smtp.send_message(msg)
    if not force:
        mark_sent(today)
    print(f"Sent: {subject}")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:  # surface a readable error in the Actions log
        print(f"::error::{type(e).__name__}: {e}")
        sys.exit(1)
