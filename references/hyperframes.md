# Hyperframes dans cet environnement

Hyperframes de HeyGen est installé en complément de Remotion : CLI **0.9.65**, GSAP **3.15.0**, versions fixées dans package.json et package-lock.json. Source : https://github.com/heygen-com/hyperframes ; documentation : https://hyperframes.heygen.com.

Les trois skills livrés avec cette version npm (`hyperframes`, `hyperframes-cli`, `media-use`) sont copiés sans modifier les skills Remotion ou les huit skills métier. Les noms de skills complémentaires évoqués dans leur documentation ne sont pas tous livrés dans ce paquet ; ne pas prétendre qu'ils sont installés. Une restauration préserve les skills déjà présents et ne télécharge pas de packs supplémentaires automatiquement.

```sh
bash scripts/setup.sh
npm run hyperframes -- --version
npm run hyperframes -- doctor --json
npm run hyperframes:smoke
npm run hyperframes:verify
npm run hyperframes -- preview examples/hyperframes-smoke --background --port 3002
```

Le lanceur `scripts/hyperframes.mjs` utilise le lanceur officiel des skills avec une version de CLI exacte. Il fixe le cache npm et les réglages Hyperframes dans des répertoires inscriptibles du projet, sans modifier HOME. Le cache Fontconfig est également dirigé vers le cache du projet via XDG_CACHE_HOME. Chromium est `/usr/bin/chromium`, FFmpeg et ffprobe sont ceux de l'environnement. La télémétrie est désactivée dans ce lanceur. Les skills ne sont pas mis à jour automatiquement.

Le lanceur impose par défaut `PRODUCER_FORCE_SCREENSHOT=true` pour le navigateur système ; le chemin optimisé de chrome-headless-shell n'est pas installé. Le diagnostic peut donc informer d'un mode optimisé absent et marquer des outils facultatifs manquants (transcription, voix locale, musique locale). Aucun de ces modules n'est nécessaire au rendu HTML/GSAP local testé. Aucun compte, rendu cloud, voix payante ou modèle volumineux n'est activé.

Le projet de contrôle est `examples/hyperframes-smoke/`. Son rendu de trois secondes en 1080×1920/60fps est produit dans `renders/test.mp4` (non suivi par Git). Tous ses scripts et polices sont locaux ; le script GSAP conserve son en-tête de licence standard (https://gsap.com/standard-license), le README éditeur est joint, et la fonte Barlow conserve sa licence OFL. Hyperframes est distribué sous Apache-2.0 selon son paquet npm. Ce test vérifie l'installation, pas le niveau artistique d'une prochaine vidéo.

Pour une production nouvelle, choisir le moteur en fonction du projet et de la demande. Hyperframes sert aux compositions HTML/CSS/GSAP ; Remotion reste disponible pour les projets React existants. Ne pas convertir une vidéo de pronostics automatiquement ni utiliser une commande de publication ou un service payant sans demande.

Références créatives : [bibliothèque motion design](motion-library/README.md). Avant chaque storyboard, sélectionner les exemples pertinents et expliquer leur rôle dans le dossier de production.
