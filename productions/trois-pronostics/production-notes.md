# Ligue Onze — 3 pronostics, 1 changement

**État : version technique provisoire, non publiable.** Référence et recherche : 19 novembre 2026. Aucune affiche, date, forme récente ou probabilité sportive n’est déclarée validée. Les six équipes sont des emplacements A à F. Les trois scores sont exclusivement des exemples graphiques, pas des pronostics. Cette réserve est visible pendant tout le film et structurée dans matches.json / release-status.json.

## Recherche et blocage précis

Le proxy HTTPS renvoie `CONNECT tunnel failed, response 403` pour `www.premierleague.com`, `www.uefa.com`, `site.api.espn.com`, `www.football-data.co.uk` et `ligueonze.fr`. Les requêtes exactes figurent dans sources.json. `raw.githubusercontent.com` permet de lire les calendriers communautaires OpenFootball 2026–27 ; ils ne constituent pas une corroboration officielle des horaires ni de la forme récente. Ils ne sont donc pas utilisés comme faits dans la vidéo.

Pour lever le blocage : autoriser la consultation HTTPS des calendriers officiels (Premier League et/ou UEFA), ou fournir des documents officiels récents, avec dates/heures et informations de forme. Il faudra ensuite remplir les données, proposer des opinions sportives argumentées, enlever le statut provisoire seulement après vérification, rerendre et contrôler. Aucun calendrier fictif n’a été inventé pour combler ce manque.

## Production

Remotion 4.0.544 / React / TypeScript, composition `ThreePredictions`, 810 images à 30 fps, 1080 × 1920, 27 secondes. Rendu PNG intermédiaire avec conversion BT.709 à plage limitée, pour obtenir réellement yuv420p plutôt que la variante pleine plage yuvj420p. Remotion est demandé explicitement ; Hyperframes, déjà installé, n’est pas nécessaire à cette composition. Aucun nouveau skill ni dépendance. Les anciennes compositions et vidéos restent conservées.

Raccords par masques avec chevauchement de 0,3 s : le plan sortant reste sous le plan entrant pour éviter un flash noir. Six séquences indépendantes dans Studio : accroche, trois exemples, défi, signature. Données dans matches.json, styles et transitions dans design.tsx, équipes/scènes dans Scenes.tsx, score dans Score.tsx, marque dans Brand.tsx. Le calcul des animations est déterministe à partir des frames. Les listes et courbes calculées restent éditables dans le code/JSON ; les scènes et textes disposent de repères dans Studio. Aucun minutage n’est présenté comme extrait d’une voix.

## Médias et droits

Graphismes vectoriels et bruitages originaux fabriqués localement. Aucune photographie, image IA, joueur réel, logo inventé ou musique commerciale. Polices locales Barlow Condensed ExtraBold et Inter, notices SIL Open Font License jointes dans public/productions/pronos-17-nov/fonts/. REF-001 est une référence de mise en scène : apparition ordonnée, trio et recomposition ; aucun média de cette référence n’est réutilisé ou publié.

Le fichier/composant `components/icons/BrandMarkIcon.tsx` est absent de ce dépôt vidéo ; aucune ressource officielle de logo trouvée dans src/ ou public/. Le site est bloqué. La signature utilise donc uniquement les mots LIGUE ONZE, conformément au fallback du brief. La police du site n’a pas pu être vérifiée ; ce choix ne prétend pas en être la reproduction exacte.

## Audio et sous-titres

Source mono 48 kHz, mix exporté AAC stéréo : impacts procéduraux courts sur accroche, révélations et changements d’étape, sans musique ni voix. La synthèse est reproductible : `python productions/trois-pronostics/make-audio.py`. Niveau source normalisé à −10 dBFS pour garder de la marge. Le mix exporté fait l’objet d’une mesure séparée dans audio-checks.json ; l’absence de saturation ne remplace pas une écoute analytique, qui n’est pas revendiquée. Aucun achat ni appel de génération vocale.

voiceover.txt contient le conducteur vocal et ses emplacements à compléter ; timings.json contient uniquement des choix éditoriaux estimés. Pas de faux SRT synchronisé sans audio. Zone de sous-titres réservée x100–935, y1350–1570 : aucun titre, date, décor ou score dans cette zone. Les contenus importants s’arrêtent plus haut ; marge droite de145 px, haut145 px et bas350 px minimum. Les interfaces sociales peuvent évoluer : vérifier l’aperçu natif avant une future publication.

## Reprendre et rendre

Depuis la racine du dépôt :

```bash
npm ci
npm run typecheck
python productions/trois-pronostics/make-audio.py
node productions/trois-pronostics/render.mjs render
```

Prérequis : Node24, Chromium `/usr/bin/chromium`, FFmpeg/ffprobe, déjà présents dans cet environnement. Le script réalise le MP4, 28 images de contrôle et leurs mesures HTML, la couverture, les vérifications du codec/débit d’images/durée et un décodage complet. `stills` ne rend que les captures ; `inspect` vérifie un export déjà produit. Ce chemin dédié accepte une piste de bruitages sans la déclarer à tort comme voix dans le contrat historique atelier.

```bash
npm run studio -- --port=3000
# Composition : ThreePredictions
```

Après modification des données ou du code, relancer le rendu ; ne pas réutiliser un rapport d’une ancienne version. Les sources jointes incluent les manifestes des anciennes compositions nécessaires au bundler, sans recopier leurs exports vidéo. Aucun réseau social ni configuration d’environnement n’est publié.

## Livrables

- delivery/ligue-onze-3-pronostics.mp4 : version technique marquée provisoire.
- delivery/couverture.png : image verticale, même statut.
- delivery/six-moments.png : planche du MP4 exporté.
- delivery/sources-remotion.zip : projet modifiable, données, script et notices.
- storyboard.md / timings.json : découpage et événements.
- quality/mouvement-1.mp4 à mouvement-5.mp4 : extraits de contrôle locaux (non versionnés), avec chronologies échantillonnées associées.
- publication.txt : texte de publication préparé, marqué brouillon.
- technical.json, layout-checks.json, quality-review.json, audio-checks.json et checksums.json : contrôles et empreintes.

L’état publiable dépend d’abord de la validation sportive, pas du succès technique du rendu. La voix, la synchronisation vocale et le logo officiel restent facultatifs/manquants et sont signalés ; aucune vérification absente n’est revendiquée.
