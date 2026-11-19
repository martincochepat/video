"""Original procedural impacts. No third-party samples, music, voice, network or API."""
import math,random,wave,array
from pathlib import Path
r=48000; duration=27; output=[0.]*(r*duration); rng=random.Random(1103)
events=[(.12,.7,72),(.85,.3,108),(3.75,.6,86),(8.75,.56,104),(13.75,.62,80),(18.2,.45,96),(21,.22,140),(24.15,.48,90)]
for start,length,pitch in events:
 phase=0
 for i in range(int(length*r)):
  t=i/r; env=(1-math.exp(-t*170))*math.exp(-t*11)*(min(1,(length-t)*50))
  phase+=2*math.pi*(pitch+90*math.exp(-t*18))/r
  body=.8*math.sin(phase)+.12*math.sin(phase*2.03)
  air=rng.uniform(-1,1)*math.exp(-t*28)*.12
  output[int(start*r)+i]+=(body+air)*env
peak=max(abs(x) for x in output); gain=10**(-10/20)/peak
pcm=array.array('h',(round(x*gain*32767) for x in output))
p=Path(__file__).resolve().parents[2]/'public/productions/trois-pronostics/impacts.wav'
with wave.open(str(p),'wb') as f:f.setnchannels(1);f.setsampwidth(2);f.setframerate(r);f.writeframes(pcm.tobytes())
print('SFX mono 48 kHz / 27 s ; crête normalisée -10 dBFS ; original local')
