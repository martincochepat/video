---
name: video-voice
description: Importer une voix ou générer une narration ElevenLabs seulement après configuration.
---

# video-voice

Défaut : aucune voix, aucun coût. Ne jamais générer une voix payante sans demande explicite et clé configurée. Ne jamais afficher la clé. Pour importer : `npm run atelier -- voice <slug> <fichier> --timings <segments.json>`. Lire references/audio.md. ffprobe mesure la durée ; les repères fournis sont étiquetés provided-alignment et ne sont pas présentés comme mesurés par le système. Écouter ou contrôler l’alignement avant livraison. Chaque segment doit contenir text,startSeconds,endSeconds,sceneId ; pas de minutage calculé à partir du nombre de mots. Sans repères fiables, conserver l’audio importé à part et signaler le blocage ; ne pas inventer une synchronisation.
ElevenLabs : `npm run atelier -- elevenlabs <slug> --voice-id <id> --text <fichier.txt> --allow-paid` uniquement après accord explicite. ELEVENLABS_API_KEY, api.elevenlabs.io et NODE_USE_ENV_PROXY=1 requis. Utiliser l’endpoint with-timestamps ; préserver alignment et réponse hors clé, exploiter les repères fournisseur. Répartir les segments sur les scènes explicitement via segments.json, puis voice import ; ne pas déduire des scènes de durées estimées. SHA-256 audio/contenu/voix/modèle pour cache ; ne pas refaire un appel identique. Si voix absente, sous-titres désactivés par défaut. Écrire SRT et timings, vérifier AAC au rendu.
