import constants from './constants';

//import FooBar from './foo-bar' // <-- Usage: myFooBar = new FooBar()
import Booking from './Booking';
import ContractModal from './ContractModal';

class Timer {
    constructor() {
        this.duration = 20 * 60;
        this.timer = this.duration;
        this.intervalId = '';
        this.min = constants.min;
        this.sec = constants.sec;
        //this.onComplete = null;constants.
    }

    start() {
        let _this = this;
        this.intervalId = setInterval(() => {
            _this.update();
        }, 1000);
        this.updateDisplay();

        console.log('Le compte a rebours est lancé.');

        this.initStyle();
        this.cancel(); // la
    }

    update() {
        let _this = this;
        this.timer--;
        this.updateDisplay();

        if (this.timer === 0) {
            clearInterval(_this.intervalId);
            //if (_this.onComplete) _this.onComplete();
            console.log('Les 20 minutes se sont écoulées.');
            _this.stop();
            _this.endingStyle();
            console.log('Fin de la réservation.');
        }
    }

    updateDisplay() {
        let minutes = Math.floor(this.timer / 60);
        let seconds = this.timer % 60;
        this.min.textContent = minutes.toString();
        this.sec.textContent = seconds.toString();

        if (new Booking().checkSign()) {
            new Booking().setTime(minutes.toString(), seconds.toString());
            new ContractModal().init();
        }
    }

    remainingTime() {
        if (new Booking().checkTime() && new Booking().checkSign()) {
            console.log('Une réservation est en cours.');
            this.timer = new Booking().getTime();

            this.initStyle();
            this.start();
            this.cancel(); //la
            new ContractModal().init();
        } else {
            this.timer = this.duration;
            this.stop();
        }
    }

    cancel() {
        let _this = this;
        constants.btnTimerElmt.addEventListener('click', () => {
            console.log('Annulation de la réservation.');
            _this.stop();
        });
    }

    stop() {
        let _this = this;
        clearInterval(_this.intervalId);
        new Booking().end();
        _this.endingStyle();
    }

    initStyle() {
        new ContractModal().end();
        constants.bookingContainer.style.display = 'none';
        constants.noReservation.style.display = 'none';
        constants.pTimerElmt.style.display = 'block';
        constants.btnTimerElmt.style.display = 'block';
        constants.signDivElt.style.display = 'block';
        constants.imgElt.src = new Booking().getSign();
    }

    endingStyle() {
        constants.btnTimerElmt.style.display = 'none';
        constants.signDivElt.style.display = 'none';
        constants.pTimerElmt.style.display = 'none';
        constants.endTimerMessage.style.display = 'block';
        constants.bookingContainer.style.display = 'block';
        constants.loading.style.display = 'block';
        constants.sectionCanvas.classList.add('section-canvas-none');
        constants.sectionCanvas.classList.remove('section-canvas');
        constants.detailsStation.classList.remove('details-station');
        constants.detailsStation.classList.add('details-station-none');
        document.getElementById('streetViewMap').style.display = 'none';
        new ContractModal().end();

        setTimeout(() => {
            constants.endTimerMessage.style.display = 'none';
            constants.noReservation.style.display = 'block';
        }, 2000);
    }
}

new Timer().remainingTime();

//module.exports = Timer;
export default Timer;