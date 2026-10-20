'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const publicSource=read('recipe-publications.js');
const linkSource=read('recipe-links.js');

function setup(pantry=[]){
 const store={};
 const elem=(tag,cls,text)=>({
  tag,cls,textContent:text??'',children:[],checked:false,
  append(...items){this.children.push(...items)},
  replaceChildren(...items){this.children=[...items]},
  setAttribute(name,value){this[name]=value},
  focus(){}
 });
 const dom={recipeContent:elem('div'),recipeTitle:elem('h3'),recipeBack:elem('button'),
  groceryContent:elem('div'),pantryContent:elem('div'),pantrySuggestions:elem('div')};
 const ctx=vm.createContext({
  document:{getElementById:id=>dom[id]||null},
  localStorage:{getItem:key=>store[key]??null,setItem:(key,value)=>{store[key]=value}},
  state:{schedule:[5,-1,-1,-1,-1,-1,-1],target:5},
  validId:id=>Number.isInteger(id)&&id>=0&&id<84,allIds:()=>[5],
  node:elem,foodWarsMeta:()=>null,switchTab:()=>{},name:id=>id===5?'Taco Casserole':'Other meal '+id
 });
 const scripts=['meals.js','recipe-links.js','recipe-publications.js','pantry.js',
  'grocery.js','pantry-priority.js','recipe-viewer.js'];
 for(const file of scripts)vm.runInContext(read(file),ctx,{filename:file});
 ctx.pantryItems=pantry;
 vm.runInContext('pantryState.items=pantryItems.map(x=>x.toLowerCase())',ctx);
 const get=expression=>vm.runInContext(expression,ctx);
 const flatten=node=>[node.textContent||'',...node.children.flatMap(flatten)].join('\n');
 return {
  get,ctx,dom,store,
  recipe:()=>{get('recipeViewRender(5)');return flatten(dom.recipeContent)},
  groceries:()=>{get('groceryRender()');return flatten(dom.groceryContent)},
  pantry:()=>{get('pantryRender()');return flatten(dom.pantryContent)}
 };
}

test('publicly approved Taco Casserole is a distinct household manuscript linked only to immutable lottery #6',()=>{
 const app=setup();
 const r=app.get('approvedRecipeForLottery(5)');
 assert.ok(r);
 assert.equal(r.recipeId,'VK-DIN-TACO-CASSEROLE-001');
 assert.equal(r.recipeVersionId,'VK-HH-TACO-CASSEROLE-MANUSCRIPT-001');
 assert.equal(r.publicationAuthorization,'approved-for-public-web');
 assert.deepEqual(Array.from(r.lotteryIds),[5]);
 assert.match(r.versionType,/approved household manuscript/);
 assert.match(r.versionType,/not source-verified original/);
 assert.match(r.sourceStatus,/historical original screenshot has NOT been independently verified/);
 assert.equal(r.yieldText,null);
 assert.equal(app.get('approvedRecipeForLottery(11)'),null,'Garbage Bread remains unlinked');
 assert.equal(app.get('approvedRecipeForLottery(83)'),null,'protected Food Wars remains unlinked');
 assert.equal(app.get('MEALS.length'),84);
 assert.equal(app.get('MEALS[5]'),'Taco Casserole');
 assert.equal(Object.keys(app.get('RECIPE_PUBLICATIONS')).length,1);
 assert.equal(Object.keys(app.get('RECIPE_LINKS')).length,1);
});

test('manuscript amounts and recipe preparation annotations are preserved line for line',()=>{
 const app=setup();
 const record=app.get('approvedRecipeForLottery(5)');
 const actual=Array.from(record.ingredients,x=>[x.name,x.amount,x.preparation||'',!!x.supplyOnly]);
 assert.deepEqual(actual,[
  ['Ground beef','2 lb','',false],
  ['Taco seasoning','2 packets','',false],
  ['Water','1/2 cup','',true],
  ['Black beans','1 (15 oz) can','drained',false],
  ['Rotel','1 (14.5 oz) can','',false],
  ['Chunky salsa','1 1/2 cups','',false],
  ['Mexican cheese blend','2 cups','',false],
  ['Tortilla chips','4 cups','',false],
  ['Sour cream','1 cup','',false],
  ['Green onions','2','thinly sliced',false]
 ]);
 const recipe=app.recipe();
 assert.match(recipe,/Water — 1\/2 cup.*kitchen supply/);
 assert.match(recipe,/Black beans — 1 \(15 oz\) can \(drained\)/);
 assert.match(recipe,/Green onions — 2 \(thinly sliced\)/);
 assert.match(recipe,/Serving yield not documented/);
 assert.match(recipe,/14\.5 oz\).*check|14\.5 oz\) can Rotel/i);
 assert.match(recipe,/NOT been independently verified/);
 assert.match(recipe,/crisp chips/);
});

test('published method is the three recovered manuscript steps, with no invented servings or bake time',()=>{
 const app=setup();
 const r=app.get('approvedRecipeForLottery(5)');
 assert.deepEqual(Array.from(r.steps),[
  'Heat oven to 375°F. Brown the beef and drain excess fat. Add taco seasoning and water; simmer until the meat is actually seasoned, not merely acquainted with seasoning.',
  'Stir in beans, Rotel and salsa. Layer with tortilla chips and cheese in a casserole dish.',
  'Bake until hot and bubbling and the cheese is melted, about 20 minutes. Finish with sour cream and green onion after baking.'
 ]);
 const view=app.recipe();
 assert.match(view,/Documented cooking instructions/);
 for(const step of r.steps)assert.ok(view.includes(step),'must display source-supported complete step');
 assert.ok(view.indexOf(r.steps[0])<view.indexOf(r.steps[1]));
 assert.ok(view.indexOf(r.steps[1])<view.indexOf(r.steps[2]));
 assert.doesNotMatch(view,/makes (?:five|5) servings|ready in 30 minutes|original screenshot verified/i);
});

test('same approved ingredients drive Groceries and Pantry; no duplicate legacy Rotel list',()=>{
 const app=setup();
 const r=app.get('approvedRecipeForLottery(5)');
 const shopping=Array.from(app.get('publishedShoppingRowsForLottery(5)'),row=>Array.from(row));
 assert.equal(shopping.length,9,'10 documented recipe items with water marked as supply');
 for(const ingredient of r.ingredients){
  if(ingredient.supplyOnly)continue;
  const row=shopping.find(x=>x[1]===ingredient.name);
  assert.ok(row,'source-required item must be present: '+ingredient.name);
  assert.equal(row[2],ingredient.amount);
 }
 const grocery=app.groceries();
 assert.match(grocery,/Ground beef — 2 lb/);
 assert.match(grocery,/Rotel — 1 \(14\.5 oz\) can/);
 assert.match(grocery,/Chunky salsa — 1 1\/2 cups/);
 assert.doesNotMatch(grocery,/Rotel diced tomatoes and chilies — 14\.5 oz total/);
 assert.doesNotMatch(grocery,/Salsa — 1 1\/2 cups/);
 assert.doesNotMatch(grocery,/Water — 1\/2 cup/);
 assert.equal(app.get('pantryMealRankings(completeShoppingTemplates(),[],MEALS.length).find(x=>x.id===5).total'),9);
 const pantry=app.pantry();
 assert.match(pantry,/Chunky salsa/);
 assert.match(pantry,/Rotel/);
});

test('pantry state and live shopping progress still work with published ingredient labels',()=>{
 const app=setup(['Chunky salsa']);
 const grocery=app.groceries();
 assert.match(grocery,/8 items remaining • 0 checked off • 1 already on hand/);
 assert.match(grocery,/Already have — pantry/);
 const rows=app.dom.groceryContent.children.filter(x=>x.cls==='grocery-item');
 assert.equal(rows.length,8);
 assert.ok(!rows.some(x=>x.children[1].textContent.startsWith('Chunky salsa —')));
 const beef=rows.find(x=>x.children[1].textContent.startsWith('Ground beef —'));
 beef.children[0].checked=true;
 beef.children[0].onchange();
 assert.match(app.groceries(),/7 items remaining • 1 checked off • 1 already on hand/);
 assert.deepEqual(JSON.parse(app.store['vk-grocery-v03']).checked,['ground beef']);
 assert.equal(app.get('pantryState.items.includes("chunky salsa")'),true);
});
