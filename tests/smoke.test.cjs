const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'meals.js'), 'utf8');
const meals = vm.runInNewContext(source + '\nMEALS;', {});

test('lottery contains exactly 80 numbered options', () => {
  assert.equal(meals.length, 80);
  assert.ok(meals.every(meal => typeof meal === 'string' && meal.trim().length > 0));
});

test('all meal names are unique', () => {
  assert.equal(new Set(meals.map(meal => meal.trim().toLowerCase())).size, 80);
});

test('historical lottery numbers remain stable', () => {
  assert.equal(meals[7], 'Spaghetti & Meatballs');
  assert.equal(meals[15], 'Mini Pizza Night');
  assert.equal(meals[19], 'French Toast & Sausage');
  assert.equal(meals[40], 'Beef Tips & Noodles');
});

test('required app assets are present', () => {
  for (const filename of ['index.html', 'app.js', 'meals.js', 'styles.css', 'manifest.webmanifest', 'sw.js']) {
    assert.ok(fs.existsSync(path.join(root, filename)), filename + ' missing');
  }
});
