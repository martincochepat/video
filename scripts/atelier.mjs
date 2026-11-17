import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {bundle} from '@remotion/bundler';
import {selectComposition,renderMedia,renderStill,openBrowser} from '@remotion/renderer';
import {root,read,write,hash,probe,productionDir,validate,alignScenes,srt,checkMp4} from './atelier-lib.mjs';
process.chdir(root);
const [command,id,...args]=process.argv.slice(2);
const option=(key,fallback)=>{const i=args.indexOf('--'+key);return i<0?fallback:args[i+1]};
const flag=key=>args.includes('--'+key);
const dir=command==='skills'?null:productionDir(id);
const manifest=dir&&path.join(dir,'manifest.json');
const load=()=>read(manifest);
const save=p=>write(manifest,p);
const text=(file,value)=>{fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,value)};
const keySource=(production)=>{
 const files=[];
 const walk=d=>{for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=path.join(d,e.name);if(e.isDirectory())walk(f);else files.push(f)}};
 walk('src');walk('public/fonts');
 for(const media of [...(production.assets??[]),...(production.voice?[production.voice]:[])])files.push(path.join('public',media.src));
 files.push('remotion.config.ts','package-lock.json','scripts/atelier.mjs');
 return hash(Buffer.concat([...new Set(files)].sort().flatMap(p=>[Buffer.from(p),fs.readFileSync(p)])));
};
async function context(p){
 const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts')});
 const browser=await openBrowser('chrome',{browserExecutable:'/usr/bin/chromium'});
 const composition=await selectComposition({serveUrl,id:'Workshop',inputProps:{production:p},puppeteerInstance:browser,browserExecutable:'/usr/bin/chromium'});
 return {serveUrl,browser,composition};
}
async function main(){
 if(command==='skills'){
  const names=['director','research','script','storyboard','art-direction','voice','quality','delivery'].map(s=>'video-'+s);
  const discovered=fs.readdirSync('.agents/skills').filter(n=>fs.existsSync(`.agents/skills/${n}/SKILL.md`));
  for(const name of names){const body=fs.readFileSync(`.agents/skills/${name}/SKILL.md`,'utf8');assert.ok(body.startsWith('---\n'));assert.ok(body.includes(`name: ${name}\n`));assert.match(body,/\ndescription: .+\n/);assert.ok(body.split('---')[2].trim().length>200);assert.ok(discovered.includes(name))}
  console.log('8 skills atelier et '+(discovered.length-8)+' skills existants découverts dans le chemin Codex .agents/skills.');return;
 }
 if(command==='new'){
  assert.ok(!fs.existsSync(dir),'Cette production existe déjà');
  assert.ok(option('brief'),'--brief requis');
  const profile=option('profile','general');assert.ok(['general','ligue-onze'].includes(profile));const profileData=read(`profiles/${profile}.json`);
  fs.mkdirSync(dir,{recursive:true});
  save({id,component:id,status:'draft',profile,fps:30,width:1080,height:1920,durationSeconds:15,safeArea:profileData.safeArea,palette:{background:profileData.background,foreground:profileData.foreground,accent:profileData.accent,muted:profileData.muted},subtitles:profileData.subtitles,voice:null,captions:[],scenes:[],keyframesSeconds:[],transitionSeconds:[],assets:[]});
  text(path.join(dir,'brief.md'),option('brief','Consigne à compléter')+'\n');
  for(const name of ['script','storyboard','art-direction'])text(path.join(dir,name+'.md'),'# À produire\n');
  write(path.join(dir,'sources.json'),{claims:[],status:'pending'});write(path.join(dir,'media.json'),{assets:[]});write(path.join(dir,'timings.json'),{basis:'editorial-estimate',scenes:[]});
  write(path.join(dir,'quality-review.json'),{status:'pending'});console.log(dir);return;
 }
 if(command==='voice'){
  const p=load(),source=path.resolve(args[0]??''),timings=option('timings');assert.ok(fs.existsSync(source)&&timings,'Fichier audio et --timings obligatoires');
  const segments=read(timings),info=probe(source);assert.ok(info.streams.some(s=>s.codec_type==='audio'));
  const duration=Number(info.format.duration);const scenes=alignScenes(p.scenes,segments,duration);
  const digest=hash(fs.readFileSync(source)),ext=path.extname(source);assert.match(ext,/^\.(wav|mp3|m4a|aac|ogg|flac)$/);
  const src=`productions/${id}/media/${digest}${ext}`,target=path.join(root,'public',src);fs.mkdirSync(path.dirname(target),{recursive:true});if(!fs.existsSync(target))fs.copyFileSync(source,target);
  p.voice={src,durationSeconds:duration,timingBasis:flag('provider')?'provider-alignment':'provided-alignment',sha256:digest};p.captions=segments;p.durationSeconds=duration;p.scenes=scenes;
  p.keyframesSeconds=scenes.flatMap(s=>[s.startSeconds,Math.min(s.endSeconds-.05,s.startSeconds+(s.endSeconds-s.startSeconds)/2)]);p.transitionSeconds=scenes.slice(1).map(s=>s.startSeconds);
  validate(p);save(p);write(path.join(dir,'timings.json'),{basis:p.voice.timingBasis,audioDurationBasis:'ffprobe-measured',durationSeconds:duration,scenes,events:segments});
  write(path.join(dir,'media.json'),{assets:[...(p.assets??[]),p.voice]});write(path.join(dir,'voice-segments.json'),segments);text(path.join(dir,'captions.srt'),srt(segments));
  console.log('Audio importé en cache SHA-256 ; durée mesurée, repères '+p.voice.timingBasis);return;
 }
 if(command==='elevenlabs'){
  assert.ok(flag('allow-paid'),'Appel payant interdit sans --allow-paid et accord explicite de l’utilisateur');
  assert.ok(process.env.ELEVENLABS_API_KEY,'Configurer ELEVENLABS_API_KEY de manière sécurisée');
  const voiceId=option('voice-id');assert.match(voiceId??'',/^[a-zA-Z0-9_-]+$/);const input=fs.readFileSync(option('text'),'utf8');
  const model='eleven_multilingual_v2',key=hash(JSON.stringify({input,voiceId,model})),cache=path.join(dir,'cache','elevenlabs',key);fs.mkdirSync(cache,{recursive:true});
  const responseFile=path.join(cache,'response.json');
  if(!fs.existsSync(responseFile)){
   const response=await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/with-timestamps`,{method:'POST',headers:{'xi-api-key':process.env.ELEVENLABS_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({text:input,model_id:model})});
   if(!response.ok)throw new Error(`ElevenLabs HTTP ${response.status} ; vérifier accès à api.elevenlabs.io et clé, sans afficher la réponse sensible.`);
   const body=await response.json();assert.ok(body.audio_base64&&body.alignment);write(responseFile,body);
  }
  const body=read(responseFile);fs.writeFileSync(path.join(cache,'voice.mp3'),Buffer.from(body.audio_base64,'base64'));write(path.join(cache,'alignment.json'),body.alignment);
  const a=body.alignment,segments=[];let current='',start=0;
  for(let i=0;i<a.characters.length;i++){if(!current)start=a.character_start_times_seconds[i];current+=a.characters[i];if(/[.!?]/.test(a.characters[i])||i===a.characters.length-1){segments.push({text:current.trim(),startSeconds:start,endSeconds:a.character_end_times_seconds[i],sceneId:'ASSIGNER'});current=''}}
  write(path.join(cache,'segments.json'),segments);console.log('Cache prêt : '+cache+' ; attribuer sceneId puis importer avec voice ... --provider. Aucun rendu sans alignement explicite.');return;
 }
 const p=validate(load());if(flag('final'))p.fps=60;
 for(const file of ['brief.md','script.md','storyboard.md','art-direction.md','sources.json','media.json','timings.json'])assert.ok(fs.existsSync(path.join(dir,file)),`Manquant : ${file}`);
 assert.equal(read(path.join(dir,'sources.json')).status,'reviewed','Sources non examinées');
 for(const a of [...(p.assets??[]),...(p.voice?[p.voice]:[])]){assert.ok(a.src&&!a.src.includes('..'));assert.ok(fs.existsSync(path.join(root,'public',a.src)),`Média manquant : ${a.src}`);if(a.sha256)assert.equal(hash(fs.readFileSync(path.join(root,'public',a.src))),a.sha256)}
 const mode=flag('final')?'final':'preview',exports=path.join(dir,'exports'),quality=path.join(dir,'quality',mode),output=path.join(exports,mode+'.mp4');fs.mkdirSync(exports,{recursive:true});fs.mkdirSync(quality,{recursive:true});
 const signature=hash(JSON.stringify(p)+keySource(p));
 if(command==='render'){
  const record=path.join(exports,mode+'.json');
  if(fs.existsSync(output)&&fs.existsSync(record)&&read(record).signature===signature&&read(record).sha256===hash(fs.readFileSync(output))){checkMp4(output,p);console.log('Rendu réutilisé : cache vérifié '+output);return}
  const c=await context(p);
  try{await renderMedia({composition:c.composition,serveUrl:c.serveUrl,inputProps:{production:p},puppeteerInstance:c.browser,browserExecutable:'/usr/bin/chromium',codec:'h264',audioCodec:'aac',pixelFormat:'yuv420p',outputLocation:output,concurrency:2,isProduction:false,onProgress:({progress})=>{const v=Math.floor(progress*10);if(v!==main.lastProgress){console.log(`Rendu ${v*10}%`);main.lastProgress=v}}});}
  finally{await c.browser.close({silent:true})}
  const report=checkMp4(output,p);write(record,{signature,sha256:hash(fs.readFileSync(output)),generatedAt:new Date().toISOString(),...report});write(path.join(dir,'timings.json'),{...read(path.join(dir,'timings.json')),scenes:p.scenes});
  if(p.voice)text(path.join(exports,'captions.srt'),srt(p.captions));console.log(output);return;
 }
 if(command==='inspect'){
  assert.ok(fs.existsSync(output),'Rendre avant inspection');const record=read(path.join(exports,mode+'.json'));assert.equal(record.signature,signature,'Sources modifiées depuis le rendu');assert.equal(record.sha256,hash(fs.readFileSync(output)),'MP4 modifié depuis le rendu');
  const technical=checkMp4(output,p),times=new Set(p.keyframesSeconds??[]);
  for(const t of p.transitionSeconds??[])for(const d of [-.2,-1/p.fps,0,1/p.fps,.2])times.add(Math.max(0,Math.min(p.durationSeconds-1/p.fps,t+d)));
  times.add(0);times.add(p.durationSeconds-1/p.fps);
  const frames=[...new Set([...times].map(t=>Math.min(Math.ceil(p.durationSeconds*p.fps)-1,Math.round(t*p.fps))))].sort((a,b)=>a-b);
  const c=await context({...p,qa:true});const checks=[];
  try{for(const frame of frames){let seen=false;await renderStill({composition:c.composition,serveUrl:c.serveUrl,inputProps:{production:{...p,qa:true}},puppeteerInstance:c.browser,browserExecutable:'/usr/bin/chromium',frame,imageFormat:'png',output:path.join(quality,`key-${String(frame).padStart(5,'0')}.png`),onBrowserLog:log=>{if(log.text.startsWith('WORKSHOP_QA:')){checks.push(JSON.parse(log.text.slice(12)));seen=true}}});assert.ok(seen,`Sonde QA absente à ${frame}`)}}finally{await c.browser.close({silent:true})}
  const imageFiles=frames.map(frame=>path.join(quality,`key-${String(frame).padStart(5,'0')}.png`));
  // Galerie de toutes les images échantillonnées, dans l’ordre chronologique.
  const list=path.join(quality,'frames.txt');text(list,imageFiles.map(f=>`file '${f.replaceAll("'","'\\''")}'`).join('\n'));
  execFileSync('ffmpeg',['-y','-v','error','-f','concat','-safe','0','-i',list,'-vf',`scale=216:384,tile=5x${Math.ceil(frames.length/5)}`,'-frames:v','1',path.join(quality,'contact-sheet.png')]);
  for(const [i,t]of(p.transitionSeconds??[]).entries())execFileSync('ffmpeg',['-y','-v','error','-ss',String(Math.max(0,t-.5)),'-i',output,'-t','1','-an','-c:v','libx264','-pix_fmt','yuv420p',path.join(quality,`transition-${i+1}.mp4`)]);
  const errors=checks.flatMap(c=>c.errors.map(error=>({frame:c.frame,error})));write(path.join(quality,'technical.json'),{generatedAt:new Date().toISOString(),signature,sha256:record.sha256,technical,frames,checks,errors,limitations:['Échantillonnage, pas preuve de chaque image.','Compréhension et esthétique à examiner séparément.','Contrôle automatique de débordement des textes HTML balisés ; SVG et médias à examiner visuellement.']});
  assert.equal(errors.length,0,JSON.stringify(errors,null,2));console.log('Contrôles techniques et galerie prêts : '+quality);return;
 }
 throw new Error('Commandes : skills | new ID --brief TEXTE --profile PROFIL | voice ID AUDIO --timings JSON | elevenlabs ID --voice-id ID --text TXT --allow-paid | render ID [--final] | inspect ID [--final]');
}
main().catch(error=>{console.error(error.message);process.exitCode=1});
