'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
function setup(){
 const state={schedule:[3,-1,-1,-1,-1,-1,-1]};
 const storage={};
 const node=(tag,cls,text)=>({tag,cls,textContent:text??'',children:[],checked:false,
  append(...args){this.children.push(...args)},replaceChildren(...args){this.children=[...args]},
  setAttribute(name,value){this[name]=value},focus(){}});
 const dom=Object.fromEntries(['recipeContent','recipeTitle','recipeBack','groceryContent','pantryContent','pantrySuggestions']
  .map(x=>[x,node('div',null,'')]));
 const ctx=vm.createContext({state,document:{getElementById:id=>dom[id]||null},
  node,localStorage:{getItem:k=>storage[k]??null,setItem:(k,v)=>{storage[k]=v}},
  name:id=>id===3?'Pepperoni Pizza Grilled Cheese':'Other meal',
  foodWarsMeta:()=>null,switchTab:()=>{},
  validId:id=>Number.isInteger(id)&&id>=0&&id<84,allIds:()=>[3]});
 for(const name of ['meals.js','recipe-links.js','recipe-publications.js','pantry.js',
  'grocery.js','pantry-priority.js','recipe-viewer.js']){
  vm.runInContext(read(name),ctx,{filename:name});
 }
 const run=source=>vm.runInContext(source,ctx);
 const flatten=element=>[element.textContent||'',...element.children.flatMap(flatten)].join('\n');
 return {run,dom,storage,state,flatten,
  recipe:()=>{run('recipeViewRender(3)');return flatten(dom.recipeContent)},
  grocery:()=>{run('groceryRender()');return flatten(dom.groceryContent)},
  pantry:()=>{run('pantryRender()');return flatten(dom.pantryContent)}};
}
test('owner-approved #4 is a distinct two-sandwich household manuscript, never verified historical original',()=>{
 const t=setup();
 const record=t.run('approvedRecipeForLottery(3)');
 assert.ok(record);
 assert.equal(record.publicationId,'vk-pub-pepperoni-pizza-grilled-cheese-manuscript-001');
 assert.equal(record.recipeId,'VK-DIN-PIZZAGRILLEDCHEESE-001');
 assert.equal(record.recipeVersionId,'VK-HH-PIZZAGRILLEDCHEESE-MANUSCRIPT-001');
 assert.equal(record.publicationAuthorization,'approved-for-public-web');
 assert.match(record.versionType,/household manuscript/);
 assert.match(record.sourceStatus,/NOT independently verified/);
 assert.equal(record.yieldText,'2 sandwiches');
 assert.equal(record.ingredients.length,7);
 assert.equal(record.steps.length,3);
 assert.equal(t.run('MEALS.length'),84);
 assert.equal(Object.keys(t.run('RECIPE_LINKS')).length,2);
 assert.equal(t.run('approvedRecipeForLottery(52)'),null,'foil packets remain without a public cooking method');
});
test('seven manuscript ingredients, three documented steps, six shopping items; garlic powder remains optional',()=>{
 const t=setup(),r=t.run('approvedRecipeForLottery(3)');
 const expected=[
  ['Bread','4 slices'],
  ['Pepperoni','8 slices'],
  ['Shredded mozzarella','1 cup'],
  ['Pizza sauce','2 Tbsp'],
  ['Butter','2 Tbsp'],
  ['Dried oregano','1 tsp'],
  ['Garlic powder','1 tsp']
 ];
 assert.deepEqual(Array.from(r.ingredients,x=>[x.name,x.amount]),expected);
 assert.equal(r.ingredients[6].optional,true);
 assert.equal(r.ingredients[3].sauceChoice,true);
 const names=Array.from(t.run('publishedShoppingRowsForLottery(3)'),x=>x[1]);
 assert.deepEqual(names,['Bread','Pepperoni','Shredded mozzarella','Pizza sauce','Butter','Dried oregano']);
 const view=t.recipe(),grocery=t.grocery();
 assert.match(view,/Documented yield: 2 sandwiches/);
 assert.match(view,/Documented cooking instructions/);
 assert.match(view,/Butter one side of each bread slice/);
 assert.match(view,/1 Tbsp of your chosen pizza sauce or marinara per sandwich/);
 assert.match(view,/3–4 minutes per side/);
 assert.match(view,/Garlic powder — 1 tsp \(optional\)/);
 assert.match(grocery,/Pizza sauce — 2 Tbsp/);
 assert.doesNotMatch(grocery,/Garlic powder — 1 tsp/);
 assert.doesNotMatch(grocery,/Optional garlic: 1 tsp \(type unspecified\)/);
 assert.equal(t.run('pantryMealRankings(completeShoppingTemplates(),[],MEALS.length).find(x=>x.id===3).total'),6);
});
test('sauce selection persists and changes recipe, grocery and pantry together without touching the week',()=>{
 const t=setup();
 t.recipe();
 const holder=t.dom.recipeContent.children.find(x=>x.cls==='recipe-option');
 assert.ok(holder,'must render a usable sauce selector');
 const select=holder.children.find(x=>x.tag==='select');
 assert.ok(select,'selector missing');
 assert.equal(select.value,'Pizza sauce');
 assert.equal(select.children.length,2);
 assert.match(t.pantry(),/Pizza sauce/);
 select.value='Marinara sauce';
 select.onchange();
 assert.equal(t.run('recipeSauceChoiceForLottery(3)'),'Marinara sauce');
 assert.equal(JSON.parse(t.storage['vk-recipe-options-v01'])['VK-HH-PIZZAGRILLEDCHEESE-MANUSCRIPT-001'],'Marinara sauce');
 assert.match(t.flatten(t.dom.recipeContent),/Marinara sauce — 2 Tbsp/);
 assert.match(t.grocery(),/Marinara sauce — 2 Tbsp/);
 assert.doesNotMatch(t.grocery(),/Pizza sauce — 2 Tbsp/);
 assert.match(t.pantry(),/Marinara sauce/);
 assert.equal(t.state.schedule[0],3);
 assert.equal(t.storage['vk-grocery-v03'],undefined,'options must not modify saved grocery checkmarks');
 assert.equal(t.storage['vk-pantry-v04'],undefined,'options must not modify saved pantry selections');
});
test('unrecognized option cannot corrupt the record or contaminate shopping data',()=>{
 const t=setup();
 assert.equal(t.run('recipeSetSauceChoiceForLottery(3,"Mushroom sauce")'),false);
 assert.equal(t.run('recipeSetSauceChoiceForLottery(5,"Marinara sauce")'),false);
 assert.equal(t.run('recipeSauceChoiceForLottery(3)'),'Pizza sauce');
 assert.deepEqual(Array.from(t.run('publishedShoppingRowsForLottery(3)').find(x=>x[1]==='Pizza sauce')),['Canned & Jarred','Pizza sauce','2 Tbsp']);
 assert.equal(t.run('approvedRecipeForLottery(11)'),null);
});
