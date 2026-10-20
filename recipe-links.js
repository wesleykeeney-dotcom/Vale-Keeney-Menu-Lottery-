'use strict';
// Catalog linkage is deliberately opt-in. A title match does not establish a verified source recipe.
// Populate only after a Cooking Vault record has been reviewed and approved.
const RECIPE_LINKS=Object.freeze({
 // Lottery #6, distinct approved HOUSEHOLD MANUSCRIPT variant (not the unverified original).
 5:Object.freeze({
  publicationId:'vk-pub-taco-casserole-manuscript-001',
  recipeVersionId:'VK-HH-TACO-CASSEROLE-MANUSCRIPT-001'
 })
});
function recipeLinkFor(id){return Object.prototype.hasOwnProperty.call(RECIPE_LINKS,id)?RECIPE_LINKS[id]:null}
