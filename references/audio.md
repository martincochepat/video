# Audio et timings

Aucun appel payant automatique. Sans clé ElevenLabs, le mode silencieux et l’import restent utilisables.

```json
[{"text":"Attirer la défense.","startSeconds":0.2,"endSeconds":2.4,"sceneId":"attract"},
 {"text":"Puis décaler le jeu.","startSeconds":3,"endSeconds":5,"sceneId":"switch"}]
```

Ces repères sont fournis par l’utilisateur ou un outil d’alignement. Le système mesure uniquement la durée par ffprobe ; il conserve leur provenance. Vérifier l’alignement à l’écoute. Les scènes commencent au premier segment correspondant ; la première commence à zéro pour garder le pré-roll, la dernière se termine à la durée audio mesurée. Les événements héritent de la même horloge.

Pour ElevenLabs, le CLI with-timestamps sauvegarde audio et repères de caractères fournisseur dans le cache et propose des segments par phrase. Attribuer explicitement sceneId à chaque segment et réimporter ; aucun rendu n’utilise silencieusement une répartition estimée. La clé reste dans ELEVENLABS_API_KEY ; accès HTTPS api.elevenlabs.io à configurer plus tard.

Les sous-titres utilisent ces segments, pas un faux alignement mot à mot. maxChars=48 est une limite de segment ; scinder manuellement avec des temps réels si nécessaire. Les scènes et sous-titres sont paramétrables dans le manifeste.
