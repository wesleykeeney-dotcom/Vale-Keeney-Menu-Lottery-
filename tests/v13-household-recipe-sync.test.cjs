'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');

function snapshot(){
 const files=['meals.js','recipe-links.js','recipe-publications.js','grocery.js'];
 const script=files.map(read).join('\n')+`
 JSON.stringify({
  lotteryCount:MEALS.length,
  links:[0,1,3,5,16].map(id=>({id,...recipeLinkFor(id)})),
  records:[0,1,16].map(id=>{
   const record=approvedRecipeForLottery(id);
   return record&&{
    id,recipeId:record.recipeId,recipeVersionId:record.recipeVersionId,
    title:record.title,versionType:record.versionType,sourceStatus:record.sourceStatus,
    ingredientStatus:record.ingredientStatus,methodStatus:record.methodStatus,
    yieldText:record.yieldText,ingredients:record.ingredients,steps:record.steps,
    rows:publishedShoppingRowsForLottery(id)
   };
  }),
  effectiveRows:(()=>{const t=completeShoppingTemplates();return [t[0],t[1],t[16]]})(),
  excluded:[9,52].map(id=>approvedRecipeForLottery(id)),
  existing:[3,5].map(id=>({id,link:recipeLinkFor(id),record:approvedRecipeForLottery(id)}))
 });
 `;
 return JSON.parse(vm.runInNewContext(script,{document:{getElementById:()=>null}}));
}

test('the approved household versions bind exact existing lottery IDs without renumbering',()=>{
 const d=snapshot();
 assert.equal(d.lotteryCount,84);
 assert.deepEqual(d.links.map(x=>x.id),[0,1,3,5,16]);
 assert.equal(d.records[0].recipeId,'VK-HH-BREAKFAST-TACOS-001');
 assert.equal(d.records[1].recipeId,'VK-HH-CHICKEN-BACON-RANCH-PASTABAKE-001');
 assert.equal(d.records[2].recipeId,'VK-HH-SLOW-COOKER-CHICKEN-GRAVY-001');
 assert.equal(d.records[0].yieldText,'About 8 street tacos');
 assert.equal(d.records[1].yieldText,'4–6 servings');
 assert.equal(d.records[2].yieldText,'4–6 servings');
 for(const r of d.records){
  assert.equal(r.ingredientStatus,'complete');
  assert.equal(r.methodStatus,'complete');
  assert.match(r.versionType,/household|convenience/i);
  assert.equal(r.steps.length>0,true);
 }
});

test('the recipe card and grocery rows use the same version and amounts',()=>{
 const d=snapshot();
 for(const r of d.records){
  const link=d.links.find(x=>x.id===r.id);
  assert.equal(link.recipeVersionId,r.recipeVersionId);
  const effective=d.effectiveRows[[0,1,16].indexOf(r.id)];
  assert.deepEqual(effective,r.rows);
 }
 assert.ok(d.records[0].rows.some(row=>row[1]==='Street taco tortillas'&&row[2]==='8'));
 assert.ok(d.records[1].rows.some(row=>row[1]==='Penne pasta'&&row[2]==='12 oz'));
 assert.ok(d.records[2].rows.some(row=>row[1]==='Potatoes'&&row[2]==='about 3 lb'));
 assert.ok(!d.records[0].rows.some(row=>/condiment/i.test(row[1])));
 assert.ok(!d.records[1].rows.some(row=>/broccoli/i.test(row[1])));
 assert.ok(!d.records[2].rows.some(row=>/corn/i.test(row[1])));
});

test('owner-approved household versions do not promote historical source verification',()=>{
 const d=snapshot();
 assert.match(d.records[0].sourceStatus,/suggested quantities/i);
 assert.match(d.records[1].sourceStatus,/not a verified historical-source method/i);
 assert.match(d.records[2].sourceStatus,/exact saved family source recipe was not verified/i);
 assert.ok(d.records.every(r=>/not|unverified|not verified/i.test(r.sourceStatus)));
});

test('unrelated and unresolved lottery options stay unmapped while #4 and #6 remain intact',()=>{
 const d=snapshot();
 assert.deepEqual(d.excluded,[null,null]);
 assert.equal(d.existing[0].record.recipeVersionId,'VK-HH-PIZZAGRILLEDCHEESE-MANUSCRIPT-001');
 assert.equal(d.existing[1].record.recipeVersionId,'VK-HH-TACO-CASSEROLE-MANUSCRIPT-001');
});
