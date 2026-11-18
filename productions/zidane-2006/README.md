# Football Stories — Zidane 2006

Production indépendante de 45 secondes, 1080×1920/60fps. Sources `src/productions/zidane/Story.tsx` et `Assets.tsx`. Les vidéos et le format des pronostics ne sont pas modifiés. Les illustrations sont des reconstitutions graphiques, pas des archives ni des portraits. Le storyboard, le scénario, la direction et la recherche sont conservés ici.

## Rendre et contrôler

```bash
npm ci
npm run typecheck
npm run test:atelier
node productions/zidane-2006/check-motion.mjs
node productions/zidane-2006/qa-stills.mjs
npm run atelier -- render zidane-2006 --final
python3 productions/zidane-2006/finalize.py
npm run atelier -- inspect zidane-2006 --final
python3 productions/zidane-2006/inspect.py
```

Navigateur `/usr/bin/chromium`, FFmpeg et reprise cloud : instructions racine et `scripts/setup.sh`. Polices locales réutilisées dans `public/productions/pronos-17-nov/fonts/`, à conserver avec leurs licences OFL. Aucun nouveau pack installé.

## Remplacer la voix absente

Aucune voix n'est fournie et aucun service payant n'est appelé. Les 45 secondes sont des choix éditoriaux provisoires. Le silence présent n'est pas une piste de narration ni une bande-son documentaire.

1. Fournir le vrai audio et des segments `text,startSeconds,endSeconds,sceneId` repérés à l'écoute. Les sceneId sont `opening`, `panenka`, `equalizer`, `red-card`, `legacy`. Ne pas employer des valeurs fictives.
2. `npm run atelier -- voice zidane-2006 VOIX.wav --timings SEGMENTS.json` mesure la durée et ajuste les groupes de scènes. Le composant recompose son horloge éditoriale sur ces groupes ; ceci est une aide au recalage, pas une preuve de synchronisation des mots.
3. Pour aligner précisément chaque but, le carton ou une pause sur les mots prononcés, ajouter dans le manifeste `storyAlignment:[{"audioSeconds":TEMPS_REEL,"storySeconds":REPERE_EDITORIAL},…]` avec au moins début et fin, plus les événements utiles. Conserver l'ordre croissant. Les repères éditoriaux sont dans timings.json ; les temps audio doivent être mesurés sur le vrai fichier. Préserver les silences, ne pas accélérer la voix.
4. Rerendre et écouter/contrôler ces points. Le normaliseur conserve automatiquement une piste présente et la livre en AAC48kHz. Aucune synchronisation vocale n'a été validée dans cette version.

## Logo et archives

`logoSrc` est prêt à recevoir le chemin d'un original officiel dans public/. Aucun fichier logo exploitable n'est présent et aucun logo n'a été inventé. Pas de photos historiques : aucun droit de photographie ou d'archive sportive supposé. Le dataset consulté et ses extraits sont attribués dans research/ et sources.json ; ils servent à vérifier les faits, pas à fabriquer de fausses archives.

## Aperçu modifiable

`npm run studio -- --port=3000` puis choisir la composition `Zidane2006`. Les textes principaux sont sélectionnables dans Studio ; trajectoires du ballon, mailles, géométrie du trophée et perspectives restent pilotées par le code. La caméra du décor est indépendante des titres horizontaux.
