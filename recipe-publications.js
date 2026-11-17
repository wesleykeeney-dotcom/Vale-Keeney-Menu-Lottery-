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
  shoppingNote:"Convenience formulation for lottery #17. The 4–6 serving yield is the packet's planning estimate; it is not scaled to five.",
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
 }),
 'vk-pub-foodwars-gotcha-pork-vault-001':Object.freeze({
  publicationId:"vk-pub-foodwars-gotcha-pork-vault-001",
  recipeId:"VK-POP-FOODWARS-GOTCHAPORK-001",
  recipeVersionId:"VK-POP-FOODWARS-GOTCHAPORK-001",
  publicationAuthorization:"approved-for-public-web",
  lotteryIds:[80],
  title:"Food Wars! — Gotcha! Pork Roast",
  versionType:"owner-approved source-verified Vault original",
  sourceStatus:"Exact lottery #81 match to a source-verified, locked Cooking Vault original. Owner approved syncing this original for lottery selection and grocery planning. The preserved source title is “Gotcha Pork Roast.”",
  ingredientStatus:"complete",
  methodStatus:"incomplete",
  householdSubstitutionsResolved:true,
  yieldText:null,
  notes:"The original includes mushrooms. No mushroom-free adaptation is represented. Rosemary quantity is not specified in the Vault.",
  shoppingNote:"Shopping contains the original’s full ingredient lineup. Any line shown as “Quantity not specified in Vault” must be chosen by the shopper; amounts are not guessed or scaled. Yield is not documented.",
  sourceNote:"The source-verified Vault original is owner-approved for grocery sync. Its preserved method is abbreviated and is not presented as cook-ready instructions.",
  ingredients:Object.freeze([
   Object.freeze({"name":"potatoes","amount":"2","department":"Produce"}),
   Object.freeze({"name":"mushrooms","amount":"6","department":"Produce"}),
   Object.freeze({"name":"onion","amount":"1/2","department":"Produce"}),
   Object.freeze({"name":"bacon","amount":"7 slices","department":"Meat"}),
   Object.freeze({"name":"rosemary sprigs","amount":"Quantity not specified in Vault","department":"Produce"}),
   Object.freeze({"name":"red wine or grape juice","amount":"1 cup","department":"Beverages"}),
   Object.freeze({"name":"soy sauce","amount":"2 Tbsp","department":"Condiments"}),
   Object.freeze({"name":"sweet sake","amount":"1 Tbsp","department":"Beverages","optional":true}),
   Object.freeze({"name":"unsalted butter","amount":"1 Tbsp","department":"Dairy"})
  ]),
  steps:Object.freeze([])
 }),
 'vk-pub-foodwars-furikake-vault-001':Object.freeze({
  publicationId:"vk-pub-foodwars-furikake-vault-001",
  recipeId:"VK-POP-FOODWARS-FURIKAKE-001",
  recipeVersionId:"VK-POP-FOODWARS-FURIKAKE-001",
  publicationAuthorization:"approved-for-public-web",
  lotteryIds:[81],
  title:"Food Wars! — Transforming Furikake Rice",
  versionType:"owner-approved source-verified Vault original",
  sourceStatus:"Exact lottery #82 match to a source-verified, locked Cooking Vault original. Owner approved syncing this original for lottery selection and grocery planning.",
  ingredientStatus:"complete",
  methodStatus:"incomplete",
  householdSubstitutionsResolved:true,
  yieldText:null,
  notes:"Water is a kitchen supply and is not automatically purchased. The original method depends on the chilled broth jelly transforming over hot rice.",
  shoppingNote:"Shopping contains the original’s full ingredient lineup. Any line shown as “Quantity not specified in Vault” must be chosen by the shopper; amounts are not guessed or scaled. Yield is not documented.",
  sourceNote:"The source-verified Vault original is owner-approved for grocery sync. Its preserved method is abbreviated and is not presented as cook-ready instructions.",
  ingredients:Object.freeze([
   Object.freeze({"name":"sesame oil","amount":"2 Tbsp","department":"Oils"}),
   Object.freeze({"name":"unbreaded chicken wings, uncooked","amount":"8","department":"Meat"}),
   Object.freeze({"name":"bonito soup stock","amount":"2 tsp","department":"Seasonings"}),
   Object.freeze({"name":"water","amount":"5 cups","supplyOnly":true}),
   Object.freeze({"name":"minced ginger","amount":"2 tsp","department":"Produce"}),
   Object.freeze({"name":"sugar","amount":"1 Tbsp","department":"Baking"}),
   Object.freeze({"name":"soy sauce","amount":"3 Tbsp","department":"Condiments"}),
   Object.freeze({"name":"sake","amount":"1/4 cup","department":"Beverages"}),
   Object.freeze({"name":"gelatin","amount":"2 Tbsp","department":"Baking"}),
   Object.freeze({"name":"white rice","amount":"1 cup","department":"Pantry"}),
   Object.freeze({"name":"green onions","amount":"2","department":"Produce"}),
   Object.freeze({"name":"eggs","amount":"4","department":"Dairy"}),
   Object.freeze({"name":"salt and pepper","amount":"Quantity not specified in Vault","department":"Seasonings"})
  ]),
  steps:Object.freeze([])
 }),
 'vk-pub-foodwars-rainbow-terrine-vault-001':Object.freeze({
  publicationId:"vk-pub-foodwars-rainbow-terrine-vault-001",
  recipeId:"VK-POP-FOODWARS-RAINBOWTERRINE-001",
  recipeVersionId:"VK-POP-FOODWARS-RAINBOWTERRINE-001",
  publicationAuthorization:"approved-for-public-web",
  lotteryIds:[82],
  title:"Food Wars! — Rainbow Terrine",
  versionType:"owner-approved source-verified Vault original",
  sourceStatus:"Exact lottery #83 match to a source-verified, locked Cooking Vault original. Owner approved syncing this original for lottery selection and grocery planning.",
  ingredientStatus:"complete",
  methodStatus:"incomplete",
  householdSubstitutionsResolved:true,
  yieldText:null,
  notes:"The original includes shiitake mushrooms. The eggplant line documents pumpkin as an alternative. Warm water is a kitchen supply and is not automatically purchased.",
  shoppingNote:"Shopping contains the original’s full ingredient lineup. Any line shown as “Quantity not specified in Vault” must be chosen by the shopper; amounts are not guessed or scaled. Yield is not documented.",
  sourceNote:"The source-verified Vault original is owner-approved for grocery sync. Its preserved method is abbreviated and is not presented as cook-ready instructions.",
  ingredients:Object.freeze([
   Object.freeze({"name":"allspice, salt and pepper","amount":"Quantity not specified in Vault","department":"Seasonings"}),
   Object.freeze({"name":"eggs, combining sauce","amount":"12","department":"Dairy"}),
   Object.freeze({"name":"heavy cream, combining sauce","amount":"1 pint","department":"Dairy"}),
   Object.freeze({"name":"carrots, minced","amount":"3","department":"Produce"}),
   Object.freeze({"name":"ground chicken, carrot layer","amount":"1/2 cup","department":"Meat"}),
   Object.freeze({"name":"spinach","amount":"2 cups","department":"Produce"}),
   Object.freeze({"name":"canned tuna","amount":"Quantity not specified in Vault","department":"Canned & Jarred"}),
   Object.freeze({"name":"zucchini","amount":"1","department":"Produce"}),
   Object.freeze({"name":"ground beef","amount":"1/2 cup","department":"Meat"}),
   Object.freeze({"name":"eggplant, may substitute pumpkin","amount":"1","department":"Produce"}),
   Object.freeze({"name":"ground chicken, mushroom layer","amount":"1/2 cup","department":"Meat"}),
   Object.freeze({"name":"shiitake mushrooms","amount":"2/3 cup","department":"Produce"}),
   Object.freeze({"name":"cherry tomatoes","amount":"12","department":"Produce"}),
   Object.freeze({"name":"tomato paste","amount":"1/2 can","department":"Canned & Jarred"}),
   Object.freeze({"name":"potatoes, boiled and mashed","amount":"2","department":"Produce"}),
   Object.freeze({"name":"perilla","amount":"2 Tbsp","department":"Produce"}),
   Object.freeze({"name":"walnuts","amount":"1/4 cup","department":"Pantry"}),
   Object.freeze({"name":"pine nuts","amount":"2 Tbsp","department":"Pantry"}),
   Object.freeze({"name":"parsley","amount":"1 Tbsp","department":"Produce"}),
   Object.freeze({"name":"basil","amount":"2 tsp","department":"Produce"}),
   Object.freeze({"name":"dill","amount":"2 tsp","department":"Produce"}),
   Object.freeze({"name":"olive oil","amount":"2 Tbsp","department":"Oils"}),
   Object.freeze({"name":"gelatin, ponzu","amount":"3 g","department":"Baking"}),
   Object.freeze({"name":"warm water","amount":"2 Tbsp","supplyOnly":true}),
   Object.freeze({"name":"sudachi or lime","amount":"1 Tbsp","department":"Produce"}),
   Object.freeze({"name":"soy sauce","amount":"2 Tbsp","department":"Condiments"}),
   Object.freeze({"name":"mirin","amount":"1 Tbsp","department":"International"}),
   Object.freeze({"name":"chicken broth","amount":"2 Tbsp","department":"Canned & Jarred"})
  ]),
  steps:Object.freeze([])
 }),
 'vk-pub-foodwars-boeuf-bourguignon-vault-001':Object.freeze({
  publicationId:"vk-pub-foodwars-boeuf-bourguignon-vault-001",
  recipeId:"VK-POP-FOODWARS-BOEUF-001",
  recipeVersionId:"VK-POP-FOODWARS-BOEUF-001",
  publicationAuthorization:"approved-for-public-web",
  lotteryIds:[83],
  title:"Food Wars! — Soma’s Boeuf Bourguignon",
  versionType:"owner-approved source-verified Vault original",
  sourceStatus:"Exact lottery #84 match to a source-verified, locked Cooking Vault original. Owner approved syncing this original for lottery selection and grocery planning.",
  ingredientStatus:"complete",
  methodStatus:"incomplete",
  householdSubstitutionsResolved:true,
  yieldText:null,
  notes:"The source original specifies a honey treatment and a separate white-mushroom component. No mushroom-free adaptation is represented.",
  shoppingNote:"Shopping contains the original’s full ingredient lineup. Any line shown as “Quantity not specified in Vault” must be chosen by the shopper; amounts are not guessed or scaled. Yield is not documented.",
  sourceNote:"The source-verified Vault original is owner-approved for grocery sync. Its preserved method is abbreviated and is not presented as cook-ready instructions.",
  ingredients:Object.freeze([
   Object.freeze({"name":"honey, for beef tenderizing treatment","amount":"1 cup","department":"Baking"}),
   Object.freeze({"name":"white onion","amount":"1/2","department":"Produce"}),
   Object.freeze({"name":"extra-virgin olive oil","amount":"1 tsp","department":"Oils"}),
   Object.freeze({"name":"bacon","amount":"2 strips","department":"Meat"}),
   Object.freeze({"name":"beef","amount":"Quantity not specified in Vault","department":"Meat"}),
   Object.freeze({"name":"baby carrots, handful","amount":"Quantity not specified in Vault","department":"Produce"}),
   Object.freeze({"name":"garlic","amount":"2-3 cloves","department":"Produce"}),
   Object.freeze({"name":"salt and pepper","amount":"Quantity not specified in Vault","department":"Seasonings"}),
   Object.freeze({"name":"flour","amount":"1 1/2 Tbsp","department":"Baking"}),
   Object.freeze({"name":"pearl onions","amount":"8-10","department":"Produce"}),
   Object.freeze({"name":"red wine, Pinot Noir or Chianti","amount":"1 cup","department":"Beverages"}),
   Object.freeze({"name":"beef stock","amount":"1 cup","department":"Canned & Jarred"}),
   Object.freeze({"name":"tomato paste","amount":"1 Tbsp","department":"Canned & Jarred"}),
   Object.freeze({"name":"beef bouillon cube","amount":"1","department":"Seasonings"}),
   Object.freeze({"name":"fresh parsley","amount":"Quantity not specified in Vault","department":"Produce"}),
   Object.freeze({"name":"fresh thyme","amount":"Quantity not specified in Vault","department":"Produce"}),
   Object.freeze({"name":"bay leaf","amount":"1","department":"Seasonings"}),
   Object.freeze({"name":"cauliflower","amount":"1-2 pieces","department":"Produce"}),
   Object.freeze({"name":"white mushrooms","amount":"1 packet","department":"Produce"}),
   Object.freeze({"name":"butter","amount":"Quantity not specified in Vault","department":"Dairy"}),
   Object.freeze({"name":"grated garlic","amount":"1 Tbsp","department":"Produce"})
  ]),
  steps:Object.freeze([])
 }),
 'vk-pub-breakfast-for-dinner-master-cookbook-001':Object.freeze({
  publicationId:'vk-pub-breakfast-for-dinner-master-cookbook-001',
  recipeId:'VK-HH-BREAKFAST-FOR-DINNER-001',
  recipeVersionId:'VK-HH-BREAKFAST-FOR-DINNER-MASTER-COOKBOOK-001',
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[10],
  title:'Sausage, Potato & Egg Breakfast Dinner',
  versionType:'owner-approved household cookbook recipe',
  sourceStatus:'Owner-approved recipe from Wesley’s Master Recipe Collection, September 2026 edition. This is the approved cookbook formulation; original image transcription and publisher attribution are separate evidence questions.',
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:'Not specified',
  ingredients:Object.freeze([
   {name:'Breakfast sausage',amount:'1 lb',department:'Meat'},
   {name:'Potatoes',amount:'About 2 lb, diced small',department:'Produce'},
   {name:'Eggs',amount:'8–10',department:'Dairy'},
   {name:'Oil or butter',amount:'As needed',department:'Pantry'},
   {name:'Salt, pepper, and garlic powder',amount:'To taste',department:'Seasonings'},
   {name:'Fruit',amount:'Amount not specified',department:'Produce'},
   {name:'Cheese',amount:'Optional; amount not specified',department:'Dairy',optional:true}
  ]),
  steps:Object.freeze([
   'Heat oven to 425°F. Toss potatoes with oil and seasonings; roast 25–35 minutes, flipping once.',
   'Brown the sausage.',
   'Scramble the eggs; add cheese if desired.',
   'Serve with fruit.'
  ]),
  notes:'The cookbook does not specify yield or fruit quantity. Its sausage step does not state an internal-temperature endpoint; the source wording is preserved without adding one.',
  shoppingNote:'Ingredient lineup is documented. Fruit quantity and the oil/butter amount remain unspecified; do not scale.',
  sourceNote:'Owner-authorized household cookbook formulation. Approval is not a claim of publisher attribution or independent image-to-text verification.'
 }),
 'vk-pub-loaded-baked-potato-bar-master-cookbook-001':Object.freeze({
  publicationId:'vk-pub-loaded-baked-potato-bar-master-cookbook-001',
  recipeId:'VK-HH-LOADED-BAKED-POTATO-BAR-001',
  recipeVersionId:'VK-HH-LOADED-BAKED-POTATO-BAR-MASTER-COOKBOOK-001',
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[14],
  title:'Loaded Baked Potato Bar',
  versionType:'owner-approved household cookbook recipe',
  sourceStatus:'Owner-approved recipe from Wesley’s Master Recipe Collection, September 2026 edition. This is the approved cookbook formulation; original image transcription and publisher attribution are separate evidence questions.',
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:'Not specified; potato quantity is one per person',
  ingredients:Object.freeze([
   {name:'Large russet potatoes',amount:'1 per person',department:'Produce'},
   {name:'Leftover chicken and/or ground beef',amount:'Amount not specified',department:'Meat'},
   {name:'Broccoli and corn',amount:'Amount not specified',department:'Produce'},
   {name:'Shredded cheese',amount:'Amount not specified',department:'Dairy'},
   {name:'Sour cream and butter',amount:'Amount not specified',department:'Dairy'},
   {name:'Tomatoes or other toppings for others',amount:'Optional; amount not specified',department:'Produce',optional:true}
  ]),
  steps:Object.freeze([
   'Heat oven to 425°F.',
   'Scrub, dry, prick, lightly oil and salt potatoes; bake 45–60 minutes.',
   'Warm proteins and vegetables.',
   'Split and top the potatoes. Prepare Wesley’s serving before handling raw tomato toppings.'
  ]),
  notes:'Protein, vegetable, cheese, sour cream, and butter amounts and yield are not specified. Tomatoes are listed only as toppings for others; prepare the owner’s serving before handling raw tomatoes.',
  shoppingNote:'The potato requirement is one per person. Other required grocery amounts are unspecified and must not be scaled or inferred.',
  sourceNote:'Owner-authorized household cookbook formulation. Approval is not a claim of publisher attribution or independent image-to-text verification.'
 }),
 'vk-pub-lottery-100-vk-din-cheesesteakhelper-001':Object.freeze({
  publicationId:'vk-pub-lottery-100-vk-din-cheesesteakhelper-001',
  recipeId:"VK-DIN-CHEESESTEAKHELPER-001",
  recipeVersionId:"VK-DIN-CHEESESTEAKHELPER-001",
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[84],
  title:"Cheese Steak Hamburger Helper",
  versionType:"owner-approved source-verified recipe",
  sourceStatus:"Vault source is marked verified against the identified source; original record remains unchanged.",
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:"Not specified",
  ingredients:Object.freeze([{"name":"ground beef","amount":"1 lb","department":"Meat"},{"name":"onion","amount":"Not specified","department":"Produce"},{"name":"green pepper","amount":"Not specified","department":"Produce"},{"name":"A1 steak sauce","amount":"2 Tbsp","department":"Pantry"},{"name":"beef broth","amount":"1 1/2 cups","department":"Canned & Jarred"},{"name":"milk","amount":"1 1/2 cups","department":"Dairy"},{"name":"tomato sauce","amount":"8 oz","department":"Canned & Jarred"},{"name":"spiral pasta","amount":"2 1/2 cups","department":"Pasta"},{"name":"mozzarella","amount":"2 cups","department":"Dairy"}]),
  steps:Object.freeze(["Brown the ground beef with onion and green pepper; season with steak seasoning and the source spices.","Add A1, beef broth, milk, tomato sauce, and spiral pasta.","Cook until pasta is tender and the sauce has thickened appropriately.","Finish with mozzarella and allow it to melt before serving."]),
  notes:"Vault record status: verified_complete. Amounts not stated in the record are shown as Not specified.",
  shoppingNote:"Lottery #85; ingredients and amounts are reproduced from the approved Vault version. Amounts not documented remain Not specified; no scaling.",
  sourceNote:"Owner-authorized public version of the existing Vault recipe."
 }),
 'vk-pub-lottery-100-vk-din-maplesoysalmon-001':Object.freeze({
  publicationId:'vk-pub-lottery-100-vk-din-maplesoysalmon-001',
  recipeId:"VK-DIN-MAPLESOYSALMON-001",
  recipeVersionId:"VK-DIN-MAPLESOYSALMON-001",
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[85],
  title:"Maple Soy Salmon",
  versionType:"owner-approved source-verified recipe",
  sourceStatus:"Vault source is marked verified against the identified source; original record remains unchanged.",
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:"4 servings",
  ingredients:Object.freeze([{"name":"raw salmon","amount":"4 pieces","department":"Meat"},{"name":"pure maple syrup","amount":"1/4 cup","department":"Pantry"},{"name":"soy sauce","amount":"1/4 cup","department":"Pantry"},{"name":"minced garlic","amount":"1 tsp","department":"Produce"},{"name":"lemon juice","amount":"2 Tbsp","department":"Produce"}]),
  steps:Object.freeze(["Place salmon in an ovenproof dish.","Combine maple syrup, soy sauce, garlic and lemon juice. Pour over salmon and marinate 20 minutes.","Heat oven to 350°F (180°C). Bake uncovered about 20 minutes, or until the salmon is flaky and cooked to your preferred safe doneness.","Serve with creamy mashed potatoes and steamed beans, as the handwritten source suggests."]),
  notes:"Wesley explains: Simple recipe, no need to turn it into a chemistry experiment. Vault record status: verified_complete. Amounts not stated in the record are shown as Not specified.",
  shoppingNote:"Lottery #86; ingredients and amounts are reproduced from the approved Vault version. Amounts not documented remain Not specified; no scaling.",
  sourceNote:"Owner-authorized public version of the existing Vault recipe."
 }),
 'vk-pub-lottery-100-vk-fam-airfryer-nuggets-001':Object.freeze({
  publicationId:'vk-pub-lottery-100-vk-fam-airfryer-nuggets-001',
  recipeId:"VK-FAM-AIRFRYER-NUGGETS-001",
  recipeVersionId:"VK-FAM-AIRFRYER-NUGGETS-001",
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[86],
  title:"Air-Fryer Chicken Nuggets",
  versionType:"owner-approved source-verified recipe",
  sourceStatus:"Family-original formulation; Vault source is marked verified against the preserved family source.",
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:"Not specified",
  ingredients:Object.freeze([{"name":"chicken","amount":"1 can","department":"Meat"},{"name":"egg","amount":"1","department":"Dairy"},{"name":"pepper-jack or preferred cheese","amount":"1/3 cup","department":"Dairy"},{"name":"salt, pepper and garlic powder","amount":"Not specified","department":"Produce"},{"name":"oil spray","amount":"Not specified","department":"Pantry"}]),
  steps:Object.freeze(["Combine chicken, egg, cheese and seasonings and form nuggets.","Lightly spray for air frying.","Air fry 8 minutes, flip, then cook another 7 minutes or until safely heated and browned."]),
  notes:"Vault record status: family_original. Amounts not stated in the record are shown as Not specified.",
  shoppingNote:"Lottery #87; ingredients and amounts are reproduced from the approved Vault version. Amounts not documented remain Not specified; no scaling.",
  sourceNote:"Owner-authorized public version of the existing Vault recipe."
 }),
 'vk-pub-lottery-100-wesleys-booyah-docx-2026':Object.freeze({
  publicationId:"vk-pub-lottery-100-wesleys-booyah-docx-2026",recipeId:"VK-HH-BOOYAH-REVISED-2026-11-15",recipeVersionId:"VK-HH-BOOYAH-REVISED-2026-11-15",
  publicationAuthorization:'approved-for-public-web',lotteryIds:[87],
  title:"Wesley’s Booyah",versionType:'owner-approved household document version',
  sourceStatus:"Owner-authored revised DOCX, cabbage-free household version; distinct from the locked canonical family recipe.",ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:"10–12 servings; about 4–5 hours",ingredients:Object.freeze([{"name":"Bone-in chicken thighs and drumsticks","amount":"3–4 lb","department":"Meat"},{"name":"Beef chuck, large chunks","amount":"1½ lb","department":"Meat"},{"name":"Chicken broth","amount":"10 cups","department":"Canned & Jarred"},{"name":"Bay leaves","amount":"2","department":"Seasonings"},{"name":"Worcestershire sauce","amount":"1 Tbsp","department":"Pantry"},{"name":"Kosher salt","amount":"1½ tsp, plus more to taste","department":"Seasonings"},{"name":"Black pepper","amount":"1 tsp","department":"Seasonings"},{"name":"Yellow onion, diced","amount":"1 large","department":"Produce"},{"name":"Carrots, sliced","amount":"5","department":"Produce"},{"name":"Celery stalks, sliced","amount":"4","department":"Produce"},{"name":"Red or Yukon Gold potatoes, cubed","amount":"2 lb","department":"Produce"},{"name":"Garlic, minced","amount":"3 cloves","department":"Produce"},{"name":"Diced tomatoes","amount":"1 can (14.5 oz)","department":"Canned & Jarred"},{"name":"Cut green beans","amount":"1 cup","department":"Produce"},{"name":"Corn","amount":"1 cup","department":"Produce"},{"name":"Peas","amount":"1 cup","department":"Produce"},{"name":"Soy sauce","amount":"2 tsp","department":"Pantry"},{"name":"Lemon juice","amount":"1 Tbsp, plus more if needed","department":"Produce"},{"name":"Chicken Better Than Bouillon","amount":"1–2 tsp, only if needed","department":"Canned & Jarred"},{"name":"Salt and black pepper","amount":"to taste","department":"Seasonings"}]),steps:Object.freeze(["Put beef, broth, half the onion, bay leaves, Worcestershire, salt and pepper in a large stockpot. Bring just to a boil, reduce to a gentle simmer, and cook 30 minutes.","Add chicken. Partially cover and gently simmer 1–1½ hours, until chicken pulls easily from the bone and beef is becoming tender.","Remove meats and cool enough to handle. Discard chicken skin and bones; shred chicken and cut or pull beef into bite-sized pieces. Reserve broth.","Add remaining onion, carrots, celery, potatoes, garlic and tomatoes to broth. Simmer 30–40 minutes until vegetables begin to soften.","Return chicken and beef. Add green beans and corn. Simmer gently 45–60 minutes; some potatoes should break down and thicken the stew.","Add peas for the final 10 minutes.","Remove bay leaves. Stir in soy sauce and lemon juice. Taste; add bouillon 1 tsp at a time only if needed, then adjust salt, pepper or lemon."]),
  notes:'Household document version. Canonical Vault source record remains unchanged. Quantities not supplied by the document are shown as Not specified.',
  shoppingNote:"Lottery #88; household document amounts retained as written; no scaling or inferred quantities.",
  sourceNote:"Owner-authored revised DOCX, cabbage-free household version; distinct from the locked canonical family recipe."
 }),
 'vk-pub-lottery-100-wesleys-kentucky-burgoo-docx-2026':Object.freeze({
  publicationId:"vk-pub-lottery-100-wesleys-kentucky-burgoo-docx-2026",recipeId:"VK-HH-KENTUCKY-BURGOO-REVISED-2026-11-15",recipeVersionId:"VK-HH-KENTUCKY-BURGOO-REVISED-2026-11-15",
  publicationAuthorization:'approved-for-public-web',lotteryIds:[88],
  title:"Wesley’s Kentucky Burgoo",versionType:'owner-approved household document version',
  sourceStatus:"Owner-authored revised DOCX, distinct household version; canonical Vault record remains unchanged.",ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:"10–12 servings; about 4–5 hours",ingredients:Object.freeze([{"name":"Beef chuck, 1½-inch chunks","amount":"2 lb","department":"Meat"},{"name":"Boneless pork shoulder, 1½-inch chunks","amount":"1½ lb","department":"Meat"},{"name":"Bone-in chicken thighs","amount":"2 lb","department":"Meat"},{"name":"Cooking oil","amount":"1 Tbsp","department":"Pantry"},{"name":"Kosher salt","amount":"2 tsp, divided","department":"Seasonings"},{"name":"Black pepper","amount":"1 tsp","department":"Seasonings"},{"name":"Yellow onion, diced","amount":"1 large","department":"Produce"},{"name":"Carrots, sliced","amount":"4","department":"Produce"},{"name":"Celery stalks, sliced","amount":"3","department":"Produce"},{"name":"Yukon Gold or red potatoes, cubed","amount":"1½ lb","department":"Produce"},{"name":"Diced tomatoes","amount":"1 can (14.5 oz)","department":"Canned & Jarred"},{"name":"Frozen corn","amount":"1½ cups","department":"Produce"},{"name":"Frozen lima beans","amount":"1½ cups","department":"Pantry"},{"name":"Frozen green beans","amount":"1 cup","department":"Produce"},{"name":"Chicken or beef stock","amount":"8 cups","department":"Canned & Jarred"},{"name":"Kentucky bourbon","amount":"⅓ cup","department":"Pantry"},{"name":"Bay leaves","amount":"2","department":"Seasonings"},{"name":"Worcestershire sauce","amount":"2 Tbsp","department":"Pantry"},{"name":"Dried thyme","amount":"1 tsp","department":"Seasonings"},{"name":"Garlic powder","amount":"½ tsp","department":"Produce"},{"name":"Black pepper","amount":"½ tsp","department":"Seasonings"},{"name":"Barbecue sauce","amount":"2 Tbsp, plus 1 Tbsp if needed","department":"Pantry"},{"name":"Apple cider vinegar","amount":"1–2 Tbsp","department":"Pantry"},{"name":"Hot sauce","amount":"Optional; amount not specified","department":"Pantry","optional":true},{"name":"Salt","amount":"To taste","department":"Seasonings"}]),steps:Object.freeze(["Heat oil in a Dutch oven or heavy stockpot. Season beef and pork with salt and pepper; brown in batches without crowding. Remove and set aside.","Reduce heat to medium. Add onion, carrots and celery; cook 5–7 minutes, scraping browned bits from the pot.","Remove pot from heat and add bourbon. Return to medium heat and simmer 3–5 minutes, scraping the bottom.","Add stock, tomatoes, Worcestershire, bay leaves, thyme, garlic powder and black pepper. Return beef and pork with their juices; add chicken. Bring to a gentle simmer, partially cover and cook about 1½ hours.","Remove chicken; cool enough to handle, discard skin and bones, shred meat and return it to pot. Check beef and pork tenderness; continue cooking as needed.","Add potatoes and simmer about 45 minutes until some begin to break down.","Add lima beans, corn and green beans. Simmer uncovered or partly covered 30–45 minutes, breaking larger meat pieces as they tenderize.","Stir in 2 Tbsp barbecue sauce and 1 Tbsp vinegar; simmer 15 minutes. Taste and add the remaining barbecue sauce, vinegar, salt or optional hot sauce only as needed."]),
  notes:'Household document version. Canonical Vault source record remains unchanged. Quantities not supplied by the document are shown as Not specified.',
  shoppingNote:"Lottery #89; household document amounts retained as written; no scaling or inferred quantities.",
  sourceNote:"Owner-authored revised DOCX, distinct household version; canonical Vault record remains unchanged."
 }),
 'vk-pub-lottery-100-vk-fam-gumbo-001':Object.freeze({
  publicationId:'vk-pub-lottery-100-vk-fam-gumbo-001',
  recipeId:"VK-FAM-GUMBO-001",
  recipeVersionId:"VK-FAM-GUMBO-001",
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[89],
  title:"Wesley’s Chicken & Sausage Gumbo",
  versionType:"owner-approved source-verified recipe",
  sourceStatus:"Family-original formulation; Vault source is marked verified against the preserved family source.",
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:"8-10 servings",
  ingredients:Object.freeze([{"name":"chicken thighs","amount":"Not specified","department":"Meat"},{"name":"andouille sausage","amount":"Not specified","department":"Meat"},{"name":"oil","amount":"3/4 cup","department":"Pantry","preparation":"roux"},{"name":"flour","amount":"3/4 cup","department":"Baking","preparation":"roux"},{"name":"onion, celery and bell pepper","amount":"Not specified","department":"Produce","preparation":"trinity"},{"name":"stock","amount":"8 cups","department":"Canned & Jarred"}]),
  steps:Object.freeze(["Season and brown the chicken and sausage as established in the family method.","Cook the oil and flour roux until properly developed. The roux is done when the roux is done.","Add the trinity and garlic, then stock and seasonings; return meats and simmer until developed."]),
  notes:"Vault record status: family_original. Amounts not stated in the record are shown as Not specified.",
  shoppingNote:"Lottery #90; ingredients and amounts are reproduced from the approved Vault version. Amounts not documented remain Not specified; no scaling.",
  sourceNote:"Owner-authorized public version of the existing Vault recipe."
 }),
 'vk-pub-lottery-100-vk-fam-porkrind-chickenparm-001':Object.freeze({
  publicationId:'vk-pub-lottery-100-vk-fam-porkrind-chickenparm-001',
  recipeId:"VK-FAM-PORKRIND-CHICKENPARM-001",
  recipeVersionId:"VK-FAM-PORKRIND-CHICKENPARM-001",
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[90],
  title:"Pork-Rind-Crusted Chicken Parmesan",
  versionType:"owner-approved source-verified recipe",
  sourceStatus:"Family-original formulation; Vault source is marked verified against the preserved family source.",
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:"Not specified",
  ingredients:Object.freeze([{"name":"thin chicken cutlets","amount":"4","department":"Meat"},{"name":"eggs","amount":"2","department":"Dairy"},{"name":"crushed pork rinds","amount":"2 cups","department":"Meat"},{"name":"powdered Parmesan","amount":"1/2 cup","department":"Dairy"},{"name":"garlic powder","amount":"1 tsp","department":"Produce"},{"name":"onion powder","amount":"1/2 tsp","department":"Produce"},{"name":"marinara","amount":"1/2 cup","department":"Pantry"},{"name":"mozzarella","amount":"1 cup","department":"Dairy"},{"name":"herbs","amount":"Not specified","department":"Seasonings"}]),
  steps:Object.freeze(["Heat oven to 350°F.","Dip chicken in egg and coat with pork-rind, Parmesan and seasoning mixture.","Bake 15-20 minutes, checking for about 160°F before topping.","Add marinara and mozzarella and bake about 5 minutes more, until chicken reaches 165°F and cheese melts."]),
  notes:"Vault record status: family_original. Amounts not stated in the record are shown as Not specified.",
  shoppingNote:"Lottery #91; ingredients and amounts are reproduced from the approved Vault version. Amounts not documented remain Not specified; no scaling.",
  sourceNote:"Owner-authorized public version of the existing Vault recipe."
 }),
 'vk-pub-lottery-100-vk-fam-tennessee-bourguignon-001':Object.freeze({
  publicationId:'vk-pub-lottery-100-vk-fam-tennessee-bourguignon-001',
  recipeId:"VK-FAM-TENNESSEE-BOURGUIGNON-001",
  recipeVersionId:"VK-FAM-TENNESSEE-BOURGUIGNON-001",
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[91],
  title:"Wesley’s Tennessee Beef Bourguignon",
  versionType:"owner-approved source-verified recipe",
  sourceStatus:"Family-original formulation; Vault source is marked verified against the preserved family source.",
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:"6-8 servings",
  ingredients:Object.freeze([{"name":"beef chuck","amount":"3 lb","department":"Meat"},{"name":"bacon","amount":"Not specified","department":"Meat"},{"name":"Tennessee whiskey","amount":"3/4 cup","department":"Pantry"},{"name":"stock","amount":"3 cups","department":"Canned & Jarred"},{"name":"onion, carrots, garlic and pearl onions","amount":"Not specified","department":"Produce"},{"name":"tomato paste, Worcestershire, thyme and bay","amount":"Not specified","department":"Canned & Jarred"}]),
  steps:Object.freeze(["Brown the bacon and beef and build the stew base with the vegetables.","Use Tennessee whiskey as the defining deglazing/liquid element, then add stock and seasonings.","Braise gently until the beef is tender and the sauce developed; serve with mashed potatoes."]),
  notes:"Vault record status: family_original. Amounts not stated in the record are shown as Not specified.",
  shoppingNote:"Lottery #92; ingredients and amounts are reproduced from the approved Vault version. Amounts not documented remain Not specified; no scaling.",
  sourceNote:"Owner-authorized public version of the existing Vault recipe."
 }),
 'vk-pub-lottery-100-black-butler-curry-buns-wesley-explains':Object.freeze({
  publicationId:"vk-pub-lottery-100-black-butler-curry-buns-wesley-explains",recipeId:"VK-HH-BLACK-BUTLER-CURRY-BUNS-EXPLAINER-001",recipeVersionId:"VK-HH-BLACK-BUTLER-CURRY-BUNS-EXPLAINER-001",
  publicationAuthorization:'approved-for-public-web',lotteryIds:[92],
  title:"Black Butler Curry Buns",versionType:'owner-approved household document version',
  sourceStatus:"Owner-approved Wesley Explains PDF, based on archived Black Butler / Feast of Fiction Curry Buns source. Unspecified quantities remain explicit.",ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:"Not specified",ingredients:Object.freeze([{"name":"Russet potato, peeled","amount":"1","department":"Produce"},{"name":"Carrots, peeled","amount":"2","department":"Produce"},{"name":"Mushrooms","amount":"10","department":"Produce"},{"name":"Large onion","amount":"1","department":"Produce"},{"name":"Meat (source uses beef chunks; other meat or vegetarian version allowed)","amount":"Not specified","department":"Meat"},{"name":"Garlic","amount":"Not specified","department":"Produce"},{"name":"Ginger","amount":"Not specified","department":"Produce"},{"name":"Curry powder","amount":"1 Tbsp","department":"Seasonings"},{"name":"Garam masala","amount":"1 Tbsp","department":"Seasonings"},{"name":"Cayenne pepper","amount":"½ tsp, to taste","department":"Seasonings"},{"name":"Japanese curry roux","amount":"2 cubes","department":"Canned & Jarred"},{"name":"Tomato paste","amount":"1 Tbsp","department":"Canned & Jarred"},{"name":"Cooking wine","amount":"1 cup","department":"Pantry"},{"name":"Water for curry","amount":"1 cup","department":"Pantry","supplyOnly":true},{"name":"Beef broth","amount":"1 cup","department":"Canned & Jarred"},{"name":"Cooking chocolate","amount":"Not specified","department":"Pantry"},{"name":"Bread flour","amount":"2 cups","department":"Baking"},{"name":"Cake flour","amount":"¼ cup","department":"Baking"},{"name":"Yeast","amount":"1 tsp","department":"Pantry"},{"name":"Warm water for dough","amount":"½ cup","department":"Pantry","supplyOnly":true},{"name":"Additional water for dough","amount":"¼ cup","department":"Pantry","supplyOnly":true},{"name":"Sugar","amount":"3 tsp","department":"Pantry"},{"name":"Salt","amount":"1 tsp","department":"Seasonings"},{"name":"Egg, beaten","amount":"1, plus amount for coating not specified","department":"Dairy"},{"name":"Panko breadcrumbs","amount":"Not specified","department":"Baking"},{"name":"Oil for frying","amount":"Not specified","department":"Pantry"}]),steps:Object.freeze(["Activate yeast in ½ cup warm water. Combine dry dough ingredients; work in activated yeast, egg and remaining ¼ cup water. Knead into soft workable dough; let rise until doubled, punch down, then rest under a damp towel.","Slice onion, carrots and mushrooms; mince ginger and garlic; cut meat into manageable pieces. Cook onions over medium-high heat until softened and beginning to brown. Add ginger, garlic, curry powder and tomato paste; cook briefly.","Add meat and stir through onion base. Add cooking wine, lower heat and cook meat. When beef is about halfway cooked, add beef broth and water; bring to a boil.","Skim the surface. Add potato, carrots and mushrooms; cook until potatoes are soft. Mash mixture somewhat until smooth and thick enough to use as filling.","Stir in curry roux, cooking chocolate, garam masala and cayenne; melt and combine. Cool the curry completely.","Punch down rested dough, knead several times and divide into portions. Roll each into a flat circle; add a small amount of cooled curry, pleat/fold edges and seal airtight. Flatten carefully on both sides.","Dip each sealed bun in beaten egg and coat thoroughly with panko. Fry in oil maintained at 325°F, turning until evenly golden and dough is cooked through. Drain on paper towels."]),
  notes:'Household document version. Canonical Vault source record remains unchanged. Quantities not supplied by the document are shown as Not specified.',
  shoppingNote:"Lottery #93; household document amounts retained as written; no scaling or inferred quantities.",
  sourceNote:"Owner-approved Wesley Explains PDF, based on archived Black Butler / Feast of Fiction Curry Buns source. Unspecified quantities remain explicit."
 }),
 'vk-pub-lottery-100-vk-din-countryfriedpork-001':Object.freeze({
  publicationId:'vk-pub-lottery-100-vk-din-countryfriedpork-001',
  recipeId:"VK-DIN-COUNTRYFRIEDPORK-001",
  recipeVersionId:"VK-DIN-COUNTRYFRIEDPORK-001",
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[93],
  title:"Country Fried Pork Chops with Bacon Gravy",
  versionType:"owner-approved household recipe; source transcription pending",
  sourceStatus:"Owner-approved for household use. Vault source transcription remains pending; this publication does not claim source verification.",
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:"Not specified",
  ingredients:Object.freeze([{"name":"bone-in pork chops, about 1/2 inch thick","amount":"4","department":"Meat"},{"name":"flour","amount":"1 cup","department":"Baking"},{"name":"paprika","amount":"1 tsp","department":"Seasonings"},{"name":"garlic powder","amount":"1 tsp","department":"Produce"},{"name":"onion powder","amount":"1 tsp","department":"Produce"},{"name":"salt","amount":"1/2 tsp","department":"Seasonings"},{"name":"pepper","amount":"1/2 tsp","department":"Seasonings"},{"name":"eggs","amount":"2","department":"Dairy"},{"name":"milk","amount":"1/4 cup","department":"Dairy"},{"name":"oil for frying","amount":"Not specified","department":"Pantry"},{"name":"bacon","amount":"4 slices","department":"Meat"},{"name":"bacon grease","amount":"3 Tbsp","department":"Meat"},{"name":"flour, gravy","amount":"3 Tbsp","department":"Baking"},{"name":"whole milk","amount":"2 cups","department":"Dairy"},{"name":"salt and pepper, gravy","amount":"Not specified","department":"Seasonings"}]),
  steps:Object.freeze(["Double-dredge pork chops in seasoned flour and egg-milk mixture.","Fry 3-4 minutes per side, verifying pork reaches 145°F.","Cook bacon; reserve 3 Tbsp bacon grease.","Whisk flour into grease, then gradually add milk and cook into gravy; return bacon and season.","Serve gravy over pork chops."]),
  notes:"Vault record status: source_preserved_transcription_pending. Amounts not stated in the record are shown as Not specified.",
  shoppingNote:"Lottery #94; ingredients and amounts are reproduced from the approved Vault version. Amounts not documented remain Not specified; no scaling.",
  sourceNote:"Owner-authorized household publication; source transcription pending. Do not describe as source-verified."
 }),
 'vk-pub-lottery-100-vk-din-creamycheesechickentortillas-001':Object.freeze({
  publicationId:'vk-pub-lottery-100-vk-din-creamycheesechickentortillas-001',
  recipeId:"VK-DIN-CREAMYCHEESECHICKENTORTILLAS-001",
  recipeVersionId:"VK-DIN-CREAMYCHEESECHICKENTORTILLAS-001",
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[94],
  title:"Tender Chicken Wrapped in Tortillas with Rich, Creamy Cheese Sauce",
  versionType:"owner-approved household recipe; source transcription pending",
  sourceStatus:"Owner-approved for household use. Vault source transcription remains pending; this publication does not claim source verification.",
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:"4 servings",
  ingredients:Object.freeze([{"name":"chicken breasts, diced","amount":"2 large","department":"Meat"},{"name":"olive oil","amount":"2 Tbsp","department":"Pantry"},{"name":"garlic powder","amount":"1 tsp","department":"Produce"},{"name":"onion powder","amount":"1 tsp","department":"Produce"},{"name":"Italian seasoning","amount":"1 tsp","department":"Seasonings"},{"name":"salt and pepper","amount":"Not specified","department":"Seasonings"},{"name":"mozzarella","amount":"1 1/2 cups","department":"Dairy"},{"name":"cheddar, garnish","amount":"1/2 cup","department":"Pantry"},{"name":"tortillas","amount":"4","department":"Pantry"},{"name":"butter","amount":"2 Tbsp","department":"Dairy"},{"name":"garlic","amount":"3 cloves","department":"Produce"},{"name":"flour","amount":"2 Tbsp","department":"Baking"},{"name":"milk","amount":"1 cup","department":"Dairy"},{"name":"mozzarella, sauce","amount":"1 cup","department":"Pantry"},{"name":"cheddar, sauce","amount":"1/4 cup","department":"Pantry"}]),
  steps:Object.freeze(["Heat oven to 375°F. Cook seasoned chicken in olive oil 6-8 minutes.","Make sauce with butter, garlic, flour, milk, mozzarella and cheddar; season to taste.","Fill tortillas with chicken and cheese, roll seam-side down and cover with sauce.","Bake 10-12 minutes and garnish with cheddar."]),
  notes:"Vault record status: source_preserved_transcription_pending. Amounts not stated in the record are shown as Not specified.",
  shoppingNote:"Lottery #95; ingredients and amounts are reproduced from the approved Vault version. Amounts not documented remain Not specified; no scaling.",
  sourceNote:"Owner-authorized household publication; source transcription pending. Do not describe as source-verified."
 }),
 'vk-pub-lottery-100-vk-din-garlicparm-pastabake-001':Object.freeze({
  publicationId:'vk-pub-lottery-100-vk-din-garlicparm-pastabake-001',
  recipeId:"VK-DIN-GARLICPARM-PASTABAKE-001",
  recipeVersionId:"VK-DIN-GARLICPARM-PASTABAKE-001",
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[95],
  title:"Garlic Parmesan Chicken Pasta Bake",
  versionType:"owner-approved household recipe; source transcription pending",
  sourceStatus:"Owner-approved for household use. Vault source transcription remains pending; this publication does not claim source verification.",
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:"Not specified",
  ingredients:Object.freeze([{"name":"rotini","amount":"1 lb","department":"Pasta"},{"name":"cooked chicken","amount":"3 cups","department":"Meat"},{"name":"Alfredo sauce","amount":"2 x 15 oz","department":"Pantry"},{"name":"garlic Parmesan sauce","amount":"1 cup","department":"Pantry"},{"name":"mozzarella","amount":"2 cups","department":"Dairy"},{"name":"Parmesan","amount":"1/2 cup","department":"Dairy"},{"name":"salt","amount":"1/2 tsp","department":"Seasonings"},{"name":"pepper","amount":"1/2 tsp","department":"Seasonings"},{"name":"parsley, optional","amount":"Not specified","department":"Produce"}]),
  steps:Object.freeze(["Heat oven to 375°F and cook rotini.","Combine pasta, chicken, sauces and half the cheeses; add about 1/2 cup reserved pasta water only if needed.","Transfer to a 9x13 dish, top with remaining cheese, cover and bake 20-25 minutes.","Broil 2-3 minutes if desired; rest 5 minutes."]),
  notes:"Vault record status: source_preserved_transcription_pending. Amounts not stated in the record are shown as Not specified.",
  shoppingNote:"Lottery #96; ingredients and amounts are reproduced from the approved Vault version. Amounts not documented remain Not specified; no scaling.",
  sourceNote:"Owner-authorized household publication; source transcription pending. Do not describe as source-verified."
 }),
 'vk-pub-lottery-100-vk-din-garlicparm-eggyolksoup-001':Object.freeze({
  publicationId:'vk-pub-lottery-100-vk-din-garlicparm-eggyolksoup-001',
  recipeId:"VK-DIN-GARLICPARM-EGGYOLKSOUP-001",
  recipeVersionId:"VK-DIN-GARLICPARM-EGGYOLKSOUP-001",
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[96],
  title:"Garlic-Rich Parmesan Egg-Yolk Soup",
  versionType:"owner-approved household recipe; source transcription pending",
  sourceStatus:"Owner-approved for household use. Vault source transcription remains pending; this publication does not claim source verification.",
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:"Not specified",
  ingredients:Object.freeze([{"name":"garlic","amount":"2 heads","department":"Produce"},{"name":"olive oil","amount":"1 Tbsp","department":"Pantry"},{"name":"onion","amount":"Not specified","department":"Produce"},{"name":"butter","amount":"2 Tbsp","department":"Dairy"},{"name":"broth","amount":"6 cups","department":"Canned & Jarred"},{"name":"thyme","amount":"Not specified","department":"Seasonings"},{"name":"bay leaf","amount":"Not specified","department":"Seasonings"},{"name":"salt and pepper","amount":"Not specified","department":"Seasonings"},{"name":"egg yolks","amount":"4","department":"Dairy"},{"name":"Parmesan","amount":"1/2 cup","department":"Dairy"},{"name":"bread","amount":"Not specified","department":"Baking"},{"name":"parsley","amount":"Not specified","department":"Produce"}]),
  steps:Object.freeze(["Cook onion in butter about 5 minutes; add garlic and cook 2-3 minutes.","Add broth and herbs and simmer about 30 minutes, then remove the herbs.","Temper egg yolks with Parmesan and hot broth, then whisk the mixture into the soup.","Simmer gently while stirring about 5 minutes; serve with bread and parsley."]),
  notes:"Vault record status: source_preserved_transcription_pending. Amounts not stated in the record are shown as Not specified.",
  shoppingNote:"Lottery #97; ingredients and amounts are reproduced from the approved Vault version. Amounts not documented remain Not specified; no scaling.",
  sourceNote:"Owner-authorized household publication; source transcription pending. Do not describe as source-verified."
 }),
 'vk-pub-lottery-100-vk-din-hauntedbourbonsteak-001':Object.freeze({
  publicationId:'vk-pub-lottery-100-vk-din-hauntedbourbonsteak-001',
  recipeId:"VK-DIN-HAUNTEDBOURBONSTEAK-001",
  recipeVersionId:"VK-DIN-HAUNTEDBOURBONSTEAK-001",
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[97],
  title:"Steak with Haunted Bourbon Garlic Cream Sauce",
  versionType:"owner-approved household recipe; source transcription pending",
  sourceStatus:"Owner-approved for household use. Vault source transcription remains pending; this publication does not claim source verification.",
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:"Not specified",
  ingredients:Object.freeze([{"name":"ribeye or New York strip steaks, about 1 inch thick","amount":"2","department":"Meat"},{"name":"olive oil","amount":"2 Tbsp","department":"Pantry"},{"name":"salt and pepper","amount":"Not specified","department":"Seasonings"},{"name":"butter","amount":"2 Tbsp","department":"Dairy"},{"name":"garlic, smashed","amount":"2 cloves","department":"Produce"},{"name":"thyme or rosemary, optional","amount":"Not specified","department":"Seasonings"},{"name":"bourbon","amount":"1/4 cup","department":"Pantry"},{"name":"garlic, minced","amount":"3 cloves","department":"Produce"},{"name":"butter","amount":"1 Tbsp","department":"Dairy"},{"name":"heavy cream","amount":"1 cup","department":"Dairy"},{"name":"Dijon mustard","amount":"1 Tbsp","department":"Pantry"},{"name":"Worcestershire","amount":"1 tsp","department":"Pantry"},{"name":"cayenne","amount":"1/4 tsp","department":"Seasonings"},{"name":"Parmesan","amount":"1/4 cup","department":"Dairy"},{"name":"parsley","amount":"Not specified","department":"Produce"}]),
  steps:Object.freeze(["Sear steaks 3-4 minutes per side; butter-baste with smashed garlic and optional herbs, then rest.","In the same skillet cook butter and minced garlic 1-2 minutes.","Add bourbon and simmer 1-2 minutes, then add cream, Dijon, Worcestershire and cayenne; simmer 3-4 minutes.","Stir in Parmesan, season and serve sauce with steak and parsley."]),
  notes:"Vault record status: source_preserved_transcription_pending. Amounts not stated in the record are shown as Not specified.",
  shoppingNote:"Lottery #98; ingredients and amounts are reproduced from the approved Vault version. Amounts not documented remain Not specified; no scaling.",
  sourceNote:"Owner-authorized household publication; source transcription pending. Do not describe as source-verified."
 }),
 'vk-pub-lottery-100-vk-din-honeypepperchickenmac-001':Object.freeze({
  publicationId:'vk-pub-lottery-100-vk-din-honeypepperchickenmac-001',
  recipeId:"VK-DIN-HONEYPEPPERCHICKENMAC-001",
  recipeVersionId:"VK-DIN-HONEYPEPPERCHICKENMAC-001",
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[98],
  title:"Sweet & Spicy Honey Pepper Chicken with Creamy Macaroni Cheese",
  versionType:"owner-approved household recipe; source transcription pending",
  sourceStatus:"Owner-approved for household use. Vault source transcription remains pending; this publication does not claim source verification.",
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:"Not specified",
  ingredients:Object.freeze([{"name":"boneless skinless chicken breasts","amount":"4","department":"Meat"},{"name":"honey","amount":"1/2 cup","department":"Pantry"},{"name":"soy sauce","amount":"2 Tbsp","department":"Pantry"},{"name":"hot sauce","amount":"2 Tbsp","department":"Pantry"},{"name":"apple cider vinegar","amount":"1 Tbsp","department":"Pantry"},{"name":"crushed red pepper, optional","amount":"1 tsp","department":"Seasonings"},{"name":"salt and pepper","amount":"Not specified","department":"Seasonings"},{"name":"oil","amount":"1 Tbsp","department":"Pantry"},{"name":"elbow macaroni","amount":"2 cups","department":"Pasta"},{"name":"sharp cheddar","amount":"2 cups","department":"Pantry"},{"name":"mozzarella","amount":"1 cup","department":"Dairy"},{"name":"whole milk","amount":"2 cups","department":"Dairy"},{"name":"butter","amount":"1/4 cup","department":"Dairy"},{"name":"flour","amount":"1/4 cup","department":"Baking"},{"name":"garlic powder","amount":"1/2 tsp","department":"Produce"},{"name":"onion powder","amount":"1/2 tsp","department":"Produce"},{"name":"parsley","amount":"Not specified","department":"Produce"}]),
  steps:Object.freeze(["Whisk together the honey, soy sauce, hot sauce, apple cider vinegar, and optional crushed red pepper flakes. Set half the sauce aside before it touches raw chicken. Marinate the chicken in the other half in the refrigerator for at least 30 minutes or up to 2 hours.","Heat the oil in a large skillet over medium-high heat. Remove the chicken from the marinade, discard the used marinade, and season both sides with salt and pepper. Sear about 5–6 minutes per side, or until safely cooked through. Pour the untouched reserved sauce over the chicken and baste for another 2–3 minutes. Remove from heat and set aside.","While the chicken cooks, bring a large pot of salted water to a boil. Cook the elbow macaroni according to package directions; drain and set aside.","Melt the butter in a medium saucepan over medium heat. Whisk in the flour and cook the roux for 1–2 minutes until golden. Gradually whisk in the milk, stirring constantly until thickened, about 3–4 minutes. Add garlic powder, onion powder, salt, and pepper.","Reduce the heat to low and stir in the sharp cheddar and mozzarella until fully melted and the sauce is smooth.","Stir the cooked macaroni into the cheese sauce until fully coated. Taste and adjust seasoning as needed.","Serve the honey-pepper chicken alongside the creamy macaroni and cheese, garnished with fresh chopped parsley."]),
  notes:"Vault record status: source_preserved_transcription_pending. Amounts not stated in the record are shown as Not specified.",
  shoppingNote:"Lottery #99; ingredients and amounts are reproduced from the approved Vault version. Amounts not documented remain Not specified; no scaling.",
  sourceNote:"Owner-authorized household publication; source transcription pending. Do not describe as source-verified."
 }),
 'vk-pub-lottery-100-vk-din-macmeatloaf-001':Object.freeze({
  publicationId:'vk-pub-lottery-100-vk-din-macmeatloaf-001',
  recipeId:"VK-DIN-MACMEATLOAF-001",
  recipeVersionId:"VK-DIN-MACMEATLOAF-001",
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[99],
  title:"Mac and Cheese Meatloaf Casserole",
  versionType:"owner-approved household recipe; source transcription pending",
  sourceStatus:"Owner-approved for household use. Vault source transcription remains pending; this publication does not claim source verification.",
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:"Not specified",
  ingredients:Object.freeze([{"name":"ground beef","amount":"1 lb","department":"Meat"},{"name":"breadcrumbs","amount":"1/2 cup","department":"Baking"},{"name":"egg","amount":"1","department":"Dairy"},{"name":"ketchup","amount":"1/4 cup","department":"Pantry"},{"name":"Worcestershire","amount":"1 Tbsp","department":"Pantry"},{"name":"garlic","amount":"1 tsp","department":"Produce"},{"name":"onion","amount":"1 tsp","department":"Produce"},{"name":"salt and pepper","amount":"Not specified","department":"Seasonings"},{"name":"cooked elbow macaroni","amount":"2 cups","department":"Pasta"},{"name":"butter","amount":"2 Tbsp","department":"Dairy"},{"name":"flour","amount":"2 Tbsp","department":"Baking"},{"name":"milk","amount":"2 cups","department":"Dairy"},{"name":"cheddar","amount":"2 cups","department":"Pantry"},{"name":"mustard, optional","amount":"1/4 tsp","department":"Pantry"},{"name":"cheddar, topping","amount":"1/2 cup","department":"Pantry"},{"name":"breadcrumbs, optional topping","amount":"1/4 cup","department":"Baking"}]),
  steps:Object.freeze(["Heat oven to 375°F.","Combine meatloaf ingredients and bake 20-25 minutes.","Make the cheese sauce with butter, flour, milk and cheddar; combine with macaroni.","Layer over meatloaf, add topping and bake another 15-20 minutes; rest 5 minutes."]),
  notes:"Vault record status: source_preserved_transcription_pending. Amounts not stated in the record are shown as Not specified.",
  shoppingNote:"Lottery #100; ingredients and amounts are reproduced from the approved Vault version. Amounts not documented remain Not specified; no scaling.",
  sourceNote:"Owner-authorized household publication; source transcription pending. Do not describe as source-verified."
 }),
 'vk-pub-cajun-chicken-alfredo-screenshot-001':Object.freeze({
  publicationId:'vk-pub-cajun-chicken-alfredo-screenshot-001',
  recipeId:'VK-HH-SLOW-COOKER-CAJUN-CHICKEN-ALFREDO-001',
  recipeVersionId:'VK-HH-SLOW-COOKER-CAJUN-CHICKEN-ALFREDO-SCREENSHOT-2026-11-17',
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[22],
  title:'Slow Cooker Cajun Chicken Alfredo',
  versionType:'owner-approved screenshot transcription (Cajun Alfredo version)',
  sourceStatus:'Ingredient list and visible instructions transcribed against the owner-supplied Meatdad Family screenshot. This is a separate Cajun Alfredo version, not a Vault-canonical Chicken Alfredo recipe.',
  ingredientStatus:'complete',methodStatus:'incomplete',householdSubstitutionsResolved:true,
  yieldText:'Not specified',
  ingredients:Object.freeze([
   {name:'Olive oil',amount:'1 Tbsp',department:'Pantry'},
   {name:'Chicken breasts',amount:'1 lb',department:'Meat'},
   {name:'Smoked sausage, sliced into 1-inch pieces',amount:'1 lb',department:'Meat'},
   {name:'Heavy cream',amount:'3 cups',department:'Dairy'},
   {name:'Low-sodium chicken broth',amount:'4 cups',department:'Canned & Jarred'},
   {name:'Butter',amount:'4 Tbsp',department:'Dairy'},
   {name:'Coarse Cajun seasoning',amount:'2 Tbsp',department:'Seasonings'},
   {name:'Garlic cloves, smashed',amount:'2 cloves',department:'Produce'},
   {name:'Uncooked penne pasta',amount:'1 lb',department:'Pasta'},
   {name:'Hot water',amount:'1/2 cup',supplyOnly:true},
   {name:'Freshly shredded Parmesan cheese',amount:'8 oz (about 2 1/2 cups)',department:'Dairy'},
   {name:'Kosher salt',amount:'1/2 tsp stated in visible method',department:'Seasonings'},
   {name:'Black pepper',amount:'Several turns, amount not specified',department:'Seasonings'},
   {name:'Garlic powder',amount:'A sprinkle, amount not specified',department:'Seasonings'}
  ]),
  steps:Object.freeze([
   'Pat chicken breasts dry and season with salt, pepper, and a sprinkle of garlic powder. Heat olive oil over high heat and quickly sear chicken breasts on both sides.',
   'Add chicken breasts, sausage, heavy cream, chicken broth, butter, garlic cloves, 1/2 teaspoon kosher salt, Cajun seasoning, and several turns of freshly ground black pepper to the slow cooker.'
  ]),
  notes:'The screenshot ends after the ingredients are added to the slow cooker. Remaining cook time, when to add the pasta and Parmesan, and final cooking instructions are not visible; this version is not marked cook-ready.',
  shoppingNote:'Lottery #23. Source amounts are shown as written. Water is listed in the recipe but excluded from groceries as a kitchen supply.',
  sourceNote:'Owner-supplied screenshot transcription; the visible screenshot is the transcription reference.'
 }),

 'vk-pub-beef-tips-noodles-screenshot-001':Object.freeze({
  publicationId:'vk-pub-beef-tips-noodles-screenshot-001',
  recipeId:'VK-HH-CROCKPOT-BEEF-TIPS-NOODLES-SCREENSHOT-001',
  recipeVersionId:'VK-HH-CROCKPOT-BEEF-TIPS-NOODLES-SCREENSHOT-2026-11-17',
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[40],
  title:'Crockpot Beef Tips & Noodles — Screenshot Version',
  versionType:'owner-approved screenshot transcription',
  sourceStatus:'Ingredient list and instructions transcribed and checked against the owner-supplied Crockpot Recipes And… screenshot. This is a distinct screenshot version; no Vault-canonical recipe is replaced.',
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:'Not specified',
  ingredients:Object.freeze([
   {name:'Stew meat',amount:'1 lb',department:'Meat'},
   {name:'Lipton onion soup mix',amount:'1 packet',department:'Seasonings'},
   {name:'Brown gravy mix',amount:'1 packet',department:'Seasonings'},
   {name:'Cream of mushroom soup',amount:'1 can (10.5 oz)',department:'Canned & Jarred'},
   {name:'Mushrooms',amount:'1 small can',department:'Canned & Jarred'},
   {name:'Beef broth',amount:'1 can’s worth; volume not specified',department:'Canned & Jarred',preparation:'The post says it was measured using the empty cream-of-mushroom can.'},
   {name:'Egg noodles',amount:'Not specified',department:'Pasta'}
  ]),
  steps:Object.freeze([
   'Put all ingredients except the noodles in the crockpot and mix.',
   'Cook on LOW for 8 hours. Cook the noodles when the beef mixture is done; serve with the noodles.'
  ]),
  notes:'Contains cream of mushroom soup and canned mushrooms. The post says the author would use 2 lb meat next time with the same measurements; the documented recipe amount remains 1 lb.',
  shoppingNote:'Lottery #41. Egg-noodle quantity and broth volume are not specified; no amount is inferred.',
  sourceNote:'Owner-supplied screenshot transcription; quantities and method reflect the visible post.'
 }),

 'vk-pub-bbq-bacon-cheeseburger-casserole-screenshot-001':Object.freeze({
  publicationId:'vk-pub-bbq-bacon-cheeseburger-casserole-screenshot-001',
  recipeId:'VK-HH-BBQ-BACON-CHEESEBURGER-CASSEROLE-001',
  recipeVersionId:'VK-HH-BBQ-BACON-CHEESEBURGER-CASSEROLE-SCREENSHOT-2026-11-17',
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[51],
  title:'BBQ Bacon Cheeseburger Casserole',
  versionType:'owner-approved screenshot transcription (casserole version)',
  sourceStatus:'Ingredient list and instructions transcribed against the owner-supplied Savory Eats & Sweets screenshot. This is a distinct casserole version associated with the Bacon Cheeseburger Pasta lottery choice.',
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:'Not specified',
  ingredients:Object.freeze([
   {name:'Ground beef',amount:'1 lb',department:'Meat'},
   {name:'Bacon, cooked and crumbled',amount:'4 slices',department:'Meat'},
   {name:'Barbecue sauce',amount:'1 cup',department:'Pantry'},
   {name:'Shredded cheese',amount:'2 cups',department:'Dairy'},
   {name:'Cooked pasta',amount:'4 cups; type not specified',department:'Pasta'}
  ]),
  steps:Object.freeze([
   'Preheat oven to 350°F (175°C).',
   'Brown the ground beef, then mix in barbecue sauce, bacon, and cooked pasta.',
   'In a baking dish, layer the mixture with cheese on top. Bake for 20 minutes until the cheese is bubbly.'
  ]),
  notes:'The screenshot does not specify pasta type, yield, or the cooking time for the pasta.',
  shoppingNote:'Lottery #52. Four cups is the documented amount of cooked pasta; no dry-pasta conversion is inferred.',
  sourceNote:'Owner-supplied screenshot transcription; no unlisted ingredient or quantity has been added.'
 }),

 'vk-pub-breakfast-sliders-screenshot-001':Object.freeze({
  publicationId:'vk-pub-breakfast-sliders-screenshot-001',
  recipeId:'VK-HH-SAUSAGE-EGG-CHEESE-BREAKFAST-SLIDERS-001',
  recipeVersionId:'VK-HH-SAUSAGE-EGG-CHEESE-BREAKFAST-SLIDERS-SCREENSHOT-2026-11-17',
  publicationAuthorization:'approved-for-public-web',
  lotteryIds:[76],
  title:'Sausage Egg and Cheese Breakfast Sliders',
  versionType:'owner-approved screenshot transcription (slider version)',
  sourceStatus:'Ingredient list and instructions transcribed against the owner-supplied Tasty Recipes & Nutrition screenshot. This is a distinct slider version associated with the Sausage Egg & Cheese Biscuits lottery choice.',
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  yieldText:'12 sliders',
  ingredients:Object.freeze([
   {name:'Ground pork breakfast sausage',amount:'24 oz (2 breakfast sausage rolls, such as Jimmy Dean)',department:'Meat'},
   {name:'Hawaiian buns or other slider buns',amount:'12',department:'Bakery'},
   {name:'Large eggs, scrambled',amount:'8',department:'Dairy'},
   {name:'Pepper jack cheese',amount:'6 slices',department:'Dairy'},
   {name:'American cheese',amount:'8 slices',department:'Dairy'},
   {name:'Butter, melted',amount:'1/2 cup',department:'Dairy'},
   {name:'Maple syrup',amount:'1/4 cup',department:'Pantry'}
  ]),
  steps:Object.freeze([
   'Preheat oven to 350°F.',
   'Warm a large skillet over medium heat. Form the sausage into 12 patties slightly larger than one dinner roll. Cook until completely cooked through.',
   'Using a serrated knife, cut the rolls in half lengthwise without separating them. Place the bottom half in a 7x10-inch or 9x13-inch baking dish.',
   'Spoon scrambled eggs onto the bottom rolls and top with pepper jack. Place sausage patties on top, add American cheese, then replace the top buns.',
   'Combine melted butter and maple syrup. Brush over the tops of the rolls, letting the sauce drip down the sides and into the bottom; use the entire amount.',
   'Bake for 15–20 minutes, until the cheese is bubbly and melted.',
   'Serve. The post also says the sliders can be prepared a day ahead and reheated in the oven before serving.'
  ]),
  notes:'The screenshot lists 24 ounces of ground pork sausage and describes it as two breakfast sausage rolls. The source does not provide a separate safe-temperature endpoint.',
  shoppingNote:'Lottery #77. Ingredients and quantities reflect the screenshot; no scaling is applied.',
  sourceNote:'Owner-supplied screenshot transcription; the visible screenshot is the transcription reference.'
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
