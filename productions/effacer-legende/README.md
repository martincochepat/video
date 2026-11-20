# Effacer une légende — Football Stories

Épisode autonome : Messi, Cristiano Ronaldo, Zidane, Ronaldinho. 88 secondes, portrait 1080×1920, 30 images/s. **Aucune voix et aucun sous-titre intégré**, selon le choix confirmé de l’utilisateur. Script français séparé : `voiceover.txt` ; repères éditoriaux : `script.md` et `timings.json`. Aucun alignement vocal mesuré, puisque la voix sera ajoutée ensuite.

## Reprise et rendu

Depuis la racine du dépôt :

```bash
bash scripts/setup.sh
npm run typecheck
node productions/effacer-legende/render.mjs stills
node productions/effacer-legende/render.mjs render
node productions/effacer-legende/render.mjs inspect
python productions/effacer-legende/verify-episode.py
```

Studio : `npm run studio -- --port=3000`, composition **EraseLegend**. Source React : `src/productions/erase-legend/`. Le script de rendu appelle le même moteur Remotion que l’atelier, avec contrôles adaptés à l’absence de voix et de sous-titres. Chromium `/usr/bin/chromium`, concurrence4, PNG, H.264/CRF17, BT.709/yuv420p, AAC192k. Aucun service payant ni clé.

L’extraction des planches et les contrôles audio du script Python demandent Pillow et NumPy (déjà présents ici).

La piste audio locale est une composition instrumentale originale + bruitages synthétisés. Pour la régénérer : Python avec NumPy et FFmpeg, `python productions/effacer-legende/make-audio.py`. Ce n’est pas une génération vocale ; aucune bibliothèque Piper n’est utilisée. Le fichier WAV versionné permet de rendre sans cette étape optionnelle.

## Contenu et droits

`brief.md` contient le brief reçu ; les choix confirmés ultérieurement (sans voix/sous-titres) prévalent sur sa proposition initiale. `sources.json` vérifie les faits ; `media.json` fournit les fichiers, empreintes, auteurs et licences ; `credits.md` accompagne la diffusion. `publication.txt` contient un lien public vers les crédits à conserver.

Photos et trophées réels, aucune image IA, aucune vidéo de match non autorisée. Les photographies servent parfois d’illustrations génériques de carrière : Ronaldo Portugal2013 ne représente pas la finale2016 ; Zidane2006 ne représente ni1998 ni2002 ; Ronaldinho2007 ne représente pas la finale2006. La volée est un dessin original simplifié, pas une reconstitution mesurée. Le cadrage frontal de Zidane provient d’une conférence de2015.

REF-001 inspire les transformations et rangements d’objets, les apparitions ordonnées et la profondeur. Sa vidéo, son avatar et ses visuels ne sont pas repris. La couleur et la typographie restent celles de Ligue Onze. Les productions précédentes sont conservées.

## Livraison et contrôle

Le MP4 est dans `delivery/`. Les sondes de texte et images contrôlent les polices, les médias chargés, les marges et la zone réservée y1400–1600. Elles ne prouvent pas à elles seules l’absence de tout chevauchement ou la qualité du mouvement. Voir `quality-review.json` et `technical.json` pour les contrôles effectivement terminés et leurs limites.
