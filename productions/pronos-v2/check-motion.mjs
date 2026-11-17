import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
const root=path.resolve(import.meta.dirname,'../..');fs.mkdirSync(path.join(root,'out'),{recursive:true});
execFileSync(path.join(root,'node_modules/.bin/esbuild'),['src/productions/ForecastV2.tsx','--bundle','--format=esm','--platform=node','--external:remotion','--external:react','--external:react-dom','--external:@remotion/media','--outfile=out/v2-motion.mjs'],{cwd:root,stdio:'inherit'});
const {forecastV2BallPose:p,forecastV2BallSpin:spin,forecastV2NetPoint:net}=await import(pathToFileURL(path.join(root,'out/v2-motion.mjs')).href);
for(const t of [5,9.5,14,20]){const a=p(t-1/6000),b=p(t);assert.ok(Math.hypot(a.x-b.x,a.y-b.y)<.02,`Saut de position à ${t}`);assert.ok(Math.abs(a.r-b.r)<.02,`Saut de taille à ${t}`)}
const first=p(0);assert.ok(first.x-first.r<0||first.y+first.r>1920,'Premier ballon non recadré');assert.ok(Math.hypot(first.x-p(1/60).x,first.y-p(1/60).y)>1,'Ballon initial immobile');
assert.ok(Math.abs(spin(22)-spin(23))<.001,'Ballon tournant pendant le maintien');
const corner0=net(0,0,10.7),corner1=net(0,0,10.87);assert.ok(Math.hypot(corner0[0]-corner1[0],corner0[1]-corner1[1])<.01,'Cadre de filet entraîné par l’impact');
const a=net(.64,.3,10.7),b=net(.64,.3,10.87);assert.ok(Math.hypot(a[0]-b[0],a[1]-b[1])>15,'Impact local invisible');
const settled=net(.64,.3,11.35);assert.ok(Math.hypot(a[0]-settled[0],a[1]-settled[1])<1,'Filet non stabilisé avant le score');
console.log('Ballon recadré et actif au départ ; raccords continus ; rotation finale arrêtée ; impact du filet localisé et amorti avant le score.');
