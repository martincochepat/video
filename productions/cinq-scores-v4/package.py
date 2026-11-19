"""Archive the editable workshop, excluding delivery videos, caches and private reference media."""
from pathlib import Path
import json,zipfile,hashlib,subprocess
root=Path(__file__).resolve().parents[2];p=root/'productions/cinq-scores-v4';d=p/'delivery'
files=subprocess.check_output(['git','ls-files','-c','-o','--exclude-standard','-z'],cwd=root).decode().split('\0')
archive=d/'sources-v4.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
 z.writestr('README-V4.md','''# V4 Ligue Onze — sources modifiables
Node24, Chromium /usr/bin/chromium et FFmpeg/ffprobe requis.

npm ci
npm run typecheck
node productions/cinq-scores-v4/render.mjs render
node productions/cinq-scores-v4/render.mjs inspect
python productions/cinq-scores-v4/examine.py

Studio : npm run studio -- --port=3000 → FiveScores.
Les assets et le mix de travail sont déjà inclus. Aucune clé ni API payante nécessaire.
La régénération vocale locale est facultative ; voir production-notes.md.
Lire matches.json, sources.json, credits.md, voiceover.txt, captions.srt et les rapports.
Les anciennes compositions sont conservées ; leurs exports vidéo sont exclus de cette archive.
Aucun média de référence tiers ni modèle vocal lourd n’est redistribué ici.
''')
 for name in sorted(set(files)):
  if not name:continue
  f=root/name
  if not f.is_file():continue
  parts=f.relative_to(root).parts
  if any(x in parts for x in ['delivery','quality','cache','exports','__pycache__']):continue
  if f.name in ['checksums.json','download-check.json']:continue
  z.write(f,name)
 with z.open('productions/cinq-scores-v4/media.json') as f:assert json.load(f)['photos']
checks={f.name:{'bytes':f.stat().st_size,'sha256':hashlib.sha256(f.read_bytes()).hexdigest()} for f in sorted(d.iterdir()) if f.is_file()}
(p/'checksums.json').write_text(json.dumps(checks,indent=2)+'\n');print(json.dumps(checks,indent=2))
