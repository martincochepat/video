# Validation exécutée

- Réinstallation reproductible : scripts/setup.sh (npm ci, Chromium, TypeScript).
- 9 tests métier : création depuis une consigne, profils distincts, découverte des skills, garde payante ElevenLabs, alignements valides/invalides, SRT, identifiants et médias absents.
- Découverte externe : `npx --offline skills list --agent codex` affiche 13 skills officiels et 8 skills atelier.
- MP4 preview : 1080 × 1920, H.264, 30 fps, 450 images, 15 secondes, sans audio.
- MP4 final : 1080 × 1920, H.264, 60 fps, 900 images, 15 secondes, sans audio.
- Décodage intégral FFmpeg des deux MP4 ; 27 images clés et autour des coupes contrôlées dans chaque mode, zéro erreur de texte/police/zone sûre.
- Examen visuel des plans et des séquences autour de 4, 8 et 12 secondes. Corrections : titres réduits/interlignage accru, recadrage SVG borné pour éviter les recouvrements au zoom.
- Sonde audio locale 4 secondes : import, durée ffprobe, scènes recalées sur segments de fixture fournis, sous-titres, export SRT, audio AAC et cache réutilisé. Ce n’est pas une narration humaine.
- Import média : empreinte stable, inventaire sans doublon, cache non réécrit à l’identique.
- Le rendu final identique est réutilisé après contrôle de son empreinte.

Les six axes artistiques sont évalués séparément dans quality-review.json, avec limites et corrections. L’examen est un jugement de l’agent sur des échantillons, pas une étude utilisateur ni une inspection manuelle de chaque image.

ElevenLabs : non appelé et non validé en réseau ; requiert plus tard ELEVENLABS_API_KEY, accès HTTPS api.elevenlabs.io et accord explicite pour un coût. Aucun service payant utilisé. Aucun réglage cloud ou environnement publié pour cette livraison.
