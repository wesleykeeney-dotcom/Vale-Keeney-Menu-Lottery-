# Vale-Keeney Menu Lottery

Mobile-first static Progressive Web App for the Vale-Keeney family dinner lottery, hosted on GitHub Pages. No login or back-end service.

- **Production:** v0.6.1, accepted Android phone QA, offline cache v10.
- **Development:** v0.7 grocery mapping expansion. No v0.7 changes reach production until the PR is merged, Pages deployment succeeds, and Android phone QA passes.

## Core workflow

- **Lottery:** 84 numbered meal identities. Mystery picks, locks, and dinner counts preserve their original IDs (#1–84).
- **This Week:** Pick five dinners and use remaining nights for leftovers/flex; saved locally.
- **Groceries:** Shopping list follows the saved weekly calendar (or current lottery picks when no schedule exists). Unmapped dinners are explicitly flagged as incomplete, never assigned invented ingredients.
- **Pantry:** Items marked as on hand are excluded from items to buy. Recommendations update on the same tap without refreshing.
- **Pantry-first:** Score mapped meals by **fraction of ingredient names already on hand**, display what's needed, and optionally add a meal to the lottery without rewriting the weekly calendar. This is not portion-aware or inventory-quantity-aware.

## Source/provenance policy

**The private Vale-Keeney Cooking Vault is the source of truth.** Its source-faithful and locked recipe records stay unchanged and outside this public app. Grocery templates are a separate **household shopping representation**, not original source transcriptions or approval to alter source recipes.

The v0.7 branch contains **9 shopping templates of 84 dinner choices**; **75 remain unscored**. Quality of evidence varies by template:

| Lottery # | Meal | Household mapping status |
|---|---|---|
| 1 | Breakfast Tacos | Documented in October 19–25, 2026 household Drive weekly packet |
| 3 | Homemade Cheeseburger Sliders | Legacy household planning estimate; recipe-specific source audit outstanding |
| 4 | Pepperoni Pizza Grilled Cheese | Recovered Cooking Vault recipe body; original source-image verification pending |
| 6 | Taco Casserole | Fuller quantities agree across recovered Cooking Vault and cookbook; original source-image verification pending; October weekly packet is a separate variation |
| 8 | Spaghetti & Meatballs | Legacy household planning estimate; source audit outstanding |
| 16 | Mini Pizza Night | Legacy household planning estimate; source audit outstanding |
| 20 | French Toast & Sausage | Legacy household planning estimate; source audit outstanding |
| 41 | Beef Tips & Noodles | Legacy household planning estimate; source audit outstanding |
| 53 | Sausage & Potato Foil Packets | Recovered Cooking Vault recipe body; original source-image verification pending |

### v0.7 additions: precise ingredient boundaries

- **#4 Pepperoni Pizza Grilled Cheese:** The recovered archive lists **4 slices bread, 8 slices pepperoni, 1 cup mozzarella, 2 Tbsp marinara or pizza sauce, 2 Tbsp butter, 1 tsp oregano, and optional 1 tsp garlic (form unspecified)**, yielding **2 sandwiches**. Household shopping chooses the archive's **pizza sauce** alternative. Optional garlic is disclosed separately, not required for pantry coverage or automatic shopping. **Do not assume this feeds five people.**
- **#53 Sausage & Potato Foil Packets:** The recovered archive lists **1 lb smoked sausage, 1½ lb baby potatoes, 1 red bell pepper, 1 green bell pepper, 1 small onion, 3 Tbsp olive oil, 2 tsp garlic powder, 1 tsp dried Italian seasoning, 1 tsp paprika, and salt/black pepper to taste**. The grocery list splits salt and pepper into two pantry items only for practical shopping. **No serving yield is documented and no five-person scaling has been applied.**
- **#6 Taco Casserole:** For standard household shopping, use **14.5 oz total Rotel, 1 cup sour cream, 2 green onions, 4 cups tortilla chips**; other quantities stay as recovered. The October weekly packet used about 10 oz Rotel without measured toppings; preserve that separately rather than silently rewriting the archived standard. The recipe's ½ cup water is a kitchen supply and is not a buy item.

**Not mapped yet:** #18 Cowboy Casserole contains cream of mushroom soup in its recovered source. No mushroom-free household formulation has been approved. #9 Garlic Butter Steak Bites is not equivalent to the archived Steak & Potatoes recipe, and its own recipe body is incomplete. #12 Garbage Bread deliberately leaves fillings variable. #81–84 Food Wars recipes remain locked source-faithful records without public household ingredient templates.

## Acceptance checklist for v0.7 (after deployment)

1. Refresh once to load offline cache **v11**, confirm 84 lottery positions and saved menus/pantry remain.
2. In **This Week**, schedule **#4 Pepperoni Pizza Grilled Cheese**. Open Groceries and check the six mapped required items plus the two-sandwich yield and optional-garlic disclosure. No five-person multiplier should appear.
3. Schedule **#53 Sausage & Potato Foil Packets**. Verify listed quantities, with salt and pepper separate; yield must be disclosed as unknown.
4. In Pantry, mark **Pizza sauce** on hand and confirm #4 appears as a match without refreshing. Uncheck it and confirm the match updates.
5. Verify no ingredient list is invented for Cowboy Casserole, Garlic Butter Steak Bites, or any Food Wars dish.
6. Add a suggestion to the lottery and verify that the saved weekly calendar and grocery list do not change unless the calendar is edited.
7. Refresh/close/reopen and verify saved data and shopping list remain intact.

## Privacy, data compatibility and limitations

Keep these localStorage keys unchanged: `vk-dinner-lottery-v1`, `vk-grocery-v03`, and `vk-pantry-v04`. Clearing browser storage removes saved state. Export a lottery backup before clearing data. Never commit private Cooking Vault text, household inventories, receipts, or private Google Drive URLs to the public repo.

A checked pantry ingredient means its **name** is available, not that enough quantity is on hand. Existing templates are planning estimates until their underlying original source images are independently checked. The app does **not** yet compute accurate servings, five-person quantities, prices, or the $125 budget.

The Gotcha! Pork Roast attribution differs between recovered Drive material (Feast of Fiction) and existing app metadata (A Taste of Anime). Keep this discrepancy open for provenance review.

## Developer checks

Run `node --test tests/*.test.cjs` with Node.js 22. GitHub Actions runs JavaScript syntax checks and the full test suite on pull requests and main-branch pushes. Each production client-file update must bump the offline service-worker cache.

For local browser testing, run `python -m http.server 8080` and open `http://localhost:8080`.
