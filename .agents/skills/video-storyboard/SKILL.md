---
name: video-storyboard
description: Traduire chaque idée en actions visuelles et scènes distinctes.
---

# video-storyboard

Écrire storyboard.md : pour chaque scène, sens, objet qui explique, état initial/final, action, texte court, lien avec la suivante, temps de lecture. Choisir des scènes variées : détail, vue d’ensemble, transformation, preuve par média fourni. Ne pas faire un diaporama de cartes identiques. La continuité d’un objet doit porter le raisonnement. Écrire timings.json : {basis, durationSeconds, scenes:[{id,startSeconds,endSeconds}], events:[{id,atSeconds,purpose}]}. Sans voix, basis=editorial-estimate. Avec voix, appeler voice import ou elevenlabs et lier sceneIds des segments à la vraie chronologie. Les durées éditoriales ne sont jamais dites mesurées. Maintenir des arrêts de lecture ; les transitions ne sont pas obligatoires. Renseigner keyframesSeconds et transitionSeconds du manifeste pour le contrôle.
