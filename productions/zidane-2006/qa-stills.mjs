import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill} from '@remotion/renderer';
const root=path.resolve(import.meta.dirname,'../..');process.chdir(root);
const folder=path.join(root,'productions/zidane-2006/quality/quick');fs.mkdirSync(folder,{recursive:true});
const production={...JSON.parse(fs.readFileSync('productions/zidane-2006/manifest.json')),qa:true};
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts')});const browser=await openBrowser('chrome',{browserExecutable:'/usr/bin/chromium'});
try{
 const composition=await selectComposition({serveUrl,id:'Workshop',inputProps:{production},puppeteerInstance:browser,browserExecutable:'/usr/bin/chromium'});
 const checks=[];
 for(const t of [2.5,6.4,10.5,19,26.5,31.5,37.5,40.8,43.5]){
  const frame=Math.round(t*60);let found=false;
  await renderStill({serveUrl,composition,inputProps:{production},puppeteerInstance:browser,browserExecutable:'/usr/bin/chromium',frame,output:path.join(folder,`frame-${frame}.png`),onBrowserLog:log=>{if(log.text.startsWith('WORKSHOP_QA:')){found=true;checks.push(JSON.parse(log.text.slice(12)))}}});
  assert.ok(found,`Sonde absente à ${t}`);
 }
 fs.writeFileSync(path.join(folder,'checks.json'),JSON.stringify(checks,null,2));
 const errors=checks.flatMap(c=>c.errors.map(error=>({frame:c.frame,error})));assert.equal(errors.length,0,JSON.stringify(errors));
 console.log('Neuf plans contrôlés : polices chargées et métriques sans erreur.');
}finally{await browser.close({silent:true})}
