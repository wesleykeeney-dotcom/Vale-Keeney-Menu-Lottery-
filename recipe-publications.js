'use strict';
// Public recipe publication registry. Remains empty until a specific source version
// receives explicit owner approval for public web distribution.
const RECIPE_PUBLICATIONS=Object.freeze({});
// An approved publication must bind an explicit lottery number and recipe version.
// Ingredient names and quantities must be valid for BOTH the recipe view and groceries.
function approvedRecipeForLottery(id){
 if(typeof MEALS==='undefined'||!Number.isInteger(id)||id<0||id>=MEALS.length||
    typeof recipeLinkFor!=='function')return null;
 const link=recipeLinkFor(id);
 if(!link||typeof link.publicationId!=='string'||typeof link.recipeVersionId!=='string')return null;
 const record=Object.prototype.hasOwnProperty.call(RECIPE_PUBLICATIONS,link.publicationId)
   ?RECIPE_PUBLICATIONS[link.publicationId]:null;
 if(!record||record.publicationAuthorization!=='approved-for-public-web'||
    record.publicationId!==link.publicationId||record.recipeVersionId!==link.recipeVersionId||
    typeof record.recipeId!=='string'||!record.recipeId.trim()||
    typeof record.title!=='string'||!record.title.trim()||
    record.ingredientStatus!=='complete'||record.householdSubstitutionsResolved===false||
    !Array.isArray(record.lotteryIds)||!record.lotteryIds.includes(id)||
    !Array.isArray(record.ingredients)||!record.ingredients.length)return null;
 if(!record.ingredients.every(item=>item&&typeof item.name==='string'&&item.name.trim()&&
    typeof item.amount==='string'&&item.amount.trim()&&
    (item.optional===true||item.supplyOnly===true||
    (typeof item.department==='string'&&item.department.trim()))))return null;
 return record;
}
// Required shopping rows are derived from EXACTLY the same approved recipe/version
// and recorded amount displayed in the recipe card. No shopping-only quantity guesses.
function publishedShoppingRowsForLottery(id){
 const r=approvedRecipeForLottery(id);
 if(!r)return null;
 const required=r.ingredients.filter(item=>item.optional!==true&&item.supplyOnly!==true);
 if(!required.length)return null;
 return required.map(item=>[item.department,item.name,item.amount]);
}

// Catalog used by pantry suggestions and pantry ingredient controls. A reviewed
// publication replaces any older shopping estimate for that SAME lottery number.
// This helper is called after grocery.js defines SHOPPING_TEMPLATES.
function completeShoppingTemplates(){
 const result=typeof SHOPPING_TEMPLATES==='undefined'?{}:{...SHOPPING_TEMPLATES};
 if(typeof MEALS==='undefined')return result;
 for(let id=0;id<MEALS.length;id++){
  const rows=publishedShoppingRowsForLottery(id);
  if(rows)result[id]=rows;
 }
 return result;
}
