from pathlib import Path
import json,hashlib
p=Path(__file__).resolve().parent;q=json.loads((p/'quality/final/technical.json').read_text());record=json.loads((p/'exports/final.json').read_text());sha=hashlib.sha256((p/'exports/final.mp4').read_bytes()).hexdigest()
assert sha==q['sha256']==record['sha256'];assert not q['errors'];assert q['technical']['frames']==2700 and q['technical']['fps']==60 and not q['technical']['audio'];assert all(c['fontLoaded'] and not c['errors'] for c in q['checks'])
c={x['frame']:[b['text'] for b in x['boxes']] for x in q['checks']}
assert any('10 MINUTES.' in x for x in c[0]);assert '9 JUILLET 2006 · BERLIN' in c[0]
assert '1' in c[588] and '0' in c[588] and 'FRANCE' in c[588] and 'ITALIE' in c[588]
assert c[1116].count('1')==2
assert any('110e MINUTE.' in x for x in c[1584])
assert '1–1 APRÈS PROLONGATION.' in c[2250] and 'ITALIE 5–3 FRANCE' in c[2250] and 'AUX TIRS AU BUT.' in c[2250]
assert any('CE GESTE CHANGE-T-IL' in x for x in c[2448]);assert 'ligueonze.fr' in c[2610]
facts=json.loads((p/'research/final-2006-facts.json').read_text())['records'];m=facts['matches'][0];assert m['match_date']=='2006-07-09' and m['score']=='1–1' and m['score_penalties']=='5–3'
assert {(x['family_name'],x['minute_regulation']) for x in facts['goals']}=={('Zidane','7'),('Materazzi','19')};assert facts['bookings'][0]['red_card']=='1' and facts['bookings'][0]['minute_regulation']=='110'
print(f"{len(q['checks'])} images contrôlées, polices/textes et scores conformes aux données consultées ; MP4 silencieux, empreinte cohérente.")
