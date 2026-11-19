"""Extract inspection material from the delivered MP4, not from source stills."""
import subprocess,json,re
from pathlib import Path
root=Path(__file__).resolve().parents[2]; p=root/'productions/trois-pronostics'; q=p/'quality'; mp4=p/'delivery/ligue-onze-3-pronostics.mp4'
def run(args): return subprocess.run(args,cwd=root,check=True,capture_output=True,text=True)
font='public/productions/pronos-17-nov/fonts/Inter.ttf'
frames=[]
for i,t in enumerate([1.5,4.8,9.8,14.8,21.5,25.5]):
 dest=q/f'export-{i}.png';frames.append(dest)
 run(['ffmpeg','-y','-v','error','-ss',str(t),'-i',str(mp4),'-frames:v','1','-vf',f"scale=324:576,drawtext=fontfile={font}:text='{t:.1f} s':x=10:y=546:fontsize=20:fontcolor=white:box=1:boxcolor=black@0.8:boxborderw=5",str(dest)])
listing=q/'export-six.txt';listing.write_text(''.join(f"file '{f}'\n" for f in frames))
run(['ffmpeg','-y','-v','error','-f','concat','-safe','0','-i',str(listing),'-vf','tile=3x2','-frames:v','1',str(p/'delivery/six-moments.png')])
for i,t in enumerate([2.7,7.7,12.7,17.7,23.7]):
 run(['ffmpeg','-y','-v','error','-ss',str(t),'-i',str(mp4),'-t','2.1','-an','-vf','scale=432:768','-c:v','libx264','-pix_fmt','yuv420p',str(q/f'mouvement-{i+1}.mp4')])
 # 12 images over 1.6 seconds, useful for comparing entrances and score holds.
 run(['ffmpeg','-y','-v','error','-ss',str(t),'-i',str(mp4),'-t','1.6','-vf',f"fps=7.5,scale=162:288,drawtext=fontfile={font}:text='%{{n}}':x=5:y=265:fontsize=15:fontcolor=white:box=1:boxcolor=black@0.8,tile=6x2",'-frames:v','1',str(q/f'chronologie-{i+1}.png')])
a=run(['ffmpeg','-hide_banner','-i',str(mp4),'-vn','-af','astats=metadata=1:reset=0','-f','null','-'])
text=a.stderr;(q/'audio-stats.txt').write_text(text)
peaks=re.findall(r'Peak level dB:\s*([-\d.]+)',text); rms=re.findall(r'RMS level dB:\s*([-\d.]+)',text)
report={'peakDbFS':float(peaks[-1]),'overallRmsDbFS':float(rms[-1]),'noDigitalClipping':float(peaks[-1])<0,'inspection':'FFmpeg astats sur AAC décodé ; aucune écoute humaine analytique revendiquée.','voice':False,'music':False,'sfxEventsSeconds':[.12,.85,3.75,8.75,13.75,18.2,21,24.15],'syncBasis':'Événements de synthèse déterministes aux instants des révélations ; pas d’alignement vocal.'}
(p/'audio-checks.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False));print('Planche MP4 et cinq extraits/chronologies préparés')
