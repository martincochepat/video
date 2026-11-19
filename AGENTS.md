# Atelier vidéo généraliste

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

Défauts : profil général sans marque imposée, choix du format et de la cadence d’après le brief, la destination et les médias. Le portrait1080×1920/30fps est seulement un point de départ du CLI quand rien ne permet de choisir. Pas de voix générée ni de service payant par défaut. Pour Ligue Onze, consulter la charte sombre/citron des productions récentes et le brief du projet. Aucun faux logo, chiffre inventé, pseudo réel non demandé ou image IA par défaut pour Ligue Onze. Privilégier des scènes qui montrent le sens, pas une suite de cartes.

Utiliser `/usr/bin/chromium` configuré. Aucun appel ElevenLabs sans accord explicite, clé sécurisée et accès réseau ; ne jamais afficher un secret. Import vocal sans génération disponible avec des repères réels fournis. Ne jamais appeler un timing estimé « mesuré ». Cache audio/médias SHA-256. Ne pas publier ni modifier la configuration cloud sans demande.

## Types de montage et marques

Lire `references/editing-modes.md` avant de choisir une méthode. L’atelier couvre rushs, interviews/podcasts, YouTube/documentaire, publicité, tutoriels, captures d’écran, clips musicaux, réseaux sociaux, motion design et formats mixtes. Distinguer type de montage, marque éventuelle, style/références et moteur. Par défaut, choisir `general` ; Ligue Onze n’est sélectionné que si la marque est demandée ou établie dans le projet existant, jamais du seul fait d’un sujet football. Ne pas reprendre automatiquement couleurs, polices, avatar, sous-titres ou décor d’une autre production. Adapter le travail aux fichiers et aux capacités vérifiées, annoncer une hypothèse de format si nécessaire et signaler ce qui manque réellement.

Choisir Hyperframes, Remotion, FFmpeg ou une combinaison selon les besoins. Conserver les productions existantes. Les commandes historiques atelier restent un chemin Remotion, avec ses limites actuelles30/60fps et600s ; les autres chaînes ont leurs contrôles propres. Le réglage d’un profil ou l’analyse d’une référence ne déclenche pas la création d’une vidéo non demandée.

## Hyperframes et références créatives

Hyperframes est disponible pour les prochaines vidéos, en complément de Remotion. Lire `references/hyperframes.md` et `.agents/skills/hyperframes/SKILL.md` pour un projet Hyperframes. Les étapes éditoriales du directeur restent utiles ; ses commandes de composition/rendu Remotion ne sont pas imposées aux productions Hyperframes. Utiliser `npm run hyperframes -- <commande>` pour le lanceur officiel configuré dans le cloud. Préserver les productions Remotion existantes et ne pas convertir leur format automatiquement. Pas de publication, service HeyGen payant ou génération payante sans demande explicite.

Avant un nouveau storyboard, lire `references/motion-library/catalog.json` et les fiches pertinentes. Lorsqu'un utilisateur fournit un exemple, relever source, passage, commentaire, mécanismes observés, tags et usages ; créer une fiche et l'indexer. Distinguer vidéo observée, capture statique et mouvement proposé. Retenir quelques références adaptées au projet et noter leurs identifiants dans le dossier de production. Préserver la cohérence visuelle, sans empiler tous les effets. Versionner les fiches et liens ; les médias locaux ne sont pas publiés automatiquement. Signaler une référence inaccessible au lieu de prétendre l'avoir revue.
