'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
function mockApp({schedule=[5,-1,-1,-1,-1,-1,-1],selected=[3]}={}){
 const storage={},opened=[];
 const node=(tag,cls,text)=>({tag,cls,textContent:text??'',value:'',children:[],
   append(...args){this.children.push(...args)},replaceChildren(...args){this.children=[...args]},
   setAttribute(key,val){this[key]=val},focus(){}});
 const dom={recipeTitle:node('h3'),recipeContent:node('div'),recipeBack:node('button'),
   groceryContent:node('div'),pantryContent:node('div'),pantrySuggestions:node('div')};
 const state={schedule:[...schedule]};
 const ctx=vm.createContext({node,state,document:{getElementById:id=>dom[id]||null},
  localStorage:{getItem:key=>storage[key]??null,setItem:(key,val)=>{storage[key]=val}},
  validId:id=>Number.isInteger(id)&&id>=0&&id<84,
  allIds:()=>[...selected],name:id=>id===3?'Pepperoni Pizza Grilled Cheese':id===5?'Taco Casserole':'Meal '+id,
  foodWarsMeta:()=>null,switchTab:id=>opened.push(id)});
 for(const file of ['meals.js','recipe-links.js','recipe-publications.js','pantry.js','grocery.js','pantry-priority.js','recipe-viewer.js'])
  vm.runInContext(read(file),ctx,{filename:file});
 const run=expression=>vm.runInContext(expression,ctx);
 const textFor=element=>[element.textContent||'',...element.children.flatMap(textFor)].join('\n');
 return {ctx,storage,opened,dom,state,run,textFor,
  recipe:()=>{run('recipeViewRender(3)');return textFor(dom.recipeContent)},
  groceries:()=>{run('groceryRender()');return textFor(dom.groceryContent)}};
}
test('un-scheduled #4 sauce change cannot silently rewrite weekly Groceries or calendar',()=>{
 const a=mockApp();
 assert.deepEqual(Array.from(a.run('groceryWeekIds()')),[5],'saved calendar takes precedence over lottery');
 assert.match(a.groceries(),/Rotel — 1 \(14.5 oz\) can/);
 assert.doesNotMatch(a.groceries(),/Pizza sauce|Marinara sauce/);
 assert.match(a.recipe(),/not in your current weekly shopping list/);
 const selector=a.dom.recipeContent.children.find(x=>x.cls==='recipe-option').children.find(x=>x.tag==='select');
 selector.value='Marinara sauce';selector.onchange();
 assert.match(a.textFor(a.dom.recipeContent),/Marinara sauce — 2 Tbsp/);
 assert.doesNotMatch(a.groceries(),/Marinara sauce — 2 Tbsp/);
 assert.deepEqual(a.state.schedule,[5,-1,-1,-1,-1,-1,-1]);
});
test('Shop this recipe reflects marinade choice without scheduling it, and allows return to weekly groceries',()=>{
 const a=mockApp();
 a.run('groceryState.extras.push({name:"Weekly manual extra"})');
 a.recipe();
 const selector=a.dom.recipeContent.children.find(x=>x.cls==='recipe-option').children.find(x=>x.tag==='select');
 selector.value='Marinara sauce';selector.onchange();
 const shop=a.dom.recipeContent.children.find(x=>x.tag==='button'&&/Shop this recipe/.test(x.textContent));
 assert.ok(shop,'explicit recipe shopping action should be discoverable from the recipe');
 shop.onclick();
 assert.equal(a.opened.at(-1),'grocery');
 assert.equal(a.run('groceryPreviewRecipeId'),3);
 const preview=a.textFor(a.dom.groceryContent);
 assert.match(preview,/Shopping just for Pepperoni Pizza Grilled Cheese/);
 assert.match(preview,/Marinara sauce — 2 Tbsp/);
 assert.doesNotMatch(preview,/Pizza sauce — 2 Tbsp|Rotel — 1|Weekly manual extra|Garlic powder — 1 tsp/);
 assert.match(preview,/2 sandwiches|complete shopping template/);
 assert.deepEqual(a.state.schedule,[5,-1,-1,-1,-1,-1,-1]);
 const back=a.dom.groceryContent.children.find(x=>x.tag==='button'&&/Show weekly groceries/.test(x.textContent));
 assert.ok(back,'the one-recipe scope must be reversible');
 back.onclick();
 assert.equal(a.run('groceryPreviewRecipeId'),null);
 const weekly=a.textFor(a.dom.groceryContent);
 assert.match(weekly,/Rotel — 1 \(14.5 oz\) can/);
 assert.match(weekly,/Weekly manual extra/);
 assert.doesNotMatch(weekly,/Marinara sauce — 2 Tbsp/);
 assert.equal(JSON.parse(a.storage['vk-recipe-options-v01'])['VK-HH-PIZZAGRILLEDCHEESE-MANUSCRIPT-001'],'Marinara sauce');
});
test('when #4 is scheduled or in current lottery picks its selected sauce already updates the normal grocery list',()=>{
 for(const opts of [{schedule:[3,-1,-1,-1,-1,-1,-1],selected:[]},{schedule:[],selected:[3]}]){
  const a=mockApp(opts);a.recipe();
  assert.match(a.textFor(a.dom.recipeContent),/included in your current weekly shopping list/);
  const choice=a.dom.recipeContent.children.find(x=>x.cls==='recipe-option').children.find(x=>x.tag==='select');
  choice.value='Marinara sauce';choice.onchange();
  assert.match(a.groceries(),/Marinara sauce — 2 Tbsp/);
  assert.doesNotMatch(a.groceries(),/Pizza sauce — 2 Tbsp/);
  assert.equal(a.run('groceryPreviewRecipeId'),null);
 }
});
test('no recipe preview can be opened for unmapped, partial or invalid lottery IDs',()=>{
 const a=mockApp();
 for(const id of [-1,84,11,17,52,83])assert.equal(a.run('groceryShowRecipe('+id+')'),false);
 assert.equal(a.run('groceryPreviewRecipeId'),null);
 assert.match(read('sw.js'),/vk-lottery-v17/);
});
