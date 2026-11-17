# Ligue Onze — pronostics illustrés, V1 de 24 secondes

Le brief original est conservé dans brief-original.txt et le découpage dans storyboard.md. La vidéo affiche les quatre scores comme choix éditoriaux (« MES PRONOS »), jamais comme résultats déjà acquis.

## Réserves bloquantes pour publication

1. Calendrier : la page officielle UEFA n'a pas pu être lue (proxy CONNECT 403). Les affiches et l'horaire de 20 h 45 ne sont donc pas confirmés. Aucune date ni heure n'est annoncée comme établie dans la vidéo.
2. Logo : l'image fournie est visible dans le chat mais le fichier n'est pas disponible dans l'espace de rendu. Aucun logo de remplacement n'est dessiné. Le champ optionnel logoSrc est prêt pour le fichier officiel, rendu en object-fit contain sans recoloration.

Voir network-limit.md et release-status.json. Cette V1 est une version de travail complète en durée, pas une validation de publication. Aucun réseau social ou environnement n'est publié.

## Reproduire

```bash
npm run atelier -- render pronos-17-nov --final
python3 productions/pronos-17-nov/finalize.py
npm run atelier -- inspect pronos-17-nov --final
python3 productions/pronos-17-nov/inspect.py
node productions/pronos-17-nov/check-motion.mjs
```

finalize.py produit explicitement yuv420p en plage TV et faststart ; il conserve l'empreinte et les paramètres de rendu dans les métadonnées. inspect.py extrait les six scènes, dont l'image zéro et le premier score à 2,8 s, plus les extraits de raccords. Les sources de polices et de drapeaux, leurs licences et leurs empreintes sont conservées dans public/productions/pronos-17-nov et media.json.

Aucun son utilisé : version silencieuse, pas de voix synthétique, pas de musique commerciale ni de bruitages prétendument écoutés. Une version sonore demande des bruitages dont l'usage et l'écoute ont été validés.

## Compléter le logo

Importer le fichier original avec scripts/import-asset.mjs en indiquant sa provenance, puis renseigner logoSrc dans manifest.json avec le chemin public du fichier importé. Refaire rendu, normalisation et inspection. Ne jamais remplacer le logo par un tracé approximatif ou une variante générée.
