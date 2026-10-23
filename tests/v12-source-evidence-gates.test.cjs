'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const queue=JSON.parse(read('docs/v1.2-source-evidence-queue.json'));
const meals=vm.runInNewContext(read('meals.js')+'\nMEALS;');
const links=vm.runInNewContext(read('recipe-links.js')+'\nRECIPE_LINKS;');
const published=vm.runInNewContext(read('recipe-publications.js')+'\nRECIPE_PUBLICATIONS;');
const byId=id=>queue.candidates.find(c=>c.lotteryId===id);

test('v1.2 evidence-only queue is correctly numbered and never authorizes publication',()=>{
 assert.equal(queue.schemaVersion,1);
 assert.equal(queue.scope,'review_only_metadata_not_recipe_publication');
 assert.equal(queue.productionBaseline.version,'v1.1.1');
 assert.equal(queue.productionBaseline.approvedMergeCommit,'8f6023cec152cf77b3fec10fee171200bb8a2ffc');
 assert.equal(queue.productionBaseline.lotteryCount,84);
 assert.equal(meals.length,84);
 assert.deepEqual(Array.from(queue.productionBaseline.approvedHouseholdPublicationLotteryIds),[3,5]);
 assert.equal(queue.canonicalAuthority,'private Vale-Keeney Cooking Vault');
 for(const [key,value] of Object.entries(queue.policy)){
  assert.equal(typeof value,'boolean');
  assert.equal(value,/^approvalRequired/.test(key),'unsafe change-control policy '+key);
 }
 const ids=new Set();
 for(const x of queue.candidates){
  assert.ok(Number.isInteger(x.lotteryId)&&x.lotteryId>=0&&x.lotteryId<84);
  assert.equal(x.displayNumber,x.lotteryId+1);
  assert.equal(x.lotteryTitle,meals[x.lotteryId]);
  assert.ok(!ids.has(x.lotteryId),'duplicate lottery number');
  ids.add(x.lotteryId);
  assert.equal(x.publicPublicationApproved,false);
  assert.equal(x.sourceVerificationApproved,false);
  assert.equal(x.cookReady,false);
  assert.equal(x.householdShoppingOnly,true);
  assert.equal(links[x.lotteryId],undefined,'a review-only source cannot acquire a public cooking link');
  assert.ok(queue.sourceImages.some(e=>e.evidenceId===x.evidenceId));
  for(const prohibited of ['ingredients','instructions','steps','method','sourceUrl','sourceIngredients','recipeBody','privateDriveId','accessToken'])
   assert.equal(Object.hasOwn(x,prohibited),false,'public review queue cannot export '+prohibited);
 }
 assert.deepEqual([...ids].sort((a,b)=>a-b),[40,52]);
});

test('every evidence reference is unique, fingerprinted, and contains no source bytes',()=>{
 const ids=new Set(), hashes=new Set();
 for(const e of queue.sourceImages){
  assert.ok(!ids.has(e.evidenceId));ids.add(e.evidenceId);
  assert.match(e.filename,/^(Screenshot_|FB_IMG_)[A-Za-z0-9_.-]+\.(jpg|jpeg|png)$/);
  assert.match(e.sha256,/^[a-f0-9]{64}$/);
  assert.ok(!hashes.has(e.sha256));hashes.add(e.sha256);
  assert.equal(e.sourceBytesIncluded,false);
  assert.equal(e.originalToVaultComparisonApproved,false);
  assert.ok(typeof e.title==='string'&&e.title.length>3);
  for(const sensitive of ['imageBase64','sourceUrl','personalAccount','driveId','recipeIngredients','recipeMethod'])
   assert.equal(Object.hasOwn(e,sensitive),false,'no private archive content in public queue');
 }
 assert.ok(queue.sourceImages.length>=10);
});

test('#53 original-image evidence cannot silently erase paprika or fabricate instructions',()=>{
 const p=byId(52),image=queue.sourceImages.find(e=>e.evidenceId===p.evidenceId);
 assert.equal(p.canonicalRecipeId,'VK-DIN-SAUSAGEPOTATO-FOILPACKETS-001');
 assert.equal(p.historicalCatalogNumber,191);
 assert.equal(p.sourceIngredientLines,9);
 assert.equal(p.vaultIngredientLines,10);
 assert.match(p.quantityDiscrepancy,/1 tsp paprika absent/);
 assert.equal(image.evidenceStatus,'original_image_directly_inspected_fingerprint_confirmed');
 assert.match(image.visibleCoverage,/six_historical_recipe_ingredient_lists.*no_method_steps/);
 assert.equal(p.reportedSourceYield,'Serves 6');
 assert.equal(p.reportedSourceHeadline,'35 minutes');
 assert.equal(p.fullOriginalMethodAvailable,false);
 assert.equal(p.canonicalYieldUpdated,false);
 assert.equal(p.originalImageInspectedDirectly,true);
 assert.equal(p.ingredientImageMatchesVaultExcludingPaprika,true);
 assert.match(p.nextGate,/recover method or obtain separate household-version approval/i);
 assert.equal(links[52],undefined);
});

test('#41 mushroom-containing archived version must not overwrite household planning estimate',()=>{
 const p=byId(40),image=queue.sourceImages.find(e=>e.evidenceId===p.evidenceId);
 assert.equal(p.lotteryTitle,'Beef Tips & Noodles');
 assert.match(image.title,/Crockpot beef tips & noodles/i);
 assert.match(p.relationship,/distinct_mushroom_containing/);
 assert.match(p.quantityDiscrepancy,/1 lb stew meat/);
 assert.match(p.quantityDiscrepancy,/2 lb.*proposed/);
 assert.match(p.quantityDiscrepancy,/Egg-noodle amount unmeasured/);
 assert.equal(p.fullOriginalMethodAvailable,false,'brief directions do not establish a fully reviewed public method');
 assert.equal(links[40],undefined);
 assert.equal(p.publicPublicationApproved,false);
});

test('similar-title screenshots cannot automatically become existing lottery recipes',()=>{
 const seen=new Set();
 for(const r of queue.nearTitleDoNotAutoLink){
  const e=queue.sourceImages.find(x=>x.evidenceId===r.evidenceId);
  assert.ok(e,'image evidence ID must exist');
  assert.ok(Number.isInteger(r.similarLotteryId));
  assert.equal(r.similarDisplayNumber,r.similarLotteryId+1);
  assert.equal(r.lotteryTitle,meals[r.similarLotteryId]);
  assert.notEqual(e.title,r.lotteryTitle,'same title needs a different review path');
  assert.match(r.disposition,/NOT_LINKED/);
  assert.equal(r.ownerApprovalToLink,false);
  assert.equal(links[r.similarLotteryId],undefined);
  assert.ok(!seen.has(r.evidenceId));seen.add(r.evidenceId);
 }
 assert.ok(seen.size>=5);
});

test('protected public publications remain exactly the two authorized household manuscripts',()=>{
 assert.deepEqual(Object.keys(links),['3','5']);
 assert.equal(Object.keys(published).length,2);
 for(const id of [3,5]){
  const pub=published[links[id].publicationId];
  assert.equal(pub.recipeVersionId,links[id].recipeVersionId);
  assert.equal(pub.publicationAuthorization,'approved-for-public-web');
  assert.match(pub.versionType,/household manuscript/i);
 }
 assert.equal(links[11],undefined);
 assert.equal(links[17],undefined);
 assert.equal(links[49],undefined);
 for(const id of [80,81,82,83])assert.equal(links[id],undefined,'protected Food Wars original requires separate gate');
});

test('six-record historical screenshot reconciliation matches source-count evidence and is never a recipe publication',()=>{
 const batch=queue.historicalSourceComparisonBatch;
 assert.equal(batch.batchId,'phase-v1.2-original-image-191-195-with-190');
 assert.equal(batch.originalImageEvidenceId,'vault-191-original-image');
 assert.equal(batch.imageSha256,'a4fd5048f4d596984c2c1fe08abf76ae7b72ee94a9f3aefe90dc51b480184d41');
 assert.equal(batch.directSourceImageCompared,true);
 assert.equal(batch.originalMethodStepsVisible,false);
 assert.equal(batch.canonicalRecordEdits,0);
 assert.equal(batch.publicationApprovals,0);
 assert.equal(batch.comparisons.length,6);
 assert.deepEqual(Array.from(batch.comparisons,x=>x.historicalNumber),[190,191,192,193,194,195]);
 const counts=batch.comparisons.reduce((r,x)=>({
  historicalRecipes:r.historicalRecipes+1,
  sourceIngredientRows:r.sourceIngredientRows+x.sourceIngredientRows,
  vaultIngredientRows:r.vaultIngredientRows+x.vaultIngredientRows,
  matchedIngredientRows:r.matchedIngredientRows+x.matchedRows,
  sourceRowsMissingFromVault:r.sourceRowsMissingFromVault+x.sourceIngredientRows-x.matchedRows,
  vaultRowsNotInSource:r.vaultRowsNotInSource+x.vaultIngredientRows-x.matchedRows
 }),{historicalRecipes:0,sourceIngredientRows:0,vaultIngredientRows:0,matchedIngredientRows:0,sourceRowsMissingFromVault:0,vaultRowsNotInSource:0});
 assert.deepEqual(counts,batch.counts);
 assert.deepEqual(counts,{historicalRecipes:6,sourceIngredientRows:53,vaultIngredientRows:44,matchedIngredientRows:43,sourceRowsMissingFromVault:10,vaultRowsNotInSource:1});
 for(const record of batch.comparisons){
  assert.match(record.canonicalRecipeId,/^VK-DIN-/);
  assert.equal(record.sourceYield,'Serves 6');
  assert.equal(record.sourceMethodVisible,false);
  assert.equal(record.canonicalYieldUpdated,false);
  assert.equal(links[record.historicalNumber],undefined,'historical IDs are not lottery links');
  assert.ok(record.nextGate.length>15);
  for(const forbidden of ['ingredients','sourceIngredientEntries','steps','method','sourceBytes','sourceFileUrl','sourceImageBase64'])
   assert.equal(Object.hasOwn(record,forbidden),false,'public evidence should be metadata-only');
 }
});

test('historical source discrepancies are precise, separate from unverified methods and require approval',()=>{
 const rows=queue.historicalSourceComparisonBatch.comparisons;
 const pork=rows.find(x=>x.historicalNumber===193),paprika=rows.find(x=>x.historicalNumber===191),salisbury=rows.find(x=>x.historicalNumber===190);
 assert.equal(paprika.discrepancyCode,'VAULT_EXTRA_PAPRIKA_1_TSP');
 assert.match(paprika.nextGate,/paprika/i);
 assert.equal(salisbury.sourceIngredientRows,10);
 assert.equal(salisbury.vaultIngredientRows,0);
 assert.equal(salisbury.discrepancyCode,'CANONICAL_INGREDIENT_BODY_EMPTY');
 assert.match(pork.nextGate,/Country Fried Pork/);
 for(const r of rows.filter(x=>x.historicalNumber>=192))assert.equal(r.discrepancyCode,null);
 assert.match(rows.find(x=>x.historicalNumber===195).nextGate,/LOW setting/);
 assert.equal(queue.policy.originalSourceBytesPublished,false);
 assert.equal(queue.policy.recipeMethodsPublished,false);
 assert.equal(queue.policy.recipePublicationsCreated,false);
 assert.equal(queue.policy.approvalRequiredForSourceCorrections,true);
});
