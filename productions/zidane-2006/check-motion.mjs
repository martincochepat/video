import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {execFileSync} from 'node:child_process';import {pathToFileURL} from 'node:url';
const root=path.resolve(import.meta.dirname,'../..');fs.mkdirSync(path.join(root,'out'),{recursive:true});
execFileSync(path.join(root,'node_modules/.bin/esbuild'),['src/productions/zidane/Story.tsx','--bundle','--format=esm','--platform=node','--external:remotion','--external:react','--external:react-dom','--external:@remotion/media','--outfile=out/zidane-motion.mjs'],{cwd:root,stdio:'inherit'});
const {ballPose:p,ballSpin:spin,storyTime,rewindClockPose:clock}=await import(pathToFileURL(path.join(root,'out/zidane-motion.mjs')).href);
for(const t of [7.9,8.6,8.95,13.4,14.8,15.7,17.1,17.9,20.8,21.4]){const a=p(t-1/60000),b=p(t);assert.ok(Math.hypot(a.x-b.x,a.y-b.y)<.1,`Saut du ballon à${t}`);assert.ok(Math.abs(a.r-b.r)<.1,`Saut de rayon à${t}`);assert.ok(Math.abs(spin(t)-spin(t-1/60000))<.1,`Saut de rotation à${t}`)}
for(const key of ['x','y','r','minute'])assert.ok(Math.abs(clock(5.4)[key]-clock(5.4-1/60000)[key])<.01,`Saut de cadran ${key}`);
assert.deepEqual(p(10),p(12));assert.equal(spin(10),spin(12));assert.deepEqual(p(18.5),p(20));assert.equal(spin(18.5),spin(20));
assert.ok(p(8.6).y-p(8.6).r<=1057&&p(8.6).y-p(8.6).r>=1050,'Panenka sans contact sous la barre');
assert.equal(storyTime(10,{scenes:[],storyAlignment:[{audioSeconds:0,storySeconds:0},{audioSeconds:20,storySeconds:40}]}),20,'Remplacement audio non piloté par les repères');
console.log('Dix jonctions ballon continues, rotation arrêtée aux maintiens, contact sous la barre, correspondance future des repères audio vérifiée.');
