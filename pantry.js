'use strict';
const PANTRY_KEY='vk-pantry-v04';
function pantryLoad(){try{const value=JSON.parse(localStorage.getItem(PANTRY_KEY));return value&&Array.isArray(value.items)?{items:[...new Set(value.items.filter(x=>typeof x==='string').map(x=>x.trim().toLowerCase()).filter(Boolean))]}:{items:[]}}catch{return {items:[]}}}
let pantryState=pantryLoad();
function pantrySave(){localStorage.setItem(PANTRY_KEY,JSON.stringify(pantryState))}
function pantryHas(name){return pantryState.items.includes(name.toLowerCase())}
function pantrySet(name,have){const key=name.toLowerCase();pantryState.items=have?[...new Set([...pantryState.items,key])]:pantryState.items.filter(x=>x!==key);pantrySave();if(typeof pantryPriorityRender==='function')pantryPriorityRender();pantryRender();if(typeof groceryRender==='function')groceryRender()}
function pantryRender(){const root=document.getElementById('pantryContent');if(!root)return;root.replaceChildren();const names=new Map();for(const id of Object.keys(SHOPPING_TEMPLATES))for(const [,ingredient] of SHOPPING_TEMPLATES[id])names.set(ingredient.toLowerCase(),ingredient);for(const key of pantryState.items)if(!names.has(key))names.set(key,key);
const list=[...names.values()].sort((a,b)=>a.localeCompare(b));const summary=node('p','subtle',pantryState.items.length+' pantry items marked as already on hand. These are hidden from the shopping-to-buy list, not from the recipe requirements.');root.append(summary);
for(const name of list){const label=node('label','grocery-item');const checkbox=node('input');checkbox.type='checkbox';checkbox.checked=pantryHas(name);checkbox.onchange=()=>pantrySet(name,checkbox.checked);label.append(checkbox,node('span',null,name));root.append(label)}
}
function pantryInit(){const add=document.getElementById('pantryAdd'),input=document.getElementById('pantryExtra');if(!add||!input)return;add.onclick=()=>{const name=input.value.trim();if(!name)return;pantrySet(name,true);input.value=''};pantryRender()}
// Initialized after grocery.js defines SHOPPING_TEMPLATES.
