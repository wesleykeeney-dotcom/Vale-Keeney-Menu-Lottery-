# Vale-Keeney Menu Lottery

Mobile-first Progressive Web App for a stable 84-choice family dinner lottery, weekly scheduling, pantry and shopping. Hosted on GitHub Pages without a server or account.

**Accepted production:** v0.9 • commit `2de305c` • offline cache v13 • phone QA accepted.  
**Under review:** v1.0 ingredient recovery and source-gated partial shopping templates, cache v14. This branch does **not** change production before an approved merge, passing deployment and Android acceptance.

## Source fidelity and ingredient coverage

The private Vale-Keeney Cooking Vault governs recipe identity, provenance, recovered ingredient bodies and locked originals. The public app supplies a **household shopping representation** only, not source-faithful transcriptions or a cookbook. Never silently convert a variant to the governing source, invent quantities, modify a locked record, assume five-person portions, or expose private links and files.

| Coverage state | Accepted v0.9 | Proposed v1.0 |
|---|---:|---:|
| Household shopping templates (full requirements *as mapped*) | 9 | 9 |
| Partial, explicitly incomplete ingredient lists | 1 | 3 |
| Completely unmapped lottery meals | 74 | 72 |
| Meals scored for pantry-first recommendations | 9 | 9 |
| Immutable lottery identities | 84 | 84 |

"Full" here means **the household shopping template is represented**, not independently source-image verified or sufficient to feed a household. Recipes with unknown or unapproved essential ingredients remain **partial** or unmapped and are never scored as ready to cook. The existing nine household templates retain their prior caveats.

### New v1.0 partials (source-gated, not approved adaptations)

**#18 Cowboy Casserole** uses the exact-name private Vault entry `VK-DIN-COWBOYCASSEROLE-001` (recovered ingredients; original image verification pending). The archived source lists **1 lb lean ground beef, 1 small onion, 1 tsp minced garlic, 1 cup corn, 1 can cream of mushroom soup, 1 cup cheddar, ½ cup milk, ½ cup sour cream, 1 tsp salt, 1 tsp pepper and 1 bag frozen tater tots**. The household partial grocery list **withholds the mushroom soup**, retains the ten other documented ingredients and warns that an **approved mushroom-free creamy base has not been selected**. It must be chosen and added manually; the displayed list is **not cook-ready**.

**#50 Hamburger Potato Casserole** has an exact-name private Vault record `VK-DIN-HAMBURGERPOTATO-CASSEROLE-001`, but **its structured ingredient list remains empty**. The uploaded 161-recipe Kitchen Test Draft (#114) contains a recovered lower-confidence ingredient body: **1½ lb potatoes, 1 lb ground beef, 1 can cream of mushroom soup, ¾ cup milk, 1½ cups cheddar, salt and pepper**. The new partial household list has the recovered non-mushroom items only. It explicitly warns that the archived mushroom soup is withheld, a substitute has not been approved, and original image verification is pending. The Vault record is **not automatically rewritten or certified**.

**#12 Garbage Bread** remains a protected family original: one pizza dough plus about 1 lb ground beef for one loaf; chosen cheese and fillings are manual and the partial is never scored as complete.

For any v1.0 partial: a selected dinner contributes known ingredients to the shopping checklist, **but the grocery coverage report states "partial" and warns that the list is incomplete**, even if all shown ingredients have been purchased. Pantry items remain marked by ingredient name without quantity guarantees.

### Existing guards

- **#4 Pepperoni Pizza Grilled Cheese**: recovered yield **two sandwiches**, optional garlic excluded from required purchases.
- **#6 Taco Casserole**: reconciled recovered shopping quantities include **14.5 oz total Rotel**, 1 cup sour cream, two green onions, four cups tortilla chips; weekly convenience variant remains separate, original image still unverified.
- **#41 Beef Tips & Noodles**: current household template is not identical to an archived mushroom-containing crockpot version. Source conflict is disclosed.
- **#53 Sausage & Potato Foil Packets**: documented quantities, yield unknown, not scaled to five.
- **#9 Garlic Butter Steak Bites, #32 Creamy Beef & Shells, #40 Taco Spaghetti**: exact-name Vault ingredient bodies are empty; do not fabricate or conflate with similar dishes.
- **#2 Chicken Bacon Ranch Pasta** vs archived Pasta Bake, **#26 Baked Chicken Parmesan** vs pork-rind family version, **#31 Pizza Burgers** vs slow-cooker pepperoni pizza burgers: distinct formulations until household adoption is explicitly decided.
- **Food Wars #81–84**: protected source originals remain unmapped in the public household shopping system. Mushroom warnings remain accurate.
- **Gotcha! Pork Roast** attribution discrepancy remains pending source review.

See `docs/v1.0-source-review.md` for the audit/priority register and evidence limits.

## Acceptance tests for v1.0 (after an authorized deployment)

1. Refresh the live app once to load offline cache **v14**; confirm your prior selections, saved menu, pantry, grocery checkmarks and live shopping counts are preserved.
2. Schedule **#18 Cowboy Casserole** and **#50 Hamburger Potato Casserole**. Groceries should display their recovered non-mushroom core ingredients and prominent **PARTIAL, NOT COOK-READY** warnings. The warnings must explicitly explain that the source included mushroom soup and a household replacement still needs approval.
3. Confirm neither a mushroom soup product nor an invented replacement was silently added as a shopping item.
4. Confirm these dinners **do not appear as complete ranked Pantry recommendations** even when all known ingredients are marked on hand.
5. Schedule #12 Garbage Bread alongside them; the coverage report should show **three partial** recipes and keep variable ingredients unresolved.
6. Confirm the shopping progress summary still updates on checkbox clicks and doesn't count on-hand pantry items as purchased. Full/partial/unmapped totals, 84 meal numbers and the original source warnings must survive refresh/offline reopening.

## Storage and limits

Storage keys remain `vk-dinner-lottery-v1`, `vk-grocery-v03`, `vk-pantry-v04`. Local browser storage preserves selections; clearing browser data erases it, so export a lottery backup first. The app doesn't know pantry quantities, serving sufficiency, grocery prices, or a reliable $125 budget. Partial recipes need manual ingredient review before cooking.

## Development

Node.js 22: `node --test tests/*.test.cjs`. CI also runs JavaScript syntax checks on pull requests and `main`. Serve locally with `python -m http.server 8080`; service workers do not work reliably via `file://`. Change the offline cache identifier whenever client assets change.
