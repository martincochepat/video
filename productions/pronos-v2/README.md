# Pronostics — V2

Révision de composition conservant la V1 dans `../pronos-17-nov/`.

- Code : `src/productions/ForecastV2.tsx`
- Découpage : [storyboard.md](storyboard.md)
- Changements, contrôles et limites : [verification.md](verification.md)
- Livrables : [delivery/](delivery/)

Depuis la racine du dépôt :

```sh
npm ci
npm run typecheck
node productions/pronos-v2/check-motion.mjs
npm run atelier -- render pronos-v2 --final
python3 productions/pronos-v2/finalize.py
npm run atelier -- inspect pronos-v2 --final
python3 productions/pronos-v2/inspect.py
python3 productions/pronos-v2/transition-ends.py
```

Le navigateur Chromium et FFmpeg suivent les instructions d'environnement existantes à la racine. Les ressources de drapeaux et polices sont celles de la V1, conservées dans `public/productions/pronos-17-nov/`. Ne pas supprimer ce dossier.
