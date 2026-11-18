"""Normalisation de livraison ; conserve une future voix sans imposer 45 secondes."""
from pathlib import Path
import hashlib,json,subprocess,math
p=Path(__file__).resolve().parent;source=p/'exports/final.mp4';target=p/'exports/normalized.mp4'
def probe(file,count=False):
 return json.loads(subprocess.check_output(['ffprobe','-v','error',*(['-count_frames'] if count else []),'-show_streams','-show_format','-of','json',str(file)]))
info=probe(source);v=next(s for s in info['streams'] if s['codec_type']=='video');audio=any(s['codec_type']=='audio' for s in info['streams'])
if v.get('pix_fmt')=='yuv420p' and v.get('color_range')=='tv':encoding=['-c:v','copy']
else:
 input_range='full' if v.get('color_range')=='pc' or v.get('pix_fmt','').startswith('yuvj') else 'tv'
 encoding=['-vf',f'scale=in_range={input_range}:out_range=tv,format=yuv420p','-c:v','libx264','-preset','medium','-crf','18','-color_range','tv','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709']
subprocess.run(['ffmpeg','-y','-v','error','-i',str(source),*encoding,*(['-c:a','aac','-ar','48000','-b:a','192k'] if audio else ['-an']),'-movflags','+faststart',str(target)],check=True);target.replace(source)
m=json.loads((p/'manifest.json').read_text());info=probe(source,True);v=next(s for s in info['streams'] if s['codec_type']=='video')
assert v['pix_fmt']=='yuv420p' and v['width']==1080 and v['height']==1920 and v['r_frame_rate']=='60/1'
assert int(v['nb_read_frames'])==math.ceil(m['durationSeconds']*60)
assert abs(float(info['format']['duration'])-m['durationSeconds'])<.05
for s in info['streams']:
 if s['codec_type']=='audio':assert s['codec_name']=='aac' and s['sample_rate']=='48000'
b=source.read_bytes();at=0;boxes=[]
while at+8<=len(b):
 size=int.from_bytes(b[at:at+4],'big');kind=b[at+4:at+8].decode('ascii',errors='replace');header=8
 if size==1:size=int.from_bytes(b[at+8:at+16],'big');header=16
 if size==0:size=len(b)-at
 assert size>=header;boxes.append(kind);at+=size
assert boxes.index('moov')<boxes.index('mdat')
record=p/'exports/final.json';data=json.loads(record.read_text());data['sha256']=hashlib.sha256(b).hexdigest();data['deliveryNormalization']='H264 yuv420p TV-range, BT709, faststart, AAC48kHz si audio';record.write_text(json.dumps(data,indent=2)+'\n')
print(f"MP4 vérifié : {v['nb_read_frames']} images, {info['format']['duration']}s, 1080×1920/60fps, yuv420p et faststart ; audio={audio}.")
