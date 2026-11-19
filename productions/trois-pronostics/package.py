"""Package editable project after rendering and visual review."""
from pathlib import Path
import zipfile,json,hashlib
root=Path(__file__).resolve().parents[2];p=root/'productions/trois-pronostics';d=p/'delivery'
readme='''# Sources — Ligue Onze / 3 pronostics
Version technique provisoire non publiable : données sportives non vérifiées.
Node24, Chromium /usr/bin/chromium, FFmpeg/ffprobe requis.

npm ci
npm run typecheck
python productions/trois-pronostics/make-audio.py
node productions/trois-pronostics/render.mjs render

Studio : npm run studio -- --port=3000 → ThreePredictions.
Données : productions/trois-pronostics/matches.json.
Lire production-notes.md et release-status.json avant toute utilisation.
Les sources des précédentes compositions et leurs données nécessaires au bundler
sont conservées ; leurs vidéos ne sont pas recopiées dans cette archive.
'''
items=[root/f for f in ['package.json','package-lock.json','tsconfig.json','remotion.config.ts']]
items+=list((root/'src').rglob('*'))+list((root/'public').rglob('*'))
items+=list((root/'productions').rglob('*.json'))
items+=list(p.glob('*.md'))+list(p.glob('*.txt'))+list(p.glob('*.mjs'))+list(p.glob('*.py'))
# Add JSON imports and all production data; omit prior exports, caches and QA images.
items=[f for f in set(items) if f.is_file() and f.name not in ['checksums.json','download-check.json'] and not any(x in f.relative_to(root).parts for x in ['quality','delivery','cache','exports'])]
archive=d/'sources-remotion.zip'
with zipfile.ZipFile(archive,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as z:
 z.writestr('README-SOURCES.md',readme)
 for f in sorted(items):z.write(f,str(f.relative_to(root)))
checks={f.name:{'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'bytes':f.stat().st_size} for f in sorted(d.iterdir()) if f.is_file()}
(p/'checksums.json').write_text(json.dumps(checks,indent=2)+'\n')
print(json.dumps(checks,indent=2))
