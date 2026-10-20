# First Full-Recipe Candidate — Taco Casserole Source Review

**Status:** SOURCE REVIEW OPEN — NOT APPROVED FOR PUBLICATION  
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

These details may represent a recovered manuscript rendition, but **without comparing the governing original screenshot**, they must not be silently promoted into a purported exact original transcription. This review does not overwrite the private Vault record and does not publish the recovered full method in the app.

## Required decisions before a cookable public release

1. Identify and review the original historical Taco Casserole screenshot if available; record ingredient, oven and method comparisons, and document discrepancies.
2. Decide whether the publishable candidate is (a) a **source-verified original**, only when checked against the image, or (b) a **separately labeled household manuscript version**, explicitly approved as an adaptation; do not mislabel one as the other.
3. Obtain **explicit approval to distribute the selected version's full ingredients and cooking instructions on public GitHub Pages**. Permission to inspect sources or develop UI does not in itself authorize publication.
4. Establish the stable published `recipeId`, `recipeVersionId`, `publicationId`, approved `lotteryIds:[5]`, source/completeness statuses and exact ingredient quantities.
5. Put all displayed recipe ingredient requirements and grocery/pantry purchase rows on that **same published recipe version**. Treat water as a declared kitchen supply, not a hidden alteration. Keep missing yield null.
6. Add source- and quantity-specific test fixtures, run CI, obtain approval to merge, verify GitHub Pages, and complete Android cooking+shopping acceptance.

## Engineering preparation completed on recipe-viewer branch

A shared recipe-publication resolver and derived shopping rows now allow future approved recipe publications to **replace**, rather than compete with, a legacy household template for the same lottery number. Required rows are created from the same ingredient names and quantities the recipe card displays. Optional/supply-only ingredients are excluded from automatic purchases but remain documented on the recipe card. Tests use **synthetic fixtures only**. The actual public publication and link registries remain empty.

**This document is an audit summary and approval checklist, not an approved recipe method or permission to publish one.**
