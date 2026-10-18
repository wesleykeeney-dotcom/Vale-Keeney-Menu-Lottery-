# Vale-Keeney Menu Lottery — v0.2 (80 meals)

A mobile-first, installable family dinner lottery, built as a static Progressive Web App. No build dependencies, accounts, or paid hosting needed.

## Features
- **80 stable numbered meals**, retaining all original #1–40 numbers exactly. #41 is Beef Tips & Noodles, and #42–80 are new kid-friendly options.
- Mystery-number board, show-name toggle, random draw, mandatory locked dinners.
- Select 3–7 dinners; configure weekly budget; place meals on days and reserve flex nights.
- Local device persistence, printable/copyable weekly menu, backup import/export.
- Offline caching after first successful visit via service worker.

## Create your GitHub repository
1. Create a new repository named `Vale-Keeney-Menu-Lottery` (public for the simplest GitHub Pages hosting; a private repository may require different Pages availability/settings).
2. Upload **the contents of this ZIP** to the repository root, keeping `index.html`, `app.js`, `meals.js`, `styles.css`, `sw.js`, `manifest.webmanifest`, and `icon.svg` together.
3. In repository **Settings → Pages**, select **Deploy from a branch**, `main`, `/ (root)`, and save.
4. Wait for deployment, then open the URL shown in Pages settings on your phone. Use browser **Add to Home screen / Install app**.
5. Test: choose #16, #20, #8, lock #41 Beef Tips & Noodles, choose #3 sliders; reveal and save. Verify that reloading keeps the menu.

For local testing, run `python -m http.server 8080` in the extracted directory and visit `http://localhost:8080`. Opening via `file://` may not support offline install behavior.

## Data compatibility
- Uses the v0.1 localStorage key `vk-dinner-lottery-v1`, so existing picks and backups remain compatible **when hosted at the same origin/path**.
- The meal index is append-only. Do not reorder the `MEALS` array in `meals.js`; numbers are permanent identities for this version.
- Backups contain lottery state, not recipe bodies.

## Limitations and privacy
- Saves only on the current device/browser, not across family phones. Clearing browser data removes state unless exported.
- GitHub Pages on a public repository exposes the app code and its generic meal names; **do not commit personal receipts, pantry details, family identities, or private Cooking Vault content**.
- This release does not calculate a grocery list, track prices, import recipes, or sync accounts. These are future development phases.
- Household food preferences are informational, not automatic ingredient checks.

## Smoke tests
Run `node tests/smoke.test.cjs` (Node.js 18+).
