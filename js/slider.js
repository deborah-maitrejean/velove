var Slider = {
  items: null,
  current: null,
  slideInterval: null,
  playing: null,
  _this: '',
  initSlider: function () {
    this.items = document.querySelectorAll('#slides li');
    this.current = 0;
    this.playing =  true;

    this.playSlideshow();
    this.controlSlideshow();

    _this = this;
  },

  playSlideshow: function () {
    pauseButton.innerHTML = 'Pause';
    this.playing = true;
    this.slideInterval = setInterval(this.nextSlide, 4000);
  },

  goToSlide: function (n) {
    this.items[this.current].className = 'slide';
    this.current = (n + this.items.length) % this.items.length;
    this.items[this.current].className = 'slide showing';
  },

  nextSlide: function () {
    Slider.goToSlide(Slider.current + 1);
  },

  previousSlide: function () {
    Slider.goToSlide(Slider.current - 1);
  },

  pauseSlideshow: function () {
    pauseButton.innerHTML = 'Jouer';
    this.playing = false;
    clearInterval(this.slideInterval);
  },

  controlSlideshow: function () {
    pauseButton.addEventListener('click', function () {
      if (Slider.playing) {
        Slider.pauseSlideshow();
      } else {
        Slider.playSlideshow();
      }
    }
  );
    next.addEventListener('click', function () {
      Slider.pauseSlideshow();
      Slider.nextSlide();
    }
  );
    previous.addEventListener('click', function () {
      Slider.pauseSlideshow();
      Slider.previousSlide();
    }
  );
    document.addEventListener('keydown', function (e) {
      if (e.keyCode === 37) {
        e.preventDefault();
        Slider.pauseSlideshow();
        Slider.previousSlide();
      } else if (e.keyCode === 39) {
        e.preventDefault();
        Slider.pauseSlideshow();
        Slider.nextSlide();
      }
    });
  },
};
Slider.initSlider();
