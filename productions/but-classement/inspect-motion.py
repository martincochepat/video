"""Extraire six instants et des séquences d'images du MP4 réellement encodé."""
from pathlib import Path
import subprocess
root=Path(__file__).resolve().parent
out=root/'exports'; video=out/'final.mp4'
def ff(args):subprocess.run(['ffmpeg','-y','-v','error',*map(str,args)],check=True)
moments=[(1.35,'1,35 s — Classement initial'),(2.7,'2,70 s — Ballon en vol'),(3.15,'3,15 s — But et filet'),(4.7,'4,70 s — Points actualisés'),(5.6,'5,60 s — Voie de permutation'),(7.25,'7,25 s — Classement final')]
for i,(t,_) in enumerate(moments):ff(['-ss',t,'-i',video,'-frames:v',1,out/f'moment-{i+1}.png'])
args=[]
for i in range(1,7):args+=['-i',out/f'moment-{i}.png']
font=Path('/workspace/video/public/fonts/StudioSans.ttf')
filters=[]
for i,(_,label) in enumerate(moments):filters.append(f"[{i}:v]scale=360:640,pad=360:680:0:0:color=0xf3eee3,drawtext=fontfile='{font}':text='{label}':fontcolor=0x292735:fontsize=16:x=15:y=652[v{i}]")
filters.append(''.join(f'[v{i}]' for i in range(6))+'xstack=inputs=6:layout=0_0|360_0|720_0|0_680|360_680|720_680[out]')
ff([*args,'-filter_complex',';'.join(filters),'-map','[out]','-frames:v',1,out/'six-moments.png'])
for name,start,duration in [('tir-filet',2.05,1.5),('signal-compteur',3.15,1.8),('permutation',4.75,2.0)]:
 ff(['-ss',start,'-i',video,'-t',duration,'-an','-c:v','libx264','-pix_fmt','yuv420p',out/f'{name}.mp4'])
 # Échantillonnage à 12 fps : panoramas pour lire les écarts entre images.
 ff(['-i',out/f'{name}.mp4','-vf',f'fps=12,scale=216:384,tile=6x{int(duration*12+5)//6}','-frames:v',1,out/f'{name}-strip.png'])
print('Six images et trois extraits de mouvement extraits du MP4 courant.')
