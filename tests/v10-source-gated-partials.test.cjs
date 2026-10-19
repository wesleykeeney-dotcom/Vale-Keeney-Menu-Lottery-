'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
const grocery=fs.readFileSync(path.join(root,'grocery.js'),'utf8');
const priority=fs.readFileSync(path.join(root,'pantry-priority.js'),'utf8');
const meals=vm.runInNewContext(fs.readFileSync(path.join(root,'meals.js'),'utf8')+'\nMEALS;');
function registry(name){
 const pattern=new RegExp('const '+name+'\\s*=\\s*Object.freeze\\((\\{[\\s\\S]*?\\})\\);');
 const m=grocery.match(pattern);assert.ok(m,name+' registry exists');
 return vm.runInNewContext('('+m[1]+')');
}
const full=registry('SHOPPING_TEMPLATES');
const partial=registry('SHOPPING_PARTIAL_TEMPLATES');
const notes=registry('SHOPPING_RECIPE_NOTES');
const pairs=id=>new Map(Array.from(partial[id]||[],row=>[row[1],row[2]]));
function element(tag,cls,text){return {tag,cls,textContent:text,children:[],checked:false,
 append(...items){this.children.push(...items)},replaceChildren(...items){this.children=[...items]},
 setAttribute(key,val){this[key]=val}
};}

test('v1.0 full, partial and unmapped catalog partitions retain 84 stable numbers',()=>{
 assert.equal(meals.length,84);
 assert.equal(Object.keys(full).length,9);
 assert.deepEqual(Object.keys(partial).map(Number).sort((a,b)=>a-b),[11,17,49]);
 assert.equal(84-Object.keys(full).length-Object.keys(partial).length,72);
 assert.equal(meals[17],'Cowboy Casserole');
 assert.equal(meals[49],'Hamburger Potato Casserole');
 for(const key of Object.keys(partial))assert.equal(full[key],undefined,'partial record must never be counted as a complete mapping');
});

test('#18 recovered Vault preserves fixed ingredients without purchasing original mushroom soup',()=>{
 const p=pairs(17);
 const expected={
  'Lean ground beef':'1 lb','Onion':'1 small','Minced garlic':'1 tsp','Corn':'1 cup',
  'Cheddar cheese':'1 cup','Milk':'1/2 cup','Sour cream':'1/2 cup',
  'Salt':'1 tsp','Black pepper':'1 tsp','Frozen tater tots':'1 bag'
 };
 assert.equal(p.size,10);
 for(const [name,qty] of Object.entries(expected))assert.equal(p.get(name),qty,name);
 assert.ok(![...p.keys()].some(x=>/mushroom|soup/i.test(x)));
 assert.match(notes[17],/PARTIAL, NOT COOK-READY/);
 assert.match(notes[17],/original requires 1 can cream of mushroom soup/);
 assert.match(notes[17],/approved mushroom-free creamy base has NOT been selected/);
 assert.match(notes[17],/Original image verification remains pending/);
});

test('#50 uses lower-confidence manuscript ingredients without filling blank Vault record or inventing soup substitution',()=>{
 const p=pairs(49);
 const expected={'Potatoes':'1 1/2 lb','Ground beef':'1 lb','Milk':'3/4 cup',
  'Cheddar cheese':'1 1/2 cups','Salt':'to taste','Black pepper':'to taste'};
 assert.equal(p.size,6);
 for(const [name,qty] of Object.entries(expected))assert.equal(p.get(name),qty,name);
 assert.ok(![...p.keys()].some(x=>/mushroom|soup/i.test(x)));
 assert.match(notes[49],/PARTIAL, NOT COOK-READY/);
 assert.match(notes[49],/Original.*1 can cream of mushroom soup|cookbook lists 1 can cream of mushroom soup/i);
 assert.match(notes[49],/Vault ingredient record is still empty/);
 assert.match(notes[49],/NOT been reverified/);
});

test('neither mushroom-source partial is scored in pantry recommendations',()=>{
 const ctx=vm.createContext({document:{getElementById:()=>null}});
 vm.runInContext(priority,ctx);
 ctx.full=full;ctx.count=meals.length;
 ctx.pantry=['Lean ground beef','Potatoes','Milk','Sour cream','Frozen tater tots'];
 const ranking=Array.from(vm.runInContext('pantryMealRankings(full,pantry,count)',ctx));
 assert.equal(ranking.length,9);
 assert.ok(!ranking.some(x=>x.id===17||x.id===49||x.id===11));
 for(const id of [80,81,82,83])assert.equal(full[id],undefined,'protected Food Wars source has no household map');
});

test('mixed weekly calendar visibly distinguishes one full, two partial and one unmapped',()=>{
 const start=grocery.indexOf('function groceryProgressLabel(');
 const before=grocery.indexOf('function groceryWeekIds()');
 const a=grocery.indexOf('function groceryRender(){'),b=grocery.indexOf('\nfunction groceryInit(){',a);
 assert.ok(start>=0&&before>start&&a>before&&b>a);
 const rootEl=element('div');
 const ctx=vm.createContext({
  document:{getElementById:id=>id==='groceryContent'?rootEl:null},
  node:element,state:{schedule:[17,49,15,81,-1,-1,-1]},SHOPPING_TEMPLATES:full,
  SHOPPING_PARTIAL_TEMPLATES:partial,SHOPPING_RECIPE_NOTES:notes,
  groceryWeekIds:()=>[17,49,15,81],groceryState:{checked:[],extras:[]},pantryHas:()=>false,name:id=>meals[id]
 });
 vm.runInContext(grocery.slice(start,before)+grocery.slice(a,b)+'\ngroceryRender()',ctx);
 const meta=rootEl.children.map(x=>x.textContent||'').join(' | ');
 assert.match(meta,/Ingredient coverage: 1 complete shopping template\(s\), 2 partial, 1 unmapped of 4 dinner\(s\)/);
 assert.match(meta,/This is not a complete grocery list/);
 assert.match(meta,/Cowboy Casserole — PARTIAL, NOT COOK-READY/);
 assert.match(meta,/Hamburger Potato Casserole — PARTIAL, NOT COOK-READY/);
 const shopping=rootEl.children.filter(x=>x.cls==='grocery-item');
 assert.ok(shopping.some(x=>x.children[1].textContent.includes('Potatoes — 1 1/2 lb')));
 assert.ok(shopping.some(x=>x.children[1].textContent.includes('Frozen tater tots — 1 bag')));
 assert.ok(!shopping.some(x=>/mushroom/i.test(x.children[1].textContent)));
});

test('new mapping notes do not expose private Vault URLs, ingredient methods, or assume five-person servings',()=>{
 assert.doesNotMatch(grocery,/https:\/\/(?:drive\.google|docs\.google|github\.com\/wesleykeeney-dotcom\/Vale-Keeney-Cooking-vault)/);
 assert.match(grocery,/Original image verification remains pending/);
 assert.match(grocery,/no serving yield established/);
 const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
 assert.match(sw,/vk-lottery-v14/);
});
