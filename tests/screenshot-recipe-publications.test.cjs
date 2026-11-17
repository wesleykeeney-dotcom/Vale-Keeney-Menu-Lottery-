'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');

function app(){
 const ctx=vm.createContext({document:{getElementById:()=>null}});
 for(const file of ['meals.js','recipe-links.js','recipe-publications.js','grocery.js']){
  vm.runInContext(read(file),ctx,{filename:file});
 }
 return ctx;
}

test('owner-provided recipe screenshots feed four matching lottery entries and grocery rows',()=>{
 const ctx=app();
 const expected=[
  [22,'Chicken Alfredo','Slow Cooker Cajun Chicken Alfredo','VK-HH-SLOW-COOKER-CAJUN-CHICKEN-ALFREDO-SCREENSHOT-2026-11-17'],
  [40,'Beef Tips & Noodles','Crockpot Beef Tips & Noodles — Screenshot Version','VK-HH-CROCKPOT-BEEF-TIPS-NOODLES-SCREENSHOT-2026-11-17'],
  [51,'Bacon Cheeseburger Pasta','BBQ Bacon Cheeseburger Casserole','VK-HH-BBQ-BACON-CHEESEBURGER-CASSEROLE-SCREENSHOT-2026-11-17'],
  [76,'Sausage Egg & Cheese Biscuits','Sausage Egg and Cheese Breakfast Sliders','VK-HH-SAUSAGE-EGG-CHEESE-BREAKFAST-SLIDERS-SCREENSHOT-2026-11-17']
 ];
 for(const [id,mealTitle,recipeTitle,version] of expected){
  assert.equal(vm.runInContext('MEALS['+id+']',ctx),mealTitle);
  const r=vm.runInContext('approvedRecipeForLottery('+id+')',ctx);
  assert.ok(r,'published recipe for lottery #'+(id+1));
  assert.equal(r.title,recipeTitle);
  assert.equal(r.recipeVersionId,version);
  assert.equal(r.publicationAuthorization,'approved-for-public-web');
  const expectedRows=Array.from(r.ingredients).filter(i=>!i.optional&&!i.supplyOnly).map(i=>[i.department,i.name,i.amount]);
  const actualRows=Array.from(vm.runInContext('publishedShoppingRowsForLottery('+id+')',ctx),row=>Array.from(row));
  assert.deepEqual(actualRows,expectedRows);
 }
});

test('screen-clipped directions and undocumented quantities remain explicit',()=>{
 const ctx=app();
 const cajun=vm.runInContext('approvedRecipeForLottery(22)',ctx);
 assert.equal(cajun.methodStatus,'incomplete');
 assert.equal(cajun.steps.length,2);
 assert.ok(cajun.ingredients.some(i=>i.name==='Garlic powder'&&/amount not specified/i.test(i.amount)));
 assert.match(cajun.notes,/remaining cook time.*not visible/i);
 const beef=vm.runInContext('approvedRecipeForLottery(40)',ctx);
 assert.ok(beef.ingredients.some(i=>i.name==='Egg noodles'&&i.amount==='Not specified'));
 assert.ok(beef.ingredients.some(i=>i.name==='Beef broth'&&/volume not specified/i.test(i.amount)));
 assert.match(beef.notes,/Contains.*mushroom/i);
 assert.match(beef.notes,/documented recipe amount remains 1 lb/i);
 const bbq=vm.runInContext('approvedRecipeForLottery(51)',ctx);
 assert.ok(bbq.ingredients.some(i=>i.name==='Cooked pasta'&&/type not specified/i.test(i.amount)));
 const sliders=vm.runInContext('approvedRecipeForLottery(76)',ctx);
 assert.equal(sliders.yieldText,'12 sliders');
});
