"""Normaliser le MP4 final demandé sans modifier le moteur de rendu."""
import hashlib,json,pathlib,subprocess
root=pathlib.Path(__file__).resolve().parent
source=root/'exports/final.mp4';target=root/'exports/normalized.mp4'
# Le rendu Remotion peut être étiqueté full-range yuvj420p ; produire explicitement
# une livraison TV-range yuv420p et placer moov avant mdat (faststart).
current=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-of','json',str(source)]))['streams'][0]
if current.get('pix_fmt')=='yuv420p' and current.get('color_range')=='tv':
    encoding=['-c:v','copy']
else:
    input_range='full' if current.get('color_range')=='pc' or current.get('pix_fmt','').startswith('yuvj') else 'tv'
    encoding=['-vf',f'scale=in_range={input_range}:out_range=tv,format=yuv420p','-c:v','libx264','-preset','medium','-crf','18','-color_range','tv','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709']
subprocess.run(['ffmpeg','-y','-v','error','-i',str(source),'-an',*encoding,'-movflags','+faststart',str(target)],check=True)
target.replace(source)
record=root/'exports/final.json';data=json.loads(record.read_text());data['sha256']=hashlib.sha256(source.read_bytes()).hexdigest();data['deliveryNormalization']='ffmpeg limited-range yuv420p, bt709, faststart';record.write_text(json.dumps(data,indent=2)+'\n')
info=json.loads(subprocess.check_output(['ffprobe','-v','error','-count_frames','-show_streams','-show_format','-of','json',str(source)]))
v=next(s for s in info['streams'] if s['codec_type']=='video');assert v['pix_fmt']=='yuv420p';assert v['width']==1080 and v['height']==1920 and v['r_frame_rate']=='60/1' and int(v['nb_read_frames'])==1740;assert float(info['format']['duration'])==29
# Lire les boîtes ISO-BMFF pour contrôler réellement faststart.
b=source.read_bytes();at=0;boxes=[]
while at+8<=len(b):
 size=int.from_bytes(b[at:at+4],'big');kind=b[at+4:at+8].decode('ascii',errors='replace');header=8
 if size==1:size=int.from_bytes(b[at+8:at+16],'big');header=16
 if size==0:size=len(b)-at
 assert size>=header;boxes.append(kind);at+=size
assert boxes.index('moov')<boxes.index('mdat')
print('Livraison vérifiée : 29 s, 1740 images, 1080×1920, 60 fps, yuv420p, faststart. Sans audio.')
