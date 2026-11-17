import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
const root=path.resolve(import.meta.dirname,'../..');fs.mkdirSync(path.join(root,'out'),{recursive:true});
execFileSync(path.join(root,'node_modules/.bin/esbuild'),['src/productions/ForecastV3.tsx','--bundle','--format=esm','--platform=node','--external:remotion','--external:react','--external:react-dom','--external:@remotion/media','--outfile=out/v3-motion.mjs'],{cwd:root,stdio:'inherit'});
const {forecastV3BallPose:p,forecastV3BallSpin:spin}=await import(pathToFileURL(path.join(root,'out/v3-motion.mjs')).href);
for(const t of [1.15,2.65,3.4,6.2,10.7,15.2,21.2,26.5,27.05]){const a=p(t-1/60000),b=p(t);assert.ok(Math.hypot(a.x-b.x,a.y-b.y)<.15,`Saut de position à ${t}`);assert.ok(Math.abs(a.r-b.r)<.1,`Saut de taille à ${t}`)}
for(const t of [2.65,10.76,26.5,27.05])assert.ok(Math.abs(spin(t)-spin(t-1/60000))<.1,`Saut de rotation à ${t}`);
assert.equal(spin(27.1),spin(28.9),'Rotation finale non arrêtée');
assert.ok(p(0).x+p(0).r>0&&p(0).x-p(0).r<0,'Ballon absent/cadrage initial');
assert.ok(Math.hypot(p(0).x-p(1/60).x,p(0).y-p(1/60).y)>.1,'Ballon initial immobile');
assert.deepEqual(p(27.1),p(28.9),'Signature non stabilisée');assert.deepEqual(p(22),p(25.9),'Synthèse non stabilisée');
console.log('Raccords V3 continus ; action au premier cadre ; ballon arrêté pendant les maintiens.');
