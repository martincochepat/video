# V4 — Ces 5 scores exacts, je les assume

**Production bloquée avant réalisation définitive, au 19 novembre 2026. Aucun MP4 V4 n’a été rendu.** Le brief interdit de remplacer les cinq affiches par des emplacements et impose la vérification officielle avant le script définitif. Les anciennes productions sont intactes.

## Constats réellement vérifiés

- Les requêtes HTTPS vers Ligue1.com, la LFP, le PSG et la FFF échouent au CONNECT du proxy, avec réponse403. Wikimedia Commons et ligueonze.fr échouent de la même façon.
- Le statut de l’environnement est courant et sa politique appliquée est `restricted`, avec le seul preset `package_managers`, sans domaine personnalisé. Les destinations précédentes ne sont pas autorisées. Ce constat décrit une restriction réseau ; il ne prouve pas qu’une rencontre est fausse.
- OpenFootball sur raw.githubusercontent.com est accessible. Les cinq affiches du brief y figurent aux dates annoncées. Cette concordance communautaire est conservée dans matches.json ; elle ne remplace pas la vérification officielle et ne valide ni la forme récente ni une justification sportive.
- Aucune photographie sportive ni aucun logo officiel n’a été trouvé dans les assets et pièces jointes accessibles comme fichiers. Le composant BrandMarkIcon.tsx demandé est absent. L’image de logo affichée dans le chat n’est pas disponible comme fichier local exploitable ; aucun tracé ni imitation n’est créé.
- Remotion, React, TypeScript, les polices locales, Chromium et FFmpeg sont disponibles. Pas de moteur vocal local `piper` ou `espeak` trouvé, aucune piste vocale définitive fournie et aucun secret ElevenLabs configuré dans le statut de cet environnement. Aucun appel payant effectué.

## Déblocage concret

Dans les paramètres de l’environnement de ce chat, compléter les domaines réseau avec la liste de network-access-needed.json, en conservant le preset existant. Les domaines clés sont ligue1.com / www.lfp.fr pour le calendrier, les sources de clubs pour les analyses, commons.wikimedia.org et upload.wikimedia.org pour consulter les fichiers et licences, ligueonze.fr pour l’identité. Les API et redirections pourront demander des domaines complémentaires une fois les pages accessibles. Le téléchargement d’une photo ne suffit pas à établir ses droits.

Aucun outil `cloud_environment.request_changes` n’est proposé dans cette session ; la modification de l’environnement actif passe donc par ses paramètres. Le brouillon de configuration et sa publication n’ont pas été modifiés. Aucune approbation automatique n’a refusé une action : les erreurs observées proviennent de la politique du proxy.

Autre voie : fournir les extraits officiels datés permettant de confirmer les affiches et la forme récente, des photos avec leurs licences/autorisations et le fichier du logo. Il n’est pas nécessaire de communiquer une clé API dans le chat.

Après changement, vérifier réellement :

```bash
python productions/cinq-scores-v4/check-access.py
```

Puis reprendre la liste de production-status.json : recherche sportive, script, narration de travail réelle, choix/licences des photographies, cinq séquences différentes, montage et contrôles. Si les données contredisent une affiche ou un score, la confirmation demandée dans le brief sera sollicitée avant remplacement. Aucun remplacement n’a eu lieu.

Cette préparation conserve la sélection exacte Nice–PSG1–3, Lille–Lyon2–1, Lens–Toulouse2–0, Monaco–Auxerre3–1, Marseille–Le Mans3–0. Les champs non vérifiés restent nuls dans les données de travail, et ne sont pas affichés dans une prétendue vidéo finale. Aucun scénario sportif générique n’a été inventé pour combler le blocage.
