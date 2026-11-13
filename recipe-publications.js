'use strict';
// Public recipe publication registry. Remains empty until a specific source version
// receives explicit owner approval for public web distribution.
// Owner-approved v1.1 publications must remain distinct from protected Vault originals.
const RECIPE_PUBLICATIONS=Object.freeze({
 'vk-pub-pepperoni-pizza-grilled-cheese-manuscript-001':Object.freeze({
  publicationId:'vk-pub-pepperoni-pizza-grilled-cheese-manuscript-001',
  recipeId:'VK-DIN-PIZZAGRILLEDCHEESE-001',
  recipeVersionId:'VK-HH-PIZZAGRILLEDCHEESE-MANUSCRIPT-001',
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[3],
  title:'Pepperoni Pizza Grilled Cheese',
  versionType:'approved household manuscript (not source-verified original)',
  sourceStatus:'Kitchen Test Draft recipe #90 (legacy #90, alias #112); historical original source image NOT independently verified.',
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:'2 sandwiches',
  // Explicitly documented alternative, not a speculative ingredient substitution.
  sauceOptions:Object.freeze({default:'Pizza sauce',choices:Object.freeze(['Pizza sauce','Marinara sauce'])}),
  ingredients:Object.freeze([
   {name:'Bread',amount:'4 slices',department:'Bakery'},
   {name:'Pepperoni',amount:'8 slices',department:'Meat'},
   {name:'Shredded mozzarella',amount:'1 cup',department:'Dairy'},
   {name:'Pizza sauce',amount:'2 Tbsp',department:'Canned & Jarred',sauceChoice:true},
   {name:'Butter',amount:'2 Tbsp',department:'Dairy',preparation:'softened'},
   {name:'Dried oregano',amount:'1 tsp',department:'Seasonings'},
   {name:'Garlic powder',amount:'1 tsp',department:'Seasonings',optional:true}
  ]),
  steps:Object.freeze([
   'Butter one side of each bread slice.',
   'On the unbuttered sides of two slices, spread 1 Tbsp of your chosen pizza sauce or marinara per sandwich. Add half the mozzarella, 4 pepperoni slices per sandwich, oregano and optional garlic powder, then the remaining mozzarella. Close with buttered sides outward.',
   'Cook in a skillet or on a griddle over medium heat for 3–4 minutes per side until golden and the cheese is melted. Serve with extra sauce if desired.'
  ]),
  notes:'Choose pizza sauce or marinara: both are documented alternatives. Garlic powder (1 tsp) is optional and is not added to the shopping list automatically. Extra sauce for serving has no documented quantity.',
  shoppingNote:'Documented yield: 2 sandwiches, not five servings. Six required grocery lines are derived from this approved household manuscript version; no automatic scaling.',
  sourceNote:'Owner authorized public distribution of the recovered household manuscript variant. The private original recipe and its unverified historical source remain untouched.'
 }),
 'vk-pub-breakfast-tacos-household-001':Object.freeze({
  publicationId:'vk-pub-breakfast-tacos-household-001',
  recipeId:'VK-HH-BREAKFAST-TACOS-001',
  recipeVersionId:'VK-HH-BREAKFAST-TACOS-001',
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[0],
  title:'Vale-Keeney Breakfast Tacos',
  versionType:'owner-approved household recipe',
  sourceStatus:'Owner-designated family version from the October 19–25, 2026 weekly packet. Suggested quantities; not a transcription claim about an older source.',
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:'About 8 street tacos',
  ingredients:Object.freeze([
   {name:'Street taco tortillas',amount:'8',department:'Bakery'},
   {name:'Cooked cubed ham',amount:'8 oz',department:'Meat',preparation:"Cook's choice; cubed ham is the documented default."},
   {name:'Eggs',amount:'6 large',department:'Dairy'},
   {name:'Shredded cheese',amount:'1 cup',department:'Dairy',preparation:'cheddar or preferred blend'},
   {name:'Butter or oil',amount:'as needed',department:'Pantry',preparation:'for skillet'},
   {name:'Salt and pepper',amount:'to taste',department:'Seasonings'},
   {name:'Preferred condiments',amount:'as preferred',optional:true}
  ]),
  steps:Object.freeze([
   'Warm a lightly buttered or oiled skillet over medium heat. Add cubed cooked ham and heat through; brown lightly if desired.',
   'Beat eggs with a little pepper and salt, remembering that the ham is already salty. Pour the eggs into the same skillet as the ham.',
   'Stir gently until the eggs are cooked to your liking and the ham and eggs form one combined scramble.',
   'Warm street taco tortillas briefly until flexible. Spoon the ham-and-egg scramble onto each tortilla.',
   'Sprinkle shredded cheese on top after filling the tortillas; do not mix the cheese into the skillet scramble.',
   'Add condiments individually and serve.'
  ]),
  notes:'The packet describes quantities as suggested, not established historical measurements. Meat may be changed by the cook; cubed ham is the default. Condiments are optional and are not included in groceries.',
  shoppingNote:'Owner-approved household version; about 8 tacos. Salt/pepper and skillet fat are listed as needed, not as fixed quantities.',
  sourceNote:'Owner-authorized household text. No older image or publisher source is claimed as independently verified.'
 }),
 'vk-pub-chicken-bacon-ranch-weeknight-001':Object.freeze({
  publicationId:'vk-pub-chicken-bacon-ranch-weeknight-001',
  recipeId:'VK-HH-CHICKEN-BACON-RANCH-PASTABAKE-001',
  recipeVersionId:'VK-HH-CHICKEN-BACON-RANCH-PASTABAKE-001',
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[1],
  title:'Chicken Bacon Ranch Pasta Bake — Weeknight Version',
  versionType:'owner-approved household weeknight adaptation',
  sourceStatus:'Uses the archived recipe ingredient lineup; this household packet supplies practical oven and timing guidance, not a verified historical-source method.',
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:'4–6 servings',
  ingredients:Object.freeze([
   {name:'Penne pasta',amount:'12 oz',department:'Pasta'},
   {name:'Cooked chicken, chopped or shredded',amount:'2 cups (about 1 lb raw before cooking)',department:'Meat'},
   {name:'Bacon, cooked and crumbled',amount:'6 slices',department:'Meat'},
   {name:'Ranch dressing',amount:'1 cup',department:'Condiments'},
   {name:'Shredded cheddar',amount:'1 cup',department:'Dairy'},
   {name:'Shredded mozzarella',amount:'1 cup',department:'Dairy'},
   {name:'Grated Parmesan',amount:'1/2 cup',department:'Dairy'},
   {name:'Garlic powder',amount:'1/2 tsp',department:'Seasonings'},
   {name:'Salt and black pepper',amount:'to taste',department:'Seasonings'},
   {name:'Broccoli',amount:'as desired',department:'Produce',optional:true}
  ]),
  steps:Object.freeze([
   'Heat oven to 375°F. Grease a medium baking dish. Bring a pot of salted water to a boil.',
   "Cook penne 1–2 minutes shy of the package's al dente time; drain. If using raw chicken, cook it fully to 165°F before proceeding.",
   'Cook bacon until crisp and crumble. Mix pasta, cooked chicken, bacon, ranch, garlic powder and about half the cheeses. Add a small splash of pasta water or milk if the mixture seems dry.',
   'Spread the mixture in the baking dish; sprinkle the remaining cheddar, mozzarella and Parmesan over the top.',
   'Bake 15–20 minutes until hot throughout and the cheese melts; broil briefly only if desired and watched closely. Serve with broccoli.'
  ]),
  notes:'Broccoli is optional. The small splash of pasta water or milk is an as-needed method adjustment and has no fixed purchase quantity.',
  shoppingNote:'The packet estimates about 1 lb raw chicken for 2 cups cooked chicken. Broccoli is optional and not added to the required grocery list.',
  sourceNote:'Owner-authorized household adaptation. The original Vault record and historical-source verification state remain unchanged.'
 }),
 'vk-pub-slow-cooker-chicken-gravy-convenience-001':Object.freeze({
  publicationId:'vk-pub-slow-cooker-chicken-gravy-convenience-001',
  recipeId:'VK-HH-SLOW-COOKER-CHICKEN-GRAVY-001',
  recipeVersionId:'VK-HH-SLOW-COOKER-CHICKEN-GRAVY-001',
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[16],
  title:'Slow Cooker Chicken & Gravy over Mashed Potatoes — Convenience Version',
  versionType:'owner-approved household convenience formulation',
  sourceStatus:'The weekly packet explicitly says the exact saved family source recipe was not verified; this is a separate convenience version.',
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:'4–6 servings',
  ingredients:Object.freeze([
   {name:'Boneless skinless chicken breasts or thighs',amount:'2 lb',department:'Meat'},
   {name:'Chicken gravy mix',amount:'2 packets',department:'Seasonings',preparation:'check package for required liquid'},
   {name:'Cream of chicken soup',amount:'1 (10.5 oz) can',department:'Canned & Jarred'},
   {name:'Water or low-sodium chicken broth',amount:'1/2–1 cup',department:'Canned & Jarred',preparation:'adjust for gravy thickness'},
   {name:'Black pepper and garlic powder',amount:'to taste',department:'Seasonings'},
   {name:'Potatoes',amount:'about 3 lb',department:'Produce',preparation:'for mashed potatoes'},
   {name:'Butter and milk',amount:'as needed',department:'Dairy',preparation:'for mashed potatoes'},
   {name:'Corn',amount:'as desired',department:'Frozen',optional:true}
  ]),
  steps:Object.freeze([
   'Place chicken in the slow cooker. Whisk the gravy packets, soup and 1/2 cup water or broth until smooth; pour over the chicken.',
   'Cover and cook on LOW about 5–7 hours or HIGH about 3–4 hours, depending on the appliance and chicken thickness. Check that the thickest piece reaches 165°F. Do not start with frozen chicken in the slow cooker.',
   'Shred the cooked chicken into the gravy. Add more liquid if too thick, or let it stand uncovered briefly if too thin. Taste before adding salt because packets and soup are salty.',
   'About 30 minutes before dinner, boil potatoes in salted water 15–20 minutes until fork-tender. Drain well; mash with butter and warm milk.',
   'Heat corn if using. Spoon chicken and gravy over mashed potatoes and serve.'
  ]),
  notes:'Soup and gravy packet brands differ; follow their directions as needed. Corn is optional. Butter and milk amounts are not fixed in the packet.',
  shoppingNote:'Convenience formulation for lottery #17. The 4–6 serving yield is the packet's planning estimate; it is not scaled to five.',
  sourceNote:'Owner-authorized household convenience version. Do not present it as the historical family recipe or as source-image verified.'
 }),
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
// Nonsecret per-version household option. This is NOT a retailer/account credential.
const RECIPE_OPTION_KEY='vk-recipe-options-v01';
function recipeOptionStorage(){
 try{
  if(typeof localStorage==='undefined')return {};
  const x=JSON.parse(localStorage.getItem(RECIPE_OPTION_KEY));
  return x&&typeof x==='object'&&!Array.isArray(x)?x:{};
 }catch{return {}}
}
function recipeSauceChoiceForLottery(id){
 const r=approvedRecipeForLottery(id);
 if(!r||!r.sauceOptions||!Array.isArray(r.sauceOptions.choices))return null;
 const saved=recipeOptionStorage()[r.recipeVersionId];
 return r.sauceOptions.choices.includes(saved)?saved:r.sauceOptions.default;
}
function recipeSetSauceChoiceForLottery(id,choice){
 const r=approvedRecipeForLottery(id);
 if(!r||!r.sauceOptions||!r.sauceOptions.choices.includes(choice)||
    typeof localStorage==='undefined')return false;
 try{
  const saved=recipeOptionStorage();
  saved[r.recipeVersionId]=choice;
  localStorage.setItem(RECIPE_OPTION_KEY,JSON.stringify(saved));
  return true;
 }catch{return false}
}
function recipeIngredientNameForLottery(id,ingredient){
 return ingredient.sauceChoice===true?
    (recipeSauceChoiceForLottery(id)||ingredient.name):ingredient.name;
}
// Required shopping rows are derived from EXACTLY the same approved recipe/version
// and recorded amount displayed in the recipe card. No shopping-only quantity guesses.
function publishedShoppingRowsForLottery(id){
 const r=approvedRecipeForLottery(id);
 if(!r)return null;
 const required=r.ingredients.filter(item=>item.optional!==true&&item.supplyOnly!==true);
 if(!required.length)return null;
 return required.map(item=>[item.department,recipeIngredientNameForLottery(id,item),item.amount]);
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
