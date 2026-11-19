# Atelier vidéo généraliste

**Une consigne dans Codex** déclenche un montage adapté au projet : rushs, interview, publicité, tutoriel, documentaire, clip, motion design ou format mixte. Le profil général est neutre ; Ligue Onze est une charte optionnelle. Hyperframes, Remotion et FFmpeg sont choisis selon les besoins.

Voir les [types de montage et choix des outils](references/editing-modes.md), ainsi que le [modèle de demande](references/video-brief.md). La méthode couvre recherche utile, conducteur/scénario, médias, direction, audio, montage, contrôle et export.

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

## Hyperframes et bibliothèque de références

Hyperframes 0.9.65 est disponible en complément de Remotion, avec ses instructions officielles pour Codex. `npm run hyperframes:smoke` exécute le test local de rendu. Voir [installation et commandes](references/hyperframes.md).

Envoyer les exemples de motion design dans le chat ou un document joint : fichier/lien, minutage et ce qui plaît. Les fiches et usages sont conservés dans la [bibliothèque de références](references/motion-library/README.md), pour les prochaines tâches et productions.

## Reel « 3 pronostics, 1 changement »

Composition `ThreePredictions`, 27 s, 1080 × 1920 à30fps. **Maquette non publiable : rencontres non vérifiées, scores d’exemple.** Données, réserves et reprise dans [les notes de production](productions/trois-pronostics/production-notes.md). Rendu dédié avec bruitages originaux : `node productions/trois-pronostics/render.mjs render` ; examen du MP4 : `python productions/trois-pronostics/examine.py`. Les productions précédentes sont conservées.
