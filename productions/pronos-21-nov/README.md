# 3 pronostics — 21 novembre 2026

Version de travail sans voix pour publication prévue le 20 novembre 2026. Dates, équipes et compétitions vérifiées ; scores éditoriaux : Nice–Paris SG : 1–2 ; Séville–Betis : 1–2 ; Newcastle–Arsenal : 1–1. Les deux derniers débutent à 18 h 30 (Paris), le premier à 17 h 15 (Paris), samedi 21 novembre 2026.

La voix sera enregistrée par l’utilisateur. Aucun sous-titre intégré ; le SRT distinct PROVISOIRE reprend le script prévu, pas des paroles présentes dans le MP4. Son minutage est éditorial et devra être recalé sur la voix. Le script et les respirations proposées sont dans voiceover.txt et script.md. Aucune synchronisation vocale mesurée revendiquée.

## Reprise

Depuis la racine : `npm ci --no-audit --no-fund`, puis `npm run typecheck`. Chromium `/usr/bin/chromium` et FFmpeg nécessaires. Studio : `npm run studio -- --port=3000`, composition NovemberPredictions. Données dans matches.json, sources dans sources.json, source React dans src/productions/pronos-november/.

Rendre : `node productions/pronos-21-nov/render.mjs render`. Sondes : `node productions/pronos-21-nov/render.mjs stills`. Ce chemin utilise Remotion avec contrôles adaptés à la piste instrumentale et à l’absence de voix/sous-titres. L’option atelier --final ne s’applique pas : la cadence voulue est 30 fps.

Musique et bruitages originaux synthétisés par make-audio.py (Python/NumPy et FFmpeg). Le WAV est versionné pour rendre sans régénérer. Aucun service payant, média photographique externe, logo d’équipe ou image IA. Logo Ligue Onze officiel et polices existantes avec leurs licences. Préserver toutes les autres productions.

Le montage reste une version de travail tant que la voix définitive est attendue. Vérifier à nouveau les horaires et l’actualité sportive avant toute publication. Aucune publication automatique sur une plateforme.

Les trois tickets sont des objets programmatiques : noms, horaires et scores dans `matches.json`, positions et transitions dans `Cards.tsx`. Studio affiche la composition et ses groupes ; les trajectoires calculées se règlent dans le code. L’archive de livraison possède une entrée Remotion dédiée à cet épisode pour éviter de dupliquer les anciens médias. Le dépôt conserve l’atelier multi-épisodes complet.
