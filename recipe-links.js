'use strict';
// Catalog linkage is deliberately opt-in. A title match does not establish a verified source recipe.
// Populate only after a Cooking Vault record has been reviewed and approved.
const RECIPE_LINKS=Object.freeze({
 // Lottery #1: owner-approved household breakfast taco text from the Oct 19–25 weekly packet.
 0:Object.freeze({
  publicationId:'vk-pub-breakfast-tacos-household-001',
  recipeVersionId:'VK-HH-BREAKFAST-TACOS-001'
 }),
 // Lottery #2: separate household weeknight adaptation of the archived pasta-bake ingredients.
 1:Object.freeze({
  publicationId:'vk-pub-chicken-bacon-ranch-weeknight-001',
  recipeVersionId:'VK-HH-CHICKEN-BACON-RANCH-PASTABAKE-001'
 }),
 // Lottery #17: owner-approved convenience formulation, not the unverified saved original.
 16:Object.freeze({
  publicationId:'vk-pub-slow-cooker-chicken-gravy-convenience-001',
  recipeVersionId:'VK-HH-SLOW-COOKER-CHICKEN-GRAVY-001'
 }),
 // Lottery #4: owner-approved household manuscript, original image not verified.
 3:Object.freeze({
  publicationId:'vk-pub-pepperoni-pizza-grilled-cheese-manuscript-001',
  recipeVersionId:'VK-HH-PIZZAGRILLEDCHEESE-MANUSCRIPT-001'
 }),
 // Lottery #6, distinct approved HOUSEHOLD MANUSCRIPT variant (not the unverified original).
 5:Object.freeze({
  publicationId:'vk-pub-taco-casserole-manuscript-001',
  recipeVersionId:'VK-HH-TACO-CASSEROLE-MANUSCRIPT-001'
 }),
 // Lottery #81: exact source-verified Vault original, owner-approved for grocery sync.
 80:Object.freeze({publicationId:'vk-pub-foodwars-gotcha-pork-vault-001',recipeVersionId:'VK-POP-FOODWARS-GOTCHAPORK-001'}),
 // Lottery #82: exact source-verified Vault original, owner-approved for grocery sync.
 81:Object.freeze({publicationId:'vk-pub-foodwars-furikake-vault-001',recipeVersionId:'VK-POP-FOODWARS-FURIKAKE-001'}),
 // Lottery #83: exact source-verified Vault original, owner-approved for grocery sync.
 82:Object.freeze({publicationId:'vk-pub-foodwars-rainbow-terrine-vault-001',recipeVersionId:'VK-POP-FOODWARS-RAINBOWTERRINE-001'}),
 // Lottery #84: exact source-verified Vault original, owner-approved for grocery sync.
 83:Object.freeze({publicationId:'vk-pub-foodwars-boeuf-bourguignon-vault-001',recipeVersionId:'VK-POP-FOODWARS-BOEUF-001'}),
 // Lottery #11: owner-approved cookbook formulation; unspecified quantities remain explicit.
 10:Object.freeze({publicationId:'vk-pub-breakfast-for-dinner-master-cookbook-001',recipeVersionId:'VK-HH-BREAKFAST-FOR-DINNER-MASTER-COOKBOOK-001'}),
 // Lottery #15: owner-approved cookbook formulation; grocery quantities remain incomplete where undocumented.
 14:Object.freeze({publicationId:'vk-pub-loaded-baked-potato-bar-master-cookbook-001',recipeVersionId:'VK-HH-LOADED-BAKED-POTATO-BAR-MASTER-COOKBOOK-001'}),
 // Lottery #85–100: owner-approved source/version publications.
 84:Object.freeze({publicationId:"vk-pub-lottery-100-vk-din-cheesesteakhelper-001",recipeVersionId:"VK-DIN-CHEESESTEAKHELPER-001"}),
 85:Object.freeze({publicationId:"vk-pub-lottery-100-vk-din-maplesoysalmon-001",recipeVersionId:"VK-DIN-MAPLESOYSALMON-001"}),
 86:Object.freeze({publicationId:"vk-pub-lottery-100-vk-fam-airfryer-nuggets-001",recipeVersionId:"VK-FAM-AIRFRYER-NUGGETS-001"}),
 87:Object.freeze({publicationId:"vk-pub-lottery-100-wesleys-booyah-docx-2026",recipeVersionId:"VK-HH-BOOYAH-REVISED-2026-11-15"}),
 88:Object.freeze({publicationId:"vk-pub-lottery-100-wesleys-kentucky-burgoo-docx-2026",recipeVersionId:"VK-HH-KENTUCKY-BURGOO-REVISED-2026-11-15"}),
 89:Object.freeze({publicationId:"vk-pub-lottery-100-vk-fam-gumbo-001",recipeVersionId:"VK-FAM-GUMBO-001"}),
 90:Object.freeze({publicationId:"vk-pub-lottery-100-vk-fam-porkrind-chickenparm-001",recipeVersionId:"VK-FAM-PORKRIND-CHICKENPARM-001"}),
 91:Object.freeze({publicationId:"vk-pub-lottery-100-vk-fam-tennessee-bourguignon-001",recipeVersionId:"VK-FAM-TENNESSEE-BOURGUIGNON-001"}),
 92:Object.freeze({publicationId:"vk-pub-lottery-100-black-butler-curry-buns-wesley-explains",recipeVersionId:"VK-HH-BLACK-BUTLER-CURRY-BUNS-EXPLAINER-001"}),
 93:Object.freeze({publicationId:"vk-pub-lottery-100-vk-din-countryfriedpork-001",recipeVersionId:"VK-DIN-COUNTRYFRIEDPORK-001"}),
 94:Object.freeze({publicationId:"vk-pub-lottery-100-vk-din-creamycheesechickentortillas-001",recipeVersionId:"VK-DIN-CREAMYCHEESECHICKENTORTILLAS-001"}),
 95:Object.freeze({publicationId:"vk-pub-lottery-100-vk-din-garlicparm-pastabake-001",recipeVersionId:"VK-DIN-GARLICPARM-PASTABAKE-001"}),
 96:Object.freeze({publicationId:"vk-pub-lottery-100-vk-din-garlicparm-eggyolksoup-001",recipeVersionId:"VK-DIN-GARLICPARM-EGGYOLKSOUP-001"}),
 97:Object.freeze({publicationId:"vk-pub-lottery-100-vk-din-hauntedbourbonsteak-001",recipeVersionId:"VK-DIN-HAUNTEDBOURBONSTEAK-001"}),
 98:Object.freeze({publicationId:"vk-pub-lottery-100-vk-din-honeypepperchickenmac-001",recipeVersionId:"VK-DIN-HONEYPEPPERCHICKENMAC-001"}),
 99:Object.freeze({publicationId:"vk-pub-lottery-100-vk-din-macmeatloaf-001",recipeVersionId:"VK-DIN-MACMEATLOAF-001"})
 // Screenshot-backed versions mapped to their matching dinner category; titles remain explicit.
 22:Object.freeze({publicationId:'vk-pub-cajun-chicken-alfredo-screenshot-001',recipeVersionId:'VK-HH-SLOW-COOKER-CAJUN-CHICKEN-ALFREDO-SCREENSHOT-2026-11-17'}),
 40:Object.freeze({publicationId:'vk-pub-beef-tips-noodles-screenshot-001',recipeVersionId:'VK-HH-CROCKPOT-BEEF-TIPS-NOODLES-SCREENSHOT-2026-11-17'}),
 51:Object.freeze({publicationId:'vk-pub-bbq-bacon-cheeseburger-casserole-screenshot-001',recipeVersionId:'VK-HH-BBQ-BACON-CHEESEBURGER-CASSEROLE-SCREENSHOT-2026-11-17'}),
 76:Object.freeze({publicationId:'vk-pub-breakfast-sliders-screenshot-001',recipeVersionId:'VK-HH-SAUSAGE-EGG-CHEESE-BREAKFAST-SLIDERS-SCREENSHOT-2026-11-17'}),
});
function recipeLinkFor(id){return Object.prototype.hasOwnProperty.call(RECIPE_LINKS,id)?RECIPE_LINKS[id]:null}
