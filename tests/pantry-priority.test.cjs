'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const priority = fs.readFileSync(path.join(root, 'pantry-priority.js'), 'utf8');
const grocery = fs.readFileSync(path.join(root, 'grocery.js'), 'utf8');
const mealsSource = fs.readFileSync(path.join(root, 'meals.js'), 'utf8');
const templatesMatch = grocery.match(/const SHOPPING_TEMPLATES = Object.freeze\((\{[\s\S]*?\})\);/);
assert.ok(templatesMatch, 'existing household grocery template registry exists');
const templates = vm.runInNewContext('('+templatesMatch[1]+')');
const meals = vm.runInNewContext(mealsSource + '\nMEALS;');

function getRankings(available) {
  const context = vm.createContext({});
  vm.runInContext(priority, context);
  context.templates = templates;
  context.available = available;
  context.mealCount = meals.length;
  return Array.from(vm.runInContext('pantryMealRankings(templates,available,mealCount)', context));
}

test('pantry matching ranks only mapped meals and never invents ingredient requirements', () => {
  const ranked = getRankings([' Breakfast Sausage ', 'PIZZA SAUCE']);
  assert.equal(ranked.length, 9, 'only nine documented household grocery templates are scored');
  assert.deepEqual(ranked.slice(0,2).map(x=>x.id), [19,15], '1/3 beats 1/4 coverage');
  assert.deepEqual(Array.from(ranked[0].have), ['Breakfast sausage']);
  assert.deepEqual(Array.from(ranked[1].have), ['Pizza sauce']);
  assert.equal(ranked[0].total, 3);
  for (const id of [80,81,82,83]) assert.ok(!ranked.some(x=>x.id === id), 'Food Wars is unscored, never fabricated');
});

test('ranking is stable and ignores duplicate ingredient names and malformed input', () => {
  const context = vm.createContext({});
  vm.runInContext(priority, context);
  context.custom = {0:[['Dairy','Eggs','1 dozen'],['Dairy','eggs','6 more']], 1:[['Meat','Beef','1 lb']], 80:[],'bad':[['Other','Ghost','1']]};
  context.pantry = [' EGGS ', 'eggs', 123, null];
  const ranked = Array.from(vm.runInContext('pantryMealRankings(custom,pantry,84)', context));
  assert.deepEqual(ranked.map(x=>x.id),[0,1]);
  assert.equal(ranked[0].total,1);
  assert.equal(ranked[0].have.length,1);
  assert.equal(ranked[1].missing.length,1);
  assert.deepEqual(getRankings([]).map(x=>x.id),[7,19,2,15,40,3,0,5,52], 'ties resolve by fewer missing items then stable ID');
});

test('pantry changes and lottery actions refresh suggestions without changing weekly schedule', () => {
  const cards = {children:[], replaceChildren(){this.children=[]}, append(child){this.children.push(child)}};
  const selected = [];
  const schedule = [7,15,19,83,-1,-1,-1];
  const state = {target:5, selected, schedule};
  const pantryState = {items:['Breakfast sausage','Pizza sauce']};
  const node = (tag, cls, text) => ({
    tag, cls, text, children: [], disabled:false,
    append(...children){this.children.push(...children)},
    setAttribute(name,value){this[name]=value}
  });
  const ctx = vm.createContext({
    document:{getElementById:id=>id==='pantrySuggestions'?cards:null},
    node, state, pantryState, MEALS:meals, SHOPPING_TEMPLATES:templates,
    allIds:()=>[...selected],
    toggle:id=>selected.push(id)
  });
  vm.runInContext(priority,ctx);
  let rankedCards = cards.children.filter(x=>x.cls==='priority-meal');
  assert.equal(rankedCards.length,3,'only positive pantry matches are recommended');
  assert.match(rankedCards[0].children[0].children[0].text,/French Toast/);
  const firstButton=rankedCards[0].children[1];
  firstButton.onclick();
  assert.deepEqual(Array.from(selected),[19], 'user action adds suggestion to lottery');
  assert.deepEqual(schedule,[7,15,19,83,-1,-1,-1],'weekly schedule unchanged');
  rankedCards=cards.children.filter(x=>x.cls==='priority-meal');
  assert.equal(rankedCards[0].children[1].disabled,true,'already selected dish not selectable again');
  pantryState.items=['pizza sauce'];
  vm.runInContext('pantryPriorityRender()',ctx);
  rankedCards=cards.children.filter(x=>x.cls==='priority-meal');
  assert.equal(rankedCards.length,2);
  assert.match(rankedCards[0].children[0].children[0].text,/Mini Pizza Night/);
  state.target=1;
  vm.runInContext('pantryPriorityRender()',ctx);
  rankedCards=cards.children.filter(x=>x.cls==='priority-meal');
  assert.equal(rankedCards[0].children[1].disabled,true,'full lottery cannot add suggestions');
});

test('no pantry matches reports coverage and avoids guessing other meals', () => {
  const cards = {children:[],replaceChildren(){this.children=[]},append(x){this.children.push(x)}};
  const node = (tag,cls,text)=>({tag,cls,text,children:[],append(...xs){this.children.push(...xs)}});
  const ctx=vm.createContext({
    document:{getElementById:()=>cards},node,
    pantryState:{items:[]},MEALS:meals,SHOPPING_TEMPLATES:templates,allIds:()=>[],state:{target:5},toggle:()=>{}
  });
  vm.runInContext(priority,ctx);
  assert.equal(cards.children.filter(x=>x.cls==='priority-meal').length,0);
  assert.ok(cards.children.some(x=>String(x.text).includes('75 meals are not yet scored')));
  assert.ok(cards.children.some(x=>x.cls==='priority-empty'));
});

test('pantry-first feature loads after templates and remains wired into refreshes and offline cache', () => {
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
  const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
  const pantry=fs.readFileSync(path.join(root,'pantry.js'),'utf8');
  assert.ok(html.indexOf('src="pantry.js"')<html.indexOf('src="grocery.js"'));
  assert.ok(html.indexOf('src="grocery.js"')<html.indexOf('src="pantry-priority.js"'));
  assert.match(html,/id="pantrySuggestions"/);
  assert.match(sw,/vk-lottery-v11/);
  assert.match(sw,/\.\/pantry-priority\.js/);
  assert.match(app,/typeof pantryPriorityRender==='function'\)pantryPriorityRender\(\)/);
  assert.match(pantry,/typeof pantryPriorityRender==='function'\)pantryPriorityRender\(\)/);
  assert.equal(meals.length,84,'immutable catalog remains at 84');
  assert.ok(!priority.includes('Cooking Vault recipe'), 'no source recipe transcription embedded');
});
