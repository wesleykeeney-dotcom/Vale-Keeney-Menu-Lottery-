'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
function mockApp({schedule=[5,-1,-1,-1,-1,-1,-1],selected=[3],initialStorage={}}={}){
 const storage={...initialStorage},opened=[];
 const node=(tag,cls,text)=>({tag,cls,textContent:text??'',value:'',children:[],
   append(...args){this.children.push(...args)},replaceChildren(...args){this.children=[...args]},
   setAttribute(key,val){this[key]=val},focus(){}});
 const dom={recipeTitle:node('h3'),recipeContent:node('div'),recipeBack:node('button'),
   groceryContent:node('div'),groceryAdd:node('button'),groceryExtra:node('input'),groceryClear:node('button'),
   pantryContent:node('div'),pantrySuggestions:node('div')};
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

test('recipe preview checkmarks, Add, and Clear never alter saved weekly grocery state',()=>{
 const a=mockApp();
 a.run('groceryState.checked.push("rotel");groceryState.extras.push({name:"Weekly manual extra"});grocerySave()');
 const weeklyStateBefore=a.storage['vk-grocery-v03'];
 a.recipe();
 a.dom.recipeContent.children.find(x=>x.tag==='button'&&/Shop this recipe/.test(x.textContent)).onclick();
 for(const id of ['groceryAdd','groceryClear','groceryExtra'])
  assert.equal(a.dom[id].disabled,true,id+' must be disabled in recipe preview');
 const bread=a.dom.groceryContent.children.find(x=>x.cls==='grocery-item'&&/Bread —/.test(x.children[1].textContent));
 assert.ok(bread,'source-backed recipe item should be checkable in temporary preview');
 bread.children[0].checked=true;bread.children[0].onchange();
 assert.match(a.textFor(a.dom.groceryContent),/Preview checkmarks are temporary/);
 assert.equal(a.run('groceryPreviewChecked.has("bread")'),true);
 const progress=a.dom.groceryContent.children.find(x=>x.role==='status');
 assert.match(progress.textContent,/1 checked off/);
 a.dom.groceryExtra.value='Preview must not add to weekly list';
 a.dom.groceryAdd.onclick();
 a.dom.groceryClear.onclick();
 a.run('groceryRender()');
 assert.equal(a.storage['vk-grocery-v03'],weeklyStateBefore,'preview operations must never persist weekly edits');
 const breadAfter=a.dom.groceryContent.children.find(x=>x.cls==='grocery-item'&&/Bread —/.test(x.children[1].textContent));
 assert.equal(breadAfter.children[0].checked,true,'ephemeral preview checkbox survives UI redraw');
 a.run('groceryReturnToWeekly()');
 for(const id of ['groceryAdd','groceryClear','groceryExtra'])
  assert.equal(a.dom[id].disabled,false,id+' must return to weekly edit mode');
 const weekly=a.textFor(a.dom.groceryContent);
 assert.match(weekly,/Weekly manual extra/);
 assert.doesNotMatch(weekly,/Preview must not add|Bread — 4 slices/);
 const rotel=a.dom.groceryContent.children.find(x=>x.cls==='grocery-item'&&/Rotel —/.test(x.children[1].textContent));
 assert.ok(rotel);
 assert.equal(rotel.children[0].checked,true,'original saved weekly checkbox remains selected');
 assert.equal(a.storage['vk-grocery-v03'],weeklyStateBefore);
 assert.equal(a.run('groceryPreviewChecked.size'),0,'return clears temporary checkmarks');
});


test('selected sauce is pantry-filtered in weekly groceries and recipe preview',()=>{
 const savedPantry=JSON.stringify({items:['marinara sauce']});
 const savedGroceries=JSON.stringify({checked:['rotel'],extras:[{name:'Weekly manual extra'}],pantry:[]});
 const a=mockApp({
  schedule:[3,-1,-1,-1,-1,-1,-1],
  selected:[],
  initialStorage:{'vk-pantry-v04':savedPantry,'vk-grocery-v03':savedGroceries}
 });
 a.recipe();
 const selector=a.dom.recipeContent.children.find(x=>x.cls==='recipe-option').children.find(x=>x.tag==='select');
 selector.value='Marinara sauce';
 selector.onchange();

 const assertPantryFiltered=()=>{
  const children=a.dom.groceryContent.children;
  const pantryIndex=children.findIndex(x=>x.textContent==='Already have — pantry');
  assert.notEqual(pantryIndex,-1,'selected sauce should appear in the pantry section');
  assert.match(a.textFor(children[pantryIndex+1]),/Marinara sauce — 2 Tbsp/);
  const shoppingRows=children.filter(x=>x.cls==='grocery-item').map(x=>a.textFor(x)).join('\n');
  assert.doesNotMatch(shoppingRows,/Marinara sauce/,'pantry sauce must not appear among items to buy');
 };
 a.groceries();
 assertPantryFiltered();

 const shop=a.dom.recipeContent.children.find(x=>x.tag==='button'&&/Shop this recipe/.test(x.textContent));
 assert.ok(shop);
 shop.onclick();
 assertPantryFiltered();
 assert.deepEqual(a.state.schedule,[3,-1,-1,-1,-1,-1,-1]);
 assert.equal(a.storage['vk-pantry-v04'],savedPantry);
 assert.equal(a.storage['vk-grocery-v03'],savedGroceries);
});

test('existing pantry and weekly grocery records survive current app initialization and recipe preview',()=>{
 const savedPantry='{"items":["marinara sauce","bread"]}';
 const savedGroceries='{"checked":["rotel"],"extras":[{"name":"Weekly manual extra"}],"pantry":[]}';
 const a=mockApp({
  schedule:[5,-1,-1,-1,-1,-1,-1],
  selected:[3],
  initialStorage:{'vk-pantry-v04':savedPantry,'vk-grocery-v03':savedGroceries}
 });
 assert.deepEqual(JSON.parse(a.storage['vk-pantry-v04']),{items:['marinara sauce','bread']});
 assert.equal(a.storage['vk-grocery-v03'],savedGroceries);

 a.recipe();
 const shop=a.dom.recipeContent.children.find(x=>x.tag==='button'&&/Shop this recipe/.test(x.textContent));
 assert.ok(shop);
 shop.onclick();
 a.run('groceryRender()');
 a.run('pantryRender()');
 a.run('groceryReturnToWeekly()');

 assert.equal(a.storage['vk-pantry-v04'],savedPantry,'opening recipe shopping must not rewrite saved pantry data');
 assert.equal(a.storage['vk-grocery-v03'],savedGroceries,'preview and return must not rewrite saved weekly grocery data');
 assert.deepEqual(a.state.schedule,[5,-1,-1,-1,-1,-1,-1]);
 assert.match(read('sw.js'),/vk-lottery-v17/);
});
