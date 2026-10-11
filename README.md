# CFA Tracker

Level I study tracker for the **February 2027** exam. It has 10 topics, 102 learning modules (each broken into components) and the 2027 exam weights.

Live site: https://aleenwael.github.io/CFA_Tracker/

- **Topics / Calendar** switches between the topic list and a month calendar of what's scheduled each day.
- Progress syncs across devices through Firebase (Firestore collection `cfa2027`, project `cfa-tracker-fbb69`). If the database can't be reached, the site falls back to saving in the browser.
- **Backup** / **Restore** download and load a copy of all progress.
- Module components (sub-topics) live in `components.js`.

## Daily study email

`.github/workflows/daily-email.yml` runs every hour and runs `scripts/daily_email.py`. Once a day, at the hour chosen next to **Daily email** on the site (in your own time zone), it emails today's modules with their components, plus anything overdue, practice questions still to do, recall checks and what's coming up.

One-time setup:

1. **Create a Gmail app password.** Your Google account needs 2-Step Verification turned on. Go to https://myaccount.google.com/apppasswords, create one named `CFA Tracker` and copy the 16-character password.
2. **Add the secrets.** In the repo, go to **Settings → Secrets and variables → Actions → New repository secret** and add:
   - `GMAIL_USER`: the Gmail address that sends the email
   - `GMAIL_APP_PASSWORD`: the app password from step 1
   - `EMAIL_TO` (optional): where to send it. Defaults to `GMAIL_USER`.
3. **Send a test.** Go to **Actions → Daily study email → Run workflow**.

Untick **Daily email** on the site to pause it. GitHub turns off scheduled workflows in a repo with no commits for 60 days. If that happens, GitHub emails you, and you re-enable it from the Actions tab.
