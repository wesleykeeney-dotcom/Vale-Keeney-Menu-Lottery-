'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const docs=['AGENTS.md','docs/PRODUCT_VISION.md','docs/RECIPE_DATA_CONTRACT.md','docs/RELEASE_GATES.md'];

test('governing directive and its three companion documents exist and are discoverable',()=>{
 for(const p of docs)assert.ok(fs.existsSync(path.join(root,p)),p);
 const readme=read('README.md');
 for(const p of docs)assert.ok(readme.includes(p),p+' should be linked from README');
 const directive=read('AGENTS.md');
 for(const p of docs.slice(1))assert.ok(directive.includes(p),'directive links '+p);
});

test("instructions protect recipe identity and do not promise unbuilt coupon functionality",()=>{
 const directive=read('AGENTS.md');
 const product=read('docs/PRODUCT_VISION.md');
 const contract=read('docs/RECIPE_DATA_CONTRACT.md');
 for(const phrase of ['84 immutable','private Cooking Vault','approved household','Source','coupon','membership','offline','review']) {
  assert.match((directive+' '+product).toLowerCase(),new RegExp(phrase.toLowerCase()),'governing policy missing: '+phrase);
 }
 assert.match(product,/not.*claim.*already exist/i);
 assert.match(contract,/lotteryId.*0–83/);
 assert.match(contract,/publicationAuthorization/);
 assert.match(contract,/unverified/);
});

test('wallet and release policy block public identifiers, fake claims, and silent merges',()=>{
 const directive=read('AGENTS.md');
 const release=read('docs/RELEASE_GATES.md');
 const contract=read('docs/RECIPE_DATA_CONTRACT.md');
 assert.match(directive,/localStorage is[^\n]{0,20}not[^\n]{0,20}a secure credential vault/i);
 assert.match(directive,/Never silently merge/);
 assert.match(directive,/Never fabricate a coupon/);
 assert.match(directive,/future Fuel Saver/);
 assert.match(contract,/IndexedDB alone is not encrypted storage/);
 assert.match(release,/explicit merge approval/);
 assert.match(release,/Android user acceptance/);
 assert.match(release,/No cache increment required for docs-only changes/);
});

test('document-only governance change cannot alter runtime service-worker or lottery IDs',()=>{
 const meals=read('meals.js');
 const n=[...meals.matchAll(/^\s*"([^"]+)"[,\r\n]/gm)].length;
 assert.equal(n,84,'lottery remains 84 options');
 assert.match(read('sw.js'),/vk-lottery-v16/,'unchanged production runtime cache for this doc-only change');
});
