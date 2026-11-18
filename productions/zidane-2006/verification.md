# Zidane 2006 — première version complète

45 secondes, 1080×1920, 60 images/s, H.264 yuv420p, BT.709, faststart. 2700 images décodées. Sans audio : aucune voix fournie, aucun service payant ni musique utilisée. Les minutages sont éditoriaux, pas une synchronisation vocale mesurée.

## Construction

Production séparée dans src/productions/zidane/, composition Studio Zidane2006. Méthode et charte de la V3 conservées ; composants d'enveloppe, moteur, polices et chaîne de contrôle existants réutilisés. Aucune modification des compositions de pronostics ni nouveau pack. Le skill ligue-onze-pronos demandé est absent après recherche repo, emplacements configurés et catalogues cloud/executor ; le langage visuel a été repris des fichiers de production V3.

Stade nocturne à plusieurs plans, trophée métallique illustré, cadran à 110 puis retour à 7, ballon dont les panneaux sont projetés sur une sphère, filet détaillé et réaction locale, centre/tête symbolique, carton puis masque de porte et tunnel. Silhouettes anonymes de dos, sans visage de Zidane ou Materazzi fabriqué. Toutes les illustrations sont des reconstitutions graphiques signalées à l'écran. Aucune archive ou photo historique sans droit utilisé.

## Corrections après premier rendu

Le cadran garde sa position, sa taille et sa minute au raccord. Le trophée du tunnel apparaît à travers le masque de la porte. La couche des titres protège leur contraste quand le ballon traverse le premier plan. La mention de reconstitution ne traverse plus le ballon ; le pied entre et sort progressivement. Le trophée conserve sa relation au socle devant la question. Ces corrections ont été suivies d'un deuxième rendu intégral et de nouveaux contrôles.

## Contrôles effectués

TypeScript et neuf tests existants de l'atelier réussis. Dix jonctions de position/rayon/rotation du ballon vérifiées numériquement, immobilité de rotation pendant les maintiens, contact sous la barre et continuité du cadran vérifiés. Adaptateur des repères audio testé sur une correspondance de temps, sans prétendre tester une vraie voix.

63 images contrôlées par la sonde de polices et de zones sûres, sans erreur. Les assertions de livraison vérifient les textes, les scores et l'empreinte MP4/rapport/rendu. Le MP4 entier est décodé ; la profondeur couleur, le format, le nombre d'images et la position moov avant mdat sont contrôlés. Neuf moments extraits à 360 px et sept extraits de mouvement à 60 fps livrés, examinés en bandes chronologiques à 10 images/s. Les trois MP4 de pronostics précédents ont leurs empreintes originales.

Cela ne prouve pas la fluidité perceptive à vitesse réelle ni toutes les intersections sur chacune des 2700 images. Les boîtes HTML sont contrôlées automatiquement, les SVG par les images échantillonnées. Pas de test sur téléphone physique ni d'écoute/synchronisation vocale réalisée.

## Faits et droits

Date du 9 juillet 2006 et lieu Berlin, buts de Zidane à la 7e (penalty) et Materazzi à la 19e ; 1–1 après prolongation, Italie gagnante 5–3 aux tirs au but : recoupés dans OpenFootball (CC0) et Fjelstul World Cup Database (CC-BY-SA 4.0). Expulsion à la 110e vérifiée dans bookings.csv, ligne B-1890. Les extraits et attributions sont joints dans research/. Accès direct FIFA et Wikipedia refusé par proxy HTTP CONNECT 403. Panenka et dernière apparition professionnelle sont le contexte historique fourni dans le brief ; pas de nouvelle consultation de source primaire pour ces deux points. Aucun dialogue inventé, aucune affirmation que la France aurait nécessairement gagné sans l'expulsion. L'accroche des dix minutes représente le repère 110e → 120e, pas un chronométrage documentaire de la sortie.

SVG originaux livrés avec le code ; aucune image IA. Barlow Condensed et Inter : licences OFL jointes. Le fichier du logo officiel reste absent : la signature contient la promesse et ligueonze.fr, sans logo de remplacement. La voix reste à importer et à recaler sur les mots réellement prononcés via storyAlignment ; la durée pourra alors changer. Les instructions et le normaliseur préservent une future piste AAC 48 kHz.

Cette première version complète conserve donc deux réserves de livraison : logo original et voix à fournir. Aucune publication d'environnement ou diffusion sur réseau social.

Empreinte vidéo : `4f39f8ef4d7e1a60462e4035c97299bfe97766eb54ed925f8522e9a743b70f39`.
