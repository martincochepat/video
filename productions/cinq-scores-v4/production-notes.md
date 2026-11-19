# V4 — Ces 5 scores exacts, je les assume

Version photographique avec **voix de travail locale**. La voix n’est pas une piste ElevenLabs définitive. Sources et vérifications datées du 19 novembre 2026 ; diffusion pertinente pour les 21–22 novembre 2026. Les cinq scores sont des opinions éditoriales, jamais des résultats connus ou garantis.

## Blocage résolu

L’utilisateur a activé Internet public. Le statut courant de l’environnement confirme `unrestricted / enforced` ; les sept requêtes de check-access.py répondent HTTP200. La restriction précédente n’est donc plus un blocage. Aucun réglage de configuration n’a été modifié ou publié par cette tâche.

## Sources sportives

Les cinq affiches du brief sont confirmées dans les données officielles de Ligue1 : `https://ma-api.ligue1.fr/championship-matches/championship/1/game-week/11?season=2026`. L’hôte de l’API a été identifié dans le JavaScript public du site officiel. La page de calendrier officielle du PSG corrobore Nice–Paris au21 novembre. Horaires UTC convertis en Europe/Paris dans matches.json : Nice–PSG17h15 le 21 ; Lille–Lyon, Lens–Toulouse et Monaco–Auxerre20h45 le 21 ; Marseille–Le Mans20h45 le 22.

Les journées1–10 sont sauvegardées dans research/ligue1-j01.json à j10.json. Les cinq derniers résultats de championnat de chaque équipe, rangs avant J11, buts pour/contre et séries domicile/extérieur sont détaillés dans research/analysis.json. **Ce relevé est limité au championnat**, sans prétention de couvrir coupes ou compétitions européennes. Aucune absence médicale ou lecture tactique non confirmée n’est annoncée.

Arguments réellement soutenus : cinq victoires successives du PSG en Ligue1 ; trois derniers déplacements perdus par Lyon, Lille invaincu chez lui ; Lens vainqueur de trois de ses cinq dernières journées ; Auxerre 18 buts encaissés sur ses cinq déplacements ; Marseille cinq victoires consécutives et Le Mans cinq journées sans victoire. Le2–0 de Lens est explicitement présenté comme risqué : Lens a encaissé à chaque journée. Monaco 3–1 est une opinion sur la défense adverse, malgré les cinq journées monégasques sans victoire. Les scores et la sélection du brief sont inchangés.

## Médias, logo et polices

Dix photos réelles CC0 récupérées via les métadonnées Wikimedia Commons : portraits de Clauss, Neves, André, Thomasson, Zakaria et Højbjerg, plus vues de Lille, Lens, Monaco et Marseille. Toutes les sources, auteurs, dates, licences et SHA-256 sont dans media.json ; crédits dans credits.md. Les portraits sont des **archives illustratives** : le film ne promet ni titularisation ni disponibilité des joueurs photographiés. Mention ARCHIVES visible pendant les séquences de match. Aucun vrai joueur généré par IA, faux écusson ou photo supposée de la rencontre à venir.

Le logo est le fichier officiel `https://ligueonze.fr/icon-512.png`, référencé dans Organization.logo sur le site et comparé visuellement avec l’image fournie dans le chat. Il est utilisé sans redessin dans la conclusion. Le site utilise Bricolage Grotesque et Figtree, identifiées dans son CSS ; les fichiers latins sont conservés localement avec leurs licences SIL OFL. Barlow Condensed ExtraBold, déjà dans le projet et sous OFL, apporte la compacité des titres et scores.

## Réalisation

Remotion 4.0.544 / React / TypeScript, composition `FiveScores`, 1080×1920 à 30 fps. Durée 49,1667s, soit 1 475 images. Rendu PNG intermédiaire et conversion BT.709 limitée, H.264/yuv420p, AAC 48kHz. Remotion répond au brief ; Hyperframes reste disponible sans conversion de cette production ni nouveau skill.

Séparer les fichiers : données matches.json, analyse research/, voix voiceover.txt, timings mesurés timings.json, photos/licences media.json ; composants Design.tsx, Score.tsx, Scenes.tsx et index.tsx. Plans photographiques et masques déterministes pilotés par frames. Cinq compositions différentes ; recadrages internes distincts, transitions recouvrantes de0,28s pour conserver le plan sortant. Les anciennes productions et fonctionnalités restent intactes.

## Voix, sous-titres et mix

Voix de travail Piper 1.8.0 / fr_FR-siwis-medium, génération locale sans API payante. Modèle et corpus déclarés dans voice-model-card.md et media.json (SIWIS, CC BY4.0). Ce choix ne prétend pas être la voix masculine professionnelle finale. Aucune clé ElevenLabs, aucun enregistrement humain prétendu.

Chaque phrase est synthétisée dans un WAV séparé. Les frontières de sous-titres sont calculées à partir des **échantillons réellement produits**, puis conservées dans timings.json / captions.srt. Pas d’alignement mot à mot ni de minutage déduit d’un nombre de mots. Les pauses et fins de scènes sont ajoutées explicitement, avec frontières à 30 fps. L’assemblage existant est conservé pour éviter une régénération inutile.

Zone dédiée x110–930, y1400–1600 ; scores, dates, statistiques et signature au-dessus. Sous-titres Figtree 52px, sur deux lignes au maximum contrôlées. Pas de paragraphes graphiques doublant toute l’analyse. Marges conservatrices pour réseaux sociaux ; aucun test d’intégration natif Instagram/TikTok revendiqué.

Impacts et transitions synthétisés par make-sfx.py, originaux locaux, sans musique commerciale. Voix normalisée, mix limité avec marge, AAC au rendu. Un son natif peut être ajouté ultérieurement sur les plateformes. L’absence de saturation est contrôlée numériquement ; les limites de l’écoute sont indiquées dans examination.json / quality-review.json.

## Reprise et commandes

Prérequis déjà présents : Node 24, Chromium `/usr/bin/chromium`, FFmpeg/ffprobe. Aucun changement nécessaire des dépendances JavaScript.

```bash
npm ci
npm run typecheck
node productions/cinq-scores-v4/render.mjs stills
node productions/cinq-scores-v4/render.mjs render
node productions/cinq-scores-v4/render.mjs inspect
python productions/cinq-scores-v4/examine.py
```

Le rendu réutilise le mix livré ; il n’appelle aucun générateur vocal. Pour modifier la narration, installer l’outil local facultatif :

```bash
python -m venv .cache/piper-venv
.cache/piper-venv/bin/pip install -r productions/cinq-scores-v4/requirements-voice.txt
mkdir -p .cache/piper-models
curl -fL https://huggingface.co/rhasspy/piper-voices/resolve/main/fr/fr_FR/siwis/medium/fr_FR-siwis-medium.onnx -o .cache/piper-models/siwis.onnx
curl -fL https://huggingface.co/rhasspy/piper-voices/resolve/main/fr/fr_FR/siwis/medium/fr_FR-siwis-medium.onnx.json -o .cache/piper-models/siwis.onnx.json
.cache/piper-venv/bin/python productions/cinq-scores-v4/make-voice.py
python productions/cinq-scores-v4/make-sfx.py
```

Après un changement de voix/durée, reporter la durée et les scènes de timings.json dans manifest.json avant rendu, puis refaire les contrôles. Le futur import d’une voix ElevenLabs nécessite une piste réelle et son alignement, sans supposer que les repères de la voix de travail conviendront.

Studio : `npm run studio -- --port=3000`, composition FiveScores. Les données et courbes programmatiques s’éditent dans JSON/TypeScript ; les scènes ont leurs unités temporelles. Les scripts de contrôle ne prétendent pas fournir un montage éditorial autonome.

## Livraison et contrôles

Le MP4 et les résultats effectifs du contrôle final sont dans delivery/, technical.json, layout-checks.json, examination.json et quality-review.json. Le rendu n’est déclaré terminé qu’après présence et décodage du vrai fichier. La planche et les chronologies sont extraites du MP4 lui-même, pas seulement de la composition source. L’échantillonnage d’images ne certifie pas à lui seul la perception en lecture réelle à 30 fps. Le mix est une version de travail, aucune piste ElevenLabs finale n’est prétendue contrôlée.

La légende se trouve dans publication.txt ; le SRT et le script vocal sont livrés séparément. Photos, polices, audio, données, code et notices sont repris dans l’archive modifiable, sans modèle vocal de 61Mo ni node_modules. Aucune publication sur un réseau social ni aucun achat effectué.

Contrôles effectifs finaux :1 475 images,30fps, H.264/yuv420p plage limitée, AAC48kHz stéréo, décodage complet ;57 sondes de mise en page sans erreur ; aucune image noire détectée selon les seuils enregistrés ; crête audio −4,98dBFS. Planche issue du MP4, six raccords et trois recadrages examinés à15fps. Les deux corrections finales sont consignées dans quality-review.json.
