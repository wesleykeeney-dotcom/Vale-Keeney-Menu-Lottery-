'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
const grocery=fs.readFileSync(path.join(root,'grocery.js'),'utf8');
const meals=vm.runInNewContext(fs.readFileSync(path.join(root,'meals.js'),'utf8')+'\nMEALS;');
const match=grocery.match(/const SHOPPING_TEMPLATES = Object.freeze\((\{[\s\S]*?\})\);/);
assert.ok(match,'shopping template registry');
const templates=vm.runInNewContext('('+match[1]+')', {});
const normalized=id=>(templates[id]||[]).map(([section,ingredient,amount])=>({section,ingredient,amount}));

test('Drive weekly packet maps only exact-name household meals at lottery IDs #1 and #6',()=>{
  assert.equal(meals[0],'Breakfast Tacos');
  assert.equal(meals[5],'Taco Casserole');
  assert.deepEqual(Object.keys(templates).map(Number).sort((a,b)=>a-b),[0,2,5,7,15,19,40]);
  assert.equal(normalized(0).length,7);
  assert.equal(normalized(5).length,9);
});
test('Breakfast Tacos preserves packet quantities and the ham/butter household choices',()=>{
  const items=normalized(0);
  for(const [name,qty] of [
    ['Street taco tortillas','8 tortillas'],
    ['Cooked cubed ham','8 oz'],
    ['Eggs','6 large'],
    ['Shredded cheese','1 cup'],
    ['Butter','for skillet, as needed'],
    ['Salt','to taste'],
    ['Black pepper','to taste']
  ])assert.ok(items.some(x=>x.ingredient===name&&x.amount===qty),name+' quantity missing');
  assert.ok(!items.some(x=>/sausage|mushrooms|raw tomatoes/i.test(x.ingredient)));
});
test('Taco Casserole standard shopping amounts agree with recovered Vault and cookbook',()=>{
  const items=normalized(5);
  for(const [name,qty] of [
    ['Ground beef','2 lb'],
    ['Taco seasoning','2 packets'],
    ['Black beans','1 can (15 oz)'],
    ['Rotel diced tomatoes and chilies','14.5 oz total (check can size)'],
    ['Salsa','1 1/2 cups'],
    ['Shredded Mexican-blend cheese','2 cups'],
    ['Tortilla chips','4 cups'],
    ['Sour cream','1 cup'],
    ['Green onions','2']
  ])assert.ok(items.some(x=>x.ingredient===name&&x.amount===qty),name+' quantity missing');
  assert.ok(!items.some(x=>x.ingredient==='Water'),'1/2 cup tap water remains in recipe, not grocery purchase');
  assert.ok(!items.some(x=>/about 10 oz|to serve/i.test(x.amount)), 'standard mapping cannot silently use incomplete weeknight amounts');
});
test('similar-name variants and original Food Wars sources remain unmapped',()=>{
  for(const id of [1,8,16,80,81,82,83])assert.equal(templates[id],undefined,'lottery #'+(id+1)+' must remain unmapped pending exact recipe check or adaptation approval');
  assert.match(grocery,/private Cooking Vault/);
  assert.doesNotMatch(grocery,/drive\.google\.com|docs\.google\.com/,'do not publish private archive URLs in application code');
});
