---
name: video-art-direction
description: Adapter la direction visuelle au sujet, aux médias, à la marque et au type de montage.
---

# video-art-direction

Lire brief, conducteur/storyboard, profil de marque éventuel et références sélectionnées. Écrire art-direction.md : palette, polices, hiérarchie, cadrages, traitement des médias, mouvement et rôle des sous-titres. Le profil général laisse ces choix ouverts ; aucune couleur, fonte, mascotte ou scène sportive n'est imposée. Ligue Onze possède sa propre charte, réservée aux projets qui la demandent.

Pour rushs, interviews ou documentaire, travailler composition des plans, recadrages, continuité d'image et habillage pertinent. Pour motion design, concevoir des objets et scènes spécifiques à l'idée. Pour une capture d'écran, préserver les détails utiles et l'ordre des actions. Lire les références techniques du moteur choisi : Remotion markup/interactivity pour React ; Hyperframes pour HTML/GSAP ; FFmpeg pour traitement et assemblage des médias.

Employer les logos et médias effectivement fournis ou autorisés, conserver provenance et licences, ne pas inventer un logo réel. Les illustrations de reconstitution sont distinguées de documents authentiques. Les règles de charte du projet priment sur le style d'une référence. Conserver les textes lisibles et les zones de sécurité correspondant au format cible ; les tailles du vertical1080px ne sont pas des règles universelles pour tous les formats.

Les mouvements ont une intention et des temps de lecture. Éviter d'ajouter par défaut particules, rebonds, zooms ou flous ; choisir les procédés adaptés au style demandé. En Remotion, employer useCurrentFrame/useVideoConfig, Interactive et WorkshopShell lorsque pertinent, avec balises QA. En Hyperframes, respecter les timelines déterministes, clips et scènes éditables. Ne pas mêler les API des deux moteurs. Conserver les trajectoires calculées dans un code modifiable et documenté. Contrôler le rendu à la cadence effectivement livrée.
