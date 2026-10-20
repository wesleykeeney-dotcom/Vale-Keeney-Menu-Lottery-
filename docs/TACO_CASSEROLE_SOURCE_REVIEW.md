# First Full-Recipe Candidate — Taco Casserole Source Review

**Status:** HOUSEHOLD MANUSCRIPT VERSION APPROVED FOR PUBLIC-WEB PUBLICATION; ORIGINAL IMAGE VERIFICATION REMAINS OPEN  
**Date:** 2026-10-19  
**Lot​​tery choice:** #6 (zero-based ID 5), "Taco Casserole"  
**Private Vault identity:** VK-DIN-TACO-CASSEROLE-001  
**Kitchen Test manuscript:** Recipe 109 of 161, legacy catalog #160.

The three numbers above identify different numbering systems; the stable 84-item lottery must not be renumbered based on the manuscript.

## Sources inspected

1. **Private Cooking Vault** record `data/recipes/vk-din-taco-casserole-001.json`, current `main` at review time.
2. **The Vale-Keeney Guide to Cooking with Chaos — Kitchen Test Draft 01**, manuscript entry **#109 Taco Casserole**; marked as an archived collection entry **pending final source-faithful replacement**.
3. **Public Menu Lottery** `grocery.js` full household shopping template ID 5, previously reviewed as a *planning list*, not a licensed original cooking recipe.
4. Supplied historic screenshots present in the current working collection were inspected at a contact-sheet level, but **the governing original Taco Casserole source screenshot was not positively identified and independently checked**. Do not claim source-image verification.

## Reconciled ingredient facts

The private record and recovered manuscript agree on **ten ingredient lines**: ground beef (2 lb), taco seasoning (2 packets), water (½ cup), black beans (15 oz can), Rotel (14.5 oz specified), chunky salsa (1½ cups), Mexican cheese blend (2 cups), tortilla chips (4 cups), sour cream (1 cup) and two green onions.

The existing public household grocery template contains **nine purchase categories**, omitting the ½ cup water as a kitchen supply. This is a shopping convention **not** a change to the recipe. The app's "Salsa" is less specific than the recovered "**chunky salsa**"; the app's product labels use shopper-friendly "Shredded Mexican-blend cheese", "Rotel diced tomatoes and chilies", etc. Preserve original ingredient identity separately from product/package matching.

**Open packaging issue:** The manuscript/Vault says "**1 (14.5 oz) can Rotel**" but no store product/can size is independently verified. The current grocery display says "**14.5 oz total (check can size)**". Never silently substitute a guessed can size or count. Verified products may later define how many packages to buy without changing the source quantity.

**Open portion issue:** The Vault's `yield` is null. Do not invent a serving count or assume the amounts feed five people.

## Recovered method comparison

The Vault describes three high-level steps (brown/season beef; combine and layer with beans, Rotel, salsa, chips and cheese; bake, then finish with sour cream/green onions). The kitchen-test manuscript includes **an oven setting of 375°F and approximately 20 minutes baking**. The structured Vault method **does not contain those oven/time values**.

The owner **explicitly approved publication of the recovered household manuscript version, including cooking instructions, to the public app**. The 375°F and approximately 20-minute bake are preserved as **manuscript instructions**, not certified historical-original text. The private Vault original is not modified and the original image remains unverified.

## Approved household publication (separate from the original)

- **Owner authorization:** explicit confirmation to publish the recovered Taco Casserole household manuscript formulation, including method, in the public Vale-Keeney Menu Lottery. **This does not approve an unverified original as source-faithful.**
- **Underlying private source identity:** `VK-DIN-TACO-CASSEROLE-001`; no edits made to that protected record.
- **Household recipe version:** `VK-HH-TACO-CASSEROLE-MANUSCRIPT-001`; distinct from the archived original.
- **Public publication ID:** `vk-pub-taco-casserole-manuscript-001`, authorized as `approved-for-public-web` for lottery ID **5** (visible #6).
- **Source disclosure:** "Recovered Kitchen Test Draft recipe #109 (legacy #160). The historical original screenshot has NOT been independently verified."
- **Ingredients and method:** ten manuscript ingredients and three ordered manuscript method steps, including 375°F and about 20 minutes.
- **Water:** source-required ingredient, ½ cup, shown on recipe; marked `supplyOnly` for grocery checklist.
- **Shopping:** nine required purchase items generated from the *same recipe version* as the card, replacing an older household-planning estimate where names or quantities differ.
- **Yield:** undocumented. No five-serving claim, no automatic scaling.
- **Optional chip note:** original manuscript's crisp-chip suggestion presented as a tip, not a fourth required step.
- **Packaging caution:** the manuscript specifies a 14.5 oz can of Rotel; the shopper must check actual packages. No assumption of exact product availability or equivalent can size.

## Remaining original-source QA and release gates

1. Recover and independently compare the governing historical Taco Casserole screenshot before labeling **the original** source verified. The household manuscript version may remain labeled recovered meanwhile.
2. Preserve the original vs household manuscript distinction; do not silently replace the Vault method or change oven temperature/timing in the source record.
3. Confirm new recipe labels in Pantry, because previously stored generic "Salsa" and "Rotel diced tomatoes and chilies" entries are **not automatically considered equivalent** to "Chunky salsa" and "Rotel". Pantry data is retained, but users should review it.
4. PR CI, separate explicit **merge/release approval**, successful GitHub Pages deployment and Android testing must all pass before calling the new recipe feature a live accepted release.
5. Coordinate release order with the separate unfinished ingredient-recovery PR #12, which uses a different cache version.

**This document records a specific public HOUSEHOLD manuscript publication approval, not verification of the original historical image or permission to release other archived recipes.**
