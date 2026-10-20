# Recipe Viewer Publication Gate — first cookable recipe milestone

Governing instructions: `AGENTS.md`, `docs/PRODUCT_VISION.md`, `docs/RECIPE_DATA_CONTRACT.md` and `docs/RELEASE_GATES.md`.

## Foundation delivered in draft PR

- A recipe/status panel, opened from revealed lottery choices, the saved weekly menu and the meal library.
- The panel shows **existing public shopping requirements** and source warnings, but treats them as **planning estimates**, not reviewed ingredients from a complete original recipe.
- **First authorized publication:** `recipe-links.js` now explicitly links **Taco Casserole #6** to `VK-HH-TACO-CASSEROLE-MANUSCRIPT-001`, and `recipe-publications.js` contains this **single** owner-approved, publicly distributable household manuscript version. It includes ten documented ingredients, three manuscript cooking steps, unresolved yield, and an explicit **not source-image verified** disclosure. **Other 83 recipes remain unlinked to cooking instructions.**
- The renderer supports a future explicitly linked publication ID and immutable recipe version ID; a reviewed publication must be approved for public web display and associated with the correct lottery ID.
- Only a complete approved method plus complete ingredients and resolved substitutions may display ordered cooking steps. Missing source information is never generated or filled from a different title.
- Tests include entirely **synthetic fixtures** to prove the approval gate, not actual meal methods.
- A shared publication resolver now drives **recipe view, Groceries and Pantry** with the same reviewed version's ingredient names/amounts. It replaces a legacy planning estimate only when the explicit recipe/version/publication authorization and complete categorized-ingredient gates pass. Optional and kitchen-supply items are not auto-purchased.

## Checklist before publishing additional recipe versions (and accepting this release)

1. **Recipe identity:** find the exact private Vault record and source version; identify the immutable lotteryId (0–83) separately from cookbook numbers.
2. **Permission to publish:** ask the owner for explicit approval to export a **specific recipe version's** ingredients and instructions into the public GitHub Pages bundle. Do not infer permission from permission to analyze private sources or build a viewer.
3. **Content verification:** review source-preserved ingredients and methods step-by-step. Record source-image verification separately from recovered-draft status. Do not invent yields, timers or missing units.
4. **Household variant:** if substitutions are necessary, record a separately approved household recipeVersionId; preserve the original archived version. Do not remove mushroom ingredients from original sources or imply an unspecified replacement is cooked/approved.
5. **Single shopping contract:** reconcile the **published recipeVersionId's ingredient quantities** with the current grocery/pantry engine. Review unit normalization and purchase package conversions. An existing household shopping estimate should not be represented as the original recipe's required amounts without validation.
6. **Explicit linkage:** publish a reviewed public-safe record in `recipe-publications.js` and a matching link in `recipe-links.js` only when the above gates pass. Avoid private Vault URLs, tokens and original attachment paths.
7. **Regression QA:** assert recipe ID/version consistency, exact amounts, step order, unknown yield handling, no private leaks, grocery contribution agreement and partial states. Keep all 84 original lottery numbers.
8. **Release:** separate PR/CI, explicit merge approval, successful Pages deploy and Android acceptance before calling any recipe cook-ready.

## Test scenarios on draft foundation

- Lottery result #6 Taco Casserole: recipe screen shows the **owner-approved household manuscript version** and exact ordered method (375°F; about 20 minutes), without claiming that the historical screenshot was independently verified. Groceries and Pantry derive requirements from the same publication, with water visible only as a kitchen supply.
- Weekly menu #12 Garbage Bread: shows partial/variable requirement warning and returns to the saved menu without overwriting it.
- Food Wars #81–84: remain unlinked source originals; existing mushroom/provenance warnings appear; no original method is distributed.
- A recipe with no mapped ingredients: correct title/number, plain missing-publication status.
- Synthetic approved publication: exact recorded steps shown only when complete; mismatched ID/version/unapproved source/incomplete method blocked.

## Product status distinction

This milestone creates a **working navigation, approved Taco Casserole household-manuscript cooking card, and same-version pantry/grocery adapter**. It does **not** source-verify the historical original or publish cooking instructions for the other 83 lottery choices. The owner has authorized publication of this one household manuscript version. **The feature is still on a draft PR, not live, and merge/Pages/Android release gates remain open.** [Taco Casserole source and decision record](TACO_CASSEROLE_SOURCE_REVIEW.md).
