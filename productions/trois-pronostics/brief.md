# MISSION CODEX — PRODUCTION REEL LIGUE ONZE
## « 3 PRONOSTICS. 1 SEUL CHANGEMENT. »

Tu es un réalisateur de contenus sportifs, directeur artistique senior, motion designer et développeur Remotion expert.

Ta mission est de produire **une vidéo verticale complète, professionnelle, prête à publier sur Instagram Reels, Facebook Reels et TikTok**.

Ne te limite pas à proposer un storyboard, du code ou des recommandations : **réalise, rends et contrôle la vidéo finale**.

Travaille dans l'environnement de production existant. Exploite en priorité les skills et outils réellement disponibles, notamment Remotion, FFmpeg et Hyperframes si installé et pertinent.

Ne réinitialise pas le projet et ne modifie pas les fonctionnalités existantes de l'application Ligue Onze.

---

# 1. CONCEPT ÉDITORIAL

**Titre de travail :** « 3 pronostics. 1 seul changement. Tu modifies lequel ? »

Le concept repose sur un défi très simple :

« Je te donne trois scores exacts. Tu n'as le droit d'en changer qu'un seul. Lequel ? »

Présenter trois grandes rencontres de football à venir avec un pronostic crédible pour chacune.

Le spectateur doit identifier le pronostic qu'il considère comme le moins probable et proposer son propre score en commentaire.

La vidéo doit donner envie de contredire les pronostics, de défendre son équipe et de revenir après les matchs.

**Objectifs, dans cet ordre :**
1. Capter l'attention dès la première seconde.
2. Maintenir la curiosité jusqu'au troisième pronostic.
3. Déclencher des commentaires spontanés.
4. Inciter à suivre le compte pour découvrir les résultats.
5. Faire connaître Ligue Onze sans publicité intrusive.

Ne pas promettre de taux de viralité.

---

# 2. CONFIGURATION TECHNIQUE

- Format : 1080 × 1920 pixels.
- Ratio : 9:16.
- Fréquence : 30 FPS.
- Durée cible : 22 à 28 secondes.
- Export : MP4 H.264, yuv420p, audio AAC si présent.
- Composition Remotion avec animations pilotées par frames.
- Respect strict des zones de sécurité Instagram, Facebook et TikTok.
- Aucune typographie inclinée, déformée ou en diagonale.
- Aucun rendu de type diaporama PowerPoint.
- Aucun visuel manifestement généré par IA représentant des joueurs réels.

Produire un montage fluide, rythmé, premium et immédiatement compréhensible sur smartphone.

---

# 3. RECONNAISSANCE DU PROJET

Avant de développer :

1. Inspecter la structure du dépôt.
2. Identifier les scripts Remotion et les compositions existantes.
3. Lire les instructions AGENTS.md, les skills installés et les conventions du projet.
4. Identifier les composants graphiques réutilisables.
5. Rechercher le logo officiel Ligue Onze.
6. Identifier les outils réellement disponibles pour la recherche de médias, le montage, la génération audio et le rendu.

Le logo officiel est prioritaire.

Dans le projet Ligue Onze, rechercher notamment le composant `components/icons/BrandMarkIcon.tsx` si ce chemin existe.

Si le logo est défini en React ou SVG, le réutiliser fidèlement. Ne jamais inventer une imitation du logo.

Ne pas supposer que des photographies, rushs ou pistes audio sont déjà présents.

Ne pas ajouter de dépendances lourdes si une solution existante suffit.

---

# 4. SÉLECTION DES TROIS MATCHS

La vidéo doit être pertinente au moment de sa publication.

**Date de référence : 19 novembre 2026.**

Si aucune date de publication différente n'est fournie, sélectionner trois rencontres réellement programmées après cette date.

Choisir de préférence des affiches proches dans le temps, connues et susceptibles de générer des débats.

Vérifier pour chaque rencontre :

- Équipes participantes.
- Date et heure.
- Compétition.
- Forme récente.
- Résultats récents pertinents.
- Informations sportives utiles et disponibles.
- Probabilité relative des scénarios envisagés.

Les scores proposés doivent résulter d'une analyse sportive raisonnable, et non d'un choix arbitraire destiné à provoquer artificiellement des réactions.

Ne pas annoncer de certitude sur un score exact.

**Condition impérative :** ne jamais inventer une affiche, une date, un résultat ou une statistique.

Si l'environnement ne permet pas de vérifier les rencontres avec des sources fiables, ne pas publier de fausses informations. Préparer une version technique avec des données explicitement provisoires, puis signaler le blocage avant de considérer la vidéo comme publiable.

Conserver un fichier de production documentant les sources, la date de vérification et les pronostics sélectionnés.

---

# 5. DIRECTION ARTISTIQUE LIGUE ONZE

## Identité

- Fond principal : `#080B0E`.
- Vert signature : `#C8FF00`.
- Blanc : `#F6F7F8`.
- Gris secondaire : sobre et peu contrasté.

L'ensemble doit évoquer un média football premium, avec une direction artistique sportive contemporaine.

Références d'intention : habillage éditorial sportif, graphiques de compétition, réalisation télévisuelle et motion design professionnel.

Ne pas copier les éléments protégés d'une chaîne ou d'un média.

## Photographies

Utiliser de préférence des photographies sportives réelles, vérifiées et dont les droits permettent l'utilisation prévue.

Ne pas créer de fausses photographies de joueurs ou de rencontres.

Si aucune photographie exploitable n'est disponible, privilégier une composition typographique premium avec des éléments graphiques originaux plutôt que des images artificielles.

## Typographie

Utiliser une police condensée et puissante pour les titres, avec une police lisible pour les informations secondaires.

Tous les textes restent parfaitement horizontaux.

Les scores doivent être les éléments visuels dominants des séquences de pronostics.

## Animations

Privilégier :
- Entrées typographiques franches.
- Transitions fluides et rapides.
- Révélations progressives des scores.
- Animations de compteurs et d'éléments sportifs.
- Masques et mouvements de caméra maîtrisés.
- Accents lumineux discrets.
- Micro-animations synchronisées au rythme.

Éviter :
- Transitions répétitives.
- Zooms agressifs sans justification.
- Glitch systématique.
- Effets 3D gratuits.
- Particules excessives.
- Animations qui ralentissent la compréhension.

Chaque transition doit servir la narration.

---

# 6. STORYBOARD DE RÉFÉRENCE

Ce storyboard est une base éditoriale. Ajuster les durées pour améliorer le rythme sans dépasser inutilement la durée cible.

## SÉQUENCE 1 — HOOK (0:00–0:03)

Écran sombre.

Apparition rapide d'un titre imposant :

**« 3 SCORES EXACTS. »**

Puis :

**« TU N'EN CHANGES QU'UN. »**

Animation nette, percutante, synchronisée avec un impact sonore.

La première seconde doit être visuellement forte.

Ne pas afficher d'introduction générique ou de logo en plein écran.

## SÉQUENCE 2 — PREMIER PRONOSTIC (0:03–0:08)

Présenter la première affiche.

Mettre en avant :
- Les deux équipes.
- Le numéro 01.
- Le score exact proposé.

Révéler le score avec une animation marquante mais lisible.

## SÉQUENCE 3 — DEUXIÈME PRONOSTIC (0:08–0:13)

Présenter la deuxième affiche.

Utiliser une composition légèrement différente de la précédente afin d'éviter une répétition mécanique.

Le score reste le point central.

## SÉQUENCE 4 — TROISIÈME PRONOSTIC (0:13–0:18)

Présenter la troisième affiche.

Accentuer légèrement la tension musicale et visuelle.

La révélation du troisième score doit donner envie de revoir les trois choix.

## SÉQUENCE 5 — LE DÉFI (0:18–0:24)

Afficher les trois affiches dans une composition claire.

Numéroter visiblement :

**01 — Match 1**

**02 — Match 2**

**03 — Match 3**

Puis poser la question :

**« TU CHANGES LEQUEL ? »**

Sous-question :

**« ET TU METS QUEL SCORE ? »**

Cette séquence est essentielle : le spectateur doit pouvoir répondre immédiatement sans réfléchir à la mécanique.

## SÉQUENCE 6 — SIGNATURE (0:24–0:27)

Terminer par une signature courte :

**LIGUE ONZE**

**« Les pronos se jouent entre potes. »**

Afficher le logo officiel s'il est disponible.

Ajouter éventuellement `ligueonze.fr`, discrètement.

Ne pas transformer cette séquence en publicité longue.

La dernière image doit rester propre et professionnelle.

---

# 7. VOIX OFF ET AUDIO

Prévoir une narration naturelle, énergique et crédible, dans le style d'un créateur de contenu football professionnel.

Pas de voix robotique, pas d'exagération artificielle et pas de ton publicitaire.

## Proposition de narration

« Trois matchs. Trois scores exacts.

Mais attention : t'as le droit d'en changer qu'un seul.

Premier match : [équipe] contre [équipe]. Je vois [score].

Deuxième match : [équipe] contre [équipe]. Mon prono : [score].

Troisième match : [équipe] contre [équipe]. Je tente [score].

Maintenant, à toi.

Un, deux ou trois ?

Tu changes lequel… et tu mets quoi à la place ? »

Adapter la formulation à la durée réelle et aux rencontres sélectionnées.

## Workflow vocal

Si une piste de voix off est disponible, l'intégrer et synchroniser précisément les animations sur son rythme.

Si aucune voix off n'est disponible :
- Préparer le script définitif.
- Préparer un fichier de timing exploitable.
- Construire une version visuellement complète.
- Ne pas utiliser une voix synthétique médiocre uniquement pour remplir le silence.
- Prévoir l'intégration ultérieure d'une voix ElevenLabs.

Si un moteur vocal professionnel est réellement disponible et autorisé, il peut être utilisé.

## Musique

Ambiance sportive, énergique, moderne et légèrement tendue.

Ne pas intégrer de musique commerciale sans droits appropriés.

Si aucune musique exploitable n'est disponible, prévoir une piste temporaire ou un mixage sans musique, en conservant la possibilité d'ajouter un son natif dans Instagram ou TikTok.

Les effets sonores doivent renforcer les révélations, sans saturer le mixage.

---

# 8. SOUS-TITRES ET ZONES DE SÉCURITÉ

**Contrainte prioritaire issue de nos précédentes vidéos : aucun texte décoratif ne doit gêner les sous-titres.**

Sur les vidéos précédentes, des mentions telles que « 9 juillet 2006 — Berlin » ou « Reconstitution graphique » occupaient une zone utilisée ensuite pour les sous-titres.

Ne pas reproduire ce problème.

Règles :
- Réserver une zone stable pour les sous-titres de la narration.
- Ne placer aucun texte secondaire dans cette zone.
- Garder les informations accessoires dans un coin discret si elles sont réellement nécessaires.
- Éviter les textes trop proches du bas de l'écran.
- Garder les scores et les titres suffisamment hauts pour rester visibles avec l'interface des plateformes.
- Ne jamais superposer sous-titres, scores et mentions informatives.

Si les sous-titres sont intégrés dans la vidéo, utiliser une typographie claire, contrastée, synchronisée et parfaitement lisible.

Ne pas afficher des paragraphes entiers à l'écran.

---

# 9. IMPLÉMENTATION REMOTION

Créer une composition structurée, maintenable et réutilisable.

Séparer autant que possible :
- Les données des rencontres.
- Les pronostics.
- Le script de narration.
- Les composants de présentation des équipes.
- Les composants de score.
- Les transitions.
- Les éléments de marque.
- La configuration audio.
- Les paramètres de rendu.

Les données doivent pouvoir être modifiées sans réécrire toutes les animations.

Utiliser les primitives Remotion adaptées : `useCurrentFrame`, `interpolate`, `spring`, `Sequence`, `AbsoluteFill`, et les outils audio disponibles selon la version installée.

Prévoir une composition exportable en ligne de commande.

Ne pas utiliser d'animations CSS dépendant du temps réel qui pourraient produire des rendus incohérents.

Veiller à la reproductibilité du rendu image par image.

---

# 10. CONTRÔLE QUALITÉ

Ne pas considérer le travail terminé simplement parce que le rendu MP4 a réussi.

Effectuer les vérifications suivantes :

1. Le MP4 existe et se lit correctement.
2. Le format est bien 1080 × 1920.
3. La fréquence est de 30 FPS.
4. La durée correspond à l'objectif.
5. Les trois affiches sont exactes et vérifiées.
6. Les scores sont clairement identifiés comme des pronostics.
7. Aucun texte ne sort du cadre.
8. Aucun texte important n'est masqué par les interfaces sociales.
9. Les sous-titres ne chevauchent aucun autre élément.
10. Les transitions sont fluides.
11. Les images ne sont ni étirées ni pixelisées.
12. Le logo officiel est correctement utilisé.
13. L'audio est propre, sans saturation.
14. La vidéo se comprend même sans le son.
15. Le CTA final est lisible et compréhensible.

Extraire plusieurs captures à des moments clés et les inspecter visuellement.

Corriger les défauts détectés avant livraison.

---

# 11. LIVRABLES

Produire, si l'environnement le permet :

**A. Vidéo finale**
- `ligue-onze-3-pronostics.mp4`

**B. Projet source**
- Composition Remotion et composants nécessaires.

**C. Script vocal**
- `voiceover.txt`

**D. Données sportives**
- `matches.json` contenant les rencontres et scores proposés.

**E. Documentation**
- `production-notes.md` comprenant les sources sportives, la date de vérification, les médias utilisés, les droits identifiés et les éventuelles limites.

**F. Visuel de couverture**
- Image verticale cohérente avec le montage, portant le titre :
  « 3 PRONOSTICS. 1 SEUL CHANGEMENT. »

**G. Texte de publication**
- Une légende Instagram/Facebook courte et engageante.
- Une question incitant à commenter.
- Quelques hashtags pertinents, sans accumulation excessive.

---

# 12. CONSIGNES D'EXÉCUTION

Travaille de manière autonome.

Ne demande pas de validation intermédiaire pour le storyboard, les animations, les transitions ou la mise en page.

Prends les décisions créatives nécessaires en privilégiant la qualité du résultat.

N'effectue aucune publication automatique sur les réseaux sociaux.

N'effectue aucun achat de médias ou de services payants sans autorisation explicite.

N'invente aucune information pour contourner une limite technique.

**Ordre de travail :**

1. Inspecter l'environnement et les skills.
2. Vérifier les rencontres.
3. Sélectionner trois pronostics.
4. Écrire le script final.
5. Définir les timings.
6. Développer la composition Remotion.
7. Intégrer les médias autorisés.
8. Produire le montage.
9. Exporter le MP4.
10. Contrôler visuellement et techniquement le rendu.
11. Corriger les défauts.
12. Fournir les livrables et leurs chemins.

**Critère de réussite :** une vidéo qui ressemble à un véritable contenu éditorial football professionnel, pas à une démonstration technique ni à une publicité générée automatiquement.

Le résultat doit donner envie de regarder jusqu'au bout, de choisir un pronostic à modifier et de défendre son choix en commentaire.