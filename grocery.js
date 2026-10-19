'use strict';
// Household planning templates are estimates, not source-faithful recipe transcriptions.
// Keyed by immutable zero-based lottery ID. Unmapped meals are explicitly reported.
const SHOPPING_TEMPLATES = Object.freeze({
  7:[['Pasta','Spaghetti','1 box'],['Meat','Frozen meatballs','1 bag'],['Canned & Jarred','Marinara sauce','1 jar']],
  15:[['Bakery','Mini pizza crusts','1 package'],['Dairy','Shredded mozzarella','1 bag'],['Canned & Jarred','Pizza sauce','1 jar'],['Meat','Pepperoni','1 package']],
  19:[['Bakery','Texas toast','1 loaf'],['Dairy','Eggs','1 dozen'],['Meat','Breakfast sausage','1 package']],
  40:[['Meat','Beef tips or chuck roast','about 2 lb'],['Pasta','Wide egg noodles','1 bag'],['Canned & Jarred','Beef broth','1 carton'],['Canned & Jarred','Brown gravy mix','2 packets']],
  2:[['Meat','Ground beef','about 1.5 lb'],['Bakery','Slider buns','1 package'],['Dairy','Sliced cheese','1 package'],['Frozen','Frozen fries','1 bag']]
});
const GROCERY_KEY='vk-grocery-v03';
function groceryLoad(){try{const x=JSON.parse(localStorage.getItem(GROCERY_KEY));return x&&typeof x==='object'&&Array.isArray(x.checked)?x:{checked:[],extras:[],pantry:[]}}catch{return {checked:[],extras:[],pantry:[]}}}
let groceryState=groceryLoad();
function grocerySave(){localStorage.setItem(GROCERY_KEY,JSON.stringify(groceryState))}
function groceryWeekIds(){return [...new Set((state.schedule.length?state.schedule:allIds()).filter(validId))]}
function groceryRender(){
 const root=document.getElementById('groceryContent');if(!root)return;root.replaceChildren();
 const ids=groceryWeekIds(),missing=ids.filter(id=>!SHOPPING_TEMPLATES[id]);
 const source=state.schedule.length?'This week’s calendar':'current lottery selections';
 root.append(node('p','subtle','Shopping list follows '+source+'. Change scheduled dinners to update the list.'));
 const covered=ids.length-missing.length;
 const notice=node('p','subtle',!ids.length?'No dinners selected yet. Add a meal to the weekly calendar or lottery to begin.':missing.length?'Ingredient coverage: '+covered+' of '+ids.length+' dinners. Recipes not yet mapped: '+missing.map(id=>name(id)).join(', ')+'. Add verified ingredients manually; this is not a complete grocery list.':'Ingredient coverage: '+covered+' of '+ids.length+' dinners. All have household planning templates; check quantities before shopping.');
 root.append(notice);
 const items=new Map();
 for(const id of ids)for(const [department,ingredient,amount] of SHOPPING_TEMPLATES[id]||[]){
  const key=ingredient.toLowerCase();if(!items.has(key))items.set(key,{department,ingredient,amounts:[]});
  items.get(key).amounts.push(amount);
 }
 const all=[...items.values()].map(x=>({...x,amount:x.amounts.join(' + ')}));
 for(const extra of groceryState.extras||[])if(extra&&typeof extra.name==='string')all.push({department:'Other',ingredient:extra.name,amount:'Manual'});
 all.sort((a,b)=>a.department.localeCompare(b.department)||a.ingredient.localeCompare(b.ingredient));
 const onHand=all.filter(item=>typeof pantryHas==='function'&&pantryHas(item.ingredient));
 const toBuy=all.filter(item=>!(typeof pantryHas==='function'&&pantryHas(item.ingredient)));
 root.append(node('p','subtle',toBuy.length+' items to buy • '+onHand.length+' already on hand.'));

 if(!all.length)root.append(node('p','subtle','Select meals or add items to start your list.'));
 let current='';
 for(const item of toBuy){if(item.department!==current){current=item.department;root.append(node('h4','grocery-dept',current))}
  const label=node('label','grocery-item');const box=node('input');box.type='checkbox';const key=item.ingredient.toLowerCase();box.checked=groceryState.checked.includes(key);box.onchange=()=>{groceryState.checked=box.checked?[...new Set([...groceryState.checked,key])]:groceryState.checked.filter(x=>x!==key);grocerySave()};
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
