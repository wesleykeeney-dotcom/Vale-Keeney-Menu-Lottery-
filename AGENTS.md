# AGENTS.md — Vale-Keeney Master Application Development Directive v1.1

**Authority:** Governing development instruction for this repository and any coding assistant, including Codex and ChatGPT. Apply to every future implementation and review. This directive controls application development; **it does not override the private Cooking Vault's governing recipe canon**, user-approved recipes, or access restrictions. Where requirements conflict, stop and request a specific decision. Do not quietly reinterpret the recipe or change established lottery numbering.

**Product:** The Vale-Keeney Guide to Cooking with Chaos — Interactive Cookbook, Menu Lottery & Savings Hub.  
**Public repository:** wesleykeeney-dotcom/Vale-Keeney-Menu-Lottery-  
**Private recipe source of truth:** Vale-Keeney Cooking Vault (separate repository).  
**Stack:** Static HTML/CSS/JavaScript PWA, GitHub Pages, GitHub Actions, Android-first verification.  
**Planning context:** Five dinners plus two flex nights; configurable starting grocery budget $125; local grocery comparisons centered on Indianola/Des Moines, Iowa.

## 1. Product mission and required user journey

The lottery is the *entry point*, not the whole product. Build an integrated family app that can:

**Choose dinner → Reveal the winning meal → Open its reviewed recipe → Follow documented instructions → Check pantry → Generate groceries → Find eligible coupons/deals → Apply available membership benefits → Compare realistic shopping plans → Cook.**

Every feature must advance that flow, data integrity, security, accessibility, or reliability. Do not replace it with unrelated optimizations.

Core destinations: **Lottery**, **This Week**, **Recipe Library / View Recipe**, **Guided Cooking**, **Groceries**, **Pantry**, **Coupons**, **Memberships & Rewards**, and **Savings/Store Comparison**. Destinations that have not been implemented must not pretend to work.

## 2. Non-negotiable recipe provenance and source fidelity

- The private Cooking Vault governs recipe identity, ingredient quantities, methods, source provenance, verification status, original formulations, and locked family recipes.
- Never invent missing ingredients, substitutions, preparation steps, times, temperatures, yields, portions, or nutritional information. Unknown stays unknown and is shown as incomplete.
- Maintain distinct records for **source-faithful original**, **approved household adaptation**, and **unverified/recovered draft**. Similar names do not establish identical recipes; do not silently promote a variant.
- Protect the original source, even when it contains ingredients the household avoids. A mushroom-free variation is a *separate*, approved recipe, never a covert edit of the original. No required raw tomatoes in the household version without express approval.
- A shopping template alone does not establish a complete cookable recipe. A partial recipe remains explicitly incomplete and must not be scored "cook-ready."
- Preserve all **84 immutable dinner lottery positions** and legacy storage formats. Do not renumber original IDs or infer a recipe link from a title match.
- Public GitHub and browser bundles must **not** receive private Cooking Vault files, unapproved source transcription, private links, membership credentials, or personal account identifiers. Export only reviewed, approved-for-publication data; a browser app must not query the private repo with tokens.

## 3. One reviewed recipe version across the app

Design an explicit recipe publication / linkage model. The lottery winner, saved weekly menu, ingredient requirements, meal view, and cooking mode must reference the **same reviewed recipe version**. The recipe panel must display:
- Stable recipe ID, lottery ID where applicable, title and version (original/household), provenance and verification/completeness labels.
- Documented ingredients with quantity, unit and optionality; documented ordered instructions; times and yield only when established.
- Missing data and approvals needed, instead of plausible filler.

Guided Cooking presents the *documented* sequence without reorganizing, making up steps or showing invented timers. If the method is incomplete, show an explicit limitation rather than generating instructions.

## 4. Pantry, groceries and household scope

- Derive shopping requirements from the reviewed recipe version and weekly menu; preserve quantities and per-recipe contributions when consolidating duplicate items.
- Keep **on hand**, **still to buy**, and **checked off** as separate counts. Persist changes; do not lose focus/scroll on checkbox updates.
- Treat pantry checkmarks as **name-only availability**, *not* proof that required amounts or package sizes are available.
- Maintain clear full / partial / unmapped shopping coverage. Partial and unmapped meals must not imply the list is complete.
- Do not scale a recipe to five people without a documented or approved yield. Do not claim the $125 weekly target is achievable without verified prices.
- Maintain current localStorage compatibility unless a tested, migration-safe change has been separately approved.

## 5. Coupon discovery and digital coupon wallet

Coupons must be matched against **actual needed grocery items** and current store context, not generic advertised discounts. Supported discovery targets include retailer digital offers, manufacturer coupons, membership offers, basket offers, and validated cashback where a source supports them.

Each stored coupon/offer should identify retailer and eligible locations, product and package eligibility, discount value, conditions/limits, quantity thresholds, membership requirement, effective dates, expiration, source, last verified time, and its state (**discovered, saved, clipped if confirmed, redeemed, expired, unverified**). Where supplied, retain codes/images/barcodes privately.

Never fabricate a coupon or claim one is clipped, redeemable, stacked, or accepted without confirming the action and retailer rules. Saved screenshots and manually entered offers do not prove current validity. Offer manual import/links where live retailer integrations cannot be verified. Do not scrape behind logins or bypass restrictions.

## 6. Memberships, loyalty and rewards wallet

Allow the family to opt into storing retailer programs, program nicknames, eligible tiers/benefits, renewal dates and scannable membership references **only through appropriately protected storage**. Example candidate programs include Hy-Vee PERKS / Fuel Saver and membership offers at participating grocery retailers; verify actual current programs before representing them as connected benefits.

**Security rule:** passwords, card security codes, recovery secrets and payment credentials are never stored. Membership identifiers, personal coupons/barcodes, receipts and rewards balances are not committed to GitHub or embedded in public bundles. Browser localStorage is **not** a secure credential vault. A production wallet needs an explicit threat model, privacy architecture (e.g. device-protected encrypted storage or an authenticated protected service), privacy review and opt-in. IndexedDB by itself does not provide encryption.

An offline coupon/member card experience is a desired feature, contingent on secure device storage and data minimization; do not promise private offline credential storage before implementing it safely.

## 7. Verified deal finder and realistic store comparison

Compare eligible unit/package sizes and applicable retailer prices across relevant local options (initial candidates: Hy-Vee, Fareway, ALDI, Walmart, Cash Saver; add stores only when grounded). Distinguish branch-specific prices, verified sales dates, tax/deposit assumptions, coupon limitations, loyalty pricing, availability, and uncertain inputs.

Calculate only **compatible, eligible** discounts. Never assume coupon stacking; distinguish advertised potential savings from confirmed checkout savings. Do not deduct future Fuel Saver/loyalty credit from today's grocery total; show earned and redeemed rewards separately.

Optimize **total practical basket cost**, considering realistic one-store convenience against multi-store travel time and fuel; do not assert cost savings based on individual product prices alone. Missing prices must remain unknown, not invented.

## 8. Receipts and budget reconciliation

Compare planned basket estimate, verified discounts, actual checkout total, earned vs redeemed rewards, and configurable weekly target. Receipt import must highlight uncertain extracted items for review. Do not double-count cashbacks, member discounts or rebates, and do not call estimates realized savings.

## 9. Integrations and security

- A retailer, account or coupon API is **not integrated** until its supported permissions, endpoints, authentication, and success/error paths are verified.
- Require permission before connecting accounts, storing sensitive data or performing mutations such as clipping/redeeming offers.
- Never use access tokens in browser source, a public repo, logs, GitHub Pages assets or exported household files.
- Prefer accurate manual workflows over simulated connectivity; mark stale prices/coupons with timestamps.
- Require access controls and data-handling review before any member barcode, coupon media, reward balance or receipt sync/cloud storage.

## 10. Development method, tests and release protection

For each task: **inspect current state → identify source and user intent → list risks/dependencies → set acceptance criteria → implement smallest coherent change → run syntax/unit/integration/regression/continuity QA → report results and unresolved blockers → open a PR for review**.

Protect lottery ID continuity, original/household separation, partial-data handling, pantry and grocery arithmetic, saved menu compatibility, offline PWA updates, mobile usability, and privacy. Coupon tests must address expired/duplicate/incompatible coupons, quantity thresholds, membership eligibility, package mismatch, offline access and unsupported integrations.

**Never silently merge, deploy, or claim acceptance.** Feature branch + PR, passing Actions, explicit approval for production merge, successful Pages deployment, and Android acceptance are distinct release gates. A docs-only PR needs repository review but no new service-worker cache unless it changes client-served assets.

Do not declare anything **verified, connected, clipped, discounted, exported, merged, deployed, or accepted** without checking the relevant evidence.

## 11. Roadmap priority (may overlap where safe)

1. Link lottery winners to reviewed recipe versions; build **View Recipe**.
2. Display source-supported ingredients, instructions, method-completeness warnings, then Guided Cooking.
3. Make recipe card, pantry and grocery engine share one publication/data contract; expand audited recipe coverage.
4. Secure, user-controlled coupon wallet and memberships/rewards wallet architecture, with offline access where safely supported.
5. Verify retailer coupon/deal sources, then coupon/product matching and eligibility.
6. Compare one-stop vs multi-store shopping cost; add budget and receipt/rewards reconciliation.
7. Expand quantities, source verification and optional features without compromising the earlier gates.

## 12. Required development report

Report **implementation baseline, intended change, sources/evidence, files modified, tests and results, privacy/access risks, incomplete dependencies, PR/deployment state, Android acceptance needed, and next action**. Do not confuse a draft, green test, live release, and phone verification.

## Companion documents

- [Product vision and user journeys](docs/PRODUCT_VISION.md)
- [Recipe / coupon / shopping / membership data contract](docs/RECIPE_DATA_CONTRACT.md)
- [Release gates and test matrix](docs/RELEASE_GATES.md)

**Governing principle:** We are building a trustworthy family cookbook **and** practical shopping companion. It must answer: *What are we cooking? How do we make it? What do we need? What do we have? Where should we shop? Which discounts can we use? What will it really cost?*

## External developer documentation — Context7 and OpenAI Developers

These integrations are **implementation references, not repository authority**.

### Context7
Use Context7 when implementation depends on a third-party library, framework, SDK, package, or tool whose current API may differ from model knowledge.

- Resolve the exact library/package identity before querying documentation.
- Prefer documentation that matches the repository's pinned or declared version when one exists.
- Query the narrow concept needed for the current task instead of pulling unrelated documentation.
- Use retrieved documentation to improve code accuracy, tests, migration choices, and API usage.
- Do **not** send secrets, credentials, private customer data, private source material, or proprietary repository content in documentation queries.

### OpenAI Developers
Use OpenAI Developers when work depends on current OpenAI platform behavior or recommended implementation patterns, including OpenAI APIs, SDKs, agent/tool architecture, model integration, evals, structured outputs, streaming, safety, or related platform features.

- Prefer current official OpenAI developer guidance over remembered API behavior.
- Verify model/API/SDK assumptions before introducing or changing OpenAI-dependent code.
- Treat examples as implementation guidance, not as permission to change repository policy, product requirements, data authority, or safety boundaries.

### Authority and conflict rule
External developer documentation may explain **how to implement** something. It does not decide **what this repository should mean or permit**.

The following always outrank Context7/OpenAI Developers guidance when they govern the task:
1. explicit user decisions and approvals;
2. this repository's `AGENTS.md` and other governing directives;
3. repository source-of-truth data and locked/approved content;
4. project schemas, tests, security/privacy rules, and release gates.

If external documentation conflicts with a repository rule, **stop and report the conflict rather than silently changing the repository rule**.

### Efficient-use rule
Do not query either integration mechanically for every task. Use them when current external technical knowledge materially affects correctness. For simple repository-local edits, existing code/tests/governance may be sufficient.

When external documentation materially influences a code change, note the relevant library/platform topic in the implementation or PR report so the technical basis is auditable.

### Availability fallback
If Context7 or OpenAI Developers is unavailable in a particular Codex/runtime environment, use the relevant official documentation through an approved research path and clearly state that fallback. Never replace missing documentation with invented API behavior.

