"""Contrôles et planches extraits du MP4 réellement livré."""
from pathlib import Path
import json,subprocess,hashlib,re
import numpy as np
from PIL import Image,ImageDraw
p=Path(__file__).resolve().parent;r=p.parents[1];v=p/'delivery/3-pronos-21-novembre-sans-voix.mp4';q=p/'quality/decoded';q.mkdir(parents=True,exist_ok=True)
def run(a):return subprocess.run(a,check=True,capture_output=True)
info=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(v)]).stdout)
assert not any(x['codec_type']=='subtitle' for x in info['streams'])
def frame(t,file):run(['ffmpeg','-v','error','-y','-ss',str(t),'-i',str(v),'-frames:v','1','-vf','scale=270:480',str(file)])
key=[1,6,13,20,27.5,34]
for i,t in enumerate(key):frame(t,q/f'key-{i}.png')
# Six moments sur deux rangées de trois.
board=Image.new('RGB',(1080,2*680),'#171c21');d=ImageDraw.Draw(board)
for i,t in enumerate(key):
 im=Image.open(q/f'key-{i}.png').resize((360,640));x=i%3*360;y=i//3*680;board.paste(im,(x,y+32));d.text((x+12,y+10),f'{t:.1f} s',fill='white')
board.save(p/'delivery/six-moments-cles.jpg',quality=94)
windows=[('ouverture',3.05,4.05),('score1',4.5,5.4),('passage2',10.05,11.1),('score2',11.5,12.4),('passage3',17.05,18.1),('score3',18.5,19.4),('recap',24.05,25.2),('selection',26.9,28)]
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
a=np.frombuffer(run(args+[str(v)]+end).stdout,dtype='<f4');b=np.frombuffer(run(args+[str(r/'public/productions/pronos-21-nov/music-and-sfx.wav')]+end).stdout,dtype='<f4');n=min(len(a),len(b));cos=float(np.dot(a[:n],b[:n])/(np.linalg.norm(a[:n])*np.linalg.norm(b[:n])));assert cos>.99
# Le SRT est une proposition éditoriale, pas une transcription de l'audio.
timing=json.loads((p/'timings.json').read_text());srt=(p/'delivery/sous-titres-PROVISOIRES.srt').read_text();blocks=srt.strip().split('\n\n');captionText=[]
assert len(blocks)==len(timing['segments'])
for block in blocks:
 lines=block.splitlines();assert len(lines)<=4;assert all(len(x)<=36 for x in lines[2:]);captionText.append(' '.join(lines[2:]))
assert ' '.join(captionText)==' '.join((p/'voiceover.txt').read_text().split())
for i,m in enumerate(json.loads((p/'matches.json').read_text())['matches']):assert m['prediction']==[[1,2],[1,2],[1,1]][i] and m['kickoffParis'].startswith('2026-11-21')
report={'srtStatus':'provisional-editorial-not-aligned-no-voice','srtCues':len(blocks),'sha256':hashlib.sha256(v.read_bytes()).hexdigest(),'subtitleStreams':0,'blackIntervals':[],'audioLevels':levels,'audioCosineVsOriginalInstrumental':cos,'voiceGenerated':False,'keyTimes':key,'motionWindows':windows,'inspectionMethod':'MP4 décodé : planche de six moments et 8 extraits échantillonnés à10 images/s. Examen visuel image par image, pas lecture perceptive continue ni écoute humaine certifiée.'}
(p/'inspection.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False,indent=2))
