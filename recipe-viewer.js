'use strict';
// Only explicit, publication-approved links can unlock cooking instructions.
let recipeReturnTab='library';
function approvedRecipeForLottery(id){
 if(!Number.isInteger(id)||id<0||id>=MEALS.length||typeof recipeLinkFor!=='function')return null;
 const link=recipeLinkFor(id);
 if(!link||typeof link.publicationId!=='string'||typeof link.recipeVersionId!=='string')return null;
 const record=RECIPE_PUBLICATIONS[link.publicationId];
 return record&&record.publicationAuthorization==='approved-for-public-web'&&
  record.publicationId===link.publicationId&&record.recipeVersionId===link.recipeVersionId&&
  Array.isArray(record.lotteryIds)&&record.lotteryIds.includes(id)&&record.recipeId&&record.title?record:null;
}
function shoppingPreviewForLottery(id){
 if(typeof SHOPPING_TEMPLATES!=='undefined'&&SHOPPING_TEMPLATES[id])return {kind:'planning',rows:SHOPPING_TEMPLATES[id]};
 if(typeof SHOPPING_PARTIAL_TEMPLATES!=='undefined'&&SHOPPING_PARTIAL_TEMPLATES[id])return {kind:'partial',rows:SHOPPING_PARTIAL_TEMPLATES[id]};
 return {kind:'unmapped',rows:[]};
}
function recipeViewRender(id){
 const root=document.getElementById('recipeContent'),title=document.getElementById('recipeTitle');
 if(!root||!title||!Number.isInteger(id)||id<0||id>=MEALS.length)return;
 title.textContent=MEALS[id];root.replaceChildren();
 const add=(tag,cls,text)=>{const n=node(tag,cls,text);root.append(n);return n};
 add('p','subtle','Lottery #'+(id+1));
 const record=approvedRecipeForLottery(id);
 if(record){
  add('p','subtle','Approved public recipe version: '+record.recipeVersionId+' • '+record.versionType);
  if(record.sourceStatus)add('p','subtle','Evidence: '+record.sourceStatus);
  if(record.yieldText)add('p','subtle','Documented yield: '+record.yieldText);
  const ingredients=Array.isArray(record.ingredients)?record.ingredients:[];
  const steps=Array.isArray(record.steps)?record.steps:[];
  const validIngredients=ingredients.length>0&&ingredients.every(x=>x&&typeof x.name==='string'&&x.name.trim()&&typeof x.amount==='string'&&x.amount.trim());
  const validSteps=steps.length>0&&steps.every(x=>typeof x==='string'&&x.trim());
  const ready=record.ingredientStatus==='complete'&&record.methodStatus==='complete'&&record.householdSubstitutionsResolved!==false&&validIngredients&&validSteps;
  if(ingredients.length){
   add('h4','grocery-dept','Published recipe ingredients');
   const ul=node('ul','recipe-ingredients');
   for(const x of ingredients)ul.append(node('li',null,(x.name||'Unknown ingredient')+' — '+(x.amount||'Quantity not documented')+(x.optional?' (optional)':'')));
   root.append(ul);
  }
  if(ready){
   add('h4','grocery-dept','Documented cooking instructions');
   const ol=node('ol','recipe-steps');for(const step of steps)ol.append(node('li',null,step));root.append(ol);
  }else add('p','recipe-caution','Not cooking-ready: ingredients, approved substitutions or method are incomplete. No steps are generated.');
 }else{
  add('p','recipe-caution','Recipe not yet linked. No reviewed cooking method is approved for publication for this meal. No cooking instructions are generated.');
  const preview=shoppingPreviewForLottery(id);
  if(preview.rows.length){
   add('h4','grocery-dept',preview.kind==='partial'?'Partial household shopping requirements':'Household shopping requirements');
   add('p','subtle',preview.kind==='partial'?'Incomplete shopping list, not a cooking recipe. Add variable ingredients manually.':'Planning estimates, not a verified recipe or cooking method.');
   const ul=node('ul','recipe-ingredients');
   for(const row of preview.rows)ul.append(node('li',null,row[1]+' — '+row[2]));
   root.append(ul);
  }else add('p','subtle','No reviewed ingredients or household shopping requirements are available.');
 }
 if(typeof SHOPPING_RECIPE_NOTES!=='undefined'&&SHOPPING_RECIPE_NOTES[id])add('p','recipe-caution',SHOPPING_RECIPE_NOTES[id]);
 if(typeof foodWarsMeta==='function'){
  const meta=foodWarsMeta(id);
  if(meta)add('p','recipe-caution','Original-source notice: '+meta.note+(meta.mushrooms?' Contains mushrooms.':'')+' No source method is published here.');
 }
 add('p','subtle','Groceries follow your saved weekly menu or current lottery picks. Opening a recipe does not change your calendar.');
}
function recipeOpen(id,origin){
 if(!Number.isInteger(id)||id<0||id>=MEALS.length)return;
 recipeReturnTab=['lottery','menu','library'].includes(origin)?origin:'library';
 recipeViewRender(id);
 switchTab('recipe');
 const heading=document.getElementById('recipeTitle');if(heading&&heading.focus)heading.focus();
}
function recipeViewInit(){
 const back=document.getElementById('recipeBack');
 if(back)back.onclick=()=>switchTab(recipeReturnTab);
}
recipeViewInit();
