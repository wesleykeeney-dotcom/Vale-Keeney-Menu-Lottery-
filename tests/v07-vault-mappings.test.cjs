'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const src=fs.readFileSync(path.join(root,'grocery.js'),'utf8');
const meals=vm.runInNewContext(fs.readFileSync(path.join(root,'meals.js'),'utf8')+'\nMEALS;');
const m=src.match(/const SHOPPING_TEMPLATES = Object.freeze\((\{[\s\S]*?\})\);/);
assert.ok(m,'grocery template registry exists');
const mapping=vm.runInNewContext('('+m[1]+')',{});
const noteMatch=src.match(/const SHOPPING_RECIPE_NOTES=Object.freeze\((\{[\s\S]*?\})\);/);
assert.ok(noteMatch,'separate planning caveats exist');
const notes=vm.runInNewContext('('+noteMatch[1]+')',{});

function asMap(zeroBasedId){return new Map((mapping[zeroBasedId]||[]).map(([,name,amount])=>[name,amount]));}

test('lottery numbers #4 and #53 map to the correct archived recipe identity',()=>{
  assert.equal(meals.length,84);
  assert.equal(meals[3],'Pepperoni Pizza Grilled Cheese');
  assert.equal(meals[52],'Sausage & Potato Foil Packets');
  assert.deepEqual(Object.keys(mapping).map(Number).sort((a,b)=>a-b),[0,2,3,5,7,15,19,40,52]);
});

test('#4 preserves all required recovered shopping quantities for two sandwiches',()=>{
  const items=asMap(3);
  assert.equal(items.size,6);
  const expected={
    'Bread':'4 slices',
    'Pepperoni':'8 slices',
    'Shredded mozzarella':'1 cup',
    'Pizza sauce':'2 Tbsp',
    'Butter':'2 Tbsp',
    'Oregano':'1 tsp'
  };
  for(const [name,qty] of Object.entries(expected))assert.equal(items.get(name),qty,name);
  assert.ok(![...items.keys()].some(x=>/garlic/i.test(x)),'optional garlic not treated as a required purchase');
  assert.match(notes[3],/2 sandwiches, not 5 servings/);
  assert.match(notes[3],/Optional garlic: 1 tsp/);
  assert.match(src,/source's pizza-sauce OR marinara option/);
});

test('#53 preserves recovered foil packet quantities, no invented servings or mushrooms',()=>{
  const items=asMap(52);
  const expected={
    'Smoked sausage':'1 lb',
    'Baby potatoes':'1 1/2 lb',
    'Red bell pepper':'1',
    'Green bell pepper':'1',
    'Onion':'1 small',
    'Olive oil':'3 Tbsp',
    'Garlic powder':'2 tsp',
    'Italian seasoning':'1 tsp',
    'Paprika':'1 tsp',
    'Salt':'to taste',
    'Black pepper':'to taste'
  };
  assert.equal(items.size,11);
  for(const [name,qty] of Object.entries(expected))assert.equal(items.get(name),qty,name);
  assert.ok(![...items.keys()].some(x=>/mushroom|chicken broth|frozen fries/i.test(x)));
  assert.match(notes[52],/yield is unspecified/);
  assert.match(notes[52],/do not assume quantities cover five people/);
});

test('mushroom-containing and unverified variant recipes stay unmapped',()=>{
  // Cowboy Casserole's recovered original requires cream of mushroom soup, not yet an approved family version.
  for(const id of [1,8,11,17,30,31,39,49,80,81,82,83]){
    assert.equal(mapping[id],undefined,'Do not invent a household mapping for lottery #'+(id+1));
  }
  assert.match(src,/original source-image verification/i);
  assert.doesNotMatch(src,/drive\.google\.com|docs\.google\.com|github\.com\/wesleykeeney-dotcom\/Vale-Keeney-Cooking-vault/,'private source locations are not published');
});

test('quantity notes are displayed for selected meals without altering required pantry ranking',()=>{
  assert.match(src,/for\(const id of ids\)if\(SHOPPING_RECIPE_NOTES\[id\]\)/);
  assert.match(src,/not included in required shopping/);
  const priority=fs.readFileSync(path.join(root,'pantry-priority.js'),'utf8');
  const context=vm.createContext({});
  vm.runInContext(priority,context);
  context.mapping=mapping;
  context.pantry=['Pizza sauce'];
  context.count=84;
  const ranks=Array.from(vm.runInContext('pantryMealRankings(mapping,pantry,count)',context));
  const pizza=ranks.find(x=>x.id===3);
  assert.equal(pizza.total,6);
  assert.equal(pizza.have.length,1);
  assert.equal(pizza.missing.length,5);
});
