# Vale-Keeney Menu Lottery

A family-friendly, mobile-first dinner lottery with 80 numbered meal options.

## Getting started

Upload the contents of `Vale-Keeney-Menu-Lottery-Repository-v0.2.zip` to the root of this repository (not the ZIP itself). The app uses plain HTML, CSS and JavaScript, with no build step.

Open `index.html` locally to inspect the interface. To use saved data and offline support reliably, host the app over HTTPS using GitHub Pages.

## Deploy with GitHub Pages

In **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/(root)`, then save. The published address will be:

https://wesleykeeney-dotcom.github.io/Vale-Keeney-Menu-Lottery-/

## Quality checks

Run `node --test tests/*.test.cjs` and `node --check app.js` / `node --check meals.js` locally. The GitHub Actions workflow runs the same checks after app files are uploaded.

## Data

The 80-meal library is a dinner-selection catalog, not a substitute for the separate source-faithful Vale-Keeney Cooking Vault. Selections are stored in the local browser; family synchronization and ingredient-based grocery generation are future features.

## Privacy

The current version does not require accounts or a server. Browser storage is local to each device. Do not commit private household data or receipt details to this public repository.
