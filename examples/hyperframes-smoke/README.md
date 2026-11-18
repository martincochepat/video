# Test d'installation Hyperframes

Trois secondes en 1080×1920, 60 images/s, sans audio. HTML et scène séparés, GSAP3.15.0 local et Barlow Condensed sous OFL. Les notices tierces sont dans assets/. Aucun appel de génération, compte ou rendu hébergé nécessaire.

```sh
npm run hyperframes:setup
npm run hyperframes:smoke
npm run hyperframes:verify
```

Le MP4 est écrit dans renders/test.mp4 et n'est pas versionné. verification.json conserve le résultat du contrôle réellement exécuté : décodage complet, 180 images, H.264/yuv420p, 3secondes, déplacement du marqueur entre0,9 et2,6secondes. Ce petit test vérifie le moteur et sa timeline, pas la qualité d'un film long. Le mode screenshot logiciel est plus lent que le navigateur optimisé chrome-headless-shell, qui n'est pas installé.

L'installation a également été restaurée par scripts/setup.sh, puis contrôlée par TypeScript ; les neuf tests de l'atelier existant ont réussi. Les versions déjà présentes dans l'ancien lockfile n'ont pas changé.
