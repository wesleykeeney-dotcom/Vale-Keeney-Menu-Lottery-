'use strict';
// Pantry-first suggestions use only existing household grocery templates.
// The protected, source-faithful Cooking Vault is not stored or inferred here.
function pantryMealRankings(templates, pantryItems, mealCount) {
  const onHand = new Set((Array.isArray(pantryItems) ? pantryItems : [])
    .filter(item => typeof item === 'string')
    .map(item => item.trim().toLowerCase())
    .filter(Boolean));
  const results = [];
  for (const key of Object.keys(templates || {})) {
    const id = Number(key);
    if (!Number.isInteger(id) || id < 0 || id >= mealCount) continue;
    const rows = templates[id];
    if (!Array.isArray(rows) || !rows.length) continue;
    const required = new Map();
    for (const row of rows) {
      if (!Array.isArray(row) || typeof row[1] !== 'string') continue;
      const ingredient = row[1].trim();
      if (ingredient && !required.has(ingredient.toLowerCase())) {
        required.set(ingredient.toLowerCase(), ingredient);
      }
    }
    if (!required.size) continue;
    const have = [], missing = [];
    for (const [key, ingredient] of required) {
      (onHand.has(key) ? have : missing).push(ingredient);
    }
    results.push({id, total: required.size, have, missing});
  }
  // Exact fractions avoid rounding ties; mapped meals only. Unmapped meals are unscored.
  return results.sort((a,b) =>
    (b.have.length * a.total - a.have.length * b.total) ||
    (a.missing.length - b.missing.length) ||
    (b.have.length - a.have.length) ||
    (a.id - b.id));
}
function pantryPriorityRender() {
  const root = document.getElementById('pantrySuggestions');
  if (!root || typeof SHOPPING_TEMPLATES === 'undefined' || typeof pantryState === 'undefined') return;
  root.replaceChildren();
  const rankings = pantryMealRankings(SHOPPING_TEMPLATES, pantryState.items, MEALS.length);
  const unscored = MEALS.length - rankings.length;
  root.append(node('h4','grocery-dept','Pantry-first meal suggestions'));
  root.append(node('p','subtle',rankings.length+' of '+MEALS.length+' meals have household grocery templates. '+unscored+' meals are not yet scored and remain eligible in the regular lottery.'));
  root.append(node('p','subtle','Rankings compare mapped shopping items already on hand—not prices, portions, cooking readiness, or source-faithful recipes.'));
  const matched = rankings.filter(meal => meal.have.length > 0).slice(0,5);
  if (!matched.length) {
    root.append(node('p','priority-empty','No mapped meals currently match your pantry. Mark ingredients above as on hand to see suggestions.'));
    return;
  }
  const selected = allIds();
  for (const meal of matched) {
    const row = node('div','priority-meal');
    const details = node('div','priority-details');
    details.append(node('strong',null,MEALS[meal.id]));
    details.append(node('p','subtle',meal.have.length+' of '+meal.total+' mapped grocery items on hand • '+meal.missing.length+' still needed'));
    details.append(node('p','subtle','On hand: '+meal.have.join(', ')));
    details.append(node('p','subtle','Still needed: '+(meal.missing.length ? meal.missing.join(', ') : 'none of the mapped items')));
    const button = node('button','btn ghost',selected.includes(meal.id) ? 'Already picked' : selected.length >= state.target ? 'Lottery full' : '+ Add to lottery');
    button.type='button';
    button.disabled = selected.includes(meal.id) || selected.length >= state.target;
    button.setAttribute('aria-label','Add '+MEALS[meal.id]+' to lottery');
    button.onclick = () => { toggle(meal.id); pantryPriorityRender(); };
    row.append(details,button);
    root.append(row);
  }
  root.append(node('p','subtle','Adding a suggestion changes lottery picks only. To update groceries, place it on the weekly calendar.'));
}
if (typeof document !== 'undefined') pantryPriorityRender();
