# Atelier vidéo généraliste

L'atelier travaille sur des sujets, marques et formats variés. Ligue Onze est un profil de marque optionnel. Le profil `general` est le point de départ quand aucune marque n'est demandée. Une vidéo de football peut elle aussi utiliser le profil général ou une autre charte.

## Quatre choix indépendants

1. **Type de production** : rushs montés, interview, publicité, tutoriel, récit documentaire, clip, motion design, présentation…
2. **Marque** : aucune, Ligue Onze, ou une charte fournie pour ce projet. Couleurs, polices et logos viennent de ce choix.
3. **Style** : sobre, éditorial, pédagogique, cinématographique, rythmé, illustré… Les références aident à le préciser.
4. **Moteur** : Hyperframes, Remotion, FFmpeg ou combinaison, selon les opérations utiles.

Ces modes guident le travail de Codex. Chaque production conserve son brief, ses médias, ses choix de montage et ses contrôles ; elle n'hérite pas automatiquement du décor ou du présentateur d'une autre vidéo.

## Types de montage

| Type | Travail principal | Points à contrôler |
|---|---|---|
| Rushs, vlog, voyage, événement | Trier les prises, choisir les moments, couper, raccorder, recadrer, assembler. | Continuité, durée des plans, rythme, intelligibilité et équilibre sonore. |
| Interview, témoignage, podcast, face caméra | Construire le propos à partir des prises, intégrer B-roll et sous-titres ; synchroniser plusieurs sources si présentes. | Sens des coupes, respiration, synchronisation, continuité des voix et cohérence des recadrages. |
| YouTube, reportage, documentaire, récit | Organiser introduction, développement, chapitres et conclusion ; relier narration, images et sources. | Exactitude, compréhension, temps de lecture et cohérence du récit. Traiter les longs formats par chapitres si nécessaire. |
| Publicité, produit, marque, immobilier | Construire la présentation à partir des produits, lieux ou interfaces réellement fournis ; hiérarchiser les bénéfices et la conclusion. | Fidélité au produit, charte, lisibilité, crédibilité des promesses et appel à l'action. |
| Tutoriel, formation, capture d'écran | Clarifier les étapes, cadrer l'interface, ajouter repères et explications. | Ordre des actions, détails lisibles et temps laissé pour comprendre. |
| Réel, Short, TikTok, extrait social | Sélectionner ou écrire une accroche, adapter le cadrage, les sous-titres et la progression au sujet. | Compréhension mobile, zones de sécurité, lisibilité et densité. Le rythme peut être calme ou rapide selon le brief. |
| Motion design, infographie, explication animée | Composer objets, textes, illustrations, chiffres et transitions spatiales. | Causes et conséquences, hiérarchie, continuité des objets et mouvement. |
| Clip musical, montage au rythme, animation de texte | Organiser des motifs visuels et des événements sur une piste fournie. | Repères audio réellement analysés, accents, variations et droits des médias utilisés. |
| Formats mixtes | Combiner rushs, voix, captures et animations. | Raccords visuels/sonores et cohérence de l'ensemble. |

## Choisir les outils

- **FFmpeg** : découpe, concaténation, recadrage, conversion, extraction, mixage et assemblage de médias. Bon complément pour préparer les sources et réunir des chapitres.
- **Hyperframes** : compositions HTML/CSS/GSAP, habillages, sous-titres animés et scènes graphiques, avec médias lorsque pertinent. Employer le lanceur cloud documenté dans `hyperframes.md`.
- **Remotion** : projets React existants, compositions programmatiques et assemblages de médias via les composants adaptés. Préserver les productions déjà validées.

La décision est notée dans le brief avec une raison concrète. Les préférences explicites de l'utilisateur priment. Les huit skills métier apportent la méthode éditoriale et de contrôle ; les références techniques sont celles du moteur choisi. Aucun nouveau pack ni service payant n'est requis automatiquement par un changement de genre.

## Format et style

Prendre en compte la destination, les médias fournis et la demande pour choisir portrait, paysage ou carré, durée et cadence. Conserver une cadence source pertinente quand c'est utile ; 60 images/s est un choix de sortie, pas une garantie de fluidité. Si rien ne permet de choisir, annoncer une hypothèse raisonnable. Les valeurs du brouillon CLI sont des points de départ à ajuster.

La palette du profil général est un point de départ, pas une identité imposée. Un style sobre peut employer surtout des coupes et des temps de lecture ; une démonstration illustrée peut privilégier des transformations d'objets. La référence REF-001 est disponible pour les projets auxquels sa présentation convient, sans devenir un modèle obligatoire.

Avant le montage, consulter `motion-library/catalog.json`, choisir les références adaptées et conserver leurs identifiants et passages dans le dossier de production. Séparer la préférence de style du droit de réutiliser les médias originaux.

## Ce que l'utilisateur peut fournir

Une demande simple suffit, par exemple :

> Monte ces rushs en vidéo YouTube de six minutes, ambiance voyage, rythme posé, format paysage. J'aime le passage 00:12–00:20 de cette référence. Garde le son des lieux et ajoute des sous-titres seulement sur les interviews.

Ou :

> Crée une publicité verticale de vingt secondes pour ce produit. Voici les photos et le logo. Présentation sobre, textes lisibles, conclusion sur le site.

Les informations utiles sont le sujet/l'objectif, les médias, la destination/durée et les préférences/références. Codex complète les choix ordinaires et demande seulement ce qui bloque réellement, sans prétendre disposer de médias absents.

## Capacité actuelle et limites pratiques

Le rendu graphique local a été testé avec Remotion et Hyperframes ; Chromium, FFmpeg et ffprobe sont présents. Les projets sont écrits et montés sur mesure à partir des fichiers accessibles. Les tâches qui demandent un outil supplémentaire, un traitement lourd, une source inaccessible ou une prestation externe sont évaluées au début du projet.

Le CLI historique `atelier` de Remotion valide actuellement des projets de **30 ou 60 images/s**, d'une durée maximale de **600 secondes**. Son option `--final` force **60 images/s**. Choisir une autre chaîne adaptée et ses contrôles pour une cadence différente ou un long format ; ne pas présenter ces contraintes comme des limites universelles de la vidéo, ni les contourner silencieusement.

La capture Hyperframes avec Chromium système est fonctionnelle mais lente en mode screenshot logiciel ; ne pas promettre un délai de rendu indépendant de la complexité. La transcription automatique et les modèles locaux de voix/musique ne sont pas installés. La génération payante, l'import d'une voix fournie, l'exactitude des repères et la diffusion gardent les règles existantes. Ne pas annoncer une synchronisation, une écoute ou une validation à vitesse réelle si elle n'a pas été effectuée.
