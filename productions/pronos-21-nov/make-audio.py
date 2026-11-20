"""Composition instrumentale originale synthétisée, sans voix ni échantillon tiers."""
import numpy as np, wave, subprocess
from pathlib import Path
R=48000; D=35; rng=np.random.default_rng(11); mix=np.zeros((R*D,2),np.float32)
def add(start,dur,freq,vol=.1,kind='note',pan=0):
 n=min(int(dur*R),len(mix)-int(start*R));
 if n<=0:return
 t=np.arange(n)/R
 if kind=='kick': s=np.sin(2*np.pi*(45*t+85*.035*(1-np.exp(-t/.035))))*np.exp(-t*18)
 elif kind=='hat': s=rng.normal(0,1,n)*np.exp(-t*65)*.25
 elif kind=='swoosh':
  noise=rng.normal(0,1,n);s=(noise-np.roll(noise,1))*.1*np.sin(np.pi*t/dur)**2
 else:
  env=np.minimum(t/.025,1)*np.exp(-t/(dur*.35))*np.minimum((dur-t)/.1,1)
  s=(np.sin(2*np.pi*freq*t+.8*np.sin(2*np.pi*freq*2*t)*np.exp(-t*4))+.15*np.sin(2*np.pi*freq*.5*t))*env
 s=s.astype(np.float32)*vol; k=int(start*R)
 mix[k:k+n,0]+=s*np.sqrt((1-pan)/2);mix[k:k+n,1]+=s*np.sqrt((1+pan)/2)
def hz(m):return 440*2**((m-69)/12)
sections=[(0,3.5,[45,52,57],.42),(3.5,10.5,[45,52,60],.45),(10.5,17.5,[38,45,53],.4),(17.5,24.5,[41,48,57],.35),(24.5,35,[45,52,59],.5)]
for start,end,chord,beat in sections:
 for k,x in enumerate(np.arange(start+.07,end,beat)):
  add(x,min(1.7,end-x),hz(chord[k%3]+12+(12 if k%8==7 else 0)),.075,pan=(-.32 if k%2 else .32))
  if k%4==0:add(x,min(1.1,end-x),hz(chord[0]),.14)
  if k%2==0:add(x,.24,0,.12,'kick')
  if start!=41:add(x+beat/2,.08,0,.045,'hat',.2)
for x in [.05,3.5,10.5,17.5,24.5,28.4]:
 add(x,.35,0,.18,'kick');add(max(0,x-.3),.48,0,.11,'swoosh')
for x in [4.6,4.8,11.6,11.8,18.6,18.8]:
 add(x,.15,880,.1);add(max(0,x-.17),.3,0,.06,'swoosh')
# Echo court et fondu final ; aucune parole générée.
lag=int(.18*R);mix[lag:]+=mix[:-lag]*.16
fade=np.minimum(np.arange(len(mix))/R/.12,1)*np.minimum((len(mix)-np.arange(len(mix)))/R/1.5,1)
mix*=fade[:,None];mix=np.tanh(mix);mix*=.65/max(.65,float(np.max(abs(mix))))
p=Path(__file__).resolve().parents[2]/'public/productions/pronos-21-nov';p.mkdir(exist_ok=True)
tmp=p/'audio-raw.wav'
with wave.open(str(tmp),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(R);w.writeframes((mix*32767).astype('<i2').tobytes())
subprocess.run(['ffmpeg','-v','error','-y','-i',str(tmp),'-af','loudnorm=I=-20:TP=-2:LRA=9','-ar','48000','-c:a','pcm_s16le',str(p/'music-and-sfx.wav')],check=True);tmp.unlink()
