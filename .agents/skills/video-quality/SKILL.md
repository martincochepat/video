---
name: video-quality
description: Tester le rendu et corriger les défauts techniques et artistiques.
---

# video-quality

Exécuter typecheck, puis `npm run atelier -- render <slug>` et `npm run atelier -- inspect <slug>`. Les contrôles doivent lire le MP4 courant, pas un ancien fichier. Examiner contact-sheet.png, key-*.png et transition-*.mp4. Les snapshots du navigateur vérifient les boîtes de texte et zones sûres aux images échantillonnées ; cela ne prouve pas tous les instants. Contrôler aussi polices, médias, absence de chevauchements, lisibilité mobile, entrée/sortie des objets, cohérence des données et durée de lecture. Remplir quality-review.json avec six évaluations séparées : compréhension, composition, variété, mouvement, rythme, cohérence ; chaque évaluation cite des instants et des corrections, jamais un score prétendument automatique. Marquer pass seulement après examen. Si un défaut apparaît, corriger, rerendre et réinspecter. Le rapport technique, le jugement humain et les contrôles non exécutés doivent rester distincts. Ajouter si nécessaire des instants à keyframesSeconds et tester un intervalle dense autour d’un mouvement. Aucune livraison finale avec erreur technique inexpliquée.
