'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
function element(tag,cls,text){
 return {tag,cls,textContent:text??'',children:[],append(...items){this.children.push(...items)},
  replaceChildren(...items){this.children=[...items]},setAttribute(k,v){this[k]=v}};
}
function app(){
 const dom={recipeContent:element('div'),recipeTitle:element('h3'),recipeBack:element('button')};
 const ctx=vm.createContext({document:{getElementById:id=>dom[id]||null},
  localStorage:{getItem:()=>null,setItem:()=>{}},state:{schedule:[],target:5},
  validId:id=>Number.isInteger(id)&&id>=0&&id<84,allIds:()=>[],
  node:element,name:id=>'Meal '+id,switchTab:()=>{},foodWarsMeta:()=>null});
 for(const file of ['meals.js','recipe-links.js','recipe-publications.js','pantry.js','grocery.js','pantry-priority.js','recipe-viewer.js']){
  vm.runInContext(read(file),ctx,{filename:file});
 }
 const run=source=>vm.runInContext(source,ctx);
 const text=()=>{const walk=n=>[n.textContent||'',...(n.children||[]).flatMap(walk)];return dom.recipeContent.children.flatMap(walk).join('\n')};
 return {ctx,dom,run,text};
}
test('lottery #81–84 link only to the exact owner-approved source-verified Vault versions',()=>{
 const x=app();
 assert.equal(x.run('MEALS.length'),84);
 assert.deepEqual([80,81,82,83].map(id=>x.run('approvedRecipeForLottery('+id+').recipeId')),
  ['VK-POP-FOODWARS-GOTCHAPORK-001','VK-POP-FOODWARS-FURIKAKE-001','VK-POP-FOODWARS-RAINBOWTERRINE-001','VK-POP-FOODWARS-BOEUF-001']);
 for(const id of [80,81,82,83]){
  const r=x.run('approvedRecipeForLottery('+id+')');
  assert.equal(r.publicationAuthorization,'approved-for-public-web');
  assert.deepEqual(Array.from(r.lotteryIds),[id]);
  assert.equal(r.ingredientStatus,'complete');
  assert.equal(r.methodStatus,'incomplete','abbreviated Vault method is not published as cook-ready');
  assert.equal(r.yieldText,null);
  assert.equal(r.sourceStatus.includes('source-verified'),true);
  assert.equal(Array.from(r.steps).length,0);
 }
});
test('full ingredient lineups drive grocery templates; unknown amounts stay explicit and supplies stay off the list',()=>{
 const x=app();
 const expectedCounts={80:9,81:13,82:28,83:21};
 for(const [id,count] of Object.entries(expectedCounts)){
  const ingredients=Array.from(x.run('approvedRecipeForLottery('+id+').ingredients'));
  const shopping=Array.from(x.run('publishedShoppingRowsForLottery('+id+')'),row=>Array.from(row));
  assert.equal(ingredients.length,count,'source ingredient line count for lottery #'+(+id+1));
  assert.equal(shopping.length,ingredients.filter(i=>!i.optional&&!i.supplyOnly).length);
  for(const item of ingredients){
   assert.ok(item.amount,'even undocumented quantities must be explicit in the UI');
   if(item.amount==='Quantity not specified in Vault'){
    assert.ok(ingredients.includes(item),'do not remove an unknown-quantity source line');
   }else{
    assert.ok(/^[0-9]/.test(item.amount),'preserve a source quantity or a clearly identified unknown');
   }
  }
  assert.ok(!shopping.some(row=>row[1]==='water'),'kitchen supply is not automatically purchased');
 }
 const templates=x.run('completeShoppingTemplates()');
 assert.equal(Object.keys(templates).length,15,'11 existing complete maps plus four exact Vault matches');
 for(const id of [80,81,82,83])assert.ok(templates[id]&&templates[id].length>0);
});
test('source summaries do not appear as cooking instructions',()=>{
 const x=app();
 x.run('recipeViewRender(80)');
 assert.match(x.text(),/Not cooking-ready/);
 assert.match(x.text(),/Quantity not specified in Vault/);
 assert.match(x.text(),/Contains mushrooms/);
 assert.doesNotMatch(x.text(),/Documented cooking instructions/);
 x.run('recipeViewRender(81)');
 assert.match(x.text(),/Not cooking-ready/);
 assert.doesNotMatch(x.text(),/Documented cooking instructions/);
});
