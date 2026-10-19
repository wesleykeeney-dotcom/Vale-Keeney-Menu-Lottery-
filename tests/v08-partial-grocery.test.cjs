'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
const grocery=fs.readFileSync(path.join(root,'grocery.js'),'utf8');
const pantry=fs.readFileSync(path.join(root,'pantry.js'),'utf8');
const priority=fs.readFileSync(path.join(root,'pantry-priority.js'),'utf8');
const meals=vm.runInNewContext(fs.readFileSync(path.join(root,'meals.js'),'utf8')+'\nMEALS;');
function data(registry){const m=grocery.match(new RegExp('const '+registry+'\\s*=\\s*Object.freeze\\((\\{[\\s\\S]*?\\})\\);'));assert.ok(m,registry+' exists');return vm.runInNewContext('('+m[1]+')');}
const full=data('SHOPPING_TEMPLATES'),partial=data('SHOPPING_PARTIAL_TEMPLATES'),notes=data('SHOPPING_RECIPE_NOTES');
function element(tag,cls,text){return {tag,cls,text,children:[],checked:false,type:'',append(...args){this.children.push(...args)},replaceChildren(...args){this.children=[...args]},setAttribute(k,v){this[k]=v}};}

test('v0.8 protects 84 IDs, all 9 full templates and exactly one incomplete family template',()=>{
 assert.equal(meals.length,84);
 assert.deepEqual(Object.keys(full).map(Number).sort((a,b)=>a-b),[0,2,3,5,7,15,19,40,52]);
 assert.deepEqual(Object.keys(partial).map(Number),[11]);
 assert.equal(meals[11],'Garbage Bread');
 assert.equal(full[11],undefined,'Garbage Bread is not represented as a complete recipe');
 for(const id of Object.keys(partial))assert.equal(full[id],undefined,'full and partial cannot collide');
});

test('Garbage Bread core comes from locked family recipe; variable ingredients are NOT fabricated',()=>{
 const rows=Array.from(partial[11],r=>Array.from(r));
 assert.deepEqual(rows,[
  ['Bakery','Pizza dough','1 dough (for 1 loaf)'],
  ['Meat','Ground beef','about 1 lb']
 ]);
 assert.match(notes[11],/PARTIAL ingredient list/);
 assert.match(notes[11],/one loaf/);
 assert.match(notes[11],/cheese, fillings, and seasoning/);
 assert.match(notes[11],/add them to the grocery list manually/);
 assert.ok(!rows.some(x=>/filling|cheese|pepperoni|mushroom/i.test(x[1])));
});

test('partial recipe is excluded from pantry scoring while base ingredients remain selectable',()=>{
 const ctx=vm.createContext({document:{getElementById:()=>null},SHOPPING_TEMPLATES:full,
  SHOPPING_PARTIAL_TEMPLATES:partial,MEALS:meals,pantryState:{items:['Pizza dough','Ground beef']}});
 vm.runInContext(priority,ctx);
 const rankings=Array.from(vm.runInContext('pantryMealRankings(SHOPPING_TEMPLATES,pantryState.items,MEALS.length)',ctx));
 assert.equal(rankings.length,9);
 assert.ok(!rankings.some(x=>x.id===11));
 const rootEl=element('div');
 const pctx=vm.createContext({document:{getElementById:id=>id==='pantryContent'?rootEl:null},
   localStorage:{getItem:()=>null,setItem:()=>{}},SHOPPING_TEMPLATES:full,SHOPPING_PARTIAL_TEMPLATES:partial,node:element});
 vm.runInContext(pantry+'\npantryRender()',pctx);
 const pantryNames=rootEl.children.filter(x=>x.tag==='label').map(x=>x.children[1].text);
 assert.ok(pantryNames.includes('Pizza dough'));
 assert.ok(pantryNames.includes('Ground beef'));
});

test('grocery list shows fixed base shopping items AND an honest partial coverage warning',()=>{
 const a=grocery.indexOf('function groceryRender(){'),b=grocery.indexOf('\nfunction groceryInit(){',a);
 assert.ok(a>=0&&b>a);
 const rootEl=element('div');
 const state={schedule:[11,-1,-1,-1,-1,-1,-1]};
 const ctx=vm.createContext({
  document:{getElementById:id=>id==='groceryContent'?rootEl:null},
  node:element,state,SHOPPING_TEMPLATES:full,SHOPPING_PARTIAL_TEMPLATES:partial,SHOPPING_RECIPE_NOTES:notes,
  groceryWeekIds:()=>[11],groceryState:{checked:[],extras:[]},pantryHas:()=>false,name:id=>meals[id]});
 vm.runInContext(grocery.slice(grocery.indexOf('function groceryProgressLabel('),grocery.indexOf('function groceryWeekIds()'))+grocery.slice(a,b)+'\ngroceryRender()',ctx);
 const text=rootEl.children.map(el=>el.text||'').join(' | ');
 assert.match(text,/0 complete shopping template\(s\), 1 partial, 0 unmapped of 1 dinner/);
 assert.match(text,/This is not a complete grocery list/);
 assert.match(text,/Partial recipes: Garbage Bread/);
 assert.match(text,/Cheese|cheese/);
 assert.ok(rootEl.children.filter(el=>el.cls==='grocery-item').length===2);
 assert.ok(rootEl.children.some(el=>el.cls==='grocery-item'&&el.children[1].text.includes('Pizza dough — 1 dough')));
 assert.ok(rootEl.children.some(el=>el.cls==='grocery-item'&&el.children[1].text.includes('Ground beef — about 1 lb')));
 assert.equal(state.schedule[0],11,'render does not modify weekly menu');
});

test('a fully mapped dish and one partial dish are counted separately',()=>{
 const a=grocery.indexOf('function groceryRender(){'),b=grocery.indexOf('\nfunction groceryInit(){',a),rootEl=element('div');
 const ctx=vm.createContext({
  document:{getElementById:id=>id==='groceryContent'?rootEl:null},
  node:element,state:{schedule:[3,11,-1,-1,-1,-1,-1]},SHOPPING_TEMPLATES:full,SHOPPING_PARTIAL_TEMPLATES:partial,SHOPPING_RECIPE_NOTES:notes,
  groceryWeekIds:()=>[3,11],groceryState:{checked:[],extras:[]},pantryHas:()=>false,name:id=>meals[id]});
 vm.runInContext(grocery.slice(grocery.indexOf('function groceryProgressLabel('),grocery.indexOf('function groceryWeekIds()'))+grocery.slice(a,b)+'\ngroceryRender()',ctx);
 const coverage=rootEl.children.map(el=>el.text).find(x=>x&&x.startsWith('Ingredient coverage:'));
 assert.match(coverage,/1 complete shopping template\(s\), 1 partial, 0 unmapped of 2 dinner/);
 assert.match(coverage,/This is not a complete grocery list/);
});

test('source variant warning for Beef Tips does not inject mushrooms into existing household template',()=>{
 assert.match(notes[40],/cream of mushroom soup and canned mushrooms/);
 assert.match(notes[40],/not represent that original/i);
 assert.ok(!full[40].some(row=>/mushroom/i.test(row[1])));
 assert.equal(notes[40]!==undefined,true);
 assert.equal(full[80],undefined,'source-faithful Food Wars remains unmapped');
 const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
 assert.match(sw,/vk-lottery-v13/);
});
