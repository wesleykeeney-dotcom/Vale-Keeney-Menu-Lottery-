# Product Vision — Vale-Keeney Interactive Cookbook & Savings Hub

**Companion to [AGENTS.md](../AGENTS.md), directive v1.1.** This is a product target, **not** a claim that these screens already exist.

## North star

The family starts by letting the 84-choice lottery choose dinner, then can immediately open the *correct reviewed recipe version*, check pantry availability, create a truthful shopping list, compare verified deals and coupons, use eligible memberships, and follow the documented cooking method.

**One continuous experience:** Pick → View Recipe → Pantry → Groceries → Coupons/Deals → Shop → Cook.

## End-to-end journeys

### A. Dinner winner becomes dinner instructions

1. Reveal a lottery result (or open a meal on the weekly calendar / library).
2. See **View Recipe** only where a reviewed/publication-approved recipe version is linked to the immutable lottery ID.
3. Select original or approved household adaptation if more than one version is available. Do not silently default to an unsafe or unsuitable source.
4. See documented ingredient amounts, preparation steps, yield and timing; show meaningful verification and completeness indicators.
5. Use **Start Cooking** only for a complete, permitted method; display no invented steps, temperatures or timers.

**Empty / partial state:** "Recipe not yet linked" or "Incomplete recipe: ingredients/method still being verified." Keep the lottery choice available; allow user-supplied ingredients manually without asserting source completeness.

### B. Plan the family's actual grocery needs

1. Schedule reviewed recipes for the week; retain current five dinners plus two flex nights as configurable defaults.
2. Build ingredient contributions from the selected recipe **and version**; consolidate equivalent products while keeping quantity/unit provenance.
3. Check what is in pantry and how much is available if quantity tracking has been supported. Current pantry checkmarks are name-only.
4. Show three distinct shopping states: remaining, checked off, pantry; expose whether the overall ingredient requirements are full/partial/unmapped.
5. Avoid automatic five-person scaling and budget assertions until verified yields and current prices are available.

### C. Apply coupons and store deals to actual shopping items

1. Read the resulting grocery basket. Match a coupon against **specific eligible products** by retailer, product, size, quantity and dates.
2. Mark offers as discovered, saved, clipped only with confirmation, used or expired; retain offer source and last-check time.
3. Calculate eligible basket totals by store, accounting for compatible promos and a user's available verified memberships.
4. Explain why a promotion *doesn't apply*; do not subtract unconfirmed offers.
5. Compare best practical one-stop basket with a multi-stop plan, including time/fuel estimates only where grounded.

**Unavailable live sources:** Show a manual offer-entry option and a link to the retailer's official promotion page. Never display fictional "live coupons".

### D. Keep usable wallet items without exposing family identifiers

1. A coupon may be saved from a user-provided image, file or approved source, with source conditions and expiration.
2. A member card may contain a nonsecret program nickname and, only in a protected and authorized design, a barcode or identifier.
3. Support device-offline viewing when a reviewed privacy/security implementation exists. Not all browser storage qualifies.
4. Never commit coupon images, membership details, rewards, receipts or personal account identifiers to a public GitHub repository.
5. Integrations may show an externally managed membership link if secure in-app access has not been established.

### E. Reconcile plan vs checkout

Show which discounts were **eligible**, which were **redeemed on receipt**, the actual spent amount, remaining budget and future reward credits *separately*. Future Fuel Saver credit is not cash discount on this trip.

## Present-day baseline and roadmap distinction

At acceptance of v0.9 (October 2026), the static PWA offers lottery, weekly menu, name-based pantry, grocery checkmarks and some documented household shopping templates. The published recipe-links registry is empty, and the app does not yet serve a complete recipe cooking interface. Price integrations, coupon finder, coupon/member wallets and receipts are future work. **Recheck GitHub before planning: this baseline will become stale.**

The current Cooking Vault source-recovery initiative may run alongside product work, but a green source-mapping test is not proof a cookable recipe was published.

## Milestone acceptance: ordered by user value

| Milestone | User-visible definition of done |
| --- | --- |
| M1: Recipe linking | A lottery winner opens the intended reviewed recipe version; unresolved meals show no fake instructions |
| M2: Cooking view | Complete ordered steps and ingredient amounts visible on Android, method/source status clear |
| M3: Shared ingredient contract | Recipe view and grocery list reference the same selected version; no mismatched amounts |
| M4: Secure coupon/member wallet | User-approved private storage and tested offline handling of saved items; no leaked card data |
| M5: Verified local offer engine | Current source-specific offers and eligibility matched to groceries; stale/missing data disclosed |
| M6: Shopping optimization | Supported basket costs and discounts with one-stop vs multi-stop tradeoff |
| M7: Receipts and rewards | Source-traceable planned vs actual savings, no double-counted rewards |

## App and household constraints

- Lottery IDs are stable #1–84, not recipe source indexes. Some cookbooks have different indices for the same name.
- Store comparison starts with relevant options around Indianola / greater Des Moines (Hy-Vee, Fareway, ALDI, Walmart, Cash Saver), but *availability and benefits are verified per store*.
- A household mushroom avoidance or raw-tomato preference is a planning/adaptation preference, not a license to alter archived originals.
- $125 is a configurable target, not a guarantee.
- Small-phone usability, full keyboard labels, screen-reader status updates and reliable offline behavior matter at every milestone.
- Repository is public; no data from private connectors or member accounts may appear in public source by default.

## Not in scope without separate approval

- Automatic coupon clipping/redemption or retailer account mutation.
- Scraping signed-in member pages, bypassing store rules, or credential storage in localStorage.
- Transcribing locked source recipes to public files without explicit publication authorization.
- Fictitious checkout costs, discount stacking, five-person yields or recipe-specific methods.

**Product acceptance is user-visible:** deploy and verify the feature on the family's Android device after CI, not merely create folders and model contracts.
