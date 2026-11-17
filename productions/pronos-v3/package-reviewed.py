"""À exécuter seulement après examen des images et extraits du rendu final courant."""
from pathlib import Path
import hashlib,json,shutil,subprocess
p=Path(__file__).resolve().parent;q=json.loads((p/'quality/final/technical.json').read_text());video=p/'exports/final.mp4';sha=hashlib.sha256(video.read_bytes()).hexdigest();assert sha==q['sha256'] and not q['errors']
review={'status':'pass','scope':'Examen visuel échantillonné et technique ; réserves éditoriales maintenues, non prêt pour publication.','publicationReady':False,'reviewer':'Codex — images et bandes chronologiques, pas de lecture perceptive à vitesse réelle','finalSha256':sha,
'understanding':{'status':'pass','evidence':'0 s : 4 MATCHS intégralement lisible, ballon engagé. 1,65 s : accroche complète, sans les scores. 3,70 s : premier pronostic. Les scores sont identifiés comme MES PRONOS.'},
'composition':{'status':'pass','evidence':'Sept plans examinés à 360px. À 13 s, 1–0 dégagé au-dessus du filet et des poteaux. À 23,5 s, quatre lignes et question en citron, instruction distincte.','corrections':['Interligne de 4 MATCHS augmenté après un débordement détecté.','4 SCORES EXACTS réduit à 114px pour une ligne.','Mentions secondaires balisées à 40px.']},
'sceneVariety':{'status':'pass','evidence':'V2 conservée : terrain aérien, crampons à deux profondeurs, filet occupant le cadre, grands fanions ; accroche générale et signature minimaliste ajoutées.'},
'motion':{'status':'pass','evidence':'Six extraits chronologiques à 10 images/s et 24 bornes de raccords examinés, plus huit images autour des changements de titre. Continuité position/taille du ballon testée aux neuf jonctions, rotation testée aux quatre jonctions concernées. Impact local et amortissement conservés/testés.','corrections':['Retour du ballon au bord droit avant le terrain aérien au lieu d’une sortie trop précoce.','Continuité de rotation raccordée à la trajectoire existante, y compris au passage au ballon local du filet.','Titres isolés du masque de décor : changement d’un bloc, sans fragments de deux titres.'],'limitation':'Échantillonnage chronologique ; pas de validation de fluidité à vitesse réelle.'},
'pacing':{'status':'pass','evidence':'Scores installés à 3,7 / 7,8 / 12,9 / 17,2 s, maintenus plus de 1,5 s. Synthèse fixe après 21,9 s ; signature 26,5–29 s avec stabilité après 27,05 s. Pas de narration fournie : rythme éditorial, aucune synchronisation vocale déclarée.'},
'consistency':{'status':'pass','evidence':'Quatre affiches et scores inchangés dans l’ordre ; mêmes drapeaux SVG, palette et polices locales. Dernier titre harmonisé Danemark–Norvège. Orthographe ligueonze.fr vérifiée dans le texte rendu. Aucun faux logo.'},
'limitations':['Logo original non récupérable comme fichier : signature sans logo.','Affiches, compétition et horaires non certifiés : UEFA et ligueonze.fr bloqués par proxy HTTP403. Utilisateur indique les quatre rencontres ce soir.','Inspection mobile via réduction à 360 px, sans téléphone physique.','Les titres changent d’un bloc au milieu des raccords ; le décor conserve les masques.','Pas d’audio fourni, aucun bruitage dans V2 ; export silencieux, aucune synchronisation réelle effectuée.']}
(p/'quality-review.json').write_text(json.dumps(review,ensure_ascii=False,indent=2)+'\n')
(p/'verification.md').write_text(f'''# Reprise V3 — version de travail

29 secondes, 1080 × 1920, 60 images/s, H.264, yuv420p, BT.709, faststart vérifié dans les boîtes MP4. 1740 images décodées. Export silencieux, aucune voix fournie ou générée, aucun service payant.

## Changements

Nouvelle accroche « 4 MATCHS. / 4 SCORES EXACTS. / JE PRENDS LE RISQUE ! ». Le ballon révèle la deuxième phrase par un masque lié à sa position, puis revient au bord droit pour conduire vers le premier terrain. Interligne et taille ont été corrigés après contrôle de débordement. Le titre Danemark–Norvège est harmonisé ; les quatre illustrations et leurs gestes existants sont réutilisés. Synthèse remplacée par les textes demandés, suivie d'une signature de 2,5 secondes avec promesse, ligueonze.fr et soulignement citron.

Pronostics inchangés : Pays de Galles–Portugal 0–2 ; Pologne–Suède 1–2 ; Ukraine–Géorgie 1–0 ; Danemark–Norvège 2–1. Scores exacts affichés directement, sans valeurs intermédiaires. Pleine installation à 3,7 / 7,8 / 12,9 / 17,2 s ; chacun reste lisible plus de 1,5 seconde. Synthèse stable après 21,9 s, signature stable après27,05s. Minutages éditoriaux, aucune voix alignée.

## Contrôles réellement exécutés

- TypeScript et neuf tests de l'atelier réussis.
- Tests numériques : neuf jonctions position/taille du ballon, quatre jonctions de rotation, arrêt de la synthèse et de la signature ; tests existants de réaction locale du filet et amortissement avant révélation.
- {len(q['checks'])} images contrôlées automatiquement dans le rendu courant : polices, zones sûres et boîtes HTML balisées ; aucune erreur rapportée. Assertions des textes et scores, ordre de synthèse, absence de l'ancien titre et adresse.
- Sept plans extraits du MP4 et examinés à 360 px. Six extraits de mouvement à 60 fps fournis, examinés sous forme de bandes chronologiques à 10 images/s. Vingt-quatre images aux bornes des transitions et huit images autour des changements de titre extraites du MP4 courant et examinées. Corrections du retour du ballon, du raccord de rotation et de la séparation des titres suivies de nouveaux rendus complets.
- Empreintes MP4/rapport/rendu concordantes. V1 et V2 livrées précédemment conservées, empreintes SHA256 vérifiées. Le composant V2 reçoit uniquement une option de titre utilisée par V3 ; comportement V2 par défaut préservé.

## Limites

Le contrôle perceptif de fluidité à vitesse réelle n'a pas été effectué ; les bandes et tests numériques ne le remplacent pas. Les 1740 images sont décodées automatiquement, pas examinées manuellement une à une. Les contrôles HTML ne prouvent pas toutes les intersections SVG. Le contrôle mobile est une prévisualisation réduite, pas un essai sur téléphone physique. Les titres changent d’un bloc au milieu des raccords ; les masques restent sur le décor. Les éléments secondaires sortants peuvent être partiellement masqués pendant ce passage.

L'utilisateur précise les quatre rencontres ce soir, le 17 novembre 2026. Aucune compétition ni heure confirmée : tentatives réelles UEFA et ligueonze.fr refusées par le proxy, erreur CONNECT 403. Pour vérifier, accès HTTPS à www.uefa.com et à ligueonze.fr nécessaire, ainsi qu'une compétition/source précisée. Aucune affiche modifiée ni horaire inventé. « Demain » est conservé selon la consigne.

Le logo officiel est visible dans la conversation mais son fichier n'est pas fourni aux outils ; l'utilisateur n'a pas d'URL. Il manque donc à la signature. Aucun tracé ou remplacement inventé ; emplacement prêt dans le code via logoSrc. Les polices BarlowCondensed et Inter sont conservées ; correspondance avec le site non certifiée, accès au site refusé. La vidéo reste une version de travail à ces deux réserves. Aucune publication d'environnement, réseau social ou campagne.

Empreinte vidéo : `{sha}`.
''')
d=p/'delivery';d.mkdir(exist_ok=True)
for src,dest in [('final.mp4','ligue-onze-pronos-v3.mp4'),('planche-scenes.png','planche-scenes.png'),('transition-ends.png','transition-ends.png'),('transition-ends.json','transition-ends.json'),('titres-raccords.png','titres-raccords.png'),('titres-raccords.json','titres-raccords.json')]+[(x+'.mp4',x+'.mp4') for x in ['accroche','pologne','filet','danemark','synthese','signature']]:shutil.copy2(p/'exports'/src,d/dest)
shutil.copy2(p/'quality/final/technical.json',d/'technical.json');shutil.copy2(p/'verification.md',d/'verification.md')
subprocess.run(['python3','scripts/package-delivery.py','pronos-v3','final'],check=True)
import zipfile
with zipfile.ZipFile(p/'exports/pronos-v3-final-delivery.zip','a',zipfile.ZIP_DEFLATED) as archive:
 existing=set(archive.namelist())
 for f in p.iterdir():
  target='project/productions/pronos-v3/'+f.name
  if f.is_file() and target not in existing:archive.write(f,target)
 for f in [Path('productions/espace/manifest.json'),Path('public/productions/pronos-17-nov/flags/LICENSE.txt')]:
  target='project/'+str(f)
  if target not in existing:archive.write(f,target)
 assert archive.testzip() is None
(d/'checksums.json').write_text(json.dumps({f.name:hashlib.sha256(f.read_bytes()).hexdigest() for f in sorted(d.iterdir()) if f.is_file() and f.name!='checksums.json'},indent=2)+'\n')
print('Livraison assemblée et empreintes enregistrées.')
