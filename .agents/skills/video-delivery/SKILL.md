---
name: video-delivery
description: Livrer la vidéo et ses sources modifiables avec les contrôles et les informations de reprise adaptés.
---

# video-delivery

Vérifier le fichier final courant, sa cohérence avec les sources et les rapports, et l'examen de qualité complété. Livrer un MP4 téléchargeable dans le format et à la cadence demandés, les sources modifiables, médias/licences, instructions courtes et limites concrètes. Ajouter sous-titres séparés si produits, planche ou extraits de contrôle utiles, et archive du projet. Ne pas promettre une synchronisation, un format ou un débit seulement préparé mais non testé. H.264/yuv420p et AAC si audio constituent un choix courant de livraison, à adapter au besoin réel.

Remotion : conserver manifeste, timings, sources et quality/technical.json ; pour60fps, utiliser render/inspect avec --final puis examiner les transitions à ce débit. Le CLI historique atelier est limité à30/60fps et600s : choisir une chaîne adaptée si la demande dépasse ce contrat. Utiliser `python3 scripts/package-delivery.py <slug> final` (ou preview) pour les projets atelier après revue complète.

Hyperframes : conserver index, scènes, assets locaux, notices et commandes via le lanceur cloud ; documenter les contrôles réellement exécutés. FFmpeg : conserver les originaux accessibles, le conducteur/points de coupe et les commandes ou scripts d'assemblage. Les contrôles et archives spécifiques à ces chaînes ne sont pas supposés produits par le packager Remotion.

Garder empreintes et cache des médias sans secret. Ne pas commiter voix privée ou exports lourds par défaut ; sauvegarder sources et documents, puis indiquer les livrables. Ne pas publier l'environnement ou la vidéo sur une plateforme sans demande. Faire un commit local si demandé, pousser seulement si autorisé.
