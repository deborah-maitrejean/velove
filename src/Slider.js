import constants from './constants';

class Slider {
    constructor(nextBtn, pauseBtn, prevBtn, items) {
        this.nextBtn = nextBtn;
        this.pauseBtn = pauseBtn;
        this.prevBtn = prevBtn;
        this.items = items;
        this.current = 0;
        this.slideInterval = null;
        this.playing = true;
    }

    init() {
        this.play();
        this.controls();
    }

    play() {
        let _this = this;
        this.pauseBtn.innerHTML = 'Pause';
        this.playing = true;

        this.slideInterval = setInterval(() => {
            _this.next();
        }, 4000);
    }

    goTo(n) {
        this.items[this.current].className = 'slide';
        this.current = (n + this.items.length) % this.items.length;
        this.items[this.current].className = 'slide showing';
    }

    next() {
        this.goTo(this.current + 1);
    }

    previous() {
        this.goTo(this.current - 1);
    }

    pause() {
        let _this = this;
        this.pauseBtn.innerHTML = 'Jouer';
        this.playing = false;
        clearInterval(_this.slideInterval);
    }

    controls() {
        let _this = this;
        this.pauseBtn.addEventListener('click', () => {
            if (_this.playing) {
                _this.pause();
            } else {
                _this.play();
            }
        });
        this.nextBtn.addEventListener('click', () => {
                _this.pause();
                _this.next();
            }
        );
        this.prevBtn.addEventListener('click', () => {
                _this.pause();
                _this.previous();
            }
        );
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 37) {
                e.preventDefault();
                _this.pause();
                _this.previous();
            } else if (e.keyCode === 39) {
                e.preventDefault();
                _this.pause();
                _this.next();
            }
        });
    }
}

new Slider(
    constants.nextBtn,
    constants.pauseBtn,
    constants.prevBtn,
    document.querySelectorAll('#slides li'),
).init();