from pathlib import Path
import math,array,random,wave,json,subprocess
root=Path(__file__).resolve().parents[2];p=root/'productions/cinq-scores-v4';t=json.load(open(p/'timings.json'));rate=48000;n=round(t['durationSeconds']*rate);samples=[0.]*n;rng=random.Random(1104)
events=[(.08,.5,65,.24)]+[(s['startSeconds']+.06,.28,135,.05) for s in t['scenes'][1:]]
for s in t['scenes'][1:6]:
 first=next(x for x in t['segments'] if x['sceneId']==s['id']);events.append((max(s['startSeconds']+.55,first['endSeconds']-.65),.5,75,.2))
for start,length,freq,level in events:
 ph=0
 for i in range(round(length*rate)):
  j=round(start*rate)+i
  if j>=n:break
  x=i/rate;env=(1-math.exp(-x*120))*math.exp(-x*13)*min(1,(length-x)*30);ph+=2*math.pi*(freq+80*math.exp(-x*20))/rate
  samples[j]+=level*env*(math.sin(ph)+rng.uniform(-1,1)*.12*math.exp(-x*20))
file=root/'public/productions/cinq-scores-v4/audio/sfx.wav'
with wave.open(str(file),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate);w.writeframes(array.array('h',(round(max(-1,min(1,v))*32767) for v in samples)).tobytes())
voice=file.with_name('voice-work.wav');mix=file.with_name('mix.wav')
subprocess.run(['ffmpeg','-y','-v','error','-i',str(voice),'-i',str(file),'-filter_complex','[0:a]loudnorm=I=-17:TP=-2:LRA=9,aresample=48000[v];[v][1:a]amix=inputs=2:normalize=0,alimiter=limit=0.85:level=false:latency=true[a]','-map','[a]','-ar','48000','-ac','2','-t',str(t['durationSeconds']),str(mix)],check=True)
print('Mix réel : narration de travail + impacts originaux, sans musique ni API payante.')
