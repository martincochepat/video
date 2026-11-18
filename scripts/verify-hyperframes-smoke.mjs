import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const video=path.join(root,'examples/hyperframes-smoke/renders/test.mp4');
const info=JSON.parse(execFileSync('ffprobe',['-v','error','-count_frames','-show_streams','-show_format','-of','json',video]));
const stream=info.streams.find(x=>x.codec_type==='video');
assert.equal(stream.codec_name,'h264');assert.equal(stream.width,1080);assert.equal(stream.height,1920);assert.equal(stream.pix_fmt,'yuv420p');assert.equal(stream.r_frame_rate,'60/1');assert.equal(Number(stream.nb_read_frames),180);assert.equal(Number(info.format.duration),3);
execFileSync('ffmpeg',['-v','error','-i',video,'-f','null','-'],{stdio:'pipe'});
const centroid=(time)=>{
 const rgb=execFileSync('ffmpeg',['-v','error','-ss',String(time),'-i',video,'-frames:v','1','-vf','crop=1080:300:0:1000,format=rgb24','-f','rawvideo','-'],{maxBuffer:4*1024*1024});
 let count=0,sum=0;for(let k=0;k<rgb.length;k+=3)if(rgb[k]>130&&rgb[k+1]>180&&rgb[k+2]<80){count++;sum+=(k/3)%1080;}
 assert.ok(count>1000,'Marqueur animé absent');return {time,centroidX:sum/count,pixels:count};
};
const a=centroid(.9),b=centroid(2.6);assert.ok(b.centroidX-a.centroidX>150,'Le rendu ne progresse pas sur la timeline');
const record={hyperframes:JSON.parse(fs.readFileSync(path.join(root,'node_modules/hyperframes/package.json'))).version,codec:stream.codec_name,width:stream.width,height:stream.height,fps:60,frames:180,durationSeconds:3,pixelFormat:stream.pix_fmt,fullyDecoded:true,motionCheck:{first:a,last:b},sha256:crypto.createHash('sha256').update(fs.readFileSync(video)).digest('hex'),browser:'/usr/bin/chromium',capture:'screenshot',limitations:['Test technique court, pas une validation artistique ou de performance de longs films.','Modules facultatifs de transcription, voix et musique locales non installés.']};
fs.writeFileSync(path.join(root,'examples/hyperframes-smoke/verification.json'),JSON.stringify(record,null,2)+'\n');
console.log('Hyperframes : MP4 décodé, 1080×1920/60fps, 180 images ; progression réelle du marqueur vérifiée.');
