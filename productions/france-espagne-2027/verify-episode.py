"""Examiner le MP4 livré : flux vidéo seul, images et extraits décodés."""
from pathlib import Path
import json, subprocess, hashlib, re
from PIL import Image,ImageDraw
p=Path(__file__).resolve().parent;v=p/'delivery/france-espagne-encore-eux-sans-audio.mp4';q=p/'quality/decoded';q.mkdir(parents=True,exist_ok=True)
def run(args):return subprocess.run(args,check=True,capture_output=True)
info=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(v)]).stdout)
assert len(info['streams'])==1 and info['streams'][0]['codec_type']=='video'
s=info['streams'][0];assert s['codec_name']=='h264' and s['pix_fmt']=='yuv420p' and s['width']==1080 and s['height']==1920 and s['r_frame_rate']=='30/1';assert abs(float(info['format']['duration'])-90)<.04
assert not list(p.glob('*.srt')) and not list((p/'delivery').glob('*.srt'))
key=[.8,5.8,8.3,12.8,16.2,20.5,23.5,26.5,30.2,33.8,38.5,41.5,44.5,47.5,50.5,53.8,57.8,61.8,65.5,68.5,71.5,74.5,77.5,82.1,86,89.8]
for i,t in enumerate(key):run(['ffmpeg','-v','error','-y','-ss',str(t),'-i',str(v),'-frames:v','1','-vf','scale=270:480',str(q/f'key-{i:02}.png')])
cols=6;rows=(len(key)+cols-1)//cols;board=Image.new('RGB',(cols*270,rows*510),'#171C21');d=ImageDraw.Draw(board)
for i,t in enumerate(key):
 x=i%cols*270;y=i//cols*510;board.paste(Image.open(q/f'key-{i:02}.png'),(x,y+25));d.text((x+8,y+7),f'{t:.1f}s',fill='white')
board.save(p/'delivery/planche-26-moments.jpg',quality=93)
# Deux captures natives de chaque chapitre, utiles à l'examen en plein écran.
cap=p/'delivery/captures';cap.mkdir(exist_ok=True)
for t in [.8,5.8,8.3,16.2,26.5,33.8,41.5,47.5,53.8,57.8,68.5,74.5,82.1,89.8]:run(['ffmpeg','-v','error','-y','-ss',str(t),'-i',str(v),'-frames:v','1',str(cap/f'{t:05.1f}s.png')])
windows=[('ouverture',0,1),('choc',2.2,3.4),('duel',4.3,5.5),('histoire',10.9,12.1),('espagne',21.8,23),('yamal-merino',28.8,30),('circulation',32.5,34),('france',36.8,38),('portraits',42.8,44),('calendrier',55.95,57.15),('tableau',69.8,71),('question',84.5,85.7)]
for name,a,b in windows:
 folder=q/name;folder.mkdir(exist_ok=True)
 run(['ffmpeg','-v','error','-y','-ss',str(a),'-i',str(v),'-t',str(b-a),'-vf','fps=15,scale=216:384',str(folder/'%03d.png')]);files=sorted(folder.glob('*.png'));cols=6;rows=(len(files)+cols-1)//cols;o=Image.new('RGB',(cols*216,rows*410),'#303030');dr=ImageDraw.Draw(o)
 for i,f in enumerate(files):
  x=i%cols*216;y=i//cols*410;o.paste(Image.open(f),(x,y+24));dr.text((x+4,y+5),f'{a+i/15:.2f}s',fill='white')
 o.save(q/f'motion-{name}.jpg',quality=92)
black=run(['ffmpeg','-hide_banner','-i',str(v),'-vf','blackdetect=d=0.05:pix_th=0.05:pic_th=0.98','-an','-f','null','-']).stderr.decode();assert 'black_start:' not in black
run(['ffmpeg','-v','error','-i',str(v),'-f','null','-'])
# La couverture reflète le cadrage du MP4 livré, pas un ancien brouillon.
run(['ffmpeg','-v','error','-y','-ss','5.8','-i',str(v),'-frames:v','1',str(p/'delivery/couverture.png')])
report=dict(sha256=hashlib.sha256(v.read_bytes()).hexdigest(),duration=float(info['format']['duration']),audioStreams=0,subtitleStreams=0,videoStreams=1,blackIntervals=[],fullDecode=True,keyTimes=key,nativeCaptureCount=14,motionWindows=windows,motionSamplingFps=15,method='Examen visuel de captures du MP4 et de12fenêtres échantillonnées image par image. Pas de certification de fluidité par lecture continue àvitesse réelle. Aucun contrôle sonore nécessaire : absence de flux audio prouvée parFFprobe.')
(p/'inspection.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False,indent=2))
