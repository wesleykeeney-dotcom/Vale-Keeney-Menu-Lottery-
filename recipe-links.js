'use strict';
// Catalog linkage is deliberately opt-in. A title match does not establish a verified source recipe.
// Populate only after a Cooking Vault record has been reviewed and approved.
const RECIPE_LINKS=Object.freeze({});
function recipeLinkFor(id){return Object.prototype.hasOwnProperty.call(RECIPE_LINKS,id)?RECIPE_LINKS[id]:null}
