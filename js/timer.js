/*----- Timer -----*/
var Timer = {
    min: null,
    sec: null,
    intervalId: null,
    dataUrl: null,
    _this: '',

    init: function () {
        _this = this;
        this.min = 20;
        this.sec = 0;

        this.initStyle();
        this.resetCounter();
        this.counter();
        this.reservation();
        this.cancelEvt();

        console.log('Le compte a rebours est lancé.');
    },

    initStyle: function () {
        Modal.end();
        reservationContainer.style.display = 'none';
        noReservation.style.display = 'none';
        pTimerElmt.style.display = 'block';
        btnTimerElmt.style.display = 'block';
        signDivElt.style.display = 'block';
        imgElt.src = sessionStorage.getItem('Signature');
    },

    reservation: function () {
        var currentDate = new Date();
        sessionStorage.setItem('Date', currentDate);
        imgElt.src = Canvas.dataUrl;
        sessionStorage.setItem('Signature', Canvas.dataUrl);
    },

    counter: function () {
        Timer.intervalId = setTimeout(Timer.counter, 1000);
        if (Timer.min === 0 && Timer.sec === 0) {
            sessionStorage.clear();
            console.log('Les 20 minutes se sont écoulées.');
            console.log('Les données de la session sont effacées.');
            Timer.endingStyle();
            Timer.resetCounter();
        } else if (Timer.min === 20 && Timer.sec === 0) {
            Timer.min = Timer.min - 1;
            Timer.sec = 59;
        } else if (Timer.min < 1 && Timer.min !== 0 && Timer.sec <= 59 && Timer.sec !== 0) {
            Timer.sec = Timer.sec - 1;
        } else if (Timer.min < 20 && Timer.min !== 0 && Timer.sec !== 0) {
            Timer.sec = Timer.sec - 1;
        } else if (Timer.min < 20 && Timer.min !== 0 && Timer.sec === 0) {
            Timer.min = Timer.min - 1;
            Timer.sec = 59;
        } else if (Timer.min === 0 && Timer.sec <= 59) {
            Timer.sec = Timer.sec - 1;
        }

        counterMin.textContent = Timer.min;
        counterSec.textContent = Timer.sec;

        if (sessionStorage.getItem('Signature') !== null) {
            sessionStorage.setItem('Minutes', counterMin.textContent);
            sessionStorage.setItem('Secondes', counterSec.textContent);
            Modal.init();
        }
    },

    resetCounter: function () {
        clearTimeout(Timer.intervalId);
    },

    remainingCounter: function () {
        if (sessionStorage.getItem('Minutes') !== null && sessionStorage.getItem('Secondes') != null) {
            console.log('Une réservation est en cours.');
            Timer.min = sessionStorage.getItem('Minutes');
            Timer.sec = sessionStorage.getItem('Secondes');
            Timer.initStyle();
            Timer.counter();
            Timer.cancelEvt();
            Modal.init();
        } else {
            sessionStorage.clear();
            Timer.resetCounter();
            Modal.end();
        }
    },

    endingStyle: function () {
        btnTimerElmt.style.display = 'none';
        signDivElt.style.display = 'none';
        pTimerElmt.style.display = 'none';
        endTimerMessage.style.display = 'block';
        reservationContainer.style.display = 'block';
        chargement.style.display = 'block';
        sectionCanvas.classList.add('section-canvas-none');
        sectionCanvas.classList.remove('section-canvas');
        detailsStation.classList.remove('details-station');
        detailsStation.classList.add('details-station-none');
        document.getElementById('streetViewMap').style.display = 'none';
        Modal.end();

        setTimeout(function () {
            endTimerMessage.style.display = 'none';
            noReservation.style.display = 'block';
        }, 2000);

        console.log('Fin de la réservation.');
    },

    cancelEvt: function () {
        btnTimerElmt.addEventListener('click', function () {
            console.log('L\'internaute a cliqué sur Annuler.');
            sessionStorage.clear();
            console.log('Les données de la session sont effacées.');
            Timer.endingStyle();
            Timer.resetCounter();
        });
    },
};
Timer.remainingCounter();
