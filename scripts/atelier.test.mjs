import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {read,validate,alignScenes,srt,productionDir,root} from './atelier-lib.mjs';
const demo=()=>read(path.join(root,'productions/espace/manifest.json'));
test('production silencieuse et absence de faux sous-titres',()=>{validate(demo());const p=demo();p.subtitles.enabled=true;assert.throws(()=>validate(p));});
test('alignement réel fourni pilote les scènes et la durée',()=>{const s=[{id:'a'},{id:'b'}],c=[{sceneId:'a',text:'A',startSeconds:.2,endSeconds:1.3},{sceneId:'b',text:'B',startSeconds:2.1,endSeconds:3.7}];assert.deepEqual(alignScenes(s,c,4),[{id:'a',startSeconds:0,endSeconds:2.1},{id:'b',startSeconds:2.1,endSeconds:4}]);assert.throws(()=>alignScenes(s,c,3));assert.throws(()=>alignScenes(s,c.slice(0,1),4));});
test('rejet des repères superposés ou hors ordre',()=>{assert.throws(()=>alignScenes([{id:'a'},{id:'b'}],[{sceneId:'a',text:'A',startSeconds:0,endSeconds:2},{sceneId:'b',text:'B',startSeconds:1,endSeconds:3}],4));});
test('SRT conserve des millisecondes, pas une estimation par mots',()=>assert.match(srt([{text:'Bonjour',startSeconds:.125,endSeconds:1.75}]),/00:00:00,125 --> 00:00:01,750/));
test('production et cache ne peuvent sortir via un identifiant',()=>{assert.throws(()=>productionDir('../secret'));assert.throws(()=>productionDir('/tmp/test'));});
test('les huit skills sont découverts',()=>{const run=spawnSync(process.execPath,['scripts/atelier.mjs','skills'],{cwd:root,encoding:'utf8'});assert.equal(run.status,0,run.stderr);});
test('garde ElevenLabs sans appel réseau payant',()=>{const run=spawnSync(process.execPath,['scripts/atelier.mjs','elevenlabs','espace'],{cwd:root,encoding:'utf8'});assert.notEqual(run.status,0);assert.match(run.stderr,/Appel payant interdit/);});
test('une seule consigne initialise un vrai dossier général et refuse les doublons',()=>{const id='test-init-'+process.pid,dir=productionDir(id);try{const command=['scripts/atelier.mjs','new',id,'--brief','Expliquer le cycle de l’eau','--profile','general'];const run=spawnSync(process.execPath,command,{cwd:root,encoding:'utf8'});assert.equal(run.status,0,run.stderr);const p=read(path.join(dir,'manifest.json'));assert.equal(p.profile,'general');assert.notEqual(p.palette.accent,demo().palette.accent);assert.equal(p.status,'draft');assert.throws(()=>validate(p));assert.ok(fs.existsSync(path.join(dir,'brief.md')));assert.notEqual(spawnSync(process.execPath,command,{cwd:root}).status,0);}finally{fs.rmSync(dir,{recursive:true,force:true})}});
test('un média déclaré absent bloque avant le rendu',()=>{
 const id='test-media-'+process.pid,dir=productionDir(id);
 try{
  fs.mkdirSync(dir,{recursive:true});const p=demo();p.id=id;p.assets=[{src:'productions/'+id+'/missing.png',sha256:'missing'}];fs.writeFileSync(path.join(dir,'manifest.json'),JSON.stringify(p));
  for(const file of ['brief.md','script.md','storyboard.md','art-direction.md','media.json','timings.json'])fs.writeFileSync(path.join(dir,file),'{}');
  fs.writeFileSync(path.join(dir,'sources.json'),JSON.stringify({status:'reviewed'}));
  const run=spawnSync(process.execPath,['scripts/atelier.mjs','render',id],{cwd:root,encoding:'utf8'});assert.notEqual(run.status,0);assert.match(run.stderr,/Média manquant/);
 }finally{fs.rmSync(dir,{recursive:true,force:true})}
});
