"""Planches depuis le MP4 encodé, à pleine taille et à 360 px de large."""
from pathlib import Path
import subprocess
r=Path(__file__).resolve().parent;p=r/'exports';video=p/'final.mp4'
def ff(*args):subprocess.run(['ffmpeg','-y','-v','error',*map(str,args)],check=True)
times=[0,2.8,7.1,11.8,17.2,21.5]
for i,t in enumerate(times):ff('-ss',t,'-i',video,'-frames:v',1,p/f'scene-{i+1}.png')
args=[]
for i in range(1,7):args.extend(['-i',p/f'scene-{i}.png'])
f=';'.join(f'[{i}:v]scale=360:640[v{i}]' for i in range(6))+';'+''.join(f'[v{i}]' for i in range(6))+'xstack=inputs=6:layout=0_0|360_0|720_0|0_640|360_640|720_640[out]'
ff(*args,'-filter_complex',f,'-map','[out]','-frames:v',1,p/'planche-scenes.png')
# Ouverture entière + raccords : fichiers animés et images chronologiques.
for name,start,duration in [('ouverture',0,5),('pologne',4.65,2.4),('filet',9.2,2.5),('danemark',13.65,2.8),('synthese',19.7,2.0)]:
 ff('-ss',start,'-i',video,'-t',duration,'-an','-c:v','libx264','-pix_fmt','yuv420p',p/f'{name}.mp4')
 n=int(duration*8+.5);rows=(n+5)//6
 ff('-i',p/f'{name}.mp4','-vf',f'fps=8,scale=216:384,tile=6x{rows}','-frames:v',1,p/f'{name}-strip.png')
print('Six scènes, aperçu 360px et extraits d’ouverture/raccords extraits du MP4 courant.')
