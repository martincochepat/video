# V4 sans voix ni sous-titres intégrés

Modification demandée : l’utilisateur ajoutera lui-même sa voix et ses sous-titres.

- Composition `FiveScoresClean` ; la composition `FiveScores` et son MP4 précédent sont conservés.
- Aucun composant de sous-titres monté ; aucun mix vocal chargé. Piste audio : bruitages originaux seuls.
- Suppression de la seule mention « Archives · Pronostics ». Dates, horaires et autres textes de la V4 conservés, selon la précision de l’utilisateur.
- Équipes, scores, informations sportives utiles, numéros et conclusion avec logo officiel conservés.
- Durée inchangée : 49,17 s / 1 475 images, 1080 × 1920 à 30 fps. La zone y1400–1600 est laissée libre pour le futur sous-titrage.
- Les photographies restent des archives CC0 ; leurs dates, sources et crédits sont conservés dans media.json et credits.md, sans mention superposée dans cette version.

```bash
node productions/cinq-scores-v4/render-clean.mjs render
node productions/cinq-scores-v4/render-clean.mjs inspect
python productions/cinq-scores-v4/verify-clean.py
```

Livraison : `delivery/ligue-onze-5-scores-v4-sans-voix.mp4`. Contrôles dédiés : clean-technical.json, clean-layout-checks.json et clean-quality.json. La vérification audio compare réellement l’AAC décodé au WAV de bruitages seul. Les documents et archives de la première V4 décrivent toujours sa voix de travail ; ils ne sont pas présentés comme ceux de cette variante.

Contrôles effectifs : 24 sondes sans erreur, présence des dates/heures contrôlée, aucun texte de sous-titre ni mention Archives ; décodage intégral et zéro intervalle noir détecté. Comparaison audio intégrale avec la piste de bruitages : cosinus0,99968. Planche issue du MP4 examinée. MP4 original conservé avec empreinte inchangée.
