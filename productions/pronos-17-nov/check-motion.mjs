import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'../..');
fs.mkdirSync(path.join(root,'out'),{recursive:true});
execFileSync(path.join(root,'node_modules/.bin/esbuild'),['src/productions/Forecast.tsx','--bundle','--format=esm','--platform=node','--external:remotion','--external:react','--external:react-dom','--external:@remotion/media','--outfile=out/forecast-motion-check.mjs'],{cwd:root,stdio:'inherit'});
const {forecastBallPose:p}=await import(pathToFileURL(path.join(root,'out/forecast-motion-check.mjs')).href);
for(const t of [5,9.5,14,20]){const a=p(t-1/6000),b=p(t);assert.ok(Math.hypot(a.x-b.x,a.y-b.y)<.01,`Position discontinue à ${t}`);assert.ok(Math.abs(a.r-b.r)<.01,`Taille discontinue à ${t}`)}
assert.ok(Math.hypot(p(1/60).x-p(0).x,p(1/60).y-p(0).y)>1,'Ballon immobile au départ');
const end=p(23.5);assert.ok(Math.hypot(end.x-p(23.6).x,end.y-p(23.6).y)<.001,'Maintien final instable');
console.log('Raccords de position/rayon, mouvement initial et stabilité finale contrôlés.');
