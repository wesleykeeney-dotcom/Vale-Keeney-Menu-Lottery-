'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const archivedIngredients=[
 ['Ground beef','2 lb','Meat'],
 ['Pizza sauce','30 oz','Canned & Jarred'],
 ['Pepperoni, halved','1/2 cup','Meat'],
 ['Shredded mozzarella','1 cup','Dairy'],
 ['Mozzarella slices','8 slices','Dairy'],
 ['Rolls','8','Bakery']
];
const archivedMethod=[
 'Brown and drain ground beef.',
 'Combine beef, sauce and pepperoni in slow cooker; cook on LOW 3 hours.',
 'Add shredded mozzarella for final 30 minutes.',
 'Serve on rolls with sliced mozzarella.'
];
function setup(){
 const data=new Map();
 // Preserve unrelated saved household state during a read-only recipe lookup.
 data.set('vk-grocery-v03','{"checked":["pizza sauce"],"extras":[],"pantry":["rolls"]}');
 data.set('vk-dinner-lottery-v1','{"selected":[30],"locked":[],"schedule":[30]}');
 const localStorage={
  getItem:k=>data.has(k)?data.get(k):null,
  setItem:(k,v)=>data.set(k,String(v))
 };
 const ctx=vm.createContext({
  localStorage,
  document:{getElementById:()=>null}
 });
 for(const file of ['meals.js','recipe-links.js','recipe-publications.js','grocery.js']){
  vm.runInContext(read(file),ctx,{filename:file});
 }
 return {ctx,data,run:source=>vm.runInContext(source,ctx)};
}
test('lottery #31 has the chosen slow-cooker version by default with no opt-in or renumbering',()=>{
 const {run}=setup();
 assert.equal(run('MEALS.length'),100);
 assert.equal(run('MEALS[30]'),'Pizza Burgers');
 assert.equal(run('RECIPE_OPT_IN_IDS.includes(30)'),false);
 assert.equal(run('Object.keys(RECIPE_LINKS).length'),32);
 assert.equal(run('Object.keys(RECIPE_PUBLICATIONS).length'),32);
 assert.equal(run('recipeLinkFor(30).recipeVersionId'),'VK-DIN-SLOWCOOKER-PIZZABURGER-001');
 assert.equal(run('approvedRecipeForLottery(30).title'),'Slow Cooker Pepperoni Pizza Burgers');
 assert.equal(run('approvedRecipeForLottery(30).lotteryIds[0]'),30);
 assert.equal(run('recipeSelectedVersionForLottery(30)'),null,'default link does not need a saved variant preference');
});
test('six governing source amounts are exactly shared by recipe, groceries and pantry template',()=>{
 const {run}=setup();
 const r=run('approvedRecipeForLottery(30)');
 assert.equal(r.recipeId,'VK-DIN-SLOWCOOKER-PIZZABURGER-001');
 assert.equal(r.recipeVersionId,'VK-DIN-SLOWCOOKER-PIZZABURGER-001');
 assert.equal(r.yieldText,'8 burgers');
 assert.equal(r.publicationAuthorization,'approved-for-public-web');
 assert.equal(r.ingredientStatus,'complete');
 assert.equal(r.methodStatus,'complete');
 assert.match(r.sourceStatus,/not been independently rechecked/i);
 assert.deepEqual(Array.from(r.ingredients,x=>[x.name,x.amount,x.department]),archivedIngredients);
 assert.deepEqual(Array.from(r.steps),archivedMethod);
 const shopping=Array.from(run('publishedShoppingRowsForLottery(30)'),x=>Array.from(x));
 assert.deepEqual(shopping,archivedIngredients.map(x=>[x[2],x[0],x[1]]));
 assert.deepEqual(Array.from(run('completeShoppingTemplates()[30]'),x=>Array.from(x)),shopping);
 assert.equal(run('Object.keys(completeShoppingTemplates()).length'),34,
  'previous 33 complete household mappings plus Pizza Burgers');
});
test('unrelated screenshot versions stay opt-in, no preference or grocery state is changed',()=>{
 const {run,data}=setup();
 const before=Object.fromEntries(data);
 assert.equal(run('approvedRecipeForLottery(22)'),null);
 assert.equal(run('approvedRecipeForLottery(51)'),null);
 assert.equal(run('approvedRecipeForLottery(76)'),null);
 assert.equal(run('approvedRecipeForLottery(40)'),null);
 assert.equal(run('publishedShoppingRowsForLottery(40)'),null);
 assert.equal(run('recipeSetVersionForLottery(30,"")'),false);
 assert.equal(run('approvedRecipeForLottery(30).ingredients.length'),6);
 assert.deepEqual(Object.fromEntries(data),before);
});
test('version status remains honest and PWA refresh includes the change',()=>{
 const {run}=setup();
 const recipe=run('approvedRecipeForLottery(30)');
 assert.match(recipe.sourceStatus,/publisher identity is not established/);
 assert.match(recipe.shoppingNote,/do not automatically scale/i);
 assert.match(recipe.sourceNote,/does not change the Cooking Vault canonical record/);
 assert.match(read('sw.js'),/vk-lottery-v24/);
});
