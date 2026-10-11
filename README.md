# CFA Tracker

Level I study tracker for the **February 2027** exam. It has 10 topics, 102 learning modules (each broken into components) and the 2027 exam weights.

Live site: https://aleenwael.github.io/CFA_Tracker/

- **Topics / Calendar** switches between the topic list and a month calendar of what's scheduled each day.
- Progress syncs across devices through Firebase (Firestore collection `cfa2027`, project `cfa-tracker-fbb69`). If the database can't be reached, the site falls back to saving in the browser.
- **Backup** / **Restore** download and load a copy of all progress.
- Module components (sub-topics) live in `components.js`.

## Daily study email

`.github/workflows/daily-email.yml` runs every hour and runs `scripts/daily_email.py`. Once a day, at the hour chosen next to **Daily email** on the site (in your own time zone), it emails today's modules with their components, plus anything overdue, practice questions still to do, recall checks and what's coming up.

It sends through [Resend](https://resend.com), an email-sending service, so it never needs access to your own mailbox. On Resend's free plan it can only send to the address you signed up with, which is all this needs.

One-time setup:

1. **Create a Resend account** at https://resend.com/signup, using the email address you want the study emails sent to.
2. **Create an API key.** In Resend, go to **API Keys → Create API Key**, name it `CFA Tracker` and pick **Sending access**. Copy the key (it starts with `re_`). Resend shows it only once.
3. **Add the secrets.** In this repo, go to **Settings → Secrets and variables → Actions → New repository secret** and add:
   - `RESEND_API_KEY`: the key from step 2
   - `EMAIL_TO`: the email address you signed up to Resend with
4. **Send a test.** Go to **Actions → Daily study email → Run workflow**.

Untick **Daily email** on the site to pause it. GitHub turns off scheduled workflows in a repo with no commits for 60 days. If that happens, GitHub emails you, and you re-enable it from the Actions tab.
