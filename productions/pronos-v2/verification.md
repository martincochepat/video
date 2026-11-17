# Révision de composition — V2

Vidéo rendue intégralement : 24 secondes, 1080 × 1920, 60 images/s, H.264, yuv420p, BT.709, sans audio. Pronostics, ordre et palette conservés. La V1 et son code sont conservés ; son MP4 a été vérifié par SHA-256 contre son empreinte de livraison.

## Changements

- Ouverture : titre horizontal stable, grands fanions avec drapeaux SVG exacts, coutures, œillets et attaches ; ballon recadré au premier plan. Le terrain remplit l'environnement.
- Galles–Portugal : cadrage aérien, score libre et grand, équipes identifiées sous le chiffre correspondant. Score entièrement révélé avant trois secondes.
- Pologne–Suède : confrontation latérale, chaussures illustrées sans marque à deux profondeurs, score central sans panneau.
- Ukraine–Géorgie : filet à grande échelle, déformation locale amortie au contact, ballon derrière la maille après l'impact ; score après l'apaisement.
- Danemark–Norvège : retour des fanions de l'ouverture, déplacement vers les côtés et sortie du ballon pour dégager le score.
- Fin : quatre résultats ordonnés, décor atténué, CTA passé de 36 à 48 px. Synthèse stable de 21 à 24 secondes. Une seule mention MES PRONOS.

Les raccords utilisent un masque circulaire associé au ballon, une ligne de terrain qui devient séparation, puis un cordage conduisant au retour des fanions. Aucun flash plein écran ni particules.

## Contrôles effectués

- TypeScript et les neuf tests existants de l'atelier : réussite.
- Tests numériques dédiés : continuité du ballon aux raccords, immobilité finale, déformation locale du filet et apaisement avant le score.
- Rendu complet et décodage du MP4 : 1 440 images, 24 secondes, 60 images/s ; aucune piste audio. Normalisation couleur et déplacement des métadonnées en tête du fichier pour la lecture progressive.
- Inspection technique de 50 images : polices chargées et aucun débordement détecté des textes HTML balisés. Ouverture présente dès l'image zéro, premier score avant trois secondes et quatre scores présents dans la synthèse.
- Examen visuel des six scènes et comparaison V1/V2 à taille réduite. Corrections : cordages et barrières dégagés de MES PRONOS, ligne du terrain dégagée du score, suppression d'une intersection donnant l'apparence d'un signe plus.
- Extraits du MP4 encodé et planches chronologiques à 8 images/s, notamment ouverture, filet et retour danois ; examen des 20 images aux bornes exactes des cinq transitions.

## Limites et réserves

L'inspection du mouvement repose sur des échantillons chronologiques et des tests numériques, sans validation perceptive à vitesse réelle. Les contrôles automatiques des textes ne couvrent pas toutes les intersections SVG ; les images échantillonnées ont été examinées visuellement. Le contrôle mobile utilise des images réduites, pas une lecture sur téléphone physique. Les titres des deux scènes sont partiellement découpés pendant les masques de transition ; leur lecture complète intervient une fois le raccord terminé.

Les illustrations restent stylisées : plis et volumes simulés, filet paramétrique plutôt que simulation physique. Le niveau de matière et de détail des références reste partiellement atteint, notamment pour le ballon. Les scènes utilisent encore un même langage de terrain sombre, avec des compositions et échelles différentes.

Le fichier original du logo joint n'est pas accessible comme ressource locale : aucun remplacement n'a été inventé, logo absent du rendu. La réserve de la V1 sur la vérification du calendrier reste ouverte : l'accès UEFA avait échoué sur un refus CONNECT du proxy (403). Aucun nouvel accès n'a été tenté pour cette révision ; aucune date ou heure de match n'est ajoutée. La vidéo présente des choix de scores, sans prétendre certifier des rencontres programmées. Aucun service payant ni image IA utilisé.

Livrables dans `delivery/` : vidéo complète, planche de six scènes, comparaison V1/V2, cinq extraits de mouvement, bornes des transitions et rapport technique. Les empreintes sont dans `checksums.json`.
