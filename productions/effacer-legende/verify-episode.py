"""Contrôles et planches extraits du MP4 réellement livré."""
from pathlib import Path
import json,subprocess,hashlib,re
import numpy as np
from PIL import Image,ImageDraw
p=Path(__file__).resolve().parent;r=p.parents[1];v=p/'delivery/ligue-onze-effacer-une-legende.mp4';q=p/'quality/decoded';q.mkdir(parents=True,exist_ok=True)
def run(a):return subprocess.run(a,check=True,capture_output=True)
info=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(v)]).stdout)
assert not any(x['codec_type']=='subtitle' for x in info['streams'])
def frame(t,file):run(['ffmpeg','-v','error','-y','-ss',str(t),'-i',str(v),'-frames:v','1','-vf','scale=270:480',str(file)])
key=[.5,18.5,33,51.2,73,86]
for i,t in enumerate(key):frame(t,q/f'key-{i}.png')
# Six moments sur deux rangées de trois.
board=Image.new('RGB',(1080,2*680),'#171c21');d=ImageDraw.Draw(board)
for i,t in enumerate(key):
 im=Image.open(q/f'key-{i}.png').resize((360,640));x=i%3*360;y=i//3*680;board.paste(im,(x,y+32));d.text((x+12,y+10),f'{t:.1f} s',fill='white')
board.save(p/'delivery/six-moments-cles.jpg',quality=94)
windows=[('hook',3.3,4.5),('messi',4.8,5.8),('vision',10.2,11.4),('ronaldo',22.8,23.8),('zidane',40.8,41.8),('vollee',49.7,51.8),('memoire',54.1,55.3),('choix',76.8,78)]
for name,a,b in windows:
 folder=q/name;folder.mkdir(exist_ok=True)
 run(['ffmpeg','-v','error','-y','-ss',str(a),'-i',str(v),'-t',str(b-a),'-vf','fps=10,scale=216:384',str(folder/'%03d.png')])
 files=sorted(folder.glob('*.png'));cols=6;rows=(len(files)+cols-1)//cols;o=Image.new('RGB',(cols*216,rows*410),'#303030');dr=ImageDraw.Draw(o)
 for i,f in enumerate(files):
  x=i%cols*216;y=i//cols*410;o.paste(Image.open(f),(x,y+24));dr.text((x+4,y+5),f'{a+i/10:.2f}s',fill='white')
 o.save(q/f'motion-{name}.jpg',quality=92)
black=run(['ffmpeg','-hide_banner','-i',str(v),'-vf','blackdetect=d=0.05:pix_th=0.05:pic_th=0.98','-an','-f','null','-']).stderr.decode();assert 'black_start:' not in black
sound=run(['ffmpeg','-hide_banner','-i',str(v),'-af','loudnorm=I=-20:TP=-2:LRA=9:print_format=json','-vn','-f','null','-']).stderr.decode();levels=json.loads(re.search(r'\{[^{}]*"input_i"[^{}]*\}',sound).group())
args=['ffmpeg','-v','error','-i'];end=['-vn','-ar','12000','-ac','1','-f','f32le','-']
a=np.frombuffer(run(args+[str(v)]+end).stdout,dtype='<f4');b=np.frombuffer(run(args+[str(r/'public/productions/effacer-legende/music-and-sfx.wav')]+end).stdout,dtype='<f4');n=min(len(a),len(b));cos=float(np.dot(a[:n],b[:n])/(np.linalg.norm(a[:n])*np.linalg.norm(b[:n])));assert cos>.99
report={'sha256':hashlib.sha256(v.read_bytes()).hexdigest(),'subtitleStreams':0,'blackIntervals':[],'audioLevels':levels,'audioCosineVsOriginalInstrumental':cos,'voiceGenerated':False,'keyTimes':key,'motionWindows':windows,'inspectionMethod':'MP4 décodé : planche de six moments et 8 extraits échantillonnés à10 images/s. Examen visuel image par image, pas lecture perceptive continue ni écoute humaine certifiée.'}
(p/'inspection.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False,indent=2))
