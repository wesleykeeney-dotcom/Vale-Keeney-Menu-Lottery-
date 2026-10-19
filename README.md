# Vale-Keeney Menu Lottery

A mobile-first, static Progressive Web App for the Vale-Keeney dinner lottery. Hosted on GitHub Pages; no sign-in, back end, or paid services.

**Production:** v0.5.1 (84 numbered meals, working weekly calendar and pantry/grocery synchronization).  
**Under development:** v0.6 pantry-first recommendations in PR #7. This branch is not the production app until the PR is merged and GitHub Pages deployment passes.

## How it works

- **Lottery:** Choose or randomly draw among 84 stable numbered dinners, reveal winners, or lock must-have meals. Numbers #1–84 are immutable.
- **This week:** Schedule up to seven dinner slots and use leftovers/flex nights; locally stored across refreshes. Grocery shopping follows this schedule when it has been set, otherwise the current lottery picks.
- **Groceries:** Five household ingredient templates currently exist. All other dishes explicitly report an incomplete grocery list; no unknown ingredients are fabricated.
- **Pantry:** Check which grocery items you already have. Those items appear in an on-hand section rather than the shopping-to-buy checklist.
- **v0.6 feature branch only — Pantry-first suggestions:** Shows up to five meals with on-hand matches, ranked by the fraction of mapped grocery items already present. Unmapped meals are **not scored**, not considered poor matches, and remain available in the ordinary lottery. Tap *Add to lottery* to add one without automatically rewriting the weekly calendar.

### Recommendation limitations

The five existing shopping templates are rough **household planning estimates**. They are not complete, audited recipes and cannot establish ingredient quantities on hand, food safety/readiness, serving-size sufficiency, price, or a reliable `$125` budget result. Two meals with different numbers of ingredients may score differently even when the same food is available. Avoid interpreting scores as readiness to cook. Future versions will add individually verified grocery mappings and separate five-person quantity estimates.

Food Wars #81–84 have provenance-only metadata. They are **unmapped** in groceries and excluded from pantry ranking until their household templates have been independently verified. Source-faithful Cooking Vault recipes must never be copied into this public repository or silently modified.

## Phone QA for v0.6 (after authorized deployment)

1. Verify all 84 lottery numbers remain and existing weekly menu and pantry values survive reload.
2. Go to Pantry: mark `Breakfast sausage` as on hand; `French Toast & Sausage` should be a suggested match with **1 of 3** mapped items on hand.
3. Mark `Pizza sauce` as on hand; `Mini Pizza Night` should appear with **1 of 4** mapped items on hand.
4. Remove `Breakfast sausage`; its recommendation should disappear if no other mapped items are on hand for that dish.
5. Tap `+ Add to lottery` on a suggestion; it must respect the dinner limit and must not silently overwrite the saved weekly schedule.
6. Visit Groceries: any dish not yet added to the calendar must **not** change that week's shopping list. Place the dish on the calendar to refresh groceries.
7. Confirm all four Food Wars dishes remain selectable, show unmapped warnings, and are not given invented ingredient scores.
8. Close and reopen the app (and test offline after initial successful loading). Verify saved choices and recommendations still render.

## Data compatibility and privacy

- Keeps the v0.1 lottery storage key `vk-dinner-lottery-v1`, v0.3 grocery key `vk-grocery-v03`, and v0.4 pantry key `vk-pantry-v04`.
- Saved data lives in the same device/browser. Backups contain lottery state, not private recipe bodies; pantry inventory is stored separately.
- Clearing browser storage removes saved choices. Export a lottery backup before clearing data.
- Public repository code must contain only generic meal names, approved metadata, UI and tests. Never commit private Cooking Vault text, family details, receipts or real household inventory exports.

## Developer QA

Run `node --test tests/*.test.cjs` using Node.js 22. GitHub Actions runs syntax checks and the full suite on pull requests and main-branch pushes. Offline service worker cache increments on each deployment touching client assets.

For local interactive testing, run `python -m http.server 8080` and open `http://localhost:8080`; `file://` URLs do not reliably support service workers.
