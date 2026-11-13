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
 83:Object.freeze({publicationId:'vk-pub-foodwars-boeuf-bourguignon-vault-001',recipeVersionId:'VK-POP-FOODWARS-BOEUF-001'})
});
function recipeLinkFor(id){return Object.prototype.hasOwnProperty.call(RECIPE_LINKS,id)?RECIPE_LINKS[id]:null}
