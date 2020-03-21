/*---------- Appel ajax ----------*/
class Ajax {
    constructor(url, callback) {
        this.url = url;
        this.callback = callback;
    }

    get() {
        let _this = this;
        let req = new XMLHttpRequest();
        // La requête est asynchrone lorsque le 3ème paramètre vaut true ou est absent
        req.open('GET', this.url);
        // Gestion de l'événement indiquant la fin de la requête
        req.addEventListener('load', () => {
            if (req.status >= 200 && req.status < 400) { //Le serveur a réussi à traiter la requête
                // Appelle la fonction callback en cas de succcès en lui passant la réponse de la requête
                _this.callback(req.responseText);
            } else {
                // Affichage des informations sur l'échec du traitement de la requête
                console.error(req.status + ' ' + req.statusText + ' ' + this.url);
            }
        });

        req.addEventListener('error', function () {
            // La requête n'a pas réussi à atteindre le serveur
            console.error('Erreur réseau avec l\'URL ' + this.url);
        });

        req.send(null); // réinitialise
    }
}

module.exports = Ajax;