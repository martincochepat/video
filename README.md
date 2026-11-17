# Studio vidéo

Projet Remotion + React + TypeScript. La composition `StudioReady` affiche
« Le studio est prêt » en texte horizontal clair sur fond sombre avec un fondu
progressif de 1 seconde, puis maintien. Format vertical 1080 × 1920, 30 images/s,
90 images, durée 3 secondes. Aucun son et aucun appel à un service payant.

## Reprendre le projet

Dans `/workspace/video`, avec Node 24 et npm 11 :

```bash
bash scripts/setup.sh
npm run studio -- --port=3000
```

Le Studio est un processus de développement à relancer pour chaque nouvelle
machine. Le rendu en ligne de commande ne nécessite pas que le Studio soit lancé.

```bash
npm run render
npm run verify:video
```

Le MP4 H.264 est produit dans `out/le-studio-est-pret.mp4`. `verify:video` vérifie
ses dimensions, son codec, sa durée, ses 90 images, l'absence d'audio, puis décode
trois images du MP4 pour contrôler la progression du fondu.

## Dépendances et navigateur

Les versions npm sont fixes et `package-lock.json` est suivi. `npm ci` restaure
les dépendances sans modifier le verrouillage. `.npmrc` place le cache dans
`/workspace/.npm-cache`, car le répertoire personnel cloud est protégé.

Chromium et FFmpeg/ffprobe sont déjà fournis par cette image Linux. La configuration
`remotion.config.ts` sélectionne `/usr/bin/chromium` ; le rendu testé utilise ce
navigateur et le moteur de rendu local Remotion. Sur une autre image Debian,
installer les paquets système `chromium` et `ffmpeg` avant `scripts/setup.sh`.

Réseau nécessaire à une réinstallation : `registry.npmjs.org` et ses téléchargements
npm ; `github.com` pour Git et une mise à jour des skills. Le téléchargement optionnel
du Chrome Remotion a reçu HTTP 403 sur `remotion.media`. Il n'est pas nécessaire au
workflow configuré. Pour utiliser ce navigateur à l'avenir, autoriser
`www.remotion.dev` et `remotion.media` dans les paramètres réseau, puis retirer le
choix Chromium de la configuration et exécuter `npm run browser:ensure` avec la
commande Remotion de téléchargement appropriée.

## Skills Codex officiels

Installés depuis https://github.com/remotion-dev/skills avec :

```bash
NODE_USE_ENV_PROXY=1 npx skills add remotion-dev/skills --agent codex --yes
```

Les 13 skills sont conservés dans `.agents/skills/` avec `skills-lock.json`.
La source officielle inspectée était au commit
`3e20ac75161bc34468845df714701cc9bf6075f4` (Remotion 4.0.544).
Lire `AGENTS.md` avant toute modification. Aucune clé API n'est requise.

## Configuration cloud

Le script d'installation et les instructions de démarrage sont enregistrés dans
le brouillon de configuration cloud. Examiner/enregistrer ce brouillon puis publier
l'environnement via l'interface pour conserver le snapshot préparé. Les processus
ne survivent pas à la restauration. Une reprise dans une nouvelle tâche n'est pas
considérée testée avant son exécution effective.
