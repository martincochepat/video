"""Assembler les livrables contrôlés, sans cache ni dépendances."""
import hashlib
import json
import pathlib
import re
import sys
import zipfile

root = pathlib.Path(__file__).resolve().parents[1]
production_id = sys.argv[1] if len(sys.argv) > 1 else ''
if not re.fullmatch(r'[a-z0-9][a-z0-9-]{0,60}', production_id):
    raise SystemExit('Usage : python3 scripts/package-delivery.py ID [preview|final]')
mode = sys.argv[2] if len(sys.argv) > 2 else 'final'
if mode not in ('preview', 'final'):
    raise SystemExit('Mode invalide')
p = root / 'productions' / production_id
load = lambda f: json.loads(f.read_text())
review = load(p / 'quality-review.json')
record = load(p / 'exports' / f'{mode}.json')
qa = load(p / 'quality' / mode / 'technical.json')
video = p / 'exports' / f'{mode}.mp4'
digest = hashlib.sha256(video.read_bytes()).hexdigest()
if review.get('status') != 'pass' or any(review.get(k, {}).get('status') != 'pass' for k in ('understanding', 'composition', 'sceneVariety', 'motion', 'pacing', 'consistency')):
    raise SystemExit('Examen visuel incomplet')
if review.get(mode + 'Sha256') != digest or record['sha256'] != digest or qa['sha256'] != digest or qa['signature'] != record['signature'] or qa['errors']:
    raise SystemExit('Livrable ou contrôle obsolète/incohérent')
output = p / 'exports' / f'{production_id}-{mode}-delivery.zip'
with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as archive:
    for file in p.iterdir():
        if file.is_file():
            archive.write(file, 'production/' + file.name)
    for file in [video, p / 'exports' / f'{mode}.json']:
        archive.write(file, 'exports/' + file.name)
    captions = p / 'exports' / 'captions.srt'
    if captions.exists():
        archive.write(captions, 'exports/captions.srt')
    for file in (p / 'quality' / mode).rglob('*'):
        if file.is_file() and file.name != 'frames.txt':
            archive.write(file, 'quality/' + str(file.relative_to(p / 'quality' / mode)))
    for base in ('src', 'profiles', 'public/fonts', 'references', 'scripts', '.agents/skills'):
        for file in (root / base).rglob('*'):
            if file.is_file():
                archive.write(file, 'project/' + str(file.relative_to(root)))
    for name in ('package.json', 'package-lock.json', 'tsconfig.json', 'remotion.config.ts', '.npmrc', '.gitignore', 'README.md', 'AGENTS.md', 'skills-lock.json'):
        archive.write(root / name, 'project/' + name)
    # Root.tsx importe le manifeste de démo, conserver son chemin exact.
    for ident in {production_id, 'espace'}:
        for file in (root / 'productions' / ident).iterdir():
            if file.is_file():
                archive.write(file, 'project/productions/' + ident + '/' + file.name)
    manifest = load(p / 'manifest.json')
    for media in manifest.get('assets', []) + ([manifest['voice']] if manifest.get('voice') else []):
        file = (root / 'public' / media['src']).resolve()
        if not file.is_relative_to(root / 'public'):
            raise SystemExit('Média hors public')
        archive.write(file, 'project/public/' + media['src'])
with zipfile.ZipFile(output) as archive:
    if archive.testzip() is not None:
        raise SystemExit('Archive invalide')
print(output)
