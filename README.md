# Vale-Keeney Menu Lottery

## Governing application development directive

**[Master Application Development Directive v1.1 (AGENTS.md)](AGENTS.md)** governs Codex, ChatGPT and human development of this repository. The intended product is a **family interactive cookbook and menu lottery integrated with pantry, groceries, digital coupons, retailer deal comparison and securely handled loyalty memberships**—not merely a dinner randomizer.

Supporting references: [Product Vision](docs/PRODUCT_VISION.md) · [Recipe and Savings Data Contract](docs/RECIPE_DATA_CONTRACT.md) · [QA and Release Gates](docs/RELEASE_GATES.md).

These are **design and development requirements**, not a claim that a recipe viewer, coupon finder, digital wallet, retailer integrations or price optimizer are currently implemented. The authoritative source-faithful recipe archive stays private and must not be copied into this public repo without a reviewed publication authorization.


A mobile-first static Progressive Web App for dinner lottery, saved weekly schedule, household grocery checklist and pantry-first suggestions. Hosted on GitHub Pages, no server or login.

**Deployed production:** v1.1, merged PR #15 at commit `af8e4f1`, offline cache **v16**. Post-merge automated QA **88/88 passed** and GitHub Pages deployment succeeded. **Android user reported that the sauce changed in the recipe but not in Groceries**; this is a confirmed unscheduled-meal scope issue, so v1.1 mobile acceptance remains open.  
**In development:** v1.1.1 grocery-scope hotfix (offline cache **v17**); explicitly view one recipe's shopping list without changing the saved calendar, or return to weekly shopping. Includes regression tests for the previously missing *not scheduled* condition and a visible build identifier. The coupon finder and membership wallet are roadmap items, not deployed capabilities.

## v1.1.1 unscheduled recipe shopping fix — draft, not yet released

**Cause:** In deployed v1.1, selecting sauce changes the recipe and its stored preference, but the Groceries view correctly lists **only the scheduled weekly dinners** (or, when no calendar is saved, current lottery selections). Opening a recipe from Meal Library never adds it to the saved weekly menu. The earlier tests scheduled #4 explicitly, so the unscheduled case was missed.

**Resolution in this patch:** A reviewed recipe shows whether it belongs to the current grocery scope, then offers **Shop this recipe**. This opens a **temporary single-recipe** grocery list containing the exact selected ingredient version (pizza sauce or marinara) without touching the saved weekly menu, lottery, pantry, or previous checked-off shopping items. An obvious **Show weekly groceries** action returns to the normal calendar-derived list. Weekly manual additions are not mixed into the single-recipe preview. Sauce changes for *scheduled* meals still update weekly Groceries automatically. The active shopping scope is in-memory only, with no new persistent data keys.

**Android acceptance after a separately authorized merge:** Verify visible **v1.1.1** label and cache v17; open #4 from Meal Library while #6 remains on the calendar, switch to marinara, tap **Shop this recipe**, confirm the six documented purchase items including **Marinara sauce — 2 Tbsp**. Tap **Show weekly groceries** and verify the original week's list is restored. Schedule #4 explicitly and verify a sauce change updates normal weekly Groceries. Confirm original 84 lottery numbers and saved pantry/checkmarks remain intact.

## v1.1 recipe expansion — deployed, with Android scope issue under correction

The new approved **Pepperoni Pizza Grilled Cheese (#4)** household manuscript appears alongside existing Taco Casserole (#6) in the draft recipe viewer. Documented yield: **two sandwiches**. The seven source-backed ingredient lines include optional **1 tsp garlic powder**, which appears on the recipe card but is **not** auto-added to shopping.

A **Sauce choice** selector defaults to **Pizza sauce** or can select **Marinara sauce**; the selection is saved locally under the nonsecret `vk-recipe-options-v01` key and updates the **recipe ingredient, Groceries, and Pantry** together. The three documented cooking steps remain aligned to either sauce, including **3–4 minutes per side over medium heat**. No ingredients are scaled to five servings and no historical-original source fidelity is claimed. Other 82 lottery recipes still have no authorized public full cooking method; #12, #18 and #50 remain partial.

**After separate merge/deploy authorization:** refresh Android once to activate offline cache **v16**, open #4 from Lottery / This Week / Library, confirm the exact two-sandwich recipe, switch the sauce in the recipe card and verify the matching grocery and pantry label, check optional garlic is absent from required groceries, refresh and confirm sauce choice persists without erasing weekly menu, pantry or grocery checkmarks. Also confirm #6 Taco Casserole and incomplete source warnings remain unchanged.

[Recipe expansion source review](docs/v1.1-recipe-expansion-review.md) · [Candidate review queue](docs/v1.1-recipe-expansion-queue.json)

## v0.9: Live shopping progress (released)

The grocery summary now has three **separate live counts**:

- **Remaining:** items on the current shopping checklist that have not been checked off.
- **Checked off:** items on the current shopping checklist marked complete.
- **Already on hand:** items removed from the shopping checklist because they are marked available in Pantry.

For the Android screenshot with Mini Pizza Night plus the partial Garbage Bread core, **5 visible shopping items** (including **1 checked-off Pepperoni**) and **1 pantry item (Pizza sauce)** will display: **4 items remaining • 1 checked off • 1 already on hand.**

Tapping a grocery checkbox updates the summary immediately **without rebuilding the item list** (avoids losing touch scroll/focus); checkmarks continue using the existing `vk-grocery-v03` storage. Unchecking reverses the counts, and saved checkmarks are counted after refresh. Adding or clearing manual grocery items, changing the weekly schedule, or marking something in Pantry recomputes the counts when the list is rendered. Pantry ingredients are not double-counted as checked-off purchases.

Important: A lower *remaining* count **does not** mean the entire week's ingredients are known. Source-partial recipes (such as Garbage Bread) and unmapped dinners still show incomplete grocery-list warnings. No cooking quantities, shopping prices, original Cooking Vault data or meal IDs change.

### v0.9 Android acceptance procedure (previously passed)

1. Refresh once to activate offline cache **v13**. Confirm prior selected dinners, pantry items, and grocery checkmarks remain.
2. Schedule **Mini Pizza Night** and **Garbage Bread**, with **Pizza sauce** marked in Pantry. Before checking any other items, expect **5 remaining • 0 checked off • 1 on hand** if no manual items were added.
3. Check **Pepperoni**. Expect **4 remaining • 1 checked off • 1 on hand**, immediately without refreshing.
4. Uncheck Pepperoni. Expect **5 remaining • 0 checked off • 1 on hand**.
5. Check Pepperoni again, refresh, and confirm the saved checkmark still yields **4/1/1**. Add a manual item; remaining should increase by one. Check it and confirm one item moves from remaining to checked-off.
6. Confirm **Garbage Bread stays labeled partial**, unscored in Pantry-first; verify 84 lottery IDs, 9 full ingredient templates, 1 partial, and 74 unmapped dinners are unchanged.

## Recipe viewer foundation and Taco Casserole household publication (draft PR; not yet live)

A **View recipe** control opens the meal-specific recipe card from revealed lottery winners, the weekly menu or the meal library. The card shows the immutable lottery number and original name, and **Back** returns without changing the saved schedule.

**#6 Taco Casserole is the first owner-approved public household manuscript recipe.** Its separate `recipeVersionId` (`VK-HH-TACO-CASSEROLE-MANUSCRIPT-001`) preserves the ten documented ingredients (including ½ cup water) and three manuscript cooking steps: 375°F oven, beef and seasoning preparation, layering, and approximately 20-minute baking. **This is NOT a source-image-verified transcription of the historical original**; the private Vault source remains unaltered, original screenshot verification remains pending, and the serving yield is undocumented. The publication includes the recorded crisp-chip tip and the warning that a 14.5-oz Rotel can may require checking actual package sizes.

The same approved version now drives the **recipe card, nine required shopping products, and Pantry labels**. Water is displayed on the recipe as a kitchen supply and is not automatically purchased. `recipe-publications.js` contains the single explicitly approved manuscript publication, and `recipe-links.js` links only immutable lottery ID 5. Existing pantry items stored under less-specific ingredient names (e.g. "Salsa" rather than "Chunky salsa") are not automatically interpreted as equivalent; check them again in Pantry after deployment. Existing storage keys and contents are not cleared.

**Other 83 meals remain unlinked to cooking instructions.** Where public household planning templates exist, the recipe screen shows their ingredient estimates with an explicit "not yet linked" warning; partial and unmapped meals remain incomplete. No Food Wars protected source method is published.

**Combined v1.0 mapping coverage (draft):** 9 complete household shopping templates (**one, Taco Casserole, now has an approved household cooking method**), 3 partial core shopping lists (#12 Garbage Bread, #18 Cowboy Casserole, #50 Hamburger Potato Casserole), and 72 unmapped lottery choices. The two newly recovered casserole partials explicitly warn about original mushroom soup being withheld pending an approved household replacement; neither is cooking-ready or pantry-ranked. See [Source Review & Mapping Queue](docs/v1.0-source-review.md). This branch incorporates the source-gated development from separately open PR #12, avoiding a conflicting cache version; do not independently merge both branches without an integration review.

### Android acceptance after authorized merge and deployment

1. Refresh once to load offline cache **v15**; confirm existing weekly menus, grocery checkmarks, and pantry selections remain.
2. Reveal Taco Casserole **lottery #6** and tap **View recipe**; confirm the label **approved household manuscript (not source-verified original)** and the documented ingredients, three steps, 375°F and approximately 20 minutes.
3. Confirm **serving yield not documented**. Water appears in the recipe as **1/2 cup** but not in the automatic grocery shopping list; the remaining **nine** ingredients use the same names and amounts in recipe and Groceries.
4. From the weekly menu, open #6 and then **Back**; confirm its scheduling is unchanged. Check Pantry's revised labels including **Chunky salsa** and **Rotel**, which may differ from the former planning estimate.
5. Check off one needed item and verify the Groceries remaining/checked-off numbers update immediately and survive refresh.
6. Open **#12 Garbage Bread** and an unmapped Food Wars meal; both still display honest limitations and no invented method.
7. Verify 84 lotto IDs, no private Vault reference links or original screenshot certification, and successful offline reopening.

See [Taco Casserole source review and publication decision](docs/TACO_CASSEROLE_SOURCE_REVIEW.md) and [Recipe Publication Gate](docs/RECIPE_VIEWER_PUBLICATION_GATE.md). **This version remains a draft until explicit merge approval, GitHub Pages deployment, and Android acceptance.**

## Recipe mapping policy

The **private Vale-Keeney Cooking Vault** is the recipe source of truth; the public app includes only documented **household shopping requirements and caveats**, never protected source methods. Locked formulations remain untouched. Identical names do not automatically establish identical methods or ingredient versions; name-similar recipes require review. Missing quantities stay missing.

| Historical coverage | v0.7 baseline | v0.8 released |
|---|---:|---:|
| Fully represented household shopping templates | 9 | 9 |
| Partial base templates (not full recipes) | 0 | 1 |
| Unmapped meals | 75 | 74 |
| Total immutable lottery meal IDs | 84 | 84 |
| Eligible for pantry-first scoring | 9 | 9 |

A **partial** recipe has verified core shopping ingredients but intentionally undefined choices. It is not counted as fully mapped or scored in pantry recommendations; its incomplete status remains visible in the grocery list. A meal lacking both full and partial templates remains unmapped.

### v0.8: #12 Garbage Bread — locked family formulation, intentionally partial

Private Vault ID: `VK-FAM-GARBAGEBREAD-001`. Archive status: `family_original`, **locked**, source `verified_against_source: true`. Yield: **one loaf**.

- **Confirmed shopping base:** one pizza dough (the preparation method explicitly specifies one), about **1 lb ground beef**.
- **Intentionally variable:** cheese, fillings and desired seasonings. The archive does not define amounts; add your chosen extras manually to groceries.
- The pantry section lists the fixed base ingredients. Pantry-first does **not** rank Garbage Bread as complete or infer the fillings from another recipe.
- The grocery section counts the meal as **partial**, displays the core ingredients and the missing-choice warning even when all scheduled meals have some shopping representation.

### Other source-fidelity and family considerations

- **#41 Beef Tips & Noodles:** existing household template remains an unverified mushroom-free planning estimate. An older supplied screenshot of **Crockpot beef tips & noodles** explicitly contains both **cream of mushroom soup** and **canned mushrooms**. These are not interchangeable. The app now warns of this divergence without changing the household grocery template or source record.
- **#18 Cowboy Casserole:** archived original contains cream of mushroom soup. No approved mushroom-free formulation yet; stay unmapped.
- **#9 Garlic Butter Steak Bites, #32 Creamy Beef & Shells, #40 Taco Spaghetti, #50 Hamburger Potato Casserole:** current corresponding Vault records have no verified ingredient body. Do not infer from similar-name dishes.
- **#31 Pizza Burgers:** the recoverable Vault record is **Slow Cooker Pepperoni Pizza Burgers** (8-burger version). Different title/preparation; no blanket mapping until the variant is approved.
- **#26 Baked Chicken Parmesan:** Vault family record is explicitly a **Pork-Rind Crust** variant; don't silently map that to general baked chicken Parmesan.
- **Food Wars #81–84:** locked, source-faithful archive, not assigned household grocery templates. Their documented mushroom warnings must remain accurate.
- **#4 Pepperoni Pizza Grilled Cheese:** archived quantities yield only two sandwiches, and optional garlic stays outside required purchases.
- **#53 Sausage & Potato Foil Packets:** yield not documented; no five-person scaling.

There is also a pending provenance discrepancy for the Gotcha! Pork Roast attribution between the recovered Drive document and display metadata. Don't change the governing citation without a source review.

## Application behavior and mobile acceptance

1. Open the production URL after approved deployment and refresh once for offline cache **v12**.
2. Schedule **#12 Garbage Bread**. Groceries must show pizza dough, about 1 lb ground beef, and an explicit **PARTIAL/incomplete** warning asking you to choose and add fillings and cheese manually.
3. In Pantry, find and mark **Pizza dough** as on hand. Groceries should remove it from items to buy, but Garbage Bread must **not** appear as a ranked complete pantry meal.
4. Schedule a fully mapped meal alongside Garbage Bread; groceries must distinguish **1 complete + 1 partial** rather than claiming the shopping list is complete.
5. Schedule **#41 Beef Tips & Noodles**; Groceries should display the unverified-template vs mushroom-containing source warning without adding mushroom products.
6. Verify old saved menus, local pantry changes, nine full templates, 84 meal identities and immediate checkbox refresh still work. No locked Food Wars ingredients are exposed.

## Limitations and storage

The pantry tracks ingredient **names**, not quantities. "On hand" does not mean enough to feed the family. The app does not compute a reliable $125 weekly cost or scale recipes automatically to five diners. Standard Taco Casserole shopping still uses recovered Vault/cookbook quantities (14.5 oz total Rotel, 1 cup sour cream, two green onions, four cups tortilla chips); source-image verification is pending.

The unchanged browser storage keys are `vk-dinner-lottery-v1`, `vk-grocery-v03`, and `vk-pantry-v04`. Clearing browser data loses saved choices; export a backup first. Private recipe texts and household inventory must never be committed to this public repository.

## Local developer tests

Use Node.js 22 and `node --test tests/*.test.cjs` for regression QA. Serve static files from `python -m http.server 8080` (service workers do not work reliably under `file://`). CI checks syntax and all tests for PRs and main pushes. Update offline cache on client asset changes.
