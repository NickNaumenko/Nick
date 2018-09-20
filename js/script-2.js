const list = document.querySelector(".works__list");

const buttonPrev = document.querySelector(".slider__prev");
const buttonNext = document.querySelector(".slider__next");




function Slider(slider) {
  this._slider = document.querySelector(slider);
  this._frame = this._slider.querySelector(".slider__frame");
  this._prev = this._slider.querySelector(".slider__prev");
  this._next = this._slider.querySelector(".slider__next");
  this._path = 0;
}

Slider.prototype.showNext = function() {
  if (this._path <= -580) {
    return;
  }
  this._path -= 580;
  this._frame.style.transform = `translateX(${this._path}px)`;
}

Slider.prototype.showPrev = function() {
  if (this._path >= 580) {
    return;
  }

  this._path += 580;
  this._frame.style.transform = `translateX(${this._path}px)`;
}



if (window.matchMedia("(min-width: 768px)").matches) {
  const s = new Slider(".slider");

  list.addEventListener("wheel", (event) => {
    let delta = event.deltaY || event.detail || e.wheelDelta;

    if (delta > 0) {
      s.showNext();
    }

    if (delta < -0) {
      s.showPrev();
    }

    event.preventDefault();
  });

  buttonPrev.addEventListener("click", (event) => {
    event.preventDefault();

    s.showPrev();
  });

  buttonNext.addEventListener("click", (event) => {
    event.preventDefault();

    s.showNext();
  });



  list.addEventListener("touchmove", handleMove);
  list.addEventListener("touchend", handleEnd);

  let firstTouch = 0, touches;

  function handleMove(event) {
    event.preventDefault();
    touches = event.changedTouches;
    firstTouch = firstTouch ? firstTouch : event.changedTouches[0].screenX;
  }

  function handleEnd(event) {
    console.log(firstTouch);
    console.log(touches[0].screenX);
    if (!firstTouch) return;

    if (touches[0].screenX - firstTouch > 0) {
      s.showPrev();
      firstTouch = 0;
    } else if (touches[0].screenX - firstTouch < 0) {
      s.showNext();
      firstTouch = 0;
    }
  }
}
