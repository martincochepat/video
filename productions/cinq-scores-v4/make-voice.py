"""Local working narration. Piper/SIWIS; no paid API, no definitive ElevenLabs voice."""
from pathlib import Path
import json,wave,math,array,random
from piper import PiperVoice,SynthesisConfig
root=Path(__file__).resolve().parents[2];p=root/'productions/cinq-scores-v4';audio=root/'public/productions/cinq-scores-v4/audio';audio.mkdir(parents=True,exist_ok=True)
script=[('hook',['Ces cinq scores exacts, je les assume.']),('nice',['Nice, Paris : un à trois.','Paris a gagné ses cinq derniers matchs de Ligue un.','Je le vois encore passer.']),('lille',['Lille, Lyon : deux à un.',"Lyon reste sur trois défaites à l’extérieur.","Et Lille est invaincu chez lui."]),('lens',['Lens, Toulouse : deux à zéro.','Lens a gagné trois de ses cinq derniers matchs.',"Le zéro derrière, c’est mon pari risqué."]),('monaco',['Monaco, Auxerre : trois à un.','Auxerre a encaissé dix-huit buts en cinq déplacements.','Je mise sur cette faille.']),('marseille',['Marseille, Le Mans : trois à zéro.','Marseille reste sur cinq victoires en championnat.',"Le Mans n’a plus gagné depuis cinq journées."]),('outro',['Voilà mes cinq pronos.','Lequel te paraît complètement à côté ?','Donne-moi ton score en commentaire.'])]
voice=PiperVoice.load(str(root/'.cache/piper-models/siwis.onnx'));cfg=SynthesisConfig(length_scale=.94,noise_scale=.55,noise_w_scale=.65)
rate=22050;pcm=array.array('h');segments=[];scenes=[]
def silence(seconds):pcm.extend([0]*round(seconds*rate))
for scene,texts in script:
 start=len(pcm)/rate;silence(.12 if scene!='hook' else .02)
 for j,text in enumerate(texts):
  file=audio/f'{scene}-{j}.wav'
  with wave.open(str(file),'wb') as w:voice.synthesize_wav(text,w,cfg)
  with wave.open(str(file),'rb') as w:
   assert w.getframerate()==rate and w.getsampwidth()==2 and w.getnchannels()==1
   samples=array.array('h',w.readframes(w.getnframes()))
  a=len(pcm)/rate;pcm.extend(samples);b=len(pcm)/rate
  segments.append({'text':text,'startSeconds':a,'endSeconds':b,'sceneId':scene,'timingBasis':'measured-synthesized-utterance-boundaries','src':str(file.relative_to(root/'public'))})
  silence(.08)
 minimum=2.7 if scene=='hook' else 7.8 if scene!='outro' else 7
 if len(pcm)/rate-start<minimum:silence(minimum-(len(pcm)/rate-start))
 silence((math.ceil(len(pcm)/rate*30)/30)-len(pcm)/rate)
 end=len(pcm)/rate;scenes.append({'id':scene,'startSeconds':start,'endSeconds':end});print(scene,round(end-start,2),'s',flush=True)
# Whole duration ends on a 30fps boundary. Audio samples allow precision under one frame.
duration=math.ceil(len(pcm)/rate*30)/30;silence(duration-len(pcm)/rate)
with wave.open(str(audio/'voice-work.wav'),'wb') as w:w.setframerate(rate);w.setsampwidth(2);w.setnchannels(1);w.writeframes(pcm.tobytes())
(p/'voiceover.txt').write_text('\n\n'.join(' '.join(texts) for _,texts in script)+'\n')
data={'basis':'measured-synthesized-utterance-boundaries','voiceStatus':'local-working-voice-not-ElevenLabs','fps':30,'durationSeconds':duration,'scenes':scenes,'segments':segments,'limitations':'Les frontières sont celles des WAV réellement générés ; aucun alignement mot à mot ni synchronisation ElevenLabs définitive revendiqués.'}
(p/'timings.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
def stamp(t):
 m=round(t*1000);return f'{m//3600000:02}:{m//60000%60:02}:{m//1000%60:02},{m%1000:03}'
(p/'captions.srt').write_text('\n'.join(f'{i+1}\n{stamp(s["startSeconds"])} --> {stamp(s["endSeconds"])}\n{s["text"]}\n' for i,s in enumerate(segments)))
print('TOTAL',duration,flush=True)
