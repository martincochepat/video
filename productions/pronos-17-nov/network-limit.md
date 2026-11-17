# Vérification sportive préalable — blocage identifié

La page officielle `https://www.uefa.com/uefanationsleague/fixtures-results/` a été demandée avant la programmation. Le proxy cloud refuse la connexion HTTPS à `www.uefa.com` : HTTP CONNECT 403. Aucun contenu du calendrier n’a été obtenu. Il est donc impossible d’affirmer que les quatre affiches et l’horaire de 20 h 45 correspondent au mardi 17 novembre 2026.

Le jour calendaire et le fuseau sont vérifiables localement : il s’agit bien d’un mardi ; 20 h 45 à Paris correspond à 19 h 45 UTC. Cela ne confirme pas les rencontres. Aucune affiche n’est déclarée incorrecte sans source permettant de l’établir. Les scores sont conservés comme choix éditoriaux, et la vidéo n’annonce ni date ni heure non confirmée.

Pour effectuer la vérification : autoriser l’accès HTTPS à `www.uefa.com` dans les paramètres réseau, puis relire le calendrier officiel. D’autres domaines ne doivent être ajoutés que si une redirection ou une API effectivement nécessaire est identifiée. Aucun contournement réseau ou changement de configuration n’a été effectué.

Logo : l’image est visible dans le chat mais absente du répertoire des pièces jointes accessible au moteur. Une URL HTTPS directe du fichier officiel a été demandée. Le composant est prêt à l’utiliser sans recoloration, en object-fit contain ; aucun substitut de logo n’est fabriqué.
