'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');

function catalog(){
 const ctx=vm.createContext({document:{getElementById:()=>null}});
 for(const file of ['meals.js','recipe-links.js','recipe-publications.js','grocery.js']){
  vm.runInContext(read(file),ctx,{filename:file});
 }
 return ctx;
}

test('lottery contains 100 stable choices with the 16 reviewed additions appended',()=>{
 const ctx=catalog();
 const names=Array.from(vm.runInContext('MEALS',ctx));
 assert.equal(names.length,100);
 assert.deepEqual(names.slice(84),[
  'Cheese Steak Hamburger Helper','Maple Soy Salmon','Air-Fryer Chicken Nuggets',
  'Wesley’s Booyah','Wesley’s Kentucky Burgoo','Wesley’s Chicken & Sausage Gumbo',
  'Pork-Rind-Crusted Chicken Parmesan','Wesley’s Tennessee Beef Bourguignon',
  'Black Butler Curry Buns','Country Fried Pork Chops with Bacon Gravy',
  'Tender Chicken Wrapped in Tortillas with Rich, Creamy Cheese Sauce',
  'Garlic Parmesan Chicken Pasta Bake','Garlic-Rich Parmesan Egg-Yolk Soup',
  'Steak with Haunted Bourbon Garlic Cream Sauce',
  'Sweet & Spicy Honey Pepper Chicken with Creamy Macaroni Cheese',
  'Mac and Cheese Meatloaf Casserole'
 ]);
});

test('each new lottery slot binds one approved recipe version and grocery rows match required ingredients',()=>{
 const ctx=catalog();
 const records=vm.runInContext('[...Array(16)].map((_,n)=>approvedRecipeForLottery(84+n))',ctx);
 assert.equal(records.length,16);
 for(let offset=0;offset<16;offset++){
  const id=84+offset,record=records[offset];
  assert.ok(record,'approved publication exists for lottery #'+(id+1));
  assert.equal(record.publicationAuthorization,'approved-for-public-web');
  assert.deepEqual(Array.from(record.lotteryIds),[id]);
  assert.equal(record.methodStatus,'complete');
  assert.ok(Array.isArray(record.ingredients)&&record.ingredients.length>0);
  assert.ok(Array.isArray(record.steps)&&record.steps.length>0);
  assert.ok(record.ingredients.every(i=>typeof i.name==='string'&&i.name&&typeof i.amount==='string'&&i.amount));
  const expected=Array.from(record.ingredients).filter(i=>!i.optional&&!i.supplyOnly).map(i=>[i.department,i.name,i.amount]);
  const actual=Array.from(vm.runInContext('publishedShoppingRowsForLottery('+id+')',ctx),r=>Array.from(r));
  assert.deepEqual(actual,expected,'grocery rows match recipe card at lottery #'+(id+1));
 }
});

test('source-verified entries, household documents and pending transcriptions keep distinct provenance',()=>{
 const ctx=catalog();
 const verified=[84,85,86,89,90,91].map(id=>vm.runInContext('approvedRecipeForLottery('+id+')',ctx));
 assert.ok(verified.every(r=>/verified/i.test(r.sourceStatus)));
 const documents=[87,88,92].map(id=>vm.runInContext('approvedRecipeForLottery('+id+')',ctx));
 assert.ok(documents.every(r=>/Owner-authored|Owner-approved/i.test(r.sourceStatus)));
 const pending=[93,94,95,96,97,98,99].map(id=>vm.runInContext('approvedRecipeForLottery('+id+')',ctx));
 assert.ok(pending.every(r=>/transcription remains pending/i.test(r.sourceStatus)));
 assert.ok(pending.every(r=>!/source-verified/i.test(r.sourceStatus)));
 const b=documents[0];
 assert.ok(b.ingredients.some(i=>i.name==='Peas'&&i.amount==='1 cup'));
 const c=documents[2];
 assert.ok(c.ingredients.some(i=>i.name==='Cooking chocolate'&&i.amount==='Not specified'));
});
