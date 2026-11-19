# Méthode de l’atelier vidéo généraliste

Cette méthode originale fonctionne dans Codex avec les skills du projet. Elle ne dépend d’aucun fichier privé de MotionLab. Une consigne déclenche le travail de l’agent ; il n’existe pas de moteur LLM caché dans le CLI, et la sélection des médias, le montage et les éventuelles scènes animées sont réalisés sur mesure selon le sujet.

## Choisir le montage

Commencer par [les modes de montage](editing-modes.md). Type de vidéo, marque, style et moteur sont des choix distincts. Le profil général s’applique à tous sujets sans charte imposée. Les commandes atelier détaillées ci-dessous décrivent le chemin Remotion ; Hyperframes et FFmpeg ont leurs propres étapes de rendu et de contrôle. Les médias réels fournis peuvent porter le montage à eux seuls ou être combinés à des animations.

## Une consigne

« Utilise video-director pour créer une vidéo verticale de 20 secondes sur [sujet], destinée à [public], profil général, sans voix. »

Ou : « Crée une vidéo Ligue Onze sur [sujet], avec les captures fournies, sans pseudos réels. »

Codex suit le directeur sans demander de validation pour chaque étape raisonnable. Il conserve brief → sources → scénario → storyboard → direction artistique → composition → contrôle → livraison. Si un fait sensible ou une donnée manque, il recherche une source primaire et conserve URL, date de consultation, extrait/affirmation et limites. Il n’invente ni chiffre ni logo. Le profil général est libre et distinct de Ligue Onze.

## Dossier de production

`npm run atelier -- new mon-sujet --brief "Ma consigne" --profile general`

- brief.md : idée centrale, cible, contraintes, hypothèses explicites.
- sources.json : status reviewed, affirmations et leurs sources, droits/provenance des médias.
- script.md : narration naturelle ou narration silencieuse.
- storyboard.md : temps, preuve visuelle, mouvement, arrêt de lecture et liaison.
- art-direction.md : choix motivés, palette, typographie et grammaire du mouvement.
- manifest.json : paramètres, scènes, voix, sous-titres, médias et images à inspecter.
- media.json : inventaire et empreintes ; public/productions/<id>/media/ : fichiers de rendu locaux.
- timings.json : horloge éditoriale ou repères fournis/fournisseur ; durée audio mesurée séparément.
- quality-review.json : six jugements visuels séparés, preuves et corrections.
- exports/ : MP4, métadonnées d’export, SRT éventuel.
- quality/preview ou final/ : contrôles techniques, images clés, planche et clips de transition.

Les fichiers de création et de provenance sont suivis par Git. Exports, galerie et caches sont ignorés ; les conserver avec les liens de livraison ou les archiver séparément. Une scène SVG n’est pas une donnée sportive : la démonstration espace est explicitement un schéma pédagogique.

## Composer, pas remplir un diaporama

Le CLI crée un brouillon, puis refuse de rendre une production non prête. Écrire `src/productions/MonSujet.tsx` et l’enregistrer dans `src/Workshop.tsx`. Utiliser WorkshopShell (polices, voix, captions, sonde QA). Mettre data-qa-text sur les textes HTML, pas sur les conteneurs de mise en page. Les textes sont droits. Exprimer les mouvements en secondes, puis en images avec useVideoConfig. Les trajectoires calculées restent éditables en code ; les titres Interactive sont éditables dans Studio. La production `espace` est un exemple football, pas un gabarit imposé à tous les sujets.

Des médias fournis peuvent être importés dans le cache avec `node scripts/import-asset.mjs <id> <fichier> --source "provenance et droits"`. Ne pas utiliser le nom d’un fichier comme preuve de droit. Pour Ligue Onze, uniquement le logo officiel/captures fournis ; aucun pseudo réel sans demande et aucune image IA par défaut.

## Audio optionnel

Voir audio.md. `voice` mesure le fichier et recale les scènes et événements sur des segments fournis, sans inventer de timings. Le début de la première scène conserve le pré-roll ; le dernier plan va jusqu’à la fin de l’audio. Les animations de la démo se recalent à l’intérieur des scènes ; pour une nouvelle production, lier les gestes importants aux événements de narration, pas uniquement au début des scènes.

Sous-titres : enabled/fontSize/maxChars et safeArea modifiables dans manifest.json. Les segments trop longs sont rejetés ; les scinder selon des repères audio vérifiés. Pas de transcription automatique installée ni de synchronisation déclarée mesurée à partir du seul texte. Le test audio-smoke est un signal sinusoïdal connu, pas une voix humaine.

ElevenLabs est préparé, mais non testé en réseau et non utilisé. Une future configuration devra fournir ELEVENLABS_API_KEY et permettre HTTPS api.elevenlabs.io ; n’entrer aucune clé dans le chat ou le dépôt. NODE_USE_ENV_PROXY=1 est nécessaire avec Node 24 dans ce cloud. `--allow-paid` ne remplace pas l’accord de l’utilisateur.

## Contrôle et exports

```bash
npm run typecheck
npm run test:atelier
npm run atelier -- render espace
npm run atelier -- inspect espace
npm run atelier -- render espace --final
npm run atelier -- inspect espace --final
node scripts/audio-smoke.mjs
npm run atelier -- skills
npm_config_cache=/workspace/.npm-cache npx --offline skills list --agent codex
```

Pour le chemin historique Remotion atelier : preview à 30 fps et option --final à 60 fps, même durée et mêmes mouvements. Pour les autres demandes, choisir la cadence et la chaîne adaptées comme indiqué dans editing-modes.md. H.264, 4:2:0, AAC seulement si audio. Chromium existant, pas de téléchargement de navigateur. Le cache du rendu comprend sources, paramètres, polices et médias concernés ; l’empreinte du MP4 est vérifiée avant réutilisation. Les fichiers audio sont adressés par SHA-256.

inspect contrôle ffprobe puis décode le MP4 entier. Il examine les boîtes de texte, polices et images HTML marquées aux instants clés et à ±1 image/±0,2 s des coupes. Il exporte aussi une seconde autour de chaque transition. Une planche n’évalue pas automatiquement la compréhension ; examiner les plans et ces séquences, puis remplir les six axes du quality-review. Les polices fallback, les SVG, le cadrage des médias et les éventuels recouvrements texte/image exigent un examen visuel. Ajouter des points clés pour les mouvements rapides ; l’échantillonnage ne prouve pas chaque image.

## Reprise cloud

Le projet garde `scripts/setup.sh`, Chromium et les dépendances verrouillées. Utiliser le checkout existant, sans worktree. Lire AGENTS.md et démarrer Studio via `npm run studio -- --port=3000`. Les processus ne sont pas conservés entre tâches. Les scripts de configuration cloud précédemment publiés n’ont pas été réappliqués ; aucun environnement n’est publié par l’atelier.

Après l’examen visuel, `python3 scripts/package-delivery.py <id> final` assemble le MP4, les contrôles, la planche, les séquences, les documents, les sources et les skills. Il refuse un examen incomplet ou un fichier dont l’empreinte ne correspond plus aux contrôles. La vérification du source courant reste celle de `inspect` : relancer cette commande après toute modification du code.
