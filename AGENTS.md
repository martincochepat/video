# Studio vidéo Remotion

Utiliser le checkout existant : chaque tâche cloud est déjà isolée. Ne pas créer de worktree sans demande explicite.

Lire `.agents/skills/remotion-best-practices/SKILL.md`, puis les références utiles avant de créer ou modifier une vidéo. Les 13 skills officiels sont installés localement pour Codex et suivis par Git ; aucune installation globale n'est nécessaire.

- Projet React + TypeScript, Remotion 4.0.544, Node 24.
- Installer/restaurer : `bash scripts/setup.sh`.
- Prévisualiser : `npm run studio -- --port=3000` (processus à relancer dans une nouvelle tâche).
- Vérifier : `npm run typecheck`.
- Rendre : `npm run render`.
- Contrôler le résultat : `npm run verify:video`.
- Livrable : `out/le-studio-est-pret.mp4` ; généré, ignoré par Git.

Le navigateur configuré est `/usr/bin/chromium`, fourni dans l'environnement. Le téléchargement automatique de Chrome Remotion via remotion.media est bloqué par le réseau ; ne pas le déclencher pour ce workflow. Ni secret, ni voix, ni service payant ne sont requis. Les animations doivent être pilotées par les images Remotion, jamais par une animation CSS temporelle.
