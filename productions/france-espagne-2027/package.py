"""Archive autonome du film, sans fichier audio, ancien épisode ou cache."""
from pathlib import Path
import json,zipfile,hashlib
p=Path(__file__).resolve().parent;r=p.parents[1];v=p/'delivery/france-espagne-encore-eux-sans-audio.mp4';q=json.loads((p/'quality-review.json').read_text());assert q['status']=='pass' and q['finalSha256']==hashlib.sha256(v.read_bytes()).hexdigest()
files=set()
for base in ['src/productions/france-spain','public/productions/france-espagne-2027']:
 files.update(f for f in (r/base).rglob('*') if f.is_file() and '__pycache__' not in f.parts)
for n in ['src/index.ts','src/WorkshopShell.tsx','src/productions/erase-legend/Design.tsx','package.json','package-lock.json','tsconfig.json','remotion.config.ts','.npmrc']:
 f=r/n
 if f.exists():files.add(f)
for a in json.loads((p/'media.json').read_text())['assets']:files.add(r/'public'/a['src'])
for n in ['public/productions/pronos-17-nov/fonts/Barlow-OFL.txt','public/productions/cinq-scores-v4/Figtree-OFL.txt','public/productions/cinq-scores-v4/Bricolage-OFL.txt']:files.add(r/n)
files.update(f for f in p.iterdir() if f.is_file())
files.update(f for f in (p/'delivery').rglob('*') if f.is_file() and f.suffix!='.zip')
assert not any(f.suffix.lower() in ['.wav','.mp3','.aac','.m4a','.ogg','.srt'] for f in files)
out=p/'delivery/france-espagne-projet.zip'
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
 for f in sorted(files):z.write(f,'video/'+str(f.relative_to(r)))
 z.writestr('video/src/Root.tsx',"import {Composition} from 'remotion';\nimport {FranceSpainNews} from './productions/france-spain';\nexport const Root=()=> <Composition id=\"FranceSpainNews\" component={FranceSpainNews} durationInFrames={2700} fps={30} width={1080} height={1920} defaultProps={{qa:false}}/>;\n")
 z.writestr('video/REPRISE.txt','Archive dédiée à FranceSpainNews. Les autres productions sont préservées dans Git.\nInstallation : npm ci --no-audit --no-fund\nVérifier : npm run typecheck\nRendre : node productions/france-espagne-2027/render.mjs render\nExaminer : python productions/france-espagne-2027/verify-episode.py (Pillow nécessaire)\nChromium /usr/bin/chromium, FFmpeg et FFprobe requis.\nNe pas utiliser npm run render, commande historique StudioReady.\nFilm entièrement silencieux : aucun fichier audio ou SRT dans cette archive.\nCrédits : productions/france-espagne-2027/credits.md, à conserver avec la diffusion.\n')
with zipfile.ZipFile(out) as z:assert z.testzip() is None
assert out.stat().st_size<100*1024**2;print(out,out.stat().st_size)
