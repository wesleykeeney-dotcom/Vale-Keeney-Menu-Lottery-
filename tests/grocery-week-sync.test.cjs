'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const grocery = fs.readFileSync(path.join(root, 'grocery.js'), 'utf8');

test('changing a scheduled dinner immediately refreshes grocery list', () => {
  const start = app.indexOf('function renderWeek(){');
  const end = app.indexOf('\nfunction renderLibrary(){', start);
  assert.ok(start >= 0 && end > start, 'renderWeek source exists');
  const renderWeekSource = app.slice(start, end);
  const list = {children: [], replaceChildren(){this.children=[]}, append(el){this.children.push(el)}};
  const state = {schedule:[7,15,19,-1,-1,-1,-1]};
  const seen = [];
  let saves = 0;
  const node = (tag, cls, text) => ({
    tag, cls, text, children: [], value: '',
    append(...children){this.children.push(...children)},
    setAttribute(name, value){this[name] = value}
  });
  const context = {
    state, node,
    $: name => name==='weekList' ? list : null,
    allIds: () => [7,15,19,40],
    validId: value => Number.isInteger(value) && value >= 0 && value < 84,
    name: value => 'Meal '+value,
    store: () => {saves++},
    groceryRender: () => seen.push([...state.schedule])
  };
  vm.runInNewContext(renderWeekSource + '\nrenderWeek();', context);
  assert.equal(seen.length, 1, 'initial week render refreshes grocery list');
  const monday = list.children[0].children[1];
  monday.value = '40';
  monday.onchange();
  assert.equal(state.schedule[0], 40, 'Monday selection saved in state');
  assert.equal(saves, 1);
  assert.equal(seen.length, 2, 'grocery refreshes on Monday change');
  assert.equal(seen[1][0], 40, 'grocery sees the updated meal');
});

test('shopping list uses the weekly calendar instead of stale lottery picks', () => {
  const match = grocery.match(/function groceryWeekIds\(\)\{[^\n]+\}/);
  assert.ok(match, 'grocery week ID resolver exists');
  const context = {
    state: {schedule:[7,15,19,83,-1,-1,-1]},
    allIds: () => [2,40],
    validId: value => Number.isInteger(value) && value >= 0 && value < 84
  };
  const ids = vm.runInNewContext(match[0] + '\ngroceryWeekIds();', context);
  assert.deepEqual(Array.from(ids), [7,15,19,83]);
});

test('grocery list refreshes when tab opens and discloses unmapped ingredient coverage', () => {
  assert.match(app, /id==='grocery'&&typeof groceryRender==='function'/);
  assert.doesNotMatch(grocery, /originalRenderWeek=renderWeek/, 'no fragile render function monkey-patching');
  assert.match(grocery, /Ingredient coverage:/);
  assert.match(grocery, /not a complete grocery list/);
  assert.match(grocery, /current lottery selections/);
  const match = grocery.match(/const SHOPPING_TEMPLATES = Object.freeze\((\{[\s\S]*?\})\);/);
  assert.ok(match);
  const templates = vm.runInNewContext('('+match[1]+')', {});
  assert.ok(!templates[82] && !templates[83], 'Food Wars ingredients are not invented');
});

test('offline v8 includes updated scripts and catalog stays at 84', () => {
  const sw = fs.readFileSync(path.join(root,'sw.js'),'utf8');
  const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
  assert.match(sw, /vk-lottery-v8/);
  assert.match(sw, /\.\/grocery\.js/);
  assert.match(html, /84 numbered dinner choices/);
  assert.match(html, /src="food-wars\.js"/);
});
