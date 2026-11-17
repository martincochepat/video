---
name: video-director
description: Piloter une vidéo complète depuis une seule consigne dans Codex.
---

# video-director

Point d’entrée par défaut pour toute demande de vidéo. Lire AGENTS.md et les skills officiels remotion-best-practices, remotion-create, remotion-markup et remotion-render. Utiliser le checkout existant, aucun worktree. Cette méthode est notre atelier original, sans fichiers privés ni affiliation MotionLab.
1. Inférer sujet, public, idée centrale et profil ; défaut general, vertical 1080×1920, preview 30 fps, sans voix. Choisir ligue-onze seulement pour ce sujet. Ne poser de question que si un droit, une source ou un média indispensable manque ; poursuivre le reste.
2. Exécuter `npm run atelier -- new <slug> --brief "<consigne>" --profile general`. Le dossier est un brouillon, pas une vidéo terminée.
3. Appliquer dans l’ordre video-research, video-script, video-storyboard, video-art-direction, puis video-voice si configuré. Ce sont des étapes de travail de cet agent, pas une obligation de lancer des sous-agents.
4. Produire les fichiers manquants et coder une composition sur mesure dans src/productions/<slug>.tsx. L’ajouter au registre src/Workshop.tsx avec le même identifiant. Ne pas réutiliser la composition football pour un autre sujet. Ne pas remplir automatiquement un gabarit de cartes.
5. Renseigner manifest.json et timings.json, status=ready seulement après validation éditoriale. Avec narration, importer ses timings avant de fixer les scènes. `npm run atelier -- render <slug>` doit réellement réussir.
6. Appliquer video-quality, corriger puis rerendre. Appliquer video-delivery. Finir avec lien MP4 absolu, résultats vérifiés et limites. Ne pas annoncer les futurs tests comme déjà passés. Une seule consigne déclenche le travail dans Codex ; le CLI n’est ni un LLM ni un service autonome de recherche.
