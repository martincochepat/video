# Bibliothèque de références motion design

Tu peux envoyer tes exemples **directement dans le chat**, en fichiers vidéo ou en liens, ou les regrouper dans **un document joint**. Le document est utile pour en réunir beaucoup ; le chat est pratique pour commenter un passage. Aucun format compliqué n'est nécessaire.

Pour chaque exemple, trois informations suffisent :

1. Le fichier ou le lien de la vidéo.
2. Le passage intéressant, par exemple 00:04–00:09.
3. Ce que tu aimes : mouvement d'objet, transition, matière, rythme, caméra, typographie… Tu peux simplement le décrire avec tes mots.

Un extrait de 3 à 15 secondes est souvent plus utile qu'une longue vidéo sans indication. Un MP4 joint permet une analyse du mouvement plus fiable qu'une capture. Une capture sert à étudier la composition, les détails et la profondeur ; elle ne prouve pas la fluidité. Si un lien privé ou une plateforme est inaccessible, fournir le fichier ou un extrait.

## Exemple de message à copier

> Référence 01 — [vidéo ou fichier]
> Passage : 00:04 à 00:09.
> J'aime : le ballon passe au premier plan, cache une partie de l'image et révèle la scène suivante.
> À éviter : le texte penché et les couleurs flashy.
> Utilisation possible : transition entre deux matchs.

Tu peux aussi donner plusieurs exemples dans un seul document : un exemple par bloc, avec un lien, un minutage et ton commentaire. Des fichiers nommés `01-transition-ballon.mp4`, `02-typo.mp4` aident à les retrouver, mais ce n'est pas obligatoire.

## Comment ils servent aux productions

À réception, Codex examine le passage et crée une fiche : ce qui est visible, le mouvement réellement observé, la cause et la conséquence, les temps de lecture, les points de vigilance et les usages pertinents. Les durées estimées sont distinguées des mesures effectuées sur le fichier. Aucun service d'analyse payant ne doit être appelé sans accord.

Les références sont classées dans `catalog.json`, par exemple :

- transitions par objet ou masque ;
- typographie et hiérarchie ;
- caméra, parallaxe et profondeur ;
- personnages et actions ;
- matière, lumière et ombres ;
- interfaces, classements et compteurs ;
- rythme, anticipation et temps de lecture.

Avant chaque vidéo, sélectionner quelques références adaptées au sujet et documenter leurs identifiants et passages dans le dossier de production. Une référence peut fournir le cadrage, une autre le raccord, une troisième le rythme. Conserver une direction cohérente et la charte du projet ; ne pas empiler tous les effets. Les références ne sont pas automatiquement des assets à réutiliser.

## Conservation entre tâches

Les fiches, les commentaires, les liens et le catalogue sont versionnés dans le dépôt. C'est cette bibliothèque qui permet de les retrouver : il ne s'agit pas d'un entraînement permanent du modèle.

Les vidéos de référence et autres médias sont placés localement dans `media/`, exclu de Git par défaut. Pour les retrouver après remplacement de l'environnement, conserver aussi leur original dans un stockage durable et noter son lien dans la fiche. Un fichier fourni uniquement dans un ancien chat ou dans un dossier local peut devoir être joint à nouveau. Les vidéos de tiers ne sont pas publiées automatiquement dans le dépôt.

Le catalogue est vide au démarrage : aucune vidéo non examinée n'est présentée comme une référence validée. Utiliser le [modèle de fiche](fiche-modele.md) pour les fiches détaillées, ou fournir simplement les trois informations ci-dessus et laisser Codex faire le classement.
