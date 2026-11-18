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

Défauts : profil général, vertical 1080×1920, preview 30 fps, texte droit, pas de voix ni de service payant. Pour Ligue Onze, consulter la charte sombre/citron des productions récentes et le brief du projet. Aucun faux logo, chiffre inventé, pseudo réel non demandé ou image IA par défaut pour Ligue Onze. Privilégier des scènes qui montrent le sens, pas une suite de cartes.

Utiliser `/usr/bin/chromium` configuré. Aucun appel ElevenLabs sans accord explicite, clé sécurisée et accès réseau ; ne jamais afficher un secret. Import vocal sans génération disponible avec des repères réels fournis. Ne jamais appeler un timing estimé « mesuré ». Cache audio/médias SHA-256. Ne pas publier ni modifier la configuration cloud sans demande.

## Hyperframes et références créatives

Hyperframes est disponible pour les prochaines vidéos, en complément de Remotion. Lire `references/hyperframes.md` et `.agents/skills/hyperframes/SKILL.md` pour un projet Hyperframes. Les étapes éditoriales du directeur restent utiles ; ses commandes de composition/rendu Remotion ne sont pas imposées aux productions Hyperframes. Utiliser `npm run hyperframes -- <commande>` pour le lanceur officiel configuré dans le cloud. Préserver les productions Remotion existantes et ne pas convertir leur format automatiquement. Pas de publication, service HeyGen payant ou génération payante sans demande explicite.

Avant un nouveau storyboard, lire `references/motion-library/catalog.json` et les fiches pertinentes. Lorsqu'un utilisateur fournit un exemple, relever source, passage, commentaire, mécanismes observés, tags et usages ; créer une fiche et l'indexer. Distinguer vidéo observée, capture statique et mouvement proposé. Retenir quelques références adaptées au projet et noter leurs identifiants dans le dossier de production. Préserver la cohérence visuelle, sans empiler tous les effets. Versionner les fiches et liens ; les médias locaux ne sont pas publiés automatiquement. Signaler une référence inaccessible au lieu de prétendre l'avoir revue.
