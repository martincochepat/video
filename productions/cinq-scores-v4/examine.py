"""Inspect the actual V4 export: keyframes, movement windows, decode, black frames, audio."""
from pathlib import Path
import subprocess,json,re
root=Path(__file__).resolve().parents[2];p=root/'productions/cinq-scores-v4';q=p/'quality';q.mkdir(exist_ok=True);d=p/'delivery';film=d/'ligue-onze-5-scores-v4.mp4';timing=json.load(open(p/'timings.json'));font=root/'public/productions/cinq-scores-v4/brand-body.woff2'
def run(a):return subprocess.run(a,cwd=root,capture_output=True,text=True,check=True)
frames=[];moments=[1.6]+[s['startSeconds']+4.6 for s in timing['scenes'][1:6]]+[timing['scenes'][-1]['startSeconds']+2,timing['durationSeconds']-.15]
for i,t in enumerate(moments):
 dest=q/f'export-{i:02}.png';frames.append(dest)
 run(['ffmpeg','-y','-v','error','-ss',str(t),'-i',str(film),'-frames:v','1','-vf',f"scale=270:480,format=rgb24,drawtext=fontfile={font}:text='{t:.2f} s':x=8:y=452:fontsize=18:fontcolor=white:box=1:boxcolor=black@0.8",str(dest)])
lst=q/'overview.txt';lst.write_text(''.join(f"file '{f}'\n" for f in frames));run(['ffmpeg','-y','-v','error','-f','concat','-safe','0','-i',str(lst),'-vf','tile=4x2','-frames:v','1',str(d/'planche-v4.png')])
# At 15fps the strips sample alternating frames of the real 30fps video.
for i,s in enumerate(timing['scenes'][1:]):
 start=max(0,s['startSeconds']-.2)
 run(['ffmpeg','-y','-v','error','-ss',str(start),'-i',str(film),'-t','1.2','-vf','fps=15,scale=162:288,format=rgb24,tile=6x3','-frames:v','1',str(q/f'raccord-{i+1}.png')])
 run(['ffmpeg','-y','-v','error','-ss',str(start),'-i',str(film),'-t','2.5','-vf','scale=432:768','-c:v','libx264','-crf','20','-c:a','aac',str(q/f'raccord-{i+1}.mp4')])
for i in [0,1,3]:
 s=timing['scenes'][i+1];run(['ffmpeg','-y','-v','error','-ss',str(s['startSeconds']+2.9),'-i',str(film),'-t','1.2','-vf','fps=15,scale=162:288,format=rgb24,tile=6x3','-frames:v','1',str(q/f'cadrage-{i+1}.png')])
a=run(['ffmpeg','-hide_banner','-i',str(film),'-vn','-af','astats=metadata=1:reset=0','-f','null','-']).stderr
peak=float(re.findall(r'Peak level dB:\s*([-\d.]+)',a)[-1]);rms=float(re.findall(r'RMS level dB:\s*([-\d.]+)',a)[-1]);(q/'audio-stats.txt').write_text(a)
b=run(['ffmpeg','-hide_banner','-i',str(film),'-an','-vf','blackdetect=d=0.02:pix_th=0.08:pic_th=0.985','-f','null','-']).stderr
black=[line for line in b.splitlines() if 'black_start:' in line];(q/'blackdetect.txt').write_text(b)
report={'audio':{'peakDbFS':peak,'rmsDbFS':rms,'noClipping':peak<0,'voice':'local-working-voice','timing':'WAV utterance boundaries measured from actual PCM samples; no word-level alignment claim','listeningAnalyticalReview':False},'blackDetect':{'intervals':black,'minimumSeconds':.02,'pixelThreshold':.08,'pictureRatio':.985},'keyframesSeconds':moments,'movementWindows':{'transitions':6,'samplesPerSecond':15,'midSceneReframings':3,'realTimePlaybackCertified':False}}
(p/'examination.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False,indent=2));assert peak<0;assert not black
