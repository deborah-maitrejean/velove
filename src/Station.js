import constants from './constants';
import Booking from "./Booking";
import Canvas from "./Canvas";

class Station {
    init() {
        constants.detailsStation.classList.remove('details-station');
        constants.detailsStation.classList.add('details-station-none');
        constants.modalLink.style.display = 'none';
    }

    displayDetails(station) {
        console.log("L'internaute a cliqué sur une station, les données de cette dernière s'affichent.");

        constants.loading.style.display = 'none';
        constants.sectionCanvas.classList.add('section-canvas-none');
        constants.sectionCanvas.classList.remove('section-canvas');
        constants.bookingContainer.style.display = 'block';
        constants.streetViewMap.style.display = 'block';
        constants.detailsStation.classList.add('details-station');
        constants.detailsStation.classList.remove('details-station-none');

        constants.titleElt.textContent = `Station N° ${station.name}`;
        constants.divElt.innerHTML = `<b>Adresse</b> : ${station.address}`;
        constants.div2Elt.innerHTML = `<b>Statut</b> :  ${station.status}`;
        constants.div3Elt.innerHTML = `<b>Nombre de vélos disponibles</b> : ${station.availableBikes}`;
        constants.div4Elt.innerHTML = `<b>Nombre de points d'attache opérationnels</b> : ${station.bikeStands}`;
        constants.div5Elt.innerHTML = `<b>Dernière mise à jour</b> : ${station.maj}`;
    }

    check(station) {
        if (this.open(station.status) && this.availableBikes(station.availableBikes)) {
            constants.btnReserverElt.style.display = 'block';
            constants.pElt.style.display = 'none';
            constants.p2Elt.style.display = 'none';

            constants.btnReserverElt.addEventListener('click', () => {
                console.log('Click sur le bouton "Réserver".');
                if (new Booking().checkSign()) {
                    console.log('Nouvelle réservation.');
                    new Booking().reset();
                    new Booking().end();
                    new Booking().inProgressStyle();
                } else {
                    // qd réservatione cours il passe dans if puis dans else, ne dvrait passer que dans if
                    constants.detailsStation.classList.remove('details-station');
                    constants.detailsStation.classList.add('details-station-none');
                    document.getElementById("streetViewMap").style.display = 'none';
                }

                new Booking().init(station.name);
                new Canvas().init();
                constants.titreCanvas.textContent = `Station N° ${station.name}`;
            });
        } else if (this.open(station.status) && this.availableBikes(station.availableBikes) === false) {
            this.empty();
        } else {
            this.closed();
        }
    }

    open(status) {
        if (status === 'ouverte') {
            return true;
        }
    }

    availableBikes(available) {
        return available !== 0;
    }

    empty() {
        constants.btnReserverElt.style.display = 'none';
        constants.pElt.style.display = 'block';
        constants.pElt.textContent = 'Aucun vélo disponible dans cette station.';
    }

    closed() {
        constants.btnReserverElt.style.display = 'none';
        constants.p2Elt.style.display = 'block';
        constants.p2Elt.textContent = 'La station est fermée.';
    }
}

export default Station;