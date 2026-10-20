'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
function element(tag,cls,text){
 return {tag,cls,textContent:text??'',children:[],checked:false,
  append(...children){this.children.push(...children)},
  replaceChildren(...children){this.children=[...children]},
  setAttribute(k,v){this[k]=v},focus(){}
 };
}
function testPublication(overrides={}){
 return {publicationId:'fixture-pub-6',recipeId:'fixture-vault-6',recipeVersionId:'fixture-version-6',
  publicationAuthorization:'approved-for-public-web',lotteryIds:[5],title:'Test-only Taco Casserole',
  versionType:'approved-household',sourceStatus:'synthetic test, not source recipe',
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  ingredients:[
   {name:'Ground beef',amount:'3 kg',department:'Meat'},
   {name:'Carrots',amount:'2',department:'Produce'},
   {name:'Salt',amount:'to taste',department:'Seasonings',optional:true},
   {name:'Water',amount:'1 cup',supplyOnly:true}
  ],
  steps:['Synthetic test step.'],...overrides};
}
function environment({record=testPublication(),linked=true,schedule=[5,-1,-1,-1,-1,-1,-1]}={}){
 const nodes={groceryContent:element('div'),recipeContent:element('div'),recipeTitle:element('h3'),pantryContent:element('div')};
 const fixtures={};
 if(record)fixtures['fixture-pub-6']=record;
 const ctx=vm.createContext({
  document:{getElementById:id=>nodes[id]||null},
  localStorage:{getItem:()=>null,setItem:()=>{}},
  node:element,state:{schedule},allIds:()=>[],validId:id=>Number.isInteger(id)&&id>=0&&id<84,
  name:id=>'Meal '+id,foodWarsMeta:()=>null,openTab:()=>{},switchTab:()=>{},
  publicFixtures:fixtures,
  publicLinks:linked?{5:{publicationId:'fixture-pub-6',recipeVersionId:'fixture-version-6'}}:{}
 });
 const links=read('recipe-links.js').replace('const RECIPE_LINKS=Object.freeze({});','const RECIPE_LINKS=Object.freeze(publicLinks);');
 const published=read('recipe-publications.js').replace('const RECIPE_PUBLICATIONS=Object.freeze({});','const RECIPE_PUBLICATIONS=Object.freeze(publicFixtures);');
 assert.notEqual(links,read('recipe-links.js'),'synthetic link fixture must load');
 assert.notEqual(published,read('recipe-publications.js'),'synthetic publication fixture must load');
 for(const source of [read('meals.js'),links,published,read('pantry.js'),read('grocery.js'),read('pantry-priority.js'),read('recipe-viewer.js')]){
  vm.runInContext(source,ctx);
 }
 const evalJs=script=>vm.runInContext(script,ctx);
 const deepText=root=>{
  const walk=n=>[n.textContent||'',...(n.children||[]).flatMap(walk)];
  return root.children.flatMap(walk).join('\n');
 };
 return {ctx,nodes,evalJs,deepText,
  grocery:()=>{evalJs('groceryRender()');return deepText(nodes.groceryContent)},
  recipe:()=>{evalJs('recipeViewRender(5)');return deepText(nodes.recipeContent)}
 };
}
test('approved synthetic version overrides the legacy Taco Casserole shopping estimate everywhere',()=>{
 const env=environment();
 const recipe=env.recipe(),groceries=env.grocery();
 assert.match(recipe,/Ground beef — 3 kg/);
 assert.match(recipe,/Carrots — 2/);
 assert.match(groceries,/Ground beef — 3 kg/);
 assert.match(groceries,/Carrots — 2/);
 assert.doesNotMatch(groceries,/Ground beef — 2 lb|Rotel|Taco seasoning|Water — 1 cup|Salt — to taste/);
 assert.match(groceries,/1 complete shopping template/);
 assert.equal(env.evalJs('completeShoppingTemplates()[5].length'),2);
 assert.equal(env.evalJs('pantryMealRankings(completeShoppingTemplates(),[],MEALS.length).find(x=>x.id===5).total'),2);
 env.evalJs('pantryRender()');
 const pantry=env.deepText(env.nodes.pantryContent);
 assert.match(pantry,/Carrots/);
 assert.ok(!pantry.includes('Rotel diced tomatoes and chilies'),'old recipe version should not leak into pantry controls');
});
test('without reviewed approval recipe remains unlinked and current grocery mapping stays intact',()=>{
 const env=environment({record:testPublication({publicationAuthorization:'unreviewed'})});
 const recipe=env.recipe(),groceries=env.grocery();
 assert.match(recipe,/Recipe not yet linked/);
 assert.match(groceries,/Ground beef — 2 lb/);
 assert.match(groceries,/Rotel diced tomatoes and chilies/);
 assert.doesNotMatch(groceries,/3 kg/);
});
test('an approved public recipe lacking a grocery department cannot silently replace shopping quantities',()=>{
 const env=environment({record:testPublication({ingredients:[
  {name:'Ground beef',amount:'3 kg'},
  {name:'Carrots',amount:'2',department:'Produce'}
 ]})});
 const recipe=env.recipe(),groceries=env.grocery();
 assert.match(recipe,/Recipe not yet linked/);
 assert.match(groceries,/Ground beef — 2 lb/);
 assert.doesNotMatch(groceries,/Carrots — 2/);
});
test('the actual public registry contains no unapproved private Taco Casserole method',()=>{
 const publications=vm.runInNewContext(read('recipe-publications.js')+'\nRECIPE_PUBLICATIONS;');
 const links=vm.runInNewContext(read('recipe-links.js')+'\nRECIPE_LINKS;');
 assert.equal(Object.keys(publications).length,0);
 assert.equal(Object.keys(links).length,0);
 const pages=read('index.html');
 assert.ok(pages.indexOf('src="recipe-links.js"')<pages.indexOf('src="recipe-publications.js"'));
 assert.ok(pages.indexOf('src="recipe-publications.js"')<pages.indexOf('src="grocery.js"'));
 assert.ok(pages.indexOf('src="grocery.js"')<pages.indexOf('src="recipe-viewer.js"'));
});
