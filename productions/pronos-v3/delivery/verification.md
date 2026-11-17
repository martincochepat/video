# Reprise V3 — version de travail

29 secondes, 1080 × 1920, 60 images/s, H.264, yuv420p, BT.709, faststart vérifié dans les boîtes MP4. 1740 images décodées. Export silencieux, aucune voix fournie ou générée, aucun service payant.

## Changements

Nouvelle accroche « 4 MATCHS. / 4 SCORES EXACTS. / JE PRENDS LE RISQUE ! ». Le ballon révèle la deuxième phrase par un masque lié à sa position, puis revient au bord droit pour conduire vers le premier terrain. Interligne et taille ont été corrigés après contrôle de débordement. Le titre Danemark–Norvège est harmonisé ; les quatre illustrations et leurs gestes existants sont réutilisés. Synthèse remplacée par les textes demandés, suivie d'une signature de 2,5 secondes avec promesse, ligueonze.fr et soulignement citron.

Pronostics inchangés : Pays de Galles–Portugal 0–2 ; Pologne–Suède 1–2 ; Ukraine–Géorgie 1–0 ; Danemark–Norvège 2–1. Scores exacts affichés directement, sans valeurs intermédiaires. Pleine installation à 3,7 / 7,8 / 12,9 / 17,2 s ; chacun reste lisible plus de 1,5 seconde. Synthèse stable après 21,9 s, signature stable après27,05s. Minutages éditoriaux, aucune voix alignée.

## Contrôles réellement exécutés

- TypeScript et neuf tests de l'atelier réussis.
- Tests numériques : neuf jonctions position/taille du ballon, quatre jonctions de rotation, arrêt de la synthèse et de la signature ; tests existants de réaction locale du filet et amortissement avant révélation.
- 52 images contrôlées automatiquement dans le rendu courant : polices, zones sûres et boîtes HTML balisées ; aucune erreur rapportée. Assertions des textes et scores, ordre de synthèse, absence de l'ancien titre et adresse.
- Sept plans extraits du MP4 et examinés à 360 px. Six extraits de mouvement à 60 fps fournis, examinés sous forme de bandes chronologiques à 10 images/s. Vingt-quatre images aux bornes des transitions et huit images autour des changements de titre extraites du MP4 courant et examinées. Corrections du retour du ballon, du raccord de rotation et de la séparation des titres suivies de nouveaux rendus complets.
- Empreintes MP4/rapport/rendu concordantes. V1 et V2 livrées précédemment conservées, empreintes SHA256 vérifiées. Le composant V2 reçoit uniquement une option de titre utilisée par V3 ; comportement V2 par défaut préservé.

## Limites

Le contrôle perceptif de fluidité à vitesse réelle n'a pas été effectué ; les bandes et tests numériques ne le remplacent pas. Les 1740 images sont décodées automatiquement, pas examinées manuellement une à une. Les contrôles HTML ne prouvent pas toutes les intersections SVG. Le contrôle mobile est une prévisualisation réduite, pas un essai sur téléphone physique. Les titres changent d’un bloc au milieu des raccords ; les masques restent sur le décor. Les éléments secondaires sortants peuvent être partiellement masqués pendant ce passage.

L'utilisateur précise les quatre rencontres ce soir, le 17 novembre 2026. Aucune compétition ni heure confirmée : tentatives réelles UEFA et ligueonze.fr refusées par le proxy, erreur CONNECT 403. Pour vérifier, accès HTTPS à www.uefa.com et à ligueonze.fr nécessaire, ainsi qu'une compétition/source précisée. Aucune affiche modifiée ni horaire inventé. « Demain » est conservé selon la consigne.

Le logo officiel est visible dans la conversation mais son fichier n'est pas fourni aux outils ; l'utilisateur n'a pas d'URL. Il manque donc à la signature. Aucun tracé ou remplacement inventé ; emplacement prêt dans le code via logoSrc. Les polices BarlowCondensed et Inter sont conservées ; correspondance avec le site non certifiée, accès au site refusé. La vidéo reste une version de travail à ces deux réserves. Aucune publication d'environnement, réseau social ou campagne.

Empreinte vidéo : `f946cf981b8adcc4880a63bca8e66e264cca61d319edd782c5baeba02b9c8958`.
