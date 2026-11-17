from pathlib import Path
import json,subprocess
r=Path(__file__).resolve().parent;o=r/'exports';o.mkdir(exist_ok=True)
frames=[]
for start,end in [(2.65,3.25),(6.2,6.75),(10.7,11.25),(15.2,15.75),(21.2,21.8),(26.5,27.05)]:
 frames.extend([round(start*60)-1,round(start*60),round(end*60),round(end*60)+1])
for i,frame in enumerate(frames):
 subprocess.run(['ffmpeg','-y','-v','error','-ss',str(frame/60),'-i',str(o/'final.mp4'),'-frames:v','1','-vf','scale=216:384',str(o/f'edge-{i:02}.png')],check=True)
# Les fichiers sont séquentiels mais leur temps réel est conservé dans le JSON.
subprocess.run(['ffmpeg','-y','-v','error','-i',str(o/'edge-%02d.png'),'-vf','tile=4x6','-frames:v','1',str(o/'transition-ends.png')],check=True)
(o/'transition-ends.json').write_text(json.dumps([{'file':f'edge-{i:02}.png','frame':f,'seconds':f/60} for i,f in enumerate(frames)],indent=2)+'\n')
print('24 débuts/fins exacts de transitions extraits du MP4 encodé.')
