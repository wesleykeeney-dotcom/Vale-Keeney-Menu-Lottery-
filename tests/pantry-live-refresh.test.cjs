'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
const pantrySource=fs.readFileSync(path.join(root,'pantry.js'),'utf8');
const prioritySource=fs.readFileSync(path.join(root,'pantry-priority.js'),'utf8');
const grocerySource=fs.readFileSync(path.join(root,'grocery.js'),'utf8');
const registry=grocerySource.match(/const SHOPPING_TEMPLATES = Object.freeze\((\{[\s\S]*?\})\);/);
assert.ok(registry,'templates are loaded from the current app');
const templates=vm.runInNewContext('('+registry[1]+')');
const meals=vm.runInNewContext(fs.readFileSync(path.join(root,'meals.js'),'utf8')+'\nMEALS;');

function setup(groceryFails=false){
  const elements=new Map();
  const makeEl=(tag,cls,text)=>({
    tag,cls,text,children:[],value:'',checked:false,disabled:false,
    append(...items){this.children.push(...items)},
    replaceChildren(...items){this.children=[...items]},
    setAttribute(k,v){this[k]=v}
  });
  for(const id of ['pantryContent','pantrySuggestions','pantryAdd','pantryExtra'])elements.set(id,makeEl('div'));
  const storage={};
  let groceryCalls=0;
  const context=vm.createContext({
    document:{getElementById:id=>elements.get(id)||null},
    localStorage:{getItem:key=>storage[key]??null,setItem:(key,val)=>{storage[key]=val}},
    SHOPPING_TEMPLATES:templates,MEALS:meals,node:makeEl,
    state:{target:5,schedule:[7,15,19,83,-1,-1,-1]},
    allIds:()=>[],toggle:()=>{},
    groceryRender:()=>{groceryCalls++;if(groceryFails)throw Error('simulated grocery render error')}
  });
  vm.runInContext(pantrySource,context);
  vm.runInContext(prioritySource,context);
  vm.runInContext('pantryInit()',context);
  const label=name=>elements.get('pantryContent').children.find(c=>c.tag==='label'&&c.children[1].text.toLowerCase()===name.toLowerCase());
  const recommendations=()=>elements.get('pantrySuggestions').children.filter(x=>x.cls==='priority-meal');
  return {context,elements,storage,label,recommendations,groceries:()=>groceryCalls};
}

test('pantry checkbox immediately updates recommendations without a page refresh',()=>{
  const app=setup();
  assert.equal(app.recommendations().length,0);
  const checkbox=app.label('Breakfast sausage').children[0];
  checkbox.checked=true;
  checkbox.onchange();
  assert.equal(app.recommendations().length,1);
  assert.equal(app.recommendations()[0].children[0].children[0].text,'French Toast & Sausage');
  assert.match(app.recommendations()[0].children[0].children[1].text,/1 of 3/);
  assert.deepEqual(JSON.parse(app.storage['vk-pantry-v04']).items,['breakfast sausage']);
  assert.equal(app.groceries(),1,'grocery list still refreshes after recommendations');

  const updated=app.label('Breakfast sausage').children[0];
  updated.checked=false;
  updated.onchange();
  assert.equal(app.recommendations().length,0,'unchecking removes match immediately');
  assert.deepEqual(JSON.parse(app.storage['vk-pantry-v04']).items,[]);
  assert.equal(app.groceries(),2);
});

test('Already have button immediately refreshes pantry suggestions without reload',()=>{
  const app=setup();
  app.elements.get('pantryExtra').value=' Pizza sauce ';
  app.elements.get('pantryAdd').onclick();
  assert.equal(app.recommendations().length,1);
  assert.equal(app.recommendations()[0].children[0].children[0].text,'Mini Pizza Night');
  assert.match(app.recommendations()[0].children[0].children[1].text,/1 of 4/);
  assert.equal(app.elements.get('pantryExtra').value,'');
  assert.deepEqual(JSON.parse(app.storage['vk-pantry-v04']).items,['pizza sauce']);
});

test('a grocery rendering error cannot block saved pantry changes or live recommendations',()=>{
  const app=setup(true);
  const checkbox=app.label('Breakfast sausage').children[0];
  checkbox.checked=true;
  assert.throws(()=>checkbox.onchange(),/simulated grocery render error/);
  assert.equal(app.recommendations().length,1,'recommendation renders before unrelated grocery failure');
  assert.equal(app.recommendations()[0].children[0].children[0].text,'French Toast & Sausage');
  assert.deepEqual(JSON.parse(app.storage['vk-pantry-v04']).items,['breakfast sausage']);
});

test('refresh fix preserves source boundaries, 84 meal IDs and offline version',()=>{
  assert.equal(meals.length,84);
  const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
  assert.match(sw,/vk-lottery-v10/);
  assert.match(sw,/\.\/pantry-priority\.js/);
  assert.match(pantrySource,/pantrySave\(\);if\(typeof pantryPriorityRender==='function'\)pantryPriorityRender\(\);pantryRender\(\);/);
  for(const id of [80,81,82,83])assert.equal(templates[id],undefined,'protected Food Wars source recipe #'+(id+1)+' stays unmapped');
});
