import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
export const root=path.resolve(import.meta.dirname,'..');
export const read=(p)=>JSON.parse(fs.readFileSync(p,'utf8'));
export const write=(p,value)=>{fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,JSON.stringify(value,null,2)+'\n')};
export const hash=(value)=>crypto.createHash('sha256').update(value).digest('hex');
export const probe=(file)=>JSON.parse(execFileSync('ffprobe',['-v','error','-count_frames','-show_streams','-show_format','-of','json',file],{encoding:'utf8'}));
export function productionDir(id){assert.match(id??'',/^[a-z0-9][a-z0-9-]{0,60}$/,'Identifiant invalide');return path.join(root,'productions',id)}
export function validate(p){
 assert.equal(p.status,'ready','Production en brouillon : compléter scénario, sources et composition');
 assert.ok(p.width>0&&p.height>0&&p.durationSeconds>0&&p.durationSeconds<=600);
 assert.ok([30,60].includes(p.fps));assert.ok(p.component);
 assert.ok(p.scenes.length>0);
 let end=0;for(const s of p.scenes){assert.ok(s.id&&Number.isFinite(s.startSeconds)&&s.startSeconds===end&&s.endSeconds>s.startSeconds,'Scènes contiguës et positives requises');end=s.endSeconds}
 assert.ok(Math.abs(end-p.durationSeconds)<.001,'Durée des scènes incohérente');
 const a=p.safeArea;assert.ok(Object.values(a).every(v=>Number.isFinite(v)&&v>=0));assert.ok(a.left+a.right<p.width&&a.top+a.bottom<p.height);
 if(p.voice){assert.ok(['provided-alignment','provider-alignment'].includes(p.voice.timingBasis));assert.ok(Math.abs(p.durationSeconds-p.voice.durationSeconds)<.001);assert.ok(p.captions.length>0)}
 let last=0;for(const c of p.captions){assert.ok(c.text&&c.startSeconds>=last&&c.endSeconds>c.startSeconds&&c.endSeconds<=p.durationSeconds+.001,'Segments invalides ou superposés');assert.ok(p.scenes.some(s=>s.id===c.sceneId));last=c.endSeconds;if(p.subtitles.enabled)assert.ok(c.text.length<=p.subtitles.maxChars,'Sous-titre trop long : scinder selon des repères réels')}
 assert.ok(!p.subtitles.enabled||p.voice,'Pas de sous-titres présentés comme transcription sans voix');
 return p;
}
export function alignScenes(scenes,segments,duration){
 assert.ok(segments.length>0&&duration>0);
 let previous=0;for(const c of segments){assert.ok(c.text&&Number.isFinite(c.startSeconds)&&Number.isFinite(c.endSeconds)&&c.startSeconds>=previous&&c.endSeconds>c.startSeconds&&c.endSeconds<=duration+.001,'Alignement hors audio ou superposé');assert.ok(scenes.some(s=>s.id===c.sceneId),'sceneId inconnu');previous=c.endSeconds}
 const starts=scenes.map(s=>{const c=segments.find(c=>c.sceneId===s.id);assert.ok(c,`Aucun repère pour ${s.id}`);return c.startSeconds});starts[0]=0;
 for(let i=1;i<starts.length;i++)assert.ok(starts[i]>starts[i-1],'Ordre des scènes incohérent');
 const result=scenes.map((s,i)=>({...s,startSeconds:starts[i],endSeconds:starts[i+1]??duration}));
 for(const c of segments){const s=result.find(s=>s.id===c.sceneId);assert.ok(c.startSeconds>=s.startSeconds&&c.endSeconds<=s.endSeconds+.001,'Un segment traverse la scène suivante')}
 return result;
}
export function srt(segments){const stamp=s=>{const ms=Math.round(s*1000);return `${String(Math.floor(ms/3600000)).padStart(2,'0')}:${String(Math.floor(ms/60000)%60).padStart(2,'0')}:${String(Math.floor(ms/1000)%60).padStart(2,'0')},${String(ms%1000).padStart(3,'0')}`};return segments.map((c,i)=>`${i+1}\n${stamp(c.startSeconds)} --> ${stamp(c.endSeconds)}\n${c.text}\n`).join('\n')}
export function checkMp4(file,p){const info=probe(file),v=info.streams.find(s=>s.codec_type==='video'),audio=info.streams.filter(s=>s.codec_type==='audio');assert.ok(v);assert.equal(v.codec_name,'h264');assert.equal(v.width,p.width);assert.equal(v.height,p.height);assert.ok(['yuv420p','yuvj420p'].includes(v.pix_fmt));assert.equal(Number(v.nb_read_frames),Math.ceil(p.durationSeconds*p.fps));assert.equal(v.r_frame_rate,`${p.fps}/1`);assert.ok(Math.abs(Number(info.format.duration)-Math.ceil(p.durationSeconds*p.fps)/p.fps)<.08);assert.equal(audio.length,p.voice?1:0);if(p.voice)assert.equal(audio[0].codec_name,'aac');execFileSync('ffmpeg',['-v','error','-i',file,'-f','null','-'],{stdio:['ignore','pipe','pipe']});return {codec:v.codec_name,width:v.width,height:v.height,fps:p.fps,frames:Number(v.nb_read_frames),duration:Number(info.format.duration),audio:audio.map(s=>s.codec_name),decoded:true}}
