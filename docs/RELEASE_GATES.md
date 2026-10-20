# Release Gates & QA Matrix — Vale-Keeney App

Applies to all work under [Master Directive v1.1](../AGENTS.md). These are requirements for future development, **not** a claim that every listed feature is already implemented or automatically tested.

## Gate 0 — Scope, evidence and authorization

Before implementation:
1. Read AGENTS.md, PRODUCT_VISION.md, RECIPE_DATA_CONTRACT.md, current repository status and active PRs.
2. State exact user goal, files/modules affected, existing behavior, data dependencies, privacy exposure and outstanding decisions.
3. For recipes, identify the precise Vault recipe/version and whether publication is authorized. Original/source-faithful and approved household variants must remain separate.
4. For pricing/coupons/loyalty, identify the retailer data source, branch/time applicability, account permissions and eligibility rules.
5. Establish observable acceptance tests and migration/rollback plan where data formats or storage change.
6. If original ingredients, retailer access or household substitutions are unconfirmed, mark the scope blocked/partial rather than make assumptions.

## Gate 1 — Implementation on an isolated branch

- Branch from the current reviewed main commit; check concurrent PRs. Do not overwrite live app or a separate open feature PR.
- Make minimal maintainable changes; add data only when evidence/source requirements are satisfied.
- Maintain 84 numbered choices, current persisted IDs and existing pantry/grocery workflow.
- Do not copy protected private Vault records, receipts, cards, coupons or secrets to public GitHub. Treat localStorage as nonsecure.
- For changed public PWA assets, update the service-worker cache to ensure client updates. **No cache increment required for docs-only changes.**
- Plan and check accessible mobile UI, loading, errors, empty states and stale/offline data.

## Gate 2 — Automated verification (GitHub Actions)

Run JavaScript syntax checks and the full Node test suite, plus feature-specific tests. The existing command is:

    node --test tests/*.test.cjs

Minimum regression coverage:

| Domain | Required protections |
| --- | --- |
| Lottery | 84 immutable positions and saved/locked/weekly state |
| Recipes | Correct lottery ID ↔ reviewed recipeVersionId, source/household isolation, complete vs partial, no invented method |
| Cooking | Documented step order, temperatures, yields and timers; incomplete recipes blocked from cook-ready |
| Pantry / groceries | Correct requirement amounts, checked vs pantry vs remaining counts, manual items, partial warnings, persistence |
| Offline PWA | Cache version and offline reload, no regressions on supported Android browser |
| Coupons | Source and last-checked time, expirations, quantity/size limits, duplicate and stacking exclusions, unverified state |
| Memberships | Permissions, missing/expired eligibility, private card storage, no leaked credentials, verified vs user-entered rewards |
| Prices / savings | Eligible package matching, missing prices, tax/fees disclosure, one-stop vs multi-store evidence, future rewards separate |
| Receipts | Review of uncertain extractions, spent vs projected, double-count prevention |
| Security / privacy | No secrets/private URLs or personal barcodes in repo/public bundles/logs; access controls tested |
| Data compatibility | No loss of existing localStorage values, migrations covered |
| Accessibility | Controls remain usable by touch and keyboard, status messages correctly announced |

A **green CI run** is evidence of automated tests only, not proof of an approved or deployed feature. An architecture document alone is not a shipped feature.

## Gate 3 — Review and explicit merge approval

Open a PR with:
- Feature motivation, scope and known limitations.
- Provenance/evidence references without leaking sensitive/private sources.
- Files changed, migration/compatibility details, risk assessment, test command/output, manual acceptance steps.
- Disclosure of incomplete recipes, stale prices, unsupported retailer API functionality and inaccessible private data.
- Screenshots/test data that contain **no** private family identifiers, coupon barcodes or membership numbers.

Do not merge because a PR is green, because the user gave a general "continue" for unrelated development, or because an external job happened to start. Merge only after the user clearly authorizes that release/change. If GitHub independently reports the PR merged, confirm the actual state and continue with deployment QA without claiming credit for it.

Documentation PRs are still reviewed; avoid bypassing the gate simply because no JavaScript changed.

## Gate 4 — Deployment verification

After authorized merge:
- Verify the new commit is present on main.
- Check the post-merge GitHub Actions run and **GitHub Pages deployment** conclusion.
- Confirm client cache is correct for any changed served asset.
- Never say a PR is published just because tests passed. Preserve/identify last accepted release if deployment failed or is pending.
- Maintain a rollback strategy for faulty feature releases, particularly data migrations.

## Gate 5 — Android user acceptance

Ask the user to test on actual phone:
- Initial refresh only when updating cache, then immediate interaction.
- Lottery winner opens the intended reviewed recipe (when feature exists).
- Recipe ingredients, method and selected version agree with generated groceries.
- Weekly menu, pantry state, shopping checkmarks and counts persist after reload.
- Full vs partial vs unmapped states and unknown yields are visible.
- Any wallet UI only displays *authorized stored coupons* and does not expose private barcodes to screenshots/public diagnostics.
- A verified retailer offer includes merchant, dates, membership/product constraints and an evidence timestamp.
- No coupon clipping, checkout discount or loyalty balance is marked confirmed without direct evidence.
- Offline handling returns saved nonsecret data, labels stale offers, and does not promise online redemption without connectivity.

Only after these checks can the release be described as **accepted on Android**. The user can report partial or failed results; keep those as open issues.

## Gate 6 — Post-release learning

Record accepted production commit/cache, main user-visible outcomes, test count, limits, and next priority. The next batch of work should start from actual validated user needs and source gaps; don't inflate progress by counting incomplete source records as cookable recipes or unverified offers as real savings.

## Development report template

**Current baseline:** accepted production version, branch and active PR conflicts.  
**Change:** purpose and scope.  
**Evidence:** exact recipe/offer/account basis and statuses.  
**Compatibility/privacy:** data keys, source boundaries, secrets, offline handling.  
**Files/tests:** changed paths, test run URL and pass/fail counts.  
**Outstanding:** missing instructions/quantities, unsupported integrations, sources needing verification.  
**Release:** PR draft/open/merged, deployed or not, phone test pending/passed.  
**Next gate:** the specific user confirmation or source data needed.

## Urgent stop conditions

Stop publication and request a decision when:
- A locked source recipe would be altered, a variant silently substituted, or unverified method implied to be cook-ready.
- A discount calculation requires unverified stacking or an account benefit not confirmed.
- A private member identifier, coupon barcode, receipt, API token or source archive appears destined for a public repo/bundle.
- A proposed rollout would corrupt older local saved menus, groceries or pantry data without a tested migration.
- CI fails; a PR merges unexpectedly; or deployment result cannot be verified.
