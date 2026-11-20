"""Archive reproductible de reprise ; aucune dépendance/cache, aucun secret."""
from pathlib import Path
import zipfile,json,hashlib
p=Path(__file__).resolve().parent;r=p.parents[1];review=json.loads((p/'quality-review.json').read_text());v=p/'delivery/ligue-onze-effacer-une-legende.mp4'
assert review['status']=='pass' and review['finalSha256']==hashlib.sha256(v.read_bytes()).hexdigest()
out=p/'delivery/effacer-legende-projet.zip'
files=set()
for base in ['src','public','profiles','scripts','.agents/skills','references']:
 for f in (r/base).rglob('*'):
  if f.is_file() and not any(x in f.parts for x in ['__pycache__','node_modules','media']):files.add(f)
for f in (r/'productions').rglob('*'):
 rel=f.relative_to(r/'productions')
 if f.is_file() and not any(x in rel.parts for x in ['quality','cache','exports','delivery','research','__pycache__']):files.add(f)
for n in ['package.json','package-lock.json','tsconfig.json','remotion.config.ts','.npmrc','.gitignore','.gitattributes','README.md','AGENTS.md','skills-lock.json']:
 f=r/n
 if f.exists():files.add(f)
for f in (p/'delivery').iterdir():
 if f.is_file() and f.suffix!='.zip':files.add(f)
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
 for f in sorted(files):z.write(f,'video/'+str(f.relative_to(r)))
with zipfile.ZipFile(out) as z:assert z.testzip() is None
assert out.stat().st_size<100*1024**2
print(str(out),out.stat().st_size)
