'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const screenshotRecipes=[
 [22,'Chicken Alfredo','Slow Cooker Cajun Chicken Alfredo','VK-HH-SLOW-COOKER-CAJUN-CHICKEN-ALFREDO-SCREENSHOT-2026-11-17'],
 [40,'Beef Tips & Noodles','Crockpot Beef Tips & Noodles — Screenshot Version','VK-HH-CROCKPOT-BEEF-TIPS-NOODLES-SCREENSHOT-2026-11-17'],
 [51,'Bacon Cheeseburger Pasta','BBQ Bacon Cheeseburger Casserole','VK-HH-BBQ-BACON-CHEESEBURGER-CASSEROLE-SCREENSHOT-2026-11-17'],
 [76,'Sausage Egg & Cheese Biscuits','Sausage Egg and Cheese Breakfast Sliders','VK-HH-SAUSAGE-EGG-CHEESE-BREAKFAST-SLIDERS-SCREENSHOT-2026-11-17']
];
function storage(){
 const saved=new Map();
 return {
  getItem:key=>saved.has(key)?saved.get(key):null,
  setItem:(key,value)=>saved.set(key,String(value)),
  removeItem:key=>saved.delete(key)
 };
}
function app(local=storage(),dom=null){
 const ctx=vm.createContext({
  localStorage:local,
  document:{getElementById:id=>dom?dom[id]||null:null}
 });
 for(const file of ['meals.js','recipe-links.js','recipe-publications.js','grocery.js']){
  vm.runInContext(read(file),ctx,{filename:file});
 }
 return ctx;
}
const run=(ctx,code)=>vm.runInContext(code,ctx);

test('100 lottery choices and existing linked records are preserved; screenshots never silently replace them',()=>{
 const ctx=app();
 assert.equal(run(ctx,'MEALS.length'),100);
 assert.equal(run(ctx,'Object.keys(RECIPE_LINKS).length'),32,'27 original links, four opt-in versions, and one new default publication');
 assert.equal(run(ctx,'Object.keys(RECIPE_PUBLICATIONS).length'),32);
 assert.equal(run(ctx,'Array.from({length:100},(_,id)=>approvedRecipeForLottery(id)).filter(Boolean).length'),28);
 for(const [id,meal] of screenshotRecipes){
  assert.equal(run(ctx,'MEALS['+id+']'),meal);
  assert.equal(run(ctx,'approvedRecipeForLottery('+id+')'),null);
  assert.equal(run(ctx,'publishedShoppingRowsForLottery('+id+')'),null);
  assert.equal(run(ctx,'recipeSelectedVersionForLottery('+id+')'),null);
  assert.equal(run(ctx,'recipeVariantOptionsForLottery('+id+').length'),2);
 }
 assert.match(run(ctx,'recipeVariantOptionsForLottery(40)[1].label'),/contains mushrooms/);
 const household=run(ctx,'SHOPPING_TEMPLATES[40]');
 assert.ok(household.some(row=>row[1]==='Beef tips or chuck roast'));
 assert.ok(!household.some(row=>/mushroom/i.test(row[1])));
});

test('explicit screenshot choices drive recipe card, groceries and pantry requirements from same amounts',()=>{
 const ctx=app();
 for(const [id,meal,title,version] of screenshotRecipes){
  assert.equal(run(ctx,'recipeSetVersionForLottery('+id+','+JSON.stringify(version)+')'),true);
  const record=run(ctx,'approvedRecipeForLottery('+id+')');
  assert.ok(record,'selected screenshot recipe for '+meal);
  assert.equal(record.title,title);
  assert.equal(record.recipeVersionId,version);
  assert.equal(record.publicationAuthorization,'approved-for-public-web');
  assert.equal(run(ctx,'recipeSelectedVariantTitleForLottery('+id+')'),title);
  const expectedRows=Array.from(record.ingredients).filter(item=>!item.optional&&!item.supplyOnly)
   .map(item=>[item.department,item.name,item.amount]);
  const actualRows=Array.from(run(ctx,'publishedShoppingRowsForLottery('+id+')'),row=>Array.from(row));
  assert.deepEqual(actualRows,expectedRows);
  const pantryRows=run(ctx,'completeShoppingTemplates()['+id+']');
  assert.deepEqual(Array.from(pantryRows,row=>Array.from(row)),expectedRows);
 }
 assert.equal(run(ctx,'Array.from({length:100},(_,id)=>approvedRecipeForLottery(id)).filter(Boolean).length'),32);
});

test('returning to original restores household planning state; invalid versions cannot be selected',()=>{
 const local=storage(),ctx=app(local);
 assert.equal(run(ctx,'recipeSetVersionForLottery(40,"wrong-version")'),false);
 assert.equal(run(ctx,'recipeSetVersionForLottery(99,"")'),false);
 const beef=screenshotRecipes[1][3];
 assert.equal(run(ctx,'recipeSetVersionForLottery(40,'+JSON.stringify(beef)+')'),true);
 assert.ok(run(ctx,'publishedShoppingRowsForLottery(40)').some(row=>/mushroom/i.test(row[1])));
 assert.equal(run(ctx,'recipeSetVersionForLottery(40,"")'),true);
 assert.equal(run(ctx,'approvedRecipeForLottery(40)'),null);
 assert.equal(run(ctx,'publishedShoppingRowsForLottery(40)'),null);
 assert.ok(run(ctx,'completeShoppingTemplates()[40]').some(row=>row[1]==='Beef tips or chuck roast'));
 assert.equal(run(ctx,'recipeSelectedVersionForLottery(40)'),null);
});

test('version choice persists across reload without mutating existing lottery or grocery keys',()=>{
 const local=storage();
 local.setItem('vk-dinner-lottery-v1','{"selected":[22],"locked":[],"schedule":[22]}');
 local.setItem('vk-grocery-v03','{"checked":["butter"],"extras":[{"name":"apples"}],"pantry":[]}');
 const beforeLottery=local.getItem('vk-dinner-lottery-v1'),beforeGroceries=local.getItem('vk-grocery-v03');
 const first=app(local);
 assert.equal(run(first,'recipeSetVersionForLottery(22,'+JSON.stringify(screenshotRecipes[0][3])+')'),true);
 const second=app(local);
 assert.equal(run(second,'approvedRecipeForLottery(22).title'),'Slow Cooker Cajun Chicken Alfredo');
 assert.equal(local.getItem('vk-dinner-lottery-v1'),beforeLottery);
 assert.equal(local.getItem('vk-grocery-v03'),beforeGroceries);
});

test('incomplete screenshot methods and undocumented quantities remain explicit',()=>{
 const ctx=app();
 for(const [id,, ,version] of screenshotRecipes)run(ctx,'recipeSetVersionForLottery('+id+','+JSON.stringify(version)+')');
 const cajun=run(ctx,'approvedRecipeForLottery(22)');
 assert.equal(cajun.methodStatus,'incomplete');
 assert.equal(cajun.steps.length,2);
 assert.ok(cajun.ingredients.some(i=>i.name==='Garlic powder'&&/amount not specified/i.test(i.amount)));
 assert.match(cajun.notes,/remaining cook time.*not visible/i);
 const beef=run(ctx,'approvedRecipeForLottery(40)');
 assert.ok(beef.ingredients.some(i=>i.name==='Egg noodles'&&i.amount==='Not specified'));
 assert.ok(beef.ingredients.some(i=>i.name==='Beef broth'&&/volume not specified/i.test(i.amount)));
 assert.match(beef.notes,/Contains.*mushroom/i);
 assert.match(beef.notes,/documented recipe amount remains 1 lb/i);
 const bbq=run(ctx,'approvedRecipeForLottery(51)');
 assert.ok(bbq.ingredients.some(i=>i.name==='Cooked pasta'&&/type not specified/i.test(i.amount)));
 assert.equal(run(ctx,'approvedRecipeForLottery(76).yieldText'),'12 sliders');
});

test('recipe viewer requires explicit selection and renders the actual screenshot version title',()=>{
 function element(tag,cls,text){
  return {tag,cls,textContent:text||'',children:[],
   append(...items){this.children.push(...items)},
   replaceChildren(...items){this.children=[...items]},
   setAttribute(name,value){this[name]=value},
   focus(){}
  };
 }
 const dom={recipeTitle:element('h3'),recipeContent:element('div'),recipeBack:element('button')};
 const ctx=vm.createContext({localStorage:storage(),document:{getElementById:id=>dom[id]||null},
  node:element,state:{schedule:[]},allIds:()=>[],validId:id=>Number.isInteger(id)&&id>=0&&id<100,
  switchTab:()=>{}});
 for(const file of ['meals.js','recipe-links.js','recipe-publications.js','grocery.js','recipe-viewer.js']){
  vm.runInContext(read(file),ctx,{filename:file});
 }
 run(ctx,'recipeViewRender(22)');
 const firstSelect=dom.recipeContent.children.flatMap(x=>x.children).find(x=>x.tag==='select');
 assert.ok(firstSelect,'explicit recipe version selector');
 assert.equal(firstSelect.value,'');
 assert.equal(dom.recipeTitle.textContent,'Chicken Alfredo');
 firstSelect.value=screenshotRecipes[0][3];
 firstSelect.onchange();
 const shown=dom.recipeContent.children.map(x=>x.textContent||'').join(' ');
 assert.match(shown,/Selected recipe: Slow Cooker Cajun Chicken Alfredo/);
 assert.match(shown,/Not cooking-ready/);
 const secondSelect=dom.recipeContent.children.flatMap(x=>x.children).find(x=>x.tag==='select');
 secondSelect.value='';
 secondSelect.onchange();
 assert.equal(run(ctx,'approvedRecipeForLottery(22)'),null);
 assert.ok(dom.recipeContent.children.some(x=>/Recipe not yet linked/.test(x.textContent||'')));
});
