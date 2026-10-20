'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const queue=JSON.parse(read('docs/v1.1-recipe-expansion-queue.json'));
const mealNames=vm.runInNewContext(read('meals.js')+'\nMEALS;');
const pubs=vm.runInNewContext(read('recipe-publications.js')+'\nRECIPE_PUBLICATIONS;');
const links=vm.runInNewContext(read('recipe-links.js')+'\nRECIPE_LINKS;');

test('v1.1 expansion queue is metadata-only, tied to immutable 84 lottery identities',()=>{
 assert.equal(queue.schemaVersion,1);
 assert.equal(queue.productionBaseline.lotteryCount,84);
 assert.equal(mealNames.length,84);
 assert.equal(queue.candidates.length,5);
 const ids=new Set();
 for(const candidate of queue.candidates){
  assert.ok(Number.isInteger(candidate.lotteryId)&&candidate.lotteryId>=0&&candidate.lotteryId<84);
  assert.equal(candidate.displayNumber,candidate.lotteryId+1,'display numbering must remain one-based');
  assert.equal(candidate.title,mealNames[candidate.lotteryId],'never match by approximate title');
  assert.ok(!ids.has(candidate.lotteryId),'lottery review identity must not be duplicated');
  ids.add(candidate.lotteryId);
  assert.ok(candidate.vaultRecipeId.startsWith('VK-'));
  assert.ok(Number.isInteger(candidate.manuscriptEntry));
  assert.equal(candidate.originalImageVerified, candidate.lotteryId===11,'only locked family original is source-confirmed in this batch');
  assert.notEqual(candidate.status,'approved-for-public-web','review manifests are never implicit publication grants');
  for(const disallowed of ['steps','instructions','recipeMethod','recipeIngredients','ingredientRows','sourceUrl','credentials','token']){
   assert.equal(Object.hasOwn(candidate,disallowed),false,'private data must not appear in public queue: '+disallowed);
  }
 }
 assert.deepEqual([...ids].sort((a,b)=>a-b),[3,11,17,49,52]);
});

test('the next full-recipe candidate #4 has its original-vs-manuscript discrepancies preserved',()=>{
 const c=queue.candidates.find(x=>x.lotteryId===3);
 assert.equal(c.vaultRecipeId,'VK-DIN-PIZZAGRILLEDCHEESE-001');
 assert.equal(c.manuscriptEntry,90);
 assert.equal(c.documentedYield,'2 sandwiches');
 assert.equal(c.status,'implemented_pending_release_approval');
 assert.equal(c.implementation.linkedToLottery,3);
 assert.equal(c.implementation.defaultShoppingSauce,'Pizza sauce');
 assert.equal(c.implementation.selectionStorageKey,'vk-recipe-options-v01');
 assert.equal(c.approval.ownerAuthorized,true);
 assert.equal(c.approval.originalSourceImageVerified,false);
 assert.equal(c.approval.releaseMergeAuthorized,false);
 assert.equal(c.originalImageVerified,false);
 assert.match(c.unresolved.join(' '),/garlic powder.*garlic/);
 assert.match(c.unresolved.join(' '),/marinara-or-pizza-sauce/);
 assert.match(c.unresolved.join(' '),/source image/i);
 assert.equal(links[3].recipeVersionId,'VK-HH-PIZZAGRILLEDCHEESE-MANUSCRIPT-001');
});

test('source-incomplete candidates remain blocked and cannot masquerade as cook-ready',()=>{
 const packets=queue.candidates.find(x=>x.lotteryId===52);
 assert.match(packets.manuscriptStatus,/source_body_pending/);
 assert.match(packets.method,/incomplete/);
 assert.equal(packets.documentedYield,null);
 assert.ok(packets.unresolved.some(x=>/time and temperature/.test(x)));
 for(const id of [11,17,49,52])assert.equal(links[id],undefined);
 for(const c of queue.candidates.filter(x=>x.lotteryId!==3)){
  assert.notEqual(c.status,'pending_specific_publication_approval','only the next complete manuscript candidate goes to authorization');
 }
});

test('approved Taco Casserole #6 and its legacy shopping state are protected from a review-only PR',()=>{
 assert.deepEqual(Object.keys(links),['3','5']);
 assert.deepEqual(Object.keys(pubs),['vk-pub-pepperoni-pizza-grilled-cheese-manuscript-001','vk-pub-taco-casserole-manuscript-001']);
 assert.equal(pubs[links[5].publicationId].recipeVersionId,links[5].recipeVersionId);
 assert.equal(pubs[links[5].publicationId].publicationAuthorization,'approved-for-public-web');
 assert.equal(mealNames[5],'Taco Casserole');
 assert.match(read('sw.js'),/vk-lottery-v16/,'new recipe and sauce selector require a cache update');
});

test('review documentation is linked and does not certify a historical original',()=>{
 const review=read('docs/v1.1-recipe-expansion-review.md');
 assert.match(review,/OWNER APPROVAL GIVEN FOR #4 HOUSEHOLD MANUSCRIPT PUBLICATION/);
 assert.match(review,/Pepperoni Pizza Grilled Cheese/);
 assert.match(review,/two sandwiches/i);
 assert.match(review,/Sausage & Potato Foil Packets/);
 assert.match(review,/no authoritative source image positively matched/i);
 assert.match(review,/source-faithful replacement/i);
 assert.match(review,/public.*publication/i);
 assert.match(review,/v1\.1-recipe-expansion-queue\.json/);
});
