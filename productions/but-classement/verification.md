# Vérifications de la séquence

- Rendu réellement effectué avec Chromium existant : 1080 × 1920, H.264, 60 images/s, 480 images, exactement 8 secondes, aucune piste audio. Aucun appel à une API payante.
- TypeScript : passé.
- Décodage intégral du MP4 avec FFmpeg : passé.
- Sonde de mise en page aux 41 images clés et autour des événements : aucune erreur sur les textes HTML principaux, les zones sûres et la police locale.
- Contrôle des trois rectangles de classement à chacune des 480 images : aucune intersection ; ordre final Noé 13, Sacha 12, Mila 10 vérifié.
- Six instants examinés : 1,35 ; 2,70 ; 3,15 ; 4,70 ; 5,60 ; 7,25 secondes.
- Trois extraits produits et examinés par séquences d’images à 12 fps : tir/filet (2,05–3,55 s), signal/compteur (3,15–4,95 s), permutation (4,75–6,75 s).
- Corrections après examen : entrées davantage séquencées et texte final sans retour à la ligne indésirable.
- La première démonstration est conservée ; son empreinte a été comparée à ses métadonnées d’origine et n’a pas changé. Une copie est incluse dans delivery pour comparaison.

## Limites et écarts avec les références

Les captures fournies ne permettent aucune mesure de leur vitesse ou de leur fluidité. La chorégraphie est notre proposition. Les personnages, les matières et les ombres restent plus simples ; notre scène n’intègre ni capture réelle ni photographie. Les petits libellés de statut et de navigation sont des détails secondaires : les informations narratives (noms, points, conséquence) sont plus grandes.

L’examen visuel est celui de l’agent, sur des images et extraits échantillonnés, pas une étude utilisateur ou une inspection visuelle de toutes les images. La sonde HTML ne couvre pas la totalité des tracés SVG. Aucune référence privée ou image IA utilisée, aucun logo inventé, aucun changement d’architecture et aucun nouveau skill.

## Reproduire

```bash
npm run atelier -- render but-classement --final
npm run atelier -- inspect but-classement --final
node productions/but-classement/check-choreography.mjs
python3 productions/but-classement/inspect-motion.py
```

Le découpage est dans decoupage.md, l’analyse des références dans references.md. Les fichiers de delivery sont volontairement versionnés avec cette séquence pour conserver les résultats et la comparaison, sans dépendre du cache ignoré.
