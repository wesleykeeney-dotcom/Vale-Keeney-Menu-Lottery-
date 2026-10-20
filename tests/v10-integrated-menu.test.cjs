'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const elem=(tag,cls,text)=>({tag,cls,textContent:text||'',children:[],
  append(...args){this.children.push(...args)},replaceChildren(...args){this.children=[...args]},
  setAttribute(k,v){this[k]=v},focus(){}});
function app(ids){
 const dom={groceryContent:elem('div'),recipeContent:elem('div'),recipeTitle:elem('h3'),
  recipeBack:elem('button')};
 const context=vm.createContext({
  document:{getElementById:id=>dom[id]||null},
  localStorage:{getItem:()=>null,setItem:()=>{}},
  node:elem,state:{schedule:[...ids,...Array(7-ids.length).fill(-1)]},
  name:id=>vm.runInContext('MEALS['+id+']',context),validId:id=>Number.isInteger(id)&&id>=0&&id<84,
  allIds:()=>ids,foodWarsMeta:()=>null,switchTab:()=>{}
 });
 for(const file of ['meals.js','recipe-links.js','recipe-publications.js','pantry.js','grocery.js','recipe-viewer.js'])
  vm.runInContext(read(file),context,{filename:file});
 const run=script=>vm.runInContext(script,context);
 const texts=root=>{const collect=n=>[n.textContent||'',...(n.children||[]).flatMap(collect)];return root.children.flatMap(collect).join('\n')};
 return {dom,run,texts};
}
test('approved full Taco Casserole plus three partial recipes retain correct coverage and warnings',()=>{
 const x=app([5,11,17,49]);
 x.run('groceryRender()');
 const t=x.texts(x.dom.groceryContent);
 assert.match(t,/Ingredient coverage: 1 complete shopping template\(s\), 3 partial, 0 unmapped of 4 dinner\(s\)/);
 assert.match(t,/This is not a complete grocery list/);
 assert.match(t,/Cowboy Casserole — PARTIAL, NOT COOK-READY/);
 assert.match(t,/Hamburger Potato Casserole — PARTIAL, NOT COOK-READY/);
 assert.match(t,/Garbage Bread — PARTIAL ingredient list/);
 assert.match(t,/Rotel — 1 \(14\.5 oz\) can/);
 assert.doesNotMatch(t,/Rotel diced tomatoes and chilies — 14\.5 oz total/);
 assert.ok(!x.dom.groceryContent.children.filter(n=>n.cls==='grocery-item')
  .some(n=>/mushroom/i.test(n.children[1].textContent)),'not buying withheld original mushroom ingredient');
 assert.equal(x.run('approvedRecipeForLottery(5).recipeVersionId'),'VK-HH-TACO-CASSEROLE-MANUSCRIPT-001');
 for(const id of [11,17,49])assert.equal(x.run('approvedRecipeForLottery('+id+')'),null);
});
test('partial #18 and #50 render known quantities but not invented instructions',()=>{
 const x=app([17,49]);
 for(const id of [17,49]){
  x.run('recipeViewRender('+id+')');
  const t=x.texts(x.dom.recipeContent);
  assert.match(t,/Recipe not yet linked/);
  assert.match(t,/Partial household shopping requirements/);
  assert.match(t,/PARTIAL, NOT COOK-READY/);
  assert.match(t,/cream of mushroom soup/);
  assert.doesNotMatch(t,/Documented cooking instructions/);
 }
 x.run('groceryRender()');
 assert.match(x.texts(x.dom.groceryContent),/0 complete shopping template\(s\), 2 partial, 0 unmapped/);
});
