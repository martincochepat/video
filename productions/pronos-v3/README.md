# Ligue Onze — reprise V3

29 secondes, 1080×1920, 60 images/s, sans audio fourni. Reprise des composants V2 ; aucune nouvelle architecture ni nouveau skill. V1 et V2 conservées dans leurs dossiers de production. La V3 ajoute l'accroche générale, harmonise le dernier titre et remplace la conclusion par synthèse puis signature.

La vidéo est une **version de travail** : les quatre affiches annoncées pour ce soir par l'utilisateur n'ont pas pu être certifiées (UEFA bloqué par proxy403). Le logo officiel n'est pas disponible comme fichier ; aucun remplacement inventé. Lire `release-status.json` et le rapport de vérification avant toute diffusion. Aucun réseau social ni environnement publié.

```bash
npm run typecheck
npm run test:atelier
node productions/pronos-v3/check-motion.mjs
node productions/pronos-v2/check-motion.mjs
node productions/pronos-v3/qa-stills.mjs
npm run atelier -- render pronos-v3 --final
python3 productions/pronos-v3/finalize.py
npm run atelier -- inspect pronos-v3 --final
python3 productions/pronos-v3/inspect.py
python3 productions/pronos-v3/transition-ends.py
python3 productions/pronos-v3/check-header-cuts.py
python3 productions/pronos-v3/verify-delivery.py
```

Sources : `src/productions/ForecastV3.tsx`, composants conservés dans `ForecastV2.tsx`. Ressources locales de la V1 dans `public/productions/pronos-17-nov/` (ne pas supprimer). Logo : ajouter son fichier officiel dans `public/`, renseigner `logoSrc` dans le manifeste puis rerendre et réinspecter. Aucun timing audio inventé ; une voix fournie ultérieurement nécessite un alignement réel.
