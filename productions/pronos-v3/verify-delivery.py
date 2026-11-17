from pathlib import Path
import hashlib,json,subprocess
r=Path(__file__).resolve().parent
q=json.loads((r/'quality/final/technical.json').read_text());record=json.loads((r/'exports/final.json').read_text());video=r/'exports/final.mp4'
sha=hashlib.sha256(video.read_bytes()).hexdigest();assert q['sha256']==record['sha256']==sha;assert not q['errors'];assert q['technical']['frames']==1740 and q['technical']['fps']==60
assert all(c['fontLoaded'] and not c['errors'] for c in q['checks'])
checks={c['frame']:c for c in q['checks']}
assert '4 MATCHS.' in [b['text'] for b in checks[0]['boxes']]
assert not any(b['text'] in ['0–2','1–2','1–0','2–1'] for b in checks[0]['boxes'])
for frame,nums in [(222,['0','2']),(498,['1','2']),(780,['1','0']),(1044,['2','1'])]:
 texts=[b['text'] for b in checks[frame]['boxes']];assert all(x in texts for x in nums),(frame,texts)
texts=[b['text'] for b in checks[1326]['boxes']]
assert all(x in texts for x in ['0–2','1–2','1–0','2–1']);assert [texts.index(x) for x in ['0–2','1–2','1–0','2–1']]==sorted(texts.index(x) for x in ['0–2','1–2','1–0','2–1']);assert any('ON FAIT LES' in x for x in texts);assert 'TU CHANGES LEQUEL ?' in texts
assert not any('MON CHOIX' in b['text'] or 'MON PRONO' in b['text'] for c in q['checks'] for b in c['boxes'])
texts=[b['text'] for b in checks[1734]['boxes']];assert 'ligueonze.fr' in texts
print(f'{len(q["checks"])} contrôles de mise en page, polices, pronostics et identité textuelle vérifiés. SHA-256 cohérent.')
