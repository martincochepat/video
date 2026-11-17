---
name: video-delivery
description: Livrer MP4 et dossier de production reproductible avec preuves de contrôle.
---

# video-delivery

Vérifier status=ready, quality/technical.json courant et quality-review.json complété sans défaut bloquant. Livrer exports/preview.mp4 ou final.mp4 avec lien de chemin absolu ; inclure contact-sheet.png, captions.srt s’il existe une narration, manifest.json, timings.json, script.md, sources.json et résumé des limitations. Pour 60 fps : `npm run atelier -- render <slug> --final` puis `inspect <slug> --final` et examiner les transitions à ce débit. H.264, yuv420p ou yuvj420p, AAC si audio. Ne pas dire que 60 fps est testé si seule la preview a tourné. Garder médias et audios en cache avec empreinte, sans clé. Ne pas commiter voix privée ni exports lourds par défaut ; conserver sources/instructions/rapports et indiquer où sont les livrables. Ne pas publier l’environnement. Faire un commit local si demandé, ne pousser que si autorisé.

Assembler les fichiers accompagnants avec `python3 scripts/package-delivery.py <slug> final` (ou preview). Le script refuse des empreintes incohérentes ou un examen visuel incomplet. Livrer aussi le ZIP.
