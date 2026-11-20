"""Archive autonome de cet épisode, sans les anciens médias ni caches."""
from pathlib import Path
import json,zipfile,hashlib
p=Path(__file__).resolve().parent;r=p.parents[1];v=p/'delivery/3-pronos-21-novembre-sans-voix.mp4';review=json.loads((p/'quality-review.json').read_text());assert review['status']=='pass' and review['finalSha256']==hashlib.sha256(v.read_bytes()).hexdigest()
files=set()
for base in ['src/productions/pronos-november','public/productions/pronos-21-nov']:
 files.update(f for f in (r/base).rglob('*') if f.is_file() and '__pycache__' not in f.parts)
for x in ['src/index.ts','src/WorkshopShell.tsx','src/productions/erase-legend/Design.tsx','package.json','package-lock.json','tsconfig.json','remotion.config.ts','.npmrc']:
 f=r/x
 if f.exists():files.add(f)
for a in json.loads((p/'media.json').read_text())['assets']:files.add(r/'public'/a['src'])
for x in ['public/productions/pronos-17-nov/fonts/Barlow-OFL.txt','public/productions/cinq-scores-v4/Figtree-OFL.txt','public/productions/cinq-scores-v4/Bricolage-OFL.txt']:files.add(r/x)
for f in p.iterdir():
 if f.is_file():files.add(f)
for f in (p/'delivery').iterdir():
 if f.is_file() and f.suffix!='.zip':files.add(f)
out=p/'delivery/pronos-21-nov-projet.zip'
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
 for f in sorted(files):z.write(f,'video/'+str(f.relative_to(r)))
 z.writestr('video/src/Root.tsx',"import {Composition} from 'remotion';\nimport {NovemberPredictions} from './productions/pronos-november';\nexport const Root=()=> <Composition id=\"NovemberPredictions\" component={NovemberPredictions} durationInFrames={1050} fps={30} width={1080} height={1920} defaultProps={{qa:false}}/>;\n")
 z.writestr('video/REPRISE.txt','Archive dédiée à cet épisode. La racine Remotion enregistre uniquement NovemberPredictions. Les autres productions sont préservées dans Git, sans dupliquer leurs médias ici.\nInstaller : npm ci --no-audit --no-fund\nVérifier : npm run typecheck\nRendre : node productions/pronos-21-nov/render.mjs render\nChromium /usr/bin/chromium, FFmpeg nécessaires. Pour les planches et contrôles Python : NumPy et Pillow.\nNe pas utiliser npm run render (commande historique StudioReady).\nVersion sans voix, SRT provisoire à recaler sur le futur enregistrement.\n')
with zipfile.ZipFile(out) as z:assert z.testzip() is None
print(out,out.stat().st_size)
