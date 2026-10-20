# Recipe Viewer Publication Gate — first cookable recipe milestone

Governing instructions: `AGENTS.md`, `docs/PRODUCT_VISION.md`, `docs/RECIPE_DATA_CONTRACT.md` and `docs/RELEASE_GATES.md`.

## Foundation delivered in draft PR

- A recipe/status panel, opened from revealed lottery choices, the saved weekly menu and the meal library.
- The panel shows **existing public shopping requirements** and source warnings, but treats them as **planning estimates**, not reviewed ingredients from a complete original recipe.
- `recipe-links.js` intentionally has **no entries** and `recipe-publications.js` intentionally has **no recipes**. There are currently no public full-method recipes in the app. This is deliberate, not a failure to match names.
- The renderer supports a future explicitly linked publication ID and immutable recipe version ID; a reviewed publication must be approved for public web display and associated with the correct lottery ID.
- Only a complete approved method plus complete ingredients and resolved substitutions may display ordered cooking steps. Missing source information is never generated or filled from a different title.
- Tests include entirely **synthetic fixtures** to prove the approval gate, not actual meal methods.

## Checklist before publishing the first real recipe

1. **Recipe identity:** find the exact private Vault record and source version; identify the immutable lotteryId (0–83) separately from cookbook numbers.
2. **Permission to publish:** ask the owner for explicit approval to export a **specific recipe version's** ingredients and instructions into the public GitHub Pages bundle. Do not infer permission from permission to analyze private sources or build a viewer.
3. **Content verification:** review source-preserved ingredients and methods step-by-step. Record source-image verification separately from recovered-draft status. Do not invent yields, timers or missing units.
4. **Household variant:** if substitutions are necessary, record a separately approved household recipeVersionId; preserve the original archived version. Do not remove mushroom ingredients from original sources or imply an unspecified replacement is cooked/approved.
5. **Single shopping contract:** reconcile the **published recipeVersionId's ingredient quantities** with the current grocery/pantry engine. Review unit normalization and purchase package conversions. An existing household shopping estimate should not be represented as the original recipe's required amounts without validation.
6. **Explicit linkage:** publish a reviewed public-safe record in `recipe-publications.js` and a matching link in `recipe-links.js` only when the above gates pass. Avoid private Vault URLs, tokens and original attachment paths.
7. **Regression QA:** assert recipe ID/version consistency, exact amounts, step order, unknown yield handling, no private leaks, grocery contribution agreement and partial states. Keep all 84 original lottery numbers.
8. **Release:** separate PR/CI, explicit merge approval, successful Pages deploy and Android acceptance before calling any recipe cook-ready.

## Test scenarios on draft foundation

- Lottery result #6 Taco Casserole: recipe screen shows household shopping preview, not unverifiable cooking instructions.
- Weekly menu #12 Garbage Bread: shows partial/variable requirement warning and returns to the saved menu without overwriting it.
- Food Wars #81–84: remain unlinked source originals; existing mushroom/provenance warnings appear; no original method is distributed.
- A recipe with no mapped ingredients: correct title/number, plain missing-publication status.
- Synthetic approved publication: exact recorded steps shown only when complete; mismatched ID/version/unapproved source/incomplete method blocked.

## Product status distinction

This milestone creates a **working navigation and honest recipe-status viewer**, *not yet a cookable recipe library*. The next approved engineering slice is the **same-version ingredient adapter**, followed by user-authorized publication and Android cooking-view acceptance of the first real recipe.
