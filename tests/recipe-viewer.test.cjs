'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const viewer=read('recipe-viewer.js');
const publicationsSource=read('recipe-publications.js');
const meals=vm.runInNewContext(read('meals.js')+'\nMEALS;');
const grocery=read('grocery.js');
const getRegistry=name=>{
 const m=grocery.match(new RegExp('const '+name+'\\s*=\\s*Object.freeze\\((\\{[\\s\\S]*?\\})\\);'));
 assert.ok(m,name);return vm.runInNewContext('('+m[1]+')');
};
const shopping=getRegistry('SHOPPING_TEMPLATES');
const partial=getRegistry('SHOPPING_PARTIAL_TEMPLATES');
const notes=getRegistry('SHOPPING_RECIPE_NOTES');
function element(tag,cls,text){
 return {tag,cls,textContent:text??'',children:[],focused:false,
  append(...args){this.children.push(...args)},
  replaceChildren(...args){this.children=[...args]},
  setAttribute(k,v){this[k]=v},
  focus(){this.focused=true}
 };
}
function setup({links={},publications={},shoppingTemplates=shopping,partialTemplates=partial,foodWarsMeta}={}){
 const dom={recipeTitle:element('h3'),recipeContent:element('div'),recipeBack:element('button')};
 const opened=[];
 const ctx=vm.createContext({
  document:{getElementById:id=>dom[id]||null},
  node:element,
  MEALS:meals,
  mockPublications:publications,
  SHOPPING_TEMPLATES:shoppingTemplates,
  SHOPPING_PARTIAL_TEMPLATES:partialTemplates,
  SHOPPING_RECIPE_NOTES:notes,
  recipeLinkFor:id=>links[id]||null,
  switchTab:id=>opened.push(id),
  foodWarsMeta:foodWarsMeta||(()=>null)
 });
 vm.runInContext(publicationsSource.replace(/const RECIPE_PUBLICATIONS=Object\.freeze\(\{[\s\S]*?\n\}\);/,'const RECIPE_PUBLICATIONS=Object.freeze(mockPublications);')+'\n'+viewer,ctx);
 const render=id=>vm.runInContext('recipeViewRender('+id+')',ctx);
 const open=(id,origin)=>vm.runInContext('recipeOpen('+id+','+JSON.stringify(origin)+')',ctx);
 const text=()=>{const traverse=e=>[e.textContent||'',...e.children.flatMap(traverse)];return dom.recipeContent.children.flatMap(traverse).join('\n')};
 return {ctx,dom,opened,render,open,text};
}
function fixture(overrides={}){
 return {
  publicationId:'public-fixture-1',recipeId:'fixture-source',recipeVersionId:'fixture-version-1',
  publicationAuthorization:'approved-for-public-web',lotteryIds:[5],
  title:'Test-only fixture',versionType:'approved-household',sourceStatus:'test fixture',
  ingredientStatus:'complete',methodStatus:'complete',householdSubstitutionsResolved:true,
  ingredients:[{name:'Fixture ingredient',amount:'1 test unit',department:'Test department'}],
  steps:['Fixture step A.','Fixture step B.'],yieldText:'Test yield',
  ...overrides
 };
}
test('unlinked exact-name shopping list displays planning ingredients but NEVER invented steps',()=>{
 const app=setup();
 app.open(5,'lottery');
 assert.equal(app.dom.recipeTitle.textContent,'Taco Casserole');
 assert.deepEqual(app.opened,['recipe']);
 assert.equal(app.dom.recipeTitle.focused,true);
 assert.match(app.text(),/Recipe not yet linked/);
 assert.match(app.text(),/Household shopping requirements/);
 assert.match(app.text(),/Rotel diced tomatoes and chilies — 14.5 oz total/);
 assert.doesNotMatch(app.text(),/Documented cooking instructions|Fixture step A/);
 app.dom.recipeBack.onclick();
 assert.deepEqual(app.opened,['recipe','lottery']);
});
test('partial family recipe is shown as incomplete and cannot pretend to be cook-ready',()=>{
 const app=setup();
 app.open(11,'menu');
 assert.match(app.text(),/Partial household shopping requirements/);
 assert.match(app.text(),/Pizza dough — 1 dough/);
 assert.match(app.text(),/PARTIAL ingredient list/);
 assert.doesNotMatch(app.text(),/Documented cooking instructions/);
 app.dom.recipeBack.onclick();
 assert.equal(app.opened.at(-1),'menu');
});
test('unmapped Food Wars recipe shows source warning without leaking source method',()=>{
 const app=setup({foodWarsMeta:id=>id===83?{note:'Original requires honey treatment and white mushrooms.',mushrooms:true}:null});
 app.open(83,'library');
 assert.match(app.text(),/Recipe not yet linked/);
 assert.match(app.text(),/No reviewed ingredients or household shopping requirements/);
 assert.match(app.text(),/Contains mushrooms/);
 assert.doesNotMatch(app.text(),/Documented cooking instructions/);
});
test('explicit publication ID, version ID, lottery membership and approval must ALL match',()=>{
 const publication=fixture();
 const link={publicationId:'public-fixture-1',recipeVersionId:'fixture-version-1'};
 const candidates=[
  {links:{},publications:{'public-fixture-1':publication}},
  {links:{5:link},publications:{}},
  {links:{5:{...link,recipeVersionId:'wrong-version'}},publications:{'public-fixture-1':publication}},
  {links:{5:link},publications:{'public-fixture-1':fixture({publicationAuthorization:'unapproved'})}},
  {links:{5:link},publications:{'public-fixture-1':fixture({lotteryIds:[4]})}},
  {links:{5:link},publications:{'public-fixture-1':fixture({publicationId:'not-the-key'})}}
 ];
 for(const sample of candidates){
  const app=setup(sample);app.render(5);
  assert.match(app.text(),/Recipe not yet linked/);
  assert.doesNotMatch(app.text(),/Fixture step A/);
 }
});
test('approved complete test-only publication can show its exact ordered method without generating new steps',()=>{
 const app=setup({links:{5:{publicationId:'public-fixture-1',recipeVersionId:'fixture-version-1'}},
  publications:{'public-fixture-1':fixture()}});
 app.render(5);
 assert.match(app.text(),/Approved public recipe version/);
 assert.match(app.text(),/Fixture ingredient — 1 test unit/);
 assert.match(app.text(),/Documented cooking instructions/);
 assert.match(app.text(),/Fixture step A/);
 assert.match(app.text(),/Fixture step B/);
 assert.ok(app.text().indexOf('Fixture step A')<app.text().indexOf('Fixture step B'));
});
test('incomplete public test fixture never displays partial instructions as complete',()=>{
 for(const changes of [
  {methodStatus:'partial'}, {ingredientStatus:'partial'},
  {householdSubstitutionsResolved:false}, {steps:[]}, {ingredients:[]}
 ]){
  const app=setup({links:{5:{publicationId:'public-fixture-1',recipeVersionId:'fixture-version-1'}},
    publications:{'public-fixture-1':fixture(changes)}});
  app.render(5);
  if(changes.methodStatus==='partial'||Array.isArray(changes.steps)){
   assert.match(app.text(),/Not cooking-ready/);
  }else{
   // Incomplete ingredients or unresolved household substitutions prevent
   // publication linkage entirely, not merely the cooking-mode display.
   assert.match(app.text(),/Recipe not yet linked/);
  }
  assert.doesNotMatch(app.text(),/Documented cooking instructions/);
 }
});
test('winner, weekly menu and library all expose recipe navigation without changing the calendar',()=>{
 const source=read('app.js');
 assert.match(source,/recipeOpen\(id,'lottery'\)/);
 assert.match(source,/recipeOpen\(current\[i\],'menu'\)/);
 assert.match(source,/recipeOpen\(id,'library'\)/);
 const list={children:[],replaceChildren(){this.children=[]},append(x){this.children.push(x)}};
 const scheduled={schedule:[5,11,-1,-1,-1,-1,-1]};
 const opened=[];
 const ctx=vm.createContext({state:scheduled,node:element,
  $:id=>id==='weekList'?list:null,
  allIds:()=>[5,11],validId:n=>Number.isInteger(n)&&n>=0&&n<84,
  name:id=>meals[id],store:()=>{},groceryRender:()=>{},
  recipeOpen:(id,tab)=>opened.push([id,tab])
 });
 const begin=source.indexOf('function renderWeek(){'),end=source.indexOf('\nfunction renderLibrary(){',begin);
 vm.runInContext(source.slice(begin,end)+'\nrenderWeek()',ctx);
 assert.equal(list.children.length,7);
 const buttons=list.children[0].children.filter(c=>c.tag==='button');
 assert.equal(buttons.length,1);
 buttons[0].onclick();
 assert.deepEqual(opened,[[5,'menu']]);
 assert.equal(list.children[2].children.filter(c=>c.tag==='button').length,0,'flex night no recipe link');
 assert.equal(scheduled.schedule[0],5,'viewing does not mutate saved week');
});
test('only the approved household manuscript is publicly linked; assets and offline wiring remain correct',()=>{
 const publications=vm.runInNewContext(read('recipe-publications.js')+'\nRECIPE_PUBLICATIONS;');
 assert.deepEqual(Object.keys(publications),['vk-pub-pepperoni-pizza-grilled-cheese-manuscript-001','vk-pub-taco-casserole-manuscript-001']);
 const approved=publications['vk-pub-taco-casserole-manuscript-001'];
 assert.equal(approved.publicationAuthorization,'approved-for-public-web');
 assert.match(approved.versionType,/household manuscript.*not source-verified original/i);
 assert.match(approved.sourceStatus,/NOT been independently verified/);
 const links=vm.runInNewContext(read('recipe-links.js')+'\nRECIPE_LINKS;');
 assert.deepEqual(Object.keys(links),['3','5']);
 assert.equal(links[5].recipeVersionId,approved.recipeVersionId);
 assert.equal(meals.length,84);
 const html=read('index.html'),sw=read('sw.js');
 for(const asset of ['recipe-publications.js','recipe-viewer.js']){
  assert.match(html,new RegExp('src="'+asset.replace('.','\\.')+'"'));
  assert.ok(sw.includes('./'+asset));
 }
 assert.match(html,/id="recipeContent"/);
 assert.match(html,/id="recipeTitle" tabindex="-1"/);
 assert.match(sw,/vk-lottery-v17/);
});
