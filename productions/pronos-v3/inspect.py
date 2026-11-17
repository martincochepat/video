from pathlib import Path
import subprocess
r=Path(__file__).resolve().parent;o=r/'exports';o.mkdir(exist_ok=True)
def ff(args):subprocess.run(['ffmpeg','-y','-v','error',*args],check=True)
times=[1.65,3.7,8.3,13,18.4,23.5,28]
for i,t in enumerate(times):ff(['-ss',str(t),'-i',str(o/'final.mp4'),'-frames:v','1',str(o/f'scene-{i+1}.png')])
labels=['Accroche 1.65 s','Galles - Portugal 3.70 s','Pologne - Suede 8.30 s','Ukraine - Georgie 13 s','Danemark - Norvege 18.40 s','Synthese 23.50 s','Signature 28 s']
filters='scale=360:640,pad=360:680:0:40:color=0x080B0E,tile=4x2'
for i,label in enumerate(labels): filters+=f",drawtext=fontfile=public/productions/pronos-17-nov/fonts/Inter.ttf:text='{label}':fontcolor=0x8D969E:fontsize=18:x={i%4*360+10}:y={i//4*680+10}"
ff(['-i',str(o/'scene-%d.png'),'-vf',filters,'-frames:v','1',str(o/'planche-scenes.png')])
for name,start,duration in [('accroche',0,4.2),('pologne',5.9,2.2),('filet',10.4,2.8),('danemark',14.9,2.7),('synthese',20.9,2.1),('signature',26.2,2.8)]:
 ff(['-ss',str(start),'-i',str(o/'final.mp4'),'-t',str(duration),'-an','-c:v','libx264','-pix_fmt','yuv420p',str(o/f'{name}.mp4')])
 rows=(round(duration*10)+5)//6
 ff(['-i',str(o/f'{name}.mp4'),'-vf',f'fps=10,scale=180:320,tile=6x{rows}','-frames:v','1',str(o/f'{name}-strip.png')])
print('Sept scènes à 360px et six extraits chronologiques à 10 images/s extraits du MP4 courant.')
