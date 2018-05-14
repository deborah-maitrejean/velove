var Canvas = {
    canvas: null,
    context: null,
    submitElt: null,
    resetElt: null,
    _this: '',
    begin: false,
    paint: false,
    x: null,
    y: null,

    init: function (e) {
        console.log('Le canvas s\'affiche.');
        _this = this;
        this.canvas = document.getElementById('canvas');
        this.submitElt = document.getElementById('sign');
        this.resetElt = document.getElementById('reset');
        this.contratElt = document.getElementById('contract');
        this.initStyle();

        // définition du contexte
        this.context = this.canvas.getContext('2d');

        this.signatureCanvas();
        this.clearCanvas();
        this.validateEvt();
        this.clearEvt();
    },

    initStyle: function () {
        sectionCanvas.classList.remove('section-canvas-none');
        sectionCanvas.classList.add('section-canvas');
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
    },

    draw: function () {
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
    },

    signatureCanvas: function () {
        this.canvas.addEventListener('mousedown', function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.paint = true;
            _this.x = (e.pageX - this.offsetLeft);
            _this.y = (e.pageY - this.offsetTop);
        });

        this.canvas.addEventListener('mousemove', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (_this.paint === true) {
                _this.x = (e.pageX - this.offsetLeft) - 3;
                _this.y = (e.pageY - this.offsetTop) - 3;
                _this.draw();
            }
        });

        this.canvas.addEventListener('mouseup', function (e) {
            _this.paint = false;
            _this.begin = false;
        });

        this.canvas.addEventListener('touchstart', function (e) {
            _this.paint = true;
            _this.x = (e.touches[0].pageX - this.offsetLeft);
            _this.y = (e.touches[0].pageY - this.offsetTop);
        });

        this.canvas.addEventListener('touchmove', function (e) {
            if (_this.paint === true) {
                _this.x = (e.touches[0].pageX - this.offsetLeft);
                _this.y = (e.touches[0].pageY - this.offsetTop);
                _this.draw();
                e.preventDefault();
            }
        });

        this.canvas.addEventListener('touchend', function (e) {
            _this.paint = false;
            _this.begin = false;
        });
    },

    clearCanvas: function () {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
    },

    clearEvt: function () {
        this.resetElt.addEventListener('click', function () {
            _this.clearCanvas();
        });
    },

    validateReservation: function () {
        canvasVerification.width = this.canvas.width;
        canvasVerification.height = this.canvas.height;

        this.dataUrl = canvas.toDataURL();
        var dataUrlVerif = canvasVerification.toDataURL();

        if (this.dataUrl == dataUrlVerif) {
            alert('Merci de signer pour confirmer la réservation');
            console.log('L\'internaute n\'a pas signé');
        } else {
            console.log('L\'internaute a signé, confirmant ainsi la réservation du vélo.');
            Timer.init();
        }
    },

    validateEvt: function () {
        this.submitElt.addEventListener('click', function () {
            Canvas.validateReservation();
        });
    },
};
