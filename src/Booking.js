import constants from './constants';

class Booking {
    init(name) {
        sessionStorage.setItem('Nom de la station', name);
    }

    start(dataUrl, date) {
        sessionStorage.setItem('Signature', dataUrl);
        sessionStorage.setItem('Date', date);
    }

    inProgressStyle() {
        constants.btnTimerElmt.style.display = 'none';
        constants.signDivElt.style.display = 'none';
        constants.pTimerElmt.style.display = 'none';
        constants.endTimerMessage.style.display = 'none';
        constants.noReservation.style.display = 'block';
        constants.loading.style.display = 'none';
        constants.detailsStation.classList.remove('details-station');
        constants.detailsStation.classList.add('details-station-none');
        document.getElementById('streetViewMap').style.display = 'none';
    }

    setTime(minutes, seconds) {
        sessionStorage.setItem('min', minutes);
        sessionStorage.setItem('sec', seconds);
    }

    checkTime() {
        return sessionStorage.getItem('min') !== null && sessionStorage.getItem('sec') != null;
    }

    getTime() {
        return (sessionStorage.getItem('min') * 60) + parseInt(sessionStorage.getItem('sec'));
    }

    checkSign() {
        return sessionStorage.getItem('Signature') !== null;
    }

    getSign() {
        return sessionStorage.getItem('Signature');
    }

    reset() {
        return alert('Attention : la nouvelle réservation effacera la précédente.');
    }

    end() {
        console.log('Les données de la session sont effacées.');
        sessionStorage.clear();
    }
}

//Uncaught TypeError: Cannot assign to read only property 'exports' of object '#<Object>'
//module.exports = Booking;
// -> can't mix import and module.exports

export default Booking;