# Data Contract — Recipes, Groceries, Coupons, Deals, Memberships & Receipts

**Design specification; not an implemented schema.** Governing: [AGENTS.md](../AGENTS.md) v1.1. This defines compatibility and safety rules to be implemented and tested in future milestones.

## 1. Stable identity, lineage and publication

A **lotteryId** is zero-based 0–83 internally and displayed as #1–84. It is immutable and separate from the source recipe's ID and from any cookbook chapter number. Never derive it by title matching or inferred ordering.

Define separate, stable identifiers for:
- `recipeId`: original recipe identity from the authoritative private Vault.
- `recipeVersionId`: an immutable formulation/method edition (e.g. original versus a separately approved household adaptation).
- `publicationId`: the approved public/safe export of a given version, not a live link into the private Vault.
- `lotteryId`: a known, reviewed association between a meal option and the permitted publication version.
- `shoppingEntryId`, `couponId`, `retailOfferId`, `membershipId`, `receiptId`: domain-specific, never confused with each other.

An original/source recipe, an approved household adaptation, and a convenience weekly meal may share a display title but must **never** share a formulation/version ID.

Recipe linkage is **opt-in**. Until there is a reviewed public publication, the mapping remains null and the UI must show "Recipe not yet linked."

## 2. Recipe publication record

Required conceptually:

| Field | Rule |
| --- | --- |
| recipeId, recipeVersionId, publicationId | Stable IDs, never overwritten by title similarity |
| lotteryIds | Explicit vetted zero-based associations only |
| title, sourceTitle | Presentation and provenance stay separate |
| versionType | original / approved-household / recovered-draft (additional versions need review) |
| sourceStatus, verifiedAt | Distinguish locked/protected, recovered, source-image-verified, pending and unverified |
| publicationAuthorization | Required for any source content included in the public app |
| ingredientStatus, methodStatus | complete / partial / missing independently |
| ingredients | Ordered items and documented amounts; optional flags and alternatives preserved |
| steps | Ordered source-backed instructions, no invented text |
| yield, prepTime, cookTime | nullable when undocumented, units explicit |
| notes, dietaryWarnings, unresolved | Separate original ingredients from household choice notices |

**Cooking-ready** requires: reviewed and permitted version, documented complete ingredients **and** complete method, and any mandatory household substitutions resolved. A full *shopping template* by itself is insufficient.

### Ingredient requirement

Use a distinct `ingredientId` and normalized purchasing concept where practical, plus an original source display name. Fields: measured quantity (number or null), unit (or null), text quantity exactly as documented, optionality, preparation detail, documented alternatives, and `ingredientSource` (recipeVersionId and source item). Example: "1 1/2 cups" must not become "one bag" except under a separately stated shopping choice.

When the recipe says "to taste", store an explicit unquantified value rather than zero or a guessed teaspoon. If an ingredient is omitted for a household adaptation, store a separately approved version; never delete it from the source version.

### Cooking method

Each `stepId` must refer to the same `recipeVersionId` with source-backed order and text. Timer settings and temperatures are nullable unless directly documented; optional derived timers need explicit labeling and review. Guided Cooking cannot reconstruct missing steps.

## 3. Shopping and pantry contract

A `shoppingRequirement` references:
- selected lotteryId, recipeVersionId (or an explicitly labeled planning template with no verified method);
- ingredient identity, original documented amount + unit and necessary package eligibility;
- source provenance, required/optional flag, and **full / partial / unmapped** completeness;
- quantity scaling provenance where authorized;
- chosen manually entered substitutes and separate approval status.

Consolidate by compatible ingredient identity and units **only when conversions are supported**. Keep contribution-level audit details (e.g. dish A: 1 cup + dish B: 2 Tbsp) rather than losing amounts through string concatenation. Unknown quantity must remain unknown even after merging.

Shopping state is **remaining**, **checked off**, or **already on hand** as an exclusive *display count* at a given moment. An item can be saved as checked while later also marked pantry; do not double-count it. Historical checkmarks need not be erased merely because an item is now on hand. Manual additions must remain distinguishable from source ingredients.

Current PWA compatibility keys: `vk-dinner-lottery-v1`, `vk-grocery-v03`, `vk-pantry-v04`. Treat these as protected existing data until a tested migration plan is approved. Pantry now tracks **names**, not adequate stock quantities; don't imply otherwise.

## 4. Retail offers and coupon records

Every `retailOffer` or `coupon` should have:
- Stable ID, retailer, branch/eligibility geography, source and provenance URL if shareable.
- Offer kind: store promotion, manufacturer coupon, loyalty-only, basket-level, rebate/cashback, etc.
- Exact eligible brand/product identifiers, package sizes, size ranges, minimum quantities, exclusions, purchase limits, conditions and membership requirements.
- Discount expression: fixed amount, percentage, buy-N-get-M, unit-price reduction or similar; currency and units explicit.
- Start, expiration and lastVerified timestamp; timezone where relevant.
- Evidence state: discovered / saved / clipped-confirmed / redeemed-confirmed / expired / unverified.
- Stacking rules or an explicit **unknown/unsupported** eligibility flag.
- User-provided media/source reference, securely stored if private.

Use retailer rules as the source of truth; never apply unknown stacking or assume a product name match meets UPC/size restrictions. "Saved locally" is not "clipped at retailer"; "advertised" is not "available for this account".

Offer matching must return a **reason** for eligibility/ineligibility/unknown. Expired or unverifiable offers may remain in saved history but count as **$0 confirmed applicable savings**.

## 5. Membership and rewards records

A membership record may include merchant/program ID, nickname, tier, benefits, valid dates and secure reference to an optional barcode/card credential. Any points/reward balance requires `balanceAsOf`, source and a label stating verified vs user-entered.

The public app may store **nonsecret descriptions** in local settings, but should not persist card identifiers, personal barcodes, account numbers, receipts, tokens or reward balances in localStorage or public files. Private wallet release requires explicit user opt-in, encrypted/protected private storage, threat model and security QA. IndexedDB alone is not encrypted storage. No passwords or payment security codes under any circumstances.

Membership benefits are not assumed active or stackable. Earned credits, available balances and redeemed discounts must be separate monetary concepts.

## 6. Retail basket comparison and budget

A `storePriceObservation` should record store/branch, specific product and package size, unit price, currency, valid-through if provided, retrieved/verified timestamp, availability certainty and source.

A `basketQuote` should show:
- Which planned requirements were priced and which lacked match/pricing.
- Selected products, package quantities, store and documented price type.
- Applied eligible offers, each referenced by couponId/offerId with conditions satisfied.
- Tax/deposit estimate separated from subtotal and disclosed if unknown.
- **One-store** total and optional **multi-store** route total; travel time/fuel assumptions labeled as estimates, not fabricated facts.
- Separate "potential" vs "verified applicable" savings; never stack incompatible discounts.

A `receipt` stores merchant, date, line-item paid prices, promotions and taxes (with review flags for uncertain extraction), actual checkout total, and rewards earned vs redeemed. Actual savings require corroboration from the transaction; no double-counting across coupon, store promotion and cashback.

Missing or outdated observed prices = unknown, not $0. Future fuel rewards are not current grocery cash savings.

## 7. Data visibility classes

**Public-safe:** app UI/code, 84 catalog names, explicitly authorized recipe publications, general product/store data, documentation without secrets.

**Household-private:** planned groceries, pantry quantities, coupon images/codes, membership references, account-specific member pricing, receipts, shopping history, loyalty balances.

**Highly sensitive / forbidden:** account passwords, access tokens in client bundles, payment-card security values, account recovery factors; never store these. Private repository access tokens cannot be shipped to a browser.

Document exposure class and storage choice for every new field. Require opt-in, least privilege, retention controls, deletion/export options and a threat-model review before introducing sensitive persistent cloud sync.

## 8. Export, migration and QA contract

- Private Vault → reviewed publication/export gate → public recipe data → all app views. Never browser-fetch the private Vault with credentials.
- Validate schemas before data becomes searchable, grocery-generating or cooking-mode eligible.
- Unit-test original/household version isolation, optional/unquantified amounts, package conversion, recipe linkage, partial status, stale/expired offers, user membership limitations, stacking, nonnegative quantities and money arithmetic.
- No schema migration may silently discard old lottery numbers, checked grocery items, pantry state or saved menus.
- Any newly built coupon/member/receipt feature must pass data-loss, unauthorized-access and offline-retrieval checks in addition to functional tests.
- A demo fixture must be clearly mock/test data, never presented as real prices, coupons or saved memberships.
