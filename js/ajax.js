/*---------- Appel ajax ----------*/
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    // La requête est asynchrone lorsque le 3ème paramètre vaut true ou est absent
    req.open('GET', url);
    // Gestion de l'événement indiquant la fin de la requête
    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) { //Le serveur a réussi à traiter la requête
            // Appelle la fonction callback en cas de succcès en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            // Affichage des informations sur l'échec du traitement de la requête
            console.error(req.status + ' ' + req.statusText + ' ' + url);
        }
    });

    req.addEventListener('error', function () {
        // La requête n'a pas réussi à atteindre le serveur
        console.error('Erreur réseau avec l\'URL ' + url);
    });

    req.send(null); // réinitialise
}
