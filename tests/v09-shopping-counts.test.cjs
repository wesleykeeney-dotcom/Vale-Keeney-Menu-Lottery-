'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
const source=fs.readFileSync(path.join(root,'grocery.js'),'utf8');
const meals=vm.runInNewContext(fs.readFileSync(path.join(root,'meals.js'),'utf8')+'\nMEALS;');

function el(tag,cls,text){
 return {
  tag,cls,textContent:text??'',children:[],checked:false,disabled:false,
  append(...children){this.children.push(...children)},
  replaceChildren(...children){this.children=[...children]},
  setAttribute(name,value){this[name]=value}
 };
}
function setup({schedule=[15,-1,-1,-1,-1,-1,-1],pantry=['pizza sauce'],checked=[],extras=[],storage}={}){
 const data=storage||{};
 if(!data['vk-grocery-v03'])data['vk-grocery-v03']=JSON.stringify({checked,extras,pantry:[]});
 const dom={groceryContent:el('div'),groceryAdd:el('button'),groceryExtra:el('input'),groceryClear:el('button')};
 const ctx=vm.createContext({
  document:{getElementById:id=>dom[id]||null},
  node:el,MEALS:meals,
  state:{schedule},allIds:()=>[],
  validId:id=>Number.isInteger(id)&&id>=0&&id<meals.length,
  name:id=>meals[id],
  pantryHas:name=>pantry.includes(name.toLowerCase()),
  localStorage:{getItem:key=>data[key]??null,setItem:(key,value)=>{data[key]=value}},
  confirm:()=>true
 });
 vm.runInContext(source,ctx);
 const line=()=>dom.groceryContent.children.find(x=>x.tag==='p'&&x.textContent.includes(' checked off '));
 const rows=()=>dom.groceryContent.children.filter(x=>x.cls==='grocery-item');
 const check=name=>{const row=rows().find(x=>x.children[1].textContent.startsWith(name+' — '));assert.ok(row,name+' row exists');return row.children[0]};
 const coverage=()=>dom.groceryContent.children.find(x=>x.tag==='p'&&x.textContent.startsWith('Ingredient coverage:'));
 return {ctx,dom,data,line,rows,check,coverage};
}

test('live total counts remaining, checked-off, and pantry independently',()=>{
 const app=setup();
 assert.equal(app.line().textContent,'3 items remaining • 0 checked off • 1 already on hand.');
 assert.equal(app.line().role,'status');
 assert.equal(app.line()['aria-live'],'polite');
 const unchangedRows=app.rows();
 const pepperoni=app.check('Pepperoni');
 pepperoni.checked=true;
 pepperoni.onchange();
 assert.equal(app.line().textContent,'2 items remaining • 1 checked off • 1 already on hand.');
 assert.equal(app.rows()[0],unchangedRows[0],'live count must not reconstruct rows, losing scroll and focus');
 assert.deepEqual(JSON.parse(app.data['vk-grocery-v03']).checked,['pepperoni']);
 pepperoni.checked=false;
 pepperoni.onchange();
 assert.equal(app.line().textContent,'3 items remaining • 0 checked off • 1 already on hand.');
 assert.deepEqual(JSON.parse(app.data['vk-grocery-v03']).checked,[]);
});

test('already checked groceries load from persistent storage and count on refresh',()=>{
 const store={'vk-grocery-v03':JSON.stringify({checked:['pepperoni'],extras:[],pantry:[]})};
 const app=setup({storage:store});
 assert.equal(app.check('Pepperoni').checked,true);
 assert.equal(app.line().textContent,'2 items remaining • 1 checked off • 1 already on hand.');
 const recreated=setup({storage:store});
 assert.equal(recreated.check('Pepperoni').checked,true);
 assert.equal(recreated.line().textContent,'2 items remaining • 1 checked off • 1 already on hand.');
});

test('partial Garbage Bread plus Mini Pizza Night mirrors Android list totals',()=>{
 const app=setup({schedule:[15,11,-1,-1,-1,-1,-1],checked:['pepperoni']});
 assert.equal(app.rows().length,5,'five non-pantry shopping requirements, including partial fixed base');
 assert.equal(app.line().textContent,'4 items remaining • 1 checked off • 1 already on hand.');
 assert.match(app.coverage().textContent,/1 complete shopping template\(s\), 1 partial/);
 assert.match(app.coverage().textContent,/This is not a complete grocery list/);
 assert.equal(app.check('Pizza dough').checked,false);
 assert.equal(app.check('Ground beef').checked,false);
 app.check('Pizza dough').checked=true;app.check('Pizza dough').onchange();
 assert.equal(app.line().textContent,'3 items remaining • 2 checked off • 1 already on hand.');
 assert.match(app.coverage().textContent,/partial/,'completion count must not promote source-partial recipe');
});

test('checked items also in the pantry never inflate the checked-off shopping total',()=>{
 const app=setup({checked:['pizza sauce','pepperoni']});
 assert.equal(app.line().textContent,'2 items remaining • 1 checked off • 1 already on hand.');
 assert.equal(app.rows().length,3);
});

test('manual additions count as remaining until checked; clearing resets the summary',()=>{
 const app=setup();
 app.dom.groceryExtra.value='Fresh fruit';
 app.dom.groceryAdd.onclick();
 assert.equal(app.line().textContent,'4 items remaining • 0 checked off • 1 already on hand.');
 const extra=app.check('Fresh fruit');
 extra.checked=true;extra.onchange();
 assert.equal(app.line().textContent,'3 items remaining • 1 checked off • 1 already on hand.');
 app.dom.groceryClear.onclick();
 assert.equal(app.line().textContent,'3 items remaining • 0 checked off • 1 already on hand.');
 assert.ok(!app.rows().some(row=>row.children[1].textContent.startsWith('Fresh fruit')));
 assert.deepEqual(JSON.parse(app.data['vk-grocery-v03']).checked,[]);
});

test('unmapped schedule and empty shopping list report zeros honestly',()=>{
 const app=setup({schedule:[81,-1,-1,-1,-1,-1,-1],pantry:[],checked:['pepperoni']});
 assert.equal(app.line().textContent,'0 items remaining • 0 checked off • 0 already on hand.');
 assert.match(app.coverage().textContent,/1 unmapped of 1 dinner/);
 assert.match(app.coverage().textContent,/This is not a complete grocery list/);
 assert.equal(meals.length,84);
 const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
 assert.match(sw,/vk-lottery-v17/);
});
