from pathlib import Path
import subprocess,json
p=Path(__file__).resolve().parent;o=p/'exports'
def ff(args):subprocess.run(['ffmpeg','-y','-v','error',*args],check=True)
times=[2.5,8.4,10.5,17.1,19,26.5,31.5,37.5,40.8]
for i,t in enumerate(times):ff(['-ss',str(t),'-i',str(o/'final.mp4'),'-frames:v','1',str(o/f'scene-{i+1}.png')])
filters='scale=360:640,pad=360:680:0:40:color=0x080B0E,tile=3x3'
for i,t in enumerate(times):filters+=f",drawtext=fontfile=public/productions/pronos-17-nov/fonts/Inter.ttf:text='{t:.2f} s':fontcolor=0x8D969E:fontsize=20:x={i%3*360+12}:y={i//3*680+10}"
ff(['-i',str(o/'scene-%d.png'),'-vf',filters,'-frames:v','1',str(o/'planche-scenes.png')])
for name,start,duration in [('trophee-horloge',4.4,3),('panenka',7.4,3),('ballon-raccord',13.2,3),('egalisation',16.2,3),('carton-tunnel',25.5,5),('retour-trophee',33,3),('signature',42.1,2.9)]:
 ff(['-ss',str(start),'-i',str(o/'final.mp4'),'-t',str(duration),'-an','-c:v','libx264','-pix_fmt','yuv420p',str(o/f'{name}.mp4')])
 n=round(duration*10);rows=(n+5)//6
 ff(['-i',str(o/f'{name}.mp4'),'-vf',f'fps=10,scale=180:320,tile=6x{rows}','-frames:v','1',str(o/f'{name}-strip.png')])
(o/'scene-times.json').write_text(json.dumps(times)+'\n')
print('Planche neuf moments et sept extraits à60fps, bandes chronologiques à10images/s, extraits du MP4 encodé courant.')
