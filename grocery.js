'use strict';
// Household planning templates are estimates, not source-faithful recipe transcriptions.
// Keyed by immutable zero-based lottery ID. Unmapped meals are explicitly reported.
const SHOPPING_TEMPLATES = Object.freeze({
  // Household ingredient lists from the Oct 19–25 Drive packet and the recovered private Cooking Vault.
  // Kitchen Test Draft & Vault agree on Taco Casserole's fuller amounts; original source-image comparison remains pending.
  // These are shopping templates, not protected source-faithful recipe transcriptions.
  // #1 Breakfast Tacos: optional condiments chosen per person; cook's choice is cubed ham.
  0:[['Bakery','Street taco tortillas','8 tortillas'],['Meat','Cooked cubed ham','8 oz'],['Dairy','Eggs','6 large'],['Dairy','Shredded cheese','1 cup'],['Dairy','Butter','for skillet, as needed'],['Seasonings','Salt','to taste'],['Seasonings','Black pepper','to taste']],
  // #6 Taco Casserole: use recovered Vault + cookbook quantities for standard household shopping.
  // The Oct 2026 weeknight packet uses ~10 oz Rotel and leaves the toppings unmeasured; that remains a separate variation.
  // Original screenshot is NOT independently verified. Water (1/2 cup) is a kitchen supply, not a purchase.
  // Rotel amount is total ounces: check actual can sizes instead of assuming a 14.5-oz can exists.
  5:[['Meat','Ground beef','2 lb'],['Seasonings','Taco seasoning','2 packets'],['Canned & Jarred','Black beans','1 can (15 oz)'],['Canned & Jarred','Rotel diced tomatoes and chilies','14.5 oz total (check can size)'],['Canned & Jarred','Salsa','1 1/2 cups'],['Dairy','Shredded Mexican-blend cheese','2 cups'],['Snacks','Tortilla chips','4 cups'],['Dairy','Sour cream','1 cup'],['Produce','Green onions','2']],
  // #4 Pepperoni Pizza Grilled Cheese, recovered Vault record VK-DIN-PIZZAGRILLEDCHEESE-001.
  // Archive yield 2 sandwiches; uses the source's pizza-sauce OR marinara option (pizza sauce chosen for household shopping).
  // Original archive screenshot not independently reverified. Optional 1 tsp garlic is excluded from required purchases.
  3:[['Bakery','Bread','4 slices'],['Meat','Pepperoni','8 slices'],['Dairy','Shredded mozzarella','1 cup'],['Canned & Jarred','Pizza sauce','2 Tbsp'],['Dairy','Butter','2 Tbsp'],['Seasonings','Oregano','1 tsp']],
  // #53 Sausage & Potato Foil Packets, recovered Vault record VK-DIN-SAUSAGEPOTATO-FOILPACKETS-001.
  // Original image verification pending; split "salt and black pepper to taste" for grocery checklist only.
  // Yield/serving count not documented; do not scale to five people automatically.
  52:[['Meat','Smoked sausage','1 lb'],['Produce','Baby potatoes','1 1/2 lb'],['Produce','Red bell pepper','1'],['Produce','Green bell pepper','1'],['Produce','Onion','1 small'],['Oils','Olive oil','3 Tbsp'],['Seasonings','Garlic powder','2 tsp'],['Seasonings','Italian seasoning','1 tsp'],['Seasonings','Paprika','1 tsp'],['Seasonings','Salt','to taste'],['Seasonings','Black pepper','to taste']],
  7:[['Pasta','Spaghetti','1 box'],['Meat','Frozen meatballs','1 bag'],['Canned & Jarred','Marinara sauce','1 jar']],
  15:[['Bakery','Mini pizza crusts','1 package'],['Dairy','Shredded mozzarella','1 bag'],['Canned & Jarred','Pizza sauce','1 jar'],['Meat','Pepperoni','1 package']],
  19:[['Bakery','Texas toast','1 loaf'],['Dairy','Eggs','1 dozen'],['Meat','Breakfast sausage','1 package']],
  40:[['Meat','Beef tips or chuck roast','about 2 lb'],['Pasta','Wide egg noodles','1 bag'],['Canned & Jarred','Beef broth','1 carton'],['Canned & Jarred','Brown gravy mix','2 packets']],
  2:[['Meat','Ground beef','about 1.5 lb'],['Bakery','Slider buns','1 package'],['Dairy','Sliced cheese','1 package'],['Frozen','Frozen fries','1 bag']]
});
// Partial templates include only confirmed fixed ingredients. Never advertise them as complete
// or score them in pantry-first recommendations. Variable choices stay manual.
const SHOPPING_PARTIAL_TEMPLATES=Object.freeze({
  // #12 Garbage Bread: locked VK-FAM-GARBAGEBREAD-001 family formulation.
  // Method specifies one pizza dough for one loaf, with about one pound of ground beef.
  // Cheese and other fillings are "as desired" and MUST be added to groceries manually.
  11:[['Bakery','Pizza dough','1 dough (for 1 loaf)'],['Meat','Ground beef','about 1 lb']],
  // #18 Cowboy Casserole: exact-name recovered Vault record VK-DIN-COWBOYCASSEROLE-001.
  // Original recipe explicitly requires 1 can cream of mushroom soup, which is withheld
  // from household purchasing pending an approved mushroom-free replacement. DO NOT score
  // this as a complete family recipe or silently claim the recovered source is verified.
  17:[['Meat','Lean ground beef','1 lb'],['Produce','Onion','1 small'],['Produce','Minced garlic','1 tsp'],['Frozen','Corn','1 cup'],['Dairy','Cheddar cheese','1 cup'],['Dairy','Milk','1/2 cup'],['Dairy','Sour cream','1/2 cup'],['Seasonings','Salt','1 tsp'],['Seasonings','Black pepper','1 tsp'],['Frozen','Frozen tater tots','1 bag']],
  // #50 Hamburger Potato Casserole: cookbook #114 contains a recovered ingredient
  // body but the corresponding Vault record's ingredient array is empty. Lower-confidence
  // MANUSCRIPT recovery; original image NOT independently verified. Original includes
  // 1 can cream of mushroom soup. Shopping omits it pending an APPROVED family adaptation.
  49:[['Produce','Potatoes','1 1/2 lb'],['Meat','Ground beef','1 lb'],['Dairy','Milk','3/4 cup'],['Dairy','Cheddar cheese','1 1/2 cups'],['Seasonings','Salt','to taste'],['Seasonings','Black pepper','to taste']]
});
// Per-recipe quantity context is informational; optional ingredients are not auto-added to required buys.
const SHOPPING_RECIPE_NOTES=Object.freeze({
  3:'Pepperoni Pizza Grilled Cheese: archived quantities yield 2 sandwiches, not 5 servings. Optional garlic: 1 tsp (type unspecified), not included in required shopping.',
  52:'Sausage & Potato Foil Packets: archived yield is unspecified; do not assume quantities cover five people.',
  11:'Garbage Bread — PARTIAL ingredient list: one pizza dough + about 1 lb ground beef makes one loaf. Choose the cheese, fillings, and seasoning you want and add them to the grocery list manually. The family source intentionally leaves these amounts open.',
  40:'Beef Tips & Noodles — household planning estimate only. A separately archived crockpot recipe uses cream of mushroom soup and canned mushrooms; this estimate does NOT represent that original. Verify the exact household version before cooking.',
  17:'Cowboy Casserole — PARTIAL, NOT COOK-READY. Recovered original requires 1 can cream of mushroom soup, intentionally not on this household buy list. An approved mushroom-free creamy base has NOT been selected. Choose and add a suitable approved replacement manually before cooking. Original image verification remains pending; no serving yield established.',
  49:'Hamburger Potato Casserole — PARTIAL, NOT COOK-READY. Recovered cookbook lists 1 can cream of mushroom soup, intentionally withheld pending an approved mushroom-free household replacement. Select and add that replacement manually. The Vault ingredient record is still empty and the original source image has NOT been reverified; no serving yield established.'
});
const GROCERY_KEY='vk-grocery-v03';
function groceryLoad(){try{const x=JSON.parse(localStorage.getItem(GROCERY_KEY));return x&&typeof x==='object'&&Array.isArray(x.checked)?x:{checked:[],extras:[],pantry:[]}}catch{return {checked:[],extras:[],pantry:[]}}}
let groceryState=groceryLoad();
function grocerySave(){localStorage.setItem(GROCERY_KEY,JSON.stringify(groceryState))}
// A checked grocery item is still on the shopping list, but no longer needs buying.
// Pantry items are counted separately; checked items are not removed or marked as pantry.
function groceryProgressLabel(toBuy,checked,pantryCount){
 const done=new Set((Array.isArray(checked)?checked:[]).filter(x=>typeof x==='string').map(x=>x.toLowerCase()));
 const checkedOff=toBuy.filter(item=>done.has(item.ingredient.toLowerCase())).length;
 const remaining=toBuy.length-checkedOff;
 return remaining+' item'+(remaining===1?'':'s')+' remaining • '+checkedOff+' checked off • '+pantryCount+' already on hand.';
}
function groceryWeekIds(){return [...new Set((state.schedule.length?state.schedule:allIds()).filter(validId))]}
function groceryRender(){
 const root=document.getElementById('groceryContent');if(!root)return;root.replaceChildren();
 const ids=groceryWeekIds();
 const partial=ids.filter(id=>!!SHOPPING_PARTIAL_TEMPLATES[id]&&!SHOPPING_TEMPLATES[id]);
 const missing=ids.filter(id=>!SHOPPING_TEMPLATES[id]&&!SHOPPING_PARTIAL_TEMPLATES[id]);
 const source=state.schedule.length?'This week’s calendar':'current lottery selections';
 root.append(node('p','subtle','Shopping list follows '+source+'. Change scheduled dinners to update the list.'));
 const covered=ids.length-missing.length-partial.length;
 const coverage='Ingredient coverage: '+covered+' complete shopping template(s), '+partial.length+' partial, '+missing.length+' unmapped of '+ids.length+' dinner(s). ';
 const notice=node('p','subtle',!ids.length?'No dinners selected yet. Add a meal to the weekly calendar or lottery to begin.':coverage+
   (missing.length?'Recipes not yet mapped: '+missing.map(id=>name(id)).join(', ')+'. ':'')+
   (partial.length?'Partial recipes: '+partial.map(id=>name(id)).join(', ')+'. Choose any variable fillings yourself and add them manually. ':'')+
   ((missing.length||partial.length)?'This is not a complete grocery list.':'All selected meals have household planning templates; check quantities before shopping.'));
 root.append(notice);
 for(const id of ids)if(SHOPPING_RECIPE_NOTES[id])root.append(node('p','subtle',SHOPPING_RECIPE_NOTES[id]));
 const items=new Map();
 for(const id of ids)for(const [department,ingredient,amount] of (SHOPPING_TEMPLATES[id]||SHOPPING_PARTIAL_TEMPLATES[id]||[])){
  const key=ingredient.toLowerCase();if(!items.has(key))items.set(key,{department,ingredient,amounts:[]});
  items.get(key).amounts.push(amount);
 }
 const all=[...items.values()].map(x=>({...x,amount:x.amounts.join(' + ')}));
 for(const extra of groceryState.extras||[])if(extra&&typeof extra.name==='string')all.push({department:'Other',ingredient:extra.name,amount:'Manual'});
 all.sort((a,b)=>a.department.localeCompare(b.department)||a.ingredient.localeCompare(b.ingredient));
 const onHand=all.filter(item=>typeof pantryHas==='function'&&pantryHas(item.ingredient));
 const toBuy=all.filter(item=>!(typeof pantryHas==='function'&&pantryHas(item.ingredient)));
 const summary=node('p','subtle',groceryProgressLabel(toBuy,groceryState.checked,onHand.length));
 summary.setAttribute('role','status');
 summary.setAttribute('aria-live','polite');
 root.append(summary);

 if(!all.length)root.append(node('p','subtle','Select meals or add items to start your list.'));
 let current='';
 for(const item of toBuy){if(item.department!==current){current=item.department;root.append(node('h4','grocery-dept',current))}
  const label=node('label','grocery-item');const box=node('input');box.type='checkbox';const key=item.ingredient.toLowerCase();box.checked=groceryState.checked.includes(key);box.onchange=()=>{
   groceryState.checked=box.checked?[...new Set([...groceryState.checked,key])]:groceryState.checked.filter(x=>x!==key);
   grocerySave();
   // Update the summary immediately without redrawing the checkbox list or losing mobile scroll/focus.
   summary.textContent=groceryProgressLabel(toBuy,groceryState.checked,onHand.length);
  };
  const info=node('span',null,item.ingredient+' — '+item.amount);label.append(box,info);root.append(label);
 }
 if(onHand.length){root.append(node('h4','grocery-dept','Already have — pantry'));for(const item of onHand)root.append(node('p','subtle',item.ingredient+' — '+item.amount))}
}
function groceryInit(){
 const add=document.getElementById('groceryAdd'),input=document.getElementById('groceryExtra');
 if(!add||!input)return;
 add.onclick=()=>{const v=input.value.trim();if(!v)return;groceryState.extras.push({name:v});input.value='';grocerySave();groceryRender()};
 document.getElementById('groceryClear').onclick=()=>{if(!confirm('Clear grocery checkmarks and manual additions?'))return;groceryState={checked:[],extras:[],pantry:[]};grocerySave();groceryRender()};
 groceryRender();
}
groceryInit();
if(typeof pantryInit==='function')pantryInit();
