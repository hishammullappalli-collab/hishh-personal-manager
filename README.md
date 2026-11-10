# HISHH Personal Manager — Starter App

A responsive, installable Progressive Web App (PWA) with a premium black-and-gold interface.

## Included
- Overview dashboard and today's task progress
- Daily task list with priorities and completion
- Business/project list with status tracking
- Income and expense ledger in INR
- Social content idea planner
- Long-term goals with target dates
- Offline caching and home-screen installation support

## Important data note
This starter app saves information in the browser's localStorage on the current device/browser. It does not have cloud sync, accounts, encryption, or multi-device backup. Clearing browser site data can erase records. Do not enter passwords, bank credentials, or sensitive information. Export/backup and secure login can be added in a later version.

## Test locally
Open `index.html` in a browser. Some PWA features (service worker and install prompt) require HTTPS or localhost, so use GitHub Pages for installation.

## Deploy free with GitHub Pages (Android or laptop)
1. Extract the ZIP.
2. Sign in to GitHub and create a new **public** repository named `hishh-personal-manager`.
3. Upload all files from this folder to the repository root (not the ZIP itself).
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Choose branch `main`, folder `/ (root)`, then Save.
7. Wait for GitHub Pages to publish. Your address will look like `https://YOUR-USERNAME.github.io/hishh-personal-manager/`.
8. Open that HTTPS address in Chrome on your Samsung phone.
9. In Chrome, tap **⋮ → Add to Home screen** or **Install app**. Confirm.
10. Open HISHH from your home screen.

## Android notes
- Chrome is recommended for installation.
- If GitHub Pages has just deployed, wait a few minutes and refresh.
- Use the same browser profile to keep the same local data.
- The app works offline after its first successful load, subject to browser storage policies.

## Next upgrade
For multi-device access, admin/user roles, secure sign-in and cloud backup, add a backend such as Supabase with row-level security. Never put a Supabase service-role key in frontend code.
