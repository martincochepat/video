# Rapport de V1 — 24 secondes

## Vérifié réellement

- MP4 H.264, 1080 × 1920, 60 images/s, 1 440 images, exactement 24 secondes.
- yuv420p en plage TV et moov avant mdat (faststart), contrôlés après normalisation FFmpeg.
- Décodage intégral FFmpeg sans erreur. Aucune piste audio.
- TypeScript et les 9 tests existants passent.
- 50 images de contrôle : aucune erreur sur les boîtes des textes principaux, polices locales demandées et médias balisés.
- Six scènes observées à 360 pixels de large : image zéro, 2,8 ; 7,1 ; 11,8 ; 17,2 ; 21,5 secondes.
- Image zéro : accroche complète, opposition Danemark/Norvège et ballon visibles ; test numérique confirmant son déplacement dès la première image.
- 0–2 observé à 2,8 secondes ; encore présent à l'image 299 (4,983 s), avant le raccord Pologne à 5 s.
- Les quatre scores sont présents à 21 secondes et le ballon se stabilise pendant la lecture finale.
- Raccords de position et rayon du ballon contrôlés aux quatre passages ; rotation calculée à partir de la distance parcourue, sans rotation permanente aux arrêts.
- 20 images exactes juste avant les débuts et après les fins des cinq transitions extraites du MP4 ; cinq extraits examinés sous forme de séquences d'images à 8 fps.
- Drapeaux : Pays de Galles, Portugal, Pologne, Suède, Ukraine, Géorgie, Danemark et Norvège ; sources SVG et licence conservées.
- Versions précédentes conservées : leurs empreintes MP4 n'ont pas changé.

## Corrigé après contrôle

Chargement des polices rendu explicite et contrôle limité aux fontes réellement utilisées ; interligne adapté à Barlow Condensed ; scores recentrés ; rotation et taille du ballon stabilisées aux raccords ; transition Pologne repoussée à 5,00 s pour garder le premier prono stable jusqu'au bout des cinq secondes prioritaires. Les autres départs de transition sont à 9,5, 14 et 20 s.

## Réserves bloquantes pour publication

**Rencontres et horaire non confirmés.** L'accès HTTPS à la page officielle UEFA a été refusé par le proxy (CONNECT HTTP 403). Autoriser www.uefa.com ou fournir une source primaire vérifiable est nécessaire pour terminer cette vérification. Aucune date ou heure n'est présentée comme établie dans la vidéo. Aucun changement de score éditorial n'a été effectué.

**Logo non intégré.** L'image fournie est visible dans le chat, mais son fichier n'est pas exposé au moteur. Une URL HTTPS directe du fichier officiel a été demandée. Aucun faux logo ou tracé de remplacement n'a été créé. La synthèse réserve son emplacement.

**Version silencieuse.** Aucun bruitage validé à l'écoute n'était disponible. Pas de voix, de musique commerciale ou d'API payante. Je ne prétends pas avoir écouté une piste inexistante.

L'examen des mouvements repose sur des images échantillonnées, pas sur une lecture temps réel vérifiée. La sonde HTML ne prouve pas l'absence de tout recouvrement SVG à chaque instant. Aucune donnée de publication ou de rétention n'est disponible ; la rétention n'est pas validée.

Les références des médias et licences sont dans media.json. Les sources sont modifiables dans src/productions/Forecast.tsx ; le moteur et les skills existants sont conservés. Le seul ajout au contrôle partagé permet de tester les polices de cette production au lieu d'imposer la police du premier test.
