const list = document.querySelector(".works__list");
const children = list.children;
const childrenCount = children.length;
const slider = document.querySelector(".slider");

const buttonPrev = document.querySelector(".slider__prev");
const buttonNext = document.querySelector(".slider__next");




function Slider(slider) {
  this._slider = document.querySelector(slider);
  this._frame = this._slider.querySelector(".slider__frame");
  this._slides = this._slider.querySelectorAll(".slider__item");

  this._prev = this._slider.querySelector(".slider__prev");
  this._next = this._slider.querySelector(".slider__next");
  this._position = 0;
};

Slider.prototype.moveSlide = function(elem) {
  let coords = this._frame.getBoundingClientRect().left;
  this._position = Math.round(coords / 580);

  let a = this._position * 580 - coords;

  let transitionTime = Math.abs( (this._position * 580 - coords) / 600 );

  if (this._position * 580 <= -3 * 580) {
    elem.style.transitionDuration = "0s";
    console.log(this._frame.style);
    console.log(this._position);
    this._position = Math.round(elem.getBoundingClientRect().left / 580);

    elem.style.transform = `translateX(${0 - a}px)`;
    this._position = 0;
  }

  setTimeout( () => {
    // elem.style.transitionDuration = `${transitionTime}s`;
    elem.style.transitionDuration = `${transitionTime}s`;
    elem.style.transform = `translateX(${this._position * 580}px)`;
  }, 4);


  setTimeout( () => {
    this._frame.style.transitionDuration = "";
  }, 1100);

};



Slider.prototype.drag = function(elem, events) {
  const self = this;
  let dragObject = {};

  function handleDown(event) {
    if (event.which && event.which != 1) return;

    let elem = event.target.closest(".slider__frame");
    if (!elem) return;

    dragObject.elem = elem;
    dragObject.startPosition = dragObject.elem.getBoundingClientRect().left;
    dragObject.downX = getEventPosition(event, events[3]);

    dragObject.elem.ondragstart = function() {
      return false;
    };

    document.addEventListener(events[1], handleMove);
    document.addEventListener(events[2], handleUp);
  }


  function handleMove(event) {
    if (!dragObject.elem) return;
    clearSelection();
    let move = getEventPosition(event, events[3]) - dragObject.downX;

    if ( Math.abs(move) < 3 ) return;

    dragObject.position = getEventPosition(event, events[3]) - dragObject.downX +
      dragObject.startPosition;

    moveAt(dragObject.elem, dragObject.position);

    // self.replace();

  }

  function handleUp(event) {
    document.removeEventListener(events[1], handleMove);
    document.removeEventListener(events[2], handleUp);

    self.moveSlide(dragObject.elem);

    dragObject = {};
  }

  function getEventPosition(event) {
    if (event instanceof MouseEvent) return event.pageX;
    if (event instanceof TouchEvent) return event.changedTouches[0].pageX;
  }

  function moveAt(elem, position) {
    console.log(position);
    // elem.style.transform = `translateX(${position}px)`;
    elem.style.transform = `matrix(1,0,0,1,${position},0)`;
  }

  function clearSelection() {
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else { // старый IE
      document.selection.empty();
    }
  }

  elem.addEventListener(events[0], handleDown);
};




const s = new Slider(".slider");
s.drag(s._frame, ["mousedown", "mousemove", "mouseup"]);
s.drag(s._frame, ["touchstart", "touchmove", "touchend"]);

// let n = new s.drag(list, ["mousedown", "mousemove", "mouseup"]);
// console.log(s);
// if (window.matchMedia("(min-width: 768px)").matches) {



function initList() {
  let fragment = document.createDocumentFragment();
  for (i = 0; i < 3; i++) {
    let clone = children[i].cloneNode(true);
    fragment.appendChild(clone);
  }
  list.insertBefore(fragment, children[0]);

  for (i = 0; i < 3; i++) {
    let clone = children[i].cloneNode(true);
    list.appendChild(clone);
  }

  for (let i = -3; i < children.length - 3; i++) {
    children[i + 3].style.position = "absolute";
    children[i + 3].style.left = `${i * 580}px`;
  }
}

initList();


let path = 0;
list.onwheel = function(e) {
  let delta = e.deltaY || e.detail || e.wheelDelta;
  console.log(delta);

  path += delta < 0 ? 300 : -300;

  list.style.transitionDuration = "1s";

  function moveAt(elem, position) {
    console.log(position);
    // elem.style.transform = `translateX(${position}px)`;
    elem.style.transform = `matrix(1,0,0,1,${position},0)`;
  }

  moveAt(list, path);

  setTimeout(function() {
    s.moveSlide(list);
  }, 1000);


  e.preventDefault();
}

function showNext() {
  this._position++;
  list.style.transitionDuration = "1s";
  list.style.transform = `matrix(1,0,0,1,${this._position * 580},0)`;
}

function showPrev() {
  this._position--;
  list.style.transitionDuration = "1s";
  list.style.transform = `matrix(1,0,0,1,${this._position * 580},0)`;
}
