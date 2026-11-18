"""Assembler après l'examen du dernier rendu, pas avant."""
from pathlib import Path
import hashlib,json,subprocess,shutil,zipfile
p=Path(__file__).resolve().parent;q=json.loads((p/'quality/final/technical.json').read_text());video=p/'exports/final.mp4';sha=hashlib.sha256(video.read_bytes()).hexdigest();assert sha==q['sha256'] and not q['errors']
review={'status':'pass','scope':'Contrôles techniques et examen visuel échantillonné de la première version complète, sans validation perceptive à vitesse réelle.','finalSha256':sha,'publicationReady':False,
'understanding':{'status':'pass','evidence':'Accroche110 puis retour7 ; France1–0Italie après la Panenka, puis1–1 après la tête. Le carton précède le tunnel. Résultat du match et séance de tirs au but distingués à37,5s. Question ouverte sans dialogue ou contrefactuel inventé.'},
'composition':{'status':'pass','evidence':'Neuf moments examinés à360px ; titres droits et séparés du mouvement. Stade plein cadre, ballon volumétrique, trophée sculptural et perspective du tunnel.','corrections':['Mention de reconstitution retirée des plans de ballon pour éviter le croisement.','Couche sombre pleine derrière les titres lors du ballon au premier plan.','Base du trophée maintenue près du socle pendant son retrait devant la question.']},
'sceneVariety':{'status':'pass','evidence':'Objet muséal, stade de face pour penalty, axe latéral pour centre et tête, carton au premier plan, corridor en perspective, retour au trophée. Pas de panneaux rectangulaires répétés.'},
'motion':{'status':'pass','evidence':'Sept bandes chronologiques extraites des clips60fps à10images/s examinées ; continuité position/rayon/rotation testée à dix jonctions du ballon, contact sous la barre vérifié.','corrections':['Horloge : même position, taille et minute de part et d’autre du raccord à5,4s.','Trophée du tunnel révélé par le même masque que la porte, sans apparition anticipée.','Entrée et sortie du pied amorties ; mailles localisées autour des impacts, poteaux fixes.'],'limitation':'Pas de validation perceptive en lecture continue à60fps ; l’échantillonnage et les tests numériques ne la remplacent pas.'},
'pacing':{'status':'pass','evidence':'45s provisoires sans voix. Score1–0 installé vers9,5s et1–1 vers18,6s ; plusieurs secondes de lecture. Carton tenu avant le tunnel. Question39,5–42,5s puis signature42,5–45s, stable après43,15s.'},
'consistency':{'status':'pass','evidence':'Palette, Barlow Condensed et Inter conservés ; deux données de buts et expulsion recoupées. Figures anonymes de dos, aucune photo/portrait/voix/logo inventé. Les trois vidéos de pronostics conservent leurs empreintes.'},
'limitations':['Voix absente, aucun alignement vocal réel validé.','Logo officiel absent comme fichier, emplacement laissé prêt.','Skill ligue-onze-pronos introuvable après recherche locale et catalogues ; huit skills existants et méthode V3 utilisés.','FIFA et Wikipedia bloqués par proxy403 ; chiffres contrôlés dans les bases Fjelstul et OpenFootball, source primaire non consultée.','Panenka et fin de carrière : contexte du brief et connaissance historique, sans nouvelle consultation directe de source primaire.','Stade, ballon, trophée et silhouettes sont des illustrations symboliques ; aucune prétention de reproduction documentaire ou architecturale exacte.','Lecture mobile sur réduction360px, pas sur téléphone physique ; clips échantillonnés, pas de validation en temps réel.']}
(p/'quality-review.json').write_text(json.dumps(review,ensure_ascii=False,indent=2)+'\n')
report=f'''# Zidane 2006 — première version complète

45secondes, 1080×1920, 60images/s, H.264 yuv420p, BT.709, faststart.2700images décodées. Sans audio : aucune voix fournie, aucun service payant ni musique utilisée. Les minutages sont éditoriaux, pas une synchronisation vocale mesurée.

## Construction

Production séparée dans src/productions/zidane/, compositionStudio Zidane2006. Méthode et charte de la V3 conservées ; composants d'enveloppe, moteur, polices et chaîne de contrôle existants réutilisés. Aucune modification des compositions de pronostics ni nouveau pack. Le skill ligue-onze-pronos demandé est absent après recherche repo, emplacements configurés et catalogues cloud/executor ; le langage visuel a été repris des fichiers de production V3.

Stade nocturne à plusieurs plans, trophée métallique illustré, cadran à110 puis retour7, ballon dont les panneaux sont projetés sur une sphère, filet détaillé et réaction locale, centre/tête symbolique, carton puis masque de porte et tunnel. Silhouettes anonymes de dos, sans visage de Zidane ou Materazzi fabriqué. Toutes les illustrations sont des reconstitutions graphiques signalées à l'écran. Aucune archive ou photo historique sans droit utilisé.

## Corrections après premier rendu

Le cadran garde sa position, sa taille et sa minute au raccord. Le trophée du tunnel apparaît à travers le masque de la porte. La couche des titres protège leur contraste quand le ballon traverse le premier plan. La mention de reconstitution ne traverse plus le ballon ; le pied entre et sort progressivement. Le trophée conserve sa relation au socle devant la question. Ces corrections ont été suivies d'un deuxième rendu intégral et de nouveaux contrôles.

## Contrôles effectués

TypeScript et neuf tests existants de l'atelier réussis. Dix jonctions de position/rayon/rotation du ballon vérifiées numériquement, immobilité de rotation pendant les maintiens, contact sous la barre et continuité du cadran vérifiés. Adaptateur des repères audio testé sur une correspondance de temps, sans prétendre tester une vraie voix.

{len(q['checks'])} images contrôlées par la sonde de polices et de zones sûres, sans erreur. Les assertions de livraison vérifient les textes, les scores et l'empreinte MP4/rapport/rendu. Le MP4 entier est décodé ; la profondeur couleur, le format, le nombre d'images et la position moov avant mdat sont contrôlés. Neuf moments extraits à360px et sept extraits de mouvement à60fps livrés, examinés en bandes chronologiques à10images/s. Les trois MP4 de pronostics précédents ont leurs empreintes originales.

Cela ne prouve pas la fluidité perceptive à vitesse réelle ni toutes les intersections sur chacune des2700images. Les boîtes HTML sont contrôlées automatiquement, les SVG par les images échantillonnées. Pas de test sur téléphone physique ni d'écoute/synchronisation vocale réalisée.

## Faits et droits

Date9juillet2006 et lieuBerlin, buts de Zidane7e(penalty) et Materazzi19e,1–1 après prolongation, Italie gagnante5–3 aux tirs au but : recoupés dans OpenFootball(CC0) et Fjelstul World Cup Database(CC-BY-SA4.0). Expulsion110e vérifiée dans bookings.csv, ligneB-1890. Les extraits et attributions sont joints dans research/. Accès direct FIFA et Wikipedia refusé par proxyHTTP CONNECT403. Panenka et dernière apparition professionnelle sont le contexte historique fourni dans le brief ; pas de nouvelle consultation de source primaire pour ces deux points. Aucun dialogue inventé, aucune affirmation que la France aurait nécessairement gagné sans l'expulsion. L'accroche10minutes représente le repère110e→120e, pas un chronométrage documentaire de la sortie.

SVG originaux livrés avec le code ; aucune image IA. Barlow Condensed et Inter : licencesOFL jointes. Le fichier du logo officiel reste absent : la signature contient la promesse et ligueonze.fr, sans logo de remplacement. La voix reste à importer et à recaler sur les mots réellement prononcés via storyAlignment ; la durée pourra alors changer. Les instructions et le normaliseur préservent une future pisteAAC48kHz.

Cette première version complète conserve donc deux réserves de livraison : logo original et voix à fournir. Aucune publication d'environnement ou diffusion sur réseau social.

Empreinte vidéo : `{sha}`.
'''
for a,b in [('45secondes','45 secondes'),('60images/s','60 images/s'),('2700images','2700 images'),('à360px','à 360 px'),('à60fps','à 60 fps'),('à10images/s','à 10 images/s'),('Studio Zidane2006','Studio Zidane2006'),('Date9juillet2006 et lieuBerlin','Date du 9 juillet 2006 et lieu Berlin'),('proxyHTTP CONNECT403','proxy HTTP CONNECT403')]:report=report.replace(a,b)
for a,b in [('faststart.2700','faststart. 2700'),('compositionStudio','composition Studio'),('à110 puis retour7','à 110 puis retour à 7'),('des2700','des 2700'),('Zidane7e(penalty) et Materazzi19e,1–1','Zidane à la 7e (penalty) et Materazzi à la 19e ; 1–1'),('gagnante5–3','gagnante 5–3'),('OpenFootball(CC0)','OpenFootball (CC0)'),('Database(CC-BY-SA4.0)','Database (CC-BY-SA 4.0)'),('Expulsion110e','Expulsion à la 110e'),('ligneB-1890','ligne B-1890'),('CONNECT403','CONNECT 403'),('accroche10minutes','accroche des dix minutes'),('repère110e→120e','repère 110e → 120e'),('licencesOFL','licences OFL'),('pisteAAC48kHz','piste AAC 48 kHz')]:report=report.replace(a,b)
(p/'verification.md').write_text(report)
d=p/'delivery';d.mkdir(exist_ok=True)
for source,target in [('final.mp4','zidane-2006-v1.mp4'),('planche-scenes.png','planche-scenes.png')]+[(x+'.mp4',x+'.mp4') for x in ['trophee-horloge','panenka','ballon-raccord','egalisation','carton-tunnel','retour-trophee','signature']]:shutil.copy2(p/'exports'/source,d/target)
shutil.copy2(p/'verification.md',d/'verification.md');shutil.copy2(p/'quality/final/technical.json',d/'technical.json')
subprocess.run(['python3','scripts/package-delivery.py','zidane-2006','final'],check=True)
archive=p/'exports/zidane-2006-final-delivery.zip'
with zipfile.ZipFile(archive,'a',zipfile.ZIP_DEFLATED) as z:
 existing=set(z.namelist())
 for f in (p/'research').rglob('*'):
  if f.is_file():
   name='project/productions/zidane-2006/research/'+f.name
   if name not in existing:z.write(f,name)
 assert z.testzip() is None
with zipfile.ZipFile(archive) as full,zipfile.ZipFile(d/'zidane-2006-sources.zip','w',zipfile.ZIP_DEFLATED) as lean:
 for item in full.infolist():
  if item.filename.startswith('project/'):lean.writestr(item,full.read(item.filename))
 lean.write(p/'quality/final/technical.json','technical.json')
with zipfile.ZipFile(d/'zidane-2006-sources.zip') as z:assert z.testzip() is None and len(z.namelist())==len(set(z.namelist()))
(d/'checksums.json').write_text(json.dumps({f.name:hashlib.sha256(f.read_bytes()).hexdigest() for f in sorted(d.iterdir()) if f.is_file() and f.name!='checksums.json'},indent=2)+'\n')
print('Livraison assemblée : MP4, planche, sept clips60fps, sources et droits, empreintes.')
