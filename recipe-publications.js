'use strict';
// Public recipe publication registry. Remains empty until a specific source version
// receives explicit owner approval for public web distribution.
const RECIPE_PUBLICATIONS=Object.freeze({
 'vk-pub-taco-casserole-manuscript-001':Object.freeze({
  publicationId:'vk-pub-taco-casserole-manuscript-001',
  recipeId:'VK-DIN-TACO-CASSEROLE-001',
  recipeVersionId:'VK-HH-TACO-CASSEROLE-MANUSCRIPT-001',
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[5],
  title:'Taco Casserole',
  versionType:'approved household manuscript (not source-verified original)',
  sourceStatus:'Recovered Kitchen Test Draft recipe #109 (legacy #160). The historical original screenshot has NOT been independently verified.',
  ingredientStatus:'complete',
  methodStatus:'complete',
  householdSubstitutionsResolved:true,
  // No serving count is documented in the recovered manuscript or Vault.
  yieldText:null,
  ingredients:Object.freeze([
   {name:'Ground beef',amount:'2 lb',department:'Meat'},
   {name:'Taco seasoning',amount:'2 packets',department:'Seasonings'},
   {name:'Water',amount:'1/2 cup',supplyOnly:true},
   {name:'Black beans',amount:'1 (15 oz) can',department:'Canned & Jarred',preparation:'drained'},
   {name:'Rotel',amount:'1 (14.5 oz) can',department:'Canned & Jarred'},
   {name:'Chunky salsa',amount:'1 1/2 cups',department:'Canned & Jarred'},
   {name:'Mexican cheese blend',amount:'2 cups',department:'Dairy'},
   {name:'Tortilla chips',amount:'4 cups',department:'Snacks'},
   {name:'Sour cream',amount:'1 cup',department:'Dairy'},
   {name:'Green onions',amount:'2',department:'Produce',preparation:'thinly sliced'}
  ]),
  // Ordered source-supported manuscript method, separately adopted as a household
  // version. Do not silently edit private original or infer missing yield.
  steps:Object.freeze([
   'Heat oven to 375°F. Brown the beef and drain excess fat. Add taco seasoning and water; simmer until the meat is actually seasoned, not merely acquainted with seasoning.',
   'Stir in beans, Rotel and salsa. Layer with tortilla chips and cheese in a casserole dish.',
   'Bake until hot and bubbling and the cheese is melted, about 20 minutes. Finish with sour cream and green onion after baking.'
  ]),
  notes:'Wesley’s Rule (recovered manuscript): If you want crisp chips, keep some out and add them at the table. Buried chips become casserole chips. Physics remains undefeated.',
  shoppingNote:'Recovered manuscript specifies 1 (14.5 oz) can Rotel. Confirm the actual package size at the store instead of assuming a matching can exists. Water is a kitchen supply, not an automatic purchase. Servings are not documented.',
  sourceNote:'Household manuscript publication approved by the owner. This does not certify the historical source screenshot or alter the private Vault original.'
 })
});
// An approved publication must bind an explicit lottery number and recipe version.
// Ingredient names and quantities must be valid for BOTH the recipe view and groceries.
function approvedRecipeForLottery(id){
 if(typeof MEALS==='undefined'||!Number.isInteger(id)||id<0||id>=MEALS.length||
    typeof recipeLinkFor!=='function')return null;
 const link=recipeLinkFor(id);
 if(!link||typeof link.publicationId!=='string'||typeof link.recipeVersionId!=='string')return null;
 const record=Object.prototype.hasOwnProperty.call(RECIPE_PUBLICATIONS,link.publicationId)
   ?RECIPE_PUBLICATIONS[link.publicationId]:null;
 if(!record||record.publicationAuthorization!=='approved-for-public-web'||
    record.publicationId!==link.publicationId||record.recipeVersionId!==link.recipeVersionId||
    typeof record.recipeId!=='string'||!record.recipeId.trim()||
    typeof record.title!=='string'||!record.title.trim()||
    record.ingredientStatus!=='complete'||record.householdSubstitutionsResolved===false||
    !Array.isArray(record.lotteryIds)||!record.lotteryIds.includes(id)||
    !Array.isArray(record.ingredients)||!record.ingredients.length)return null;
 if(!record.ingredients.every(item=>item&&typeof item.name==='string'&&item.name.trim()&&
    typeof item.amount==='string'&&item.amount.trim()&&
    (item.optional===true||item.supplyOnly===true||
    (typeof item.department==='string'&&item.department.trim()))))return null;
 return record;
}
// Required shopping rows are derived from EXACTLY the same approved recipe/version
// and recorded amount displayed in the recipe card. No shopping-only quantity guesses.
function publishedShoppingRowsForLottery(id){
 const r=approvedRecipeForLottery(id);
 if(!r)return null;
 const required=r.ingredients.filter(item=>item.optional!==true&&item.supplyOnly!==true);
 if(!required.length)return null;
 return required.map(item=>[item.department,item.name,item.amount]);
}

// Catalog used by pantry suggestions and pantry ingredient controls. A reviewed
// publication replaces any older shopping estimate for that SAME lottery number.
// This helper is called after grocery.js defines SHOPPING_TEMPLATES.
function completeShoppingTemplates(){
 const result=typeof SHOPPING_TEMPLATES==='undefined'?{}:{...SHOPPING_TEMPLATES};
 if(typeof MEALS==='undefined')return result;
 for(let id=0;id<MEALS.length;id++){
  const rows=publishedShoppingRowsForLottery(id);
  if(rows)result[id]=rows;
 }
 return result;
}
