# Atelier de motion design

Pour toute consigne de création vidéo, commencer par `.agents/skills/video-director/SKILL.md` et poursuivre jusqu’au vrai MP4 contrôlé, sans s’arrêter à un plan. Appliquer les huit skills métier puis les références des skills officiels Remotion selon le besoin. Notre méthode est originale ; ne pas prétendre disposer de fichiers privés MotionLab.

Chaque tâche cloud est isolée : utiliser ce checkout, sans worktree sauf demande explicite. Préserver les changements utilisateur.

- Installer/restaurer : `bash scripts/setup.sh` (Node 24, Chromium et FFmpeg présents).
- Studio : `npm run studio -- --port=3000`, à relancer après restauration.
- Vérifier : `npm run typecheck`, `npm run test:atelier`.
- Pipeline : `npm run atelier -- new <id> --brief "..." --profile general`, puis travail éditorial et composition sur mesure.
- Rendre : `npm run atelier -- render <id>` ; `--final` pour 60 fps.
- Inspecter : `npm run atelier -- inspect <id>` avec le même mode.
- Documentation et contrat : `references/workflow.md`, `references/audio.md`.
- Exemple complet : `productions/espace/`, source `src/productions/Space.tsx`.

Défauts : profil général, vertical 1080×1920, preview 30 fps, texte droit, pas de voix ni de service payant. Le violet concerne Ligue Onze uniquement. Aucun faux logo, chiffre inventé, pseudo réel non demandé ou image IA par défaut pour Ligue Onze. Privilégier des scènes qui montrent le sens, pas une suite de cartes.

Utiliser `/usr/bin/chromium` configuré. Aucun appel ElevenLabs sans accord explicite, clé sécurisée et accès réseau ; ne jamais afficher un secret. Import vocal sans génération disponible avec des repères réels fournis. Ne jamais appeler un timing estimé « mesuré ». Cache audio/médias SHA-256. Ne pas publier ni modifier la configuration cloud sans demande.
