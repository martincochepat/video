# Atelier de motion design

**Une consigne dans Codex** déclenche recherche si nécessaire, scénario, storyboard, direction artistique, composition Remotion, audio si configuré, contrôle et export MP4.

> Utilise video-director pour créer une vidéo verticale de 20 secondes sur [sujet], destinée à [public], profil général, sans voix.

Ou :

> Crée une vidéo Ligue Onze sur [sujet], avec les captures fournies, sans afficher de pseudos réels.

Notre méthode est originale et n’utilise aucun fichier privé de MotionLab. Les huit skills métier sont dans `.agents/skills/video-*/`, avec les 13 skills officiels Remotion déjà installés pour Codex. Le CLI exécute le travail ; Codex écrit le scénario et les scènes sur mesure, au lieu de remplir une série de cartes.

## Démarrer

Prérequis cloud : Node 24, npm 11, `/usr/bin/chromium`, FFmpeg et ffprobe.

```bash
bash scripts/setup.sh
npm run studio -- --port=3000
```

Les versions npm sont fixes et le lockfile est suivi. Le cache npm est dans `/workspace/.npm-cache` car le répertoire personnel cloud est protégé. Aucun téléchargement de navigateur n’est nécessaire. Sur une autre image Debian, installer Chromium et FFmpeg avant le script.

## Créer et livrer

```bash
npm run atelier -- new mon-sujet --brief "Ma consigne" --profile general
# Codex applique les huit skills, écrit la composition et complète la production.
npm run atelier -- render mon-sujet
npm run atelier -- inspect mon-sujet
# Version finale à 60 images/s :
npm run atelier -- render mon-sujet --final
npm run atelier -- inspect mon-sujet --final
```

Le profil général s’adapte au sujet. Le profil Ligue Onze est français, football et violet : textes droits, logo officiel et captures fournis uniquement, aucun pseudo réel non demandé et aucune image IA par défaut. Le violet n’est pas imposé aux autres vidéos.

Chaque production conserve brief, sources, scénario, storyboard, direction artistique, médias, timings et contrôle dans `productions/<id>/`. Les exports H.264 se trouvent dans `exports/` ; audio AAC si présent. Preview 30 fps et final 60 fps partagent les mêmes temps en secondes. Polices locales avec licence, animations déterministes, cache médias et audio SHA-256.

## Exemple réalisé

`productions/espace/` explique un mécanisme tactique en 15 secondes : attirer la défense, décaler le ballon, attaquer le couloir libre. Terrain SVG continu, trajectoires, zoom sur la course puis synthèse graphique. C’est une illustration pédagogique sans statistiques, logo, capture ou pseudo réel.

```bash
npm run atelier -- render espace --final
npm run atelier -- inspect espace --final
```

L’ancien test `StudioReady` reste disponible via `npm run render` et `npm run verify:video`.

## Voix et sous-titres

Aucun service payant n’est appelé par défaut. Import vocal avec segments horodatés :

```bash
npm run atelier -- voice mon-sujet ma-voix.wav --timings segments.json
```

La durée du fichier est mesurée par ffprobe ; les repères fournis restent étiquetés `provided-alignment`. Les scènes sont recalées sur ces repères. Les sous-titres sont activables dans le manifeste et un SRT est exporté. Sans repères fiables, aucune fausse synchronisation n’est produite.

ElevenLabs est préparé mais n’a pas été appelé. Une future utilisation exige accord explicite, clé sécurisée `ELEVENLABS_API_KEY` et accès HTTPS à `api.elevenlabs.io`. Aucun secret ne doit être écrit dans Git ou le chat. Voir [audio et timings](references/audio.md).

## Vérifier

```bash
npm run typecheck
npm run test:atelier
node scripts/audio-smoke.mjs
npm run atelier -- skills
npm_config_cache=/workspace/.npm-cache npx --offline skills list --agent codex
```

Le test audio utilise une sonde locale, pas une voix simulée. `inspect` décode le MP4, vérifie ses caractéristiques, les textes et polices aux instants clés, puis crée une planche et des clips autour des transitions. Le jugement artistique est consigné séparément sur six axes. L’échantillonnage ne remplace pas l’examen visuel des mouvements et des SVG.

Guide et contrats complets : [méthode](references/workflow.md). Instructions de reprise : [AGENTS.md](AGENTS.md). Les exports et caches sont ignorés par Git ; conserver les livrables téléchargés ou l’archive de livraison. Aucun environnement cloud n’est publié automatiquement par ce projet.
