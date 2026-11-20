# France–Espagne : encore eux

Film éditorial Ligue Onze de 90 secondes, 1080 × 1920, 30 images/s. Le tirage des quarts 2026–2027 est vérifié ; la vidéo ne propose aucun score futur.

**Silence intégral : aucun flux audio, voix, musique, bruitage ou sous-titre.** Aucune piste audio artificiellement silencieuse. Les textes visibles sont des éléments éditoriaux, sans SRT.

## Reprendre

Depuis la racine du dépôt :

```bash
npm ci --no-audit --no-fund
npm run typecheck
node productions/france-espagne-2027/render.mjs stills
node productions/france-espagne-2027/render.mjs render
python productions/france-espagne-2027/verify-episode.py
```

Chromium `/usr/bin/chromium`, FFmpeg et FFprobe sont nécessaires. Les planches Python utilisent Pillow. Le Studio se lance avec `npm run studio -- --port=3000` ; composition **FranceSpainNews**. Aucun service payant ni clé d’API.

Le rendu utilise Remotion avec `muted:true`, PNG, H.264/CRF17, yuv420p/BT.709, concurrence4. Les vérifications exigent l’absence de flux audio et de sous-titre et le décodage intégral des2700images. Les rapports de livraison portent l’empreinte du MP4 contrôlé.

## Organisation

- `fixtures.json` : huit rencontres officielles aller/retour.
- `editorial.json` : résultats historiques et chiffres espagnols.
- `texts.json` : textes éditoriaux modifiables.
- `sources.json` : faits, sources officielles, recoupements et corrections.
- `media.json` et `credits.md` : photographies, drapeaux, auteurs, dates et licences.
- `storyboard.md`, `timings.json` : découpage et événements de lecture.
- `src/productions/france-spain/` : scènes, composants, plans photographiques et timeline.
- `render.mjs`, `verify-episode.py` : export et contrôles reproductibles.

Les trajectoires et masques sont calculés dans les composants React ; leur édition se fait dans le code. Les valeurs sportives et le texte sont séparés des médias. Les compositions et exports précédents sont préservés.

## Précisions éditoriales

Le calendrier UEFA retenu est **Espagne–France le25mars2027**, puis **France–Espagne le28mars2027**, à20h45Paris. La source FFF contient une coquille « dimanche27mars » et un paragraphe RFEF inverse les pays ; les fiches UEFA2050900 et2050897 permettent de trancher. Aucun lieu espagnol non confirmé n’est inventé. Le Stade de France pour le retour est annoncé par la FFF.

Les trois précédents sont les demi-finales Euro2024 (France1–2Espagne), NationsLeague2025 (France4–5Espagne) et Mondial2026 (France0–2Espagne). Ils sont racontés par une chronologie graphique avec leurs résultats officiels. Aucune photo d’un autre match n’est présentée comme une archive de ces rencontres.

Les photographies de joueurs sont des illustrations à leurs dates réelles, principalement2018–2025. Les images des trois précédents n’ont pas été retenues sous les conditions de réutilisation choisies ici ; ce choix et les limites figurent dans la revue. Les joueurs cités correspondent au contexte vérifié ennovembre2026 ; la vidéo ne prétend pas connaître les listes demars2027. La circulation de balle dessinée est illustrative, sans données de suivi inventées.

Les crédits des photos doivent accompagner la diffusion. Conserver le lien de crédits inclus dans `publication.txt`. Aucune publication sur les réseaux sociaux n’est effectuée par ces commandes.
