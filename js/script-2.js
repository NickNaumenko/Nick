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



// if (window.matchMedia("(min-width: 768px)").matches) {
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
  function handleMove(event) {
    event.preventDefault();
    let touches = event.changedTouches;
    let firstTouch = event.changedTouches[0].screenX;
    if (touches[0] - touches[touches.length - 1] > 0) {
      alert("hello");
      s.showNext();
    } else if (touches[0] - touches[touches.length - 1] < 0) {
      alert("hello");
      s.showPrev();
    }
    alert(touches.length);
  }
// }
