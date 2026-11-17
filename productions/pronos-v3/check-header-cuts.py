from pathlib import Path
import subprocess,json
p=Path(__file__).resolve().parent;o=p/'exports'
times=[2.9,3.05,6.45,6.55,15.4,15.55,21.4,21.6]
for i,t in enumerate(times):subprocess.run(['ffmpeg','-y','-v','error','-ss',str(t),'-i',str(o/'final.mp4'),'-frames:v','1','-vf','scale=216:384',str(o/f'header-{i}.png')],check=True)
subprocess.run(['ffmpeg','-y','-v','error','-i',str(o/'header-%d.png'),'-vf','tile=4x2','-frames:v','1',str(o/'titres-raccords.png')],check=True)
(o/'titres-raccords.json').write_text(json.dumps(times)+'\n')
