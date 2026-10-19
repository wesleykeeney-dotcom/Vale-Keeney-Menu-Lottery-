# Vale-Keeney Menu Lottery

A mobile-first static Progressive Web App for dinner lottery, saved weekly schedule, household grocery checklist and pantry-first suggestions. Hosted on GitHub Pages, no server or login.

**Accepted production release:** v0.8, commit `970515b`, offline cache v12; production deployed and Garbage Bread mapping confirmed on Android.  
**In development:** v0.9 (live grocery shopping totals). Do not consider these changes deployed before PR review, merge, GitHub Pages deployment and Android acceptance.

## v0.9: Live shopping progress (proposed)

The grocery summary now has three **separate live counts**:

- **Remaining:** items on the current shopping checklist that have not been checked off.
- **Checked off:** items on the current shopping checklist marked complete.
- **Already on hand:** items removed from the shopping checklist because they are marked available in Pantry.

For the Android screenshot with Mini Pizza Night plus the partial Garbage Bread core, **5 visible shopping items** (including **1 checked-off Pepperoni**) and **1 pantry item (Pizza sauce)** will display: **4 items remaining • 1 checked off • 1 already on hand.**

Tapping a grocery checkbox updates the summary immediately **without rebuilding the item list** (avoids losing touch scroll/focus); checkmarks continue using the existing `vk-grocery-v03` storage. Unchecking reverses the counts, and saved checkmarks are counted after refresh. Adding or clearing manual grocery items, changing the weekly schedule, or marking something in Pantry recomputes the counts when the list is rendered. Pantry ingredients are not double-counted as checked-off purchases.

Important: A lower *remaining* count **does not** mean the entire week's ingredients are known. Source-partial recipes (such as Garbage Bread) and unmapped dinners still show incomplete grocery-list warnings. No cooking quantities, shopping prices, original Cooking Vault data or meal IDs change.

### Android verification after v0.9 deployment

1. Refresh once to activate offline cache **v13**. Confirm prior selected dinners, pantry items, and grocery checkmarks remain.
2. Schedule **Mini Pizza Night** and **Garbage Bread**, with **Pizza sauce** marked in Pantry. Before checking any other items, expect **5 remaining • 0 checked off • 1 on hand** if no manual items were added.
3. Check **Pepperoni**. Expect **4 remaining • 1 checked off • 1 on hand**, immediately without refreshing.
4. Uncheck Pepperoni. Expect **5 remaining • 0 checked off • 1 on hand**.
5. Check Pepperoni again, refresh, and confirm the saved checkmark still yields **4/1/1**. Add a manual item; remaining should increase by one. Check it and confirm one item moves from remaining to checked-off.
6. Confirm **Garbage Bread stays labeled partial**, unscored in Pantry-first; verify 84 lottery IDs, 9 full ingredient templates, 1 partial, and 74 unmapped dinners are unchanged.

## Recipe mapping policy

The **private Vale-Keeney Cooking Vault** is the recipe source of truth; the public app includes only documented **household shopping requirements and caveats**, never protected source methods. Locked formulations remain untouched. Identical names do not automatically establish identical methods or ingredient versions; name-similar recipes require review. Missing quantities stay missing.

| Coverage | Production v0.7 | v0.8 proposed |
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
