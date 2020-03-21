import constants from './constants';
import Booking from "./Booking";
import Timer from "./Timer";

class Canvas {
    constructor() {
        this.canvas = document.getElementById('canvas');
        // définition du contexte
        this.context = this.canvas.getContext('2d');
        this.submitElt = document.getElementById('sign');
        this.resetElt = document.getElementById('reset');
        this.begin = false;
        this.paint = false;
        this.x = null;
        this.y = null;
        this.contratElt = document.getElementById('contract');
    }

    init() {
        console.log("Le canvas s'affiche.");
        this.initStyle();
        this.signatureCanvas();
        this.clearCanvas();
        this.validateEvt();
        this.clearEvt();
    }

    initStyle() {
        constants.sectionCanvas.classList.remove('section-canvas-none');
        constants.sectionCanvas.classList.add('section-canvas');

        this.canvas.height = 200;
        if (window.innerWidth < 398) {
            this.canvas.width = 320;
        } else if (window.innerWidth < 321) {
            this.canvas.width = 300;
        } else {
            this.canvas.width = 350;
        }
        this.contratElt.style.display = 'inline';
        this.submitElt.style.display = 'inline';
        this.resetElt.style.display = 'inline';
    }

    draw() {
        if (!this.begin) {
            this.context.beginPath(); // on démarre un nouveau tracé
            this.context.moveTo(this.x, this.y);
            this.begin = true;
        } else {
            this.context.fillStyle = 'black';
            this.context.lineWidth = 3;
            this.context.lineTo(this.x, this.y);
            this.context.stroke();
        }
    }

    signatureCanvas() {
        let _this = this;

        this.canvas.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();

            _this.paint = true;
            _this.x = (e.pageX - this.canvas.offsetLeft);
            _this.y = (e.pageY - this.canvas.offsetTop);
        });

        this.canvas.addEventListener('mousemove', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (_this.paint === true) {
                _this.x = (e.pageX - this.canvas.offsetLeft) - 3;
                _this.y = (e.pageY - this.canvas.offsetTop) - 3;
                _this.draw();
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            this.paint = false;
            this.begin = false;
        });

        this.canvas.addEventListener('touchstart', (e) => {
            _this.paint = true;
            _this.x = (e.touches[0].pageX - this.canvas.offsetLeft);
            _this.y = (e.touches[0].pageY - this.canvas.offsetTop);
        });

        this.canvas.addEventListener('touchmove', (e) => {
            if (_this.paint === true) {
                _this.x = (e.touches[0].pageX - this.canvas.offsetLeft);
                _this.y = (e.touches[0].pageY - this.canvas.offsetTop);
                _this.draw();
                e.preventDefault();
            }
        });

        this.canvas.addEventListener('touchend', () => {
            _this.paint = false;
            _this.begin = false;
        });
    }

    clearCanvas() {
        this.context.clearRect(0, 0, constants.canvas.width, constants.canvas.height);
    }

    clearEvt() {
        let _this = this;
        this.resetElt.addEventListener('click', () => {
            _this.clearCanvas();
        });
    }

    validateReservation() {
        constants.canvasVerification.width = this.canvas.width;
        constants.canvasVerification.height = this.canvas.height;

        this.dataUrl = constants.canvas.toDataURL();
        let dataUrlVerif = constants.canvasVerification.toDataURL();

        if (this.dataUrl === dataUrlVerif) {
            alert('Merci de signer pour confirmer la réservation');
            console.log("L'internaute n'a pas signé");
        } else {
            console.log("L'internaute a signé, confirmant ainsi la réservation du vélo.");
            new Booking().start(this.dataUrl, new Date());
            new Timer().start();
        }
    }

    validateEvt() {
        let _this = this;
        this.submitElt.addEventListener('click', () => {
            _this.validateReservation();
        });
    }
}

export default Canvas;