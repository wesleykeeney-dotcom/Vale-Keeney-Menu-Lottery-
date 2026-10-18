'use strict';
// Display metadata only. The protected source-faithful recipe archive is NOT embedded here.
// IDs 80–83 correspond to lottery #81–84; never renumber.
const FOOD_WARS_METADATA=Object.freeze({
  80:{source:'Food Wars! / A Taste of Anime',note:'Original Gotcha! pork roast includes mushrooms; household adaptation requires separate approval.',mushrooms:true},
  81:{source:'Food Wars! / Feast of Fiction',note:'Transforming broth jelly is essential to the original method.',mushrooms:false},
  82:{source:'Food Wars! / Feast of Fiction',note:'Seven-layer terrine; original includes mushrooms. Advanced preparation.',mushrooms:true},
  83:{source:'Food Wars! / A Taste of Anime',note:'Original documented recipe uses a honey treatment; do not substitute a generic bourguignon method.',mushrooms:false}
});
function foodWarsMeta(id){return FOOD_WARS_METADATA[id]||null}
