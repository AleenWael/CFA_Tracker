# CFA Tracker

Level I study tracker for the **February 2027** exam. It has 10 topics, 102 learning modules and the 2027 exam weights.

Open `index.html` in a browser, or turn on GitHub Pages (Settings → Pages → Deploy from branch → `main` / root).

- Progress syncs across devices through Firebase (Firestore collection `cfa2027`, project `cfa-tracker-fbb69`). If the database can't be reached, the site falls back to saving in the browser.
- **Backup** / **Restore** download and load a copy of all progress.
- Module components (sub-topics) live in `components.js`.
