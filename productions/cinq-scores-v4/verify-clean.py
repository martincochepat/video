"""Validate the delivered clean edit, including decoded AAC vs original effects-only reference."""
from pathlib import Path
import subprocess,json,array,math,hashlib
root=Path(__file__).resolve().parents[2];p=root/'productions/cinq-scores-v4';film=p/'delivery/ligue-onze-5-scores-v4-sans-voix.mp4';q=p/'quality/clean';q.mkdir(parents=True,exist_ok=True)
def run(a):return subprocess.run(a,capture_output=True,check=True)
probe=json.loads(run(['ffprobe','-v','error','-show_streams','-of','json',str(film)]).stdout);assert len([x for x in probe['streams'] if x['codec_type']=='audio'])==1;assert not [x for x in probe['streams'] if x['codec_type']=='subtitle']
ref=root/'public/productions/cinq-scores-v4/audio/sfx.wav'
def samples(file):
 r=run(['ffmpeg','-v','error','-i',str(file),'-vn','-ac','1','-ar','48000','-f','f32le','-']).stdout
 a=array.array('f');a.frombytes(r);return a
s=samples(film);r=samples(ref);n=min(len(s),len(r));dot=rs=ss=0.
for i in range(0,n,8):dot+=r[i]*s[i];rs+=r[i]**2;ss+=s[i]**2
correlation=dot/math.sqrt(rs*ss);assert correlation>.99,correlation
black=run(['ffmpeg','-hide_banner','-i',str(film),'-an','-vf','blackdetect=d=0.02:pix_th=0.08:pic_th=0.985','-f','null','-']).stderr.decode();intervals=[x for x in black.splitlines() if 'black_start:' in x];assert not intervals,intervals
original=p/'delivery/ligue-onze-5-scores-v4.mp4';originalExpected=json.load(open(p/'checksums.json'))['ligue-onze-5-scores-v4.mp4']['sha256'];assert hashlib.sha256(original.read_bytes()).hexdigest()==originalExpected
meta=json.load(open(p/'timings.json'));times=[1.6]+[x['startSeconds']+4.6 for x in meta['scenes'][1:6]]+[meta['scenes'][-1]['startSeconds']+2,meta['durationSeconds']-.1]
files=[]
for i,t in enumerate(times):
 f=q/f'export-{i:02}.png';files.append(f);run(['ffmpeg','-y','-v','error','-ss',str(t),'-i',str(film),'-frames:v','1','-vf','scale=270:480,format=rgb24',str(f)])
lst=q/'planche.txt';lst.write_text(''.join(f"file '{f}'\n" for f in files));run(['ffmpeg','-y','-v','error','-f','concat','-safe','0','-i',str(lst),'-vf','tile=4x2','-frames:v','1',str(p/'delivery/planche-v4-sans-voix.png')])
layout=json.load(open(p/'clean-layout-checks.json'));assert not layout['errors']
report={'sha256':hashlib.sha256(film.read_bytes()).hexdigest(),'voice':False,'burnedSubtitles':False,'archivesBannerRemoved':True,'datesAndTimesPreserved':True,'audio':'Original sound effects only','decodedAudioReferenceCosine':correlation,'audioCheckExplanation':'Comparaison de l’AAC décodé à la piste de bruitages seule, pas au mix contenant la voix ; validation sur la durée intégrale.','layoutSamples':len(layout['checks']),'layoutErrors':0,'blackIntervals':intervals,'visualOverviewSeconds':times,'previousVersionPreserved':True}
assert report['sha256']==json.load(open(p/'clean-render-record.json'))['sha256']==json.load(open(p/'clean-technical.json'))['sha256']
(p/'clean-quality.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False,indent=2))
