function Slider(slider) {
  this.slider = document.querySelector(slider);
  this.frame = this.slider.querySelector(".slider__frame");
  this.items = this.frame.children;
  this.itemsCount = this.items.length;
  this.position = 0;
  this.isAnimated = false;
};

Slider.prototype.init = function() {
  let fragment = document.createDocumentFragment();
  for (i = 0; i < this.itemsCount; i++) {
    let clone = this.items[i].cloneNode(true);
    fragment.appendChild(clone);
  }
  this.frame.insertBefore(fragment, this.items[0]);

  for (i = 0; i < this.itemsCount; i++) {
    let clone = this.items[i].cloneNode(true);
    this.frame.appendChild(clone);
  }

  for (let i = -this.itemsCount; i < this.itemsCount * 2; i++) {
    this.items[i + this.itemsCount].style.position = "absolute";
    this.items[i + this.itemsCount].style.left = `${i * 580}px`;
  }
};


Slider.prototype.smoothScroll = function(finish) {
  const self = this;

  let start = this.frame.getBoundingClientRect().left;
  let distance = Math.abs(finish - start);
  let speed = 10;
  let time = distance / speed;

  function scroll() {
    if (start < finish) {
      self.isAnimated = true;

      start += speed;
      start = start < finish ? start : finish;

      setTimeout( () => {
        self.frame.style.transform = `translateX(${start}px)`;
        scroll();
      }, 8);
    } else if (start > finish) {
      self.isAnimated = true;

      start -= speed;
      start = start > finish ? start : finish;

      setTimeout( () => {
        self.frame.style.transform = `translateX(${start}px)`;
        scroll();
      }, 8);
    } else  self.isAnimated = false;
  }

  scroll();
};


Slider.prototype.moveTo = function() {
  let coords = this.frame.getBoundingClientRect().left;
  this.position = Math.round(coords / 580);

  let shift = this.position * 580 - coords;
  console.log(shift);

  if ( Math.abs(this.position) >= this.itemsCount) {
    this.position = this.position > 0 ? this.position - this.itemsCount :
      this.position + this.itemsCount;
  }

  this.frame.style.transform = `translateX(${this.position * 580 - shift}px)`;

  return shift;
};

Slider.prototype.align = function(shift) {
  this.smoothScroll(this.position * 580);
};

Slider.prototype.moveLeft = function() {
  if (this.isAnimated) return;

  this.moveTo();
  this.position--;
  this.smoothScroll( this.position * 580 );
};

Slider.prototype.moveRight = function() {
  if (this.isAnimated) return;

  this.moveTo();
  this.position++;
  this.smoothScroll( this.position * 580 );
}

Slider.prototype.drag = function(events) {
  let self = this;

  let startPosition, downX, position;
  let elem = this.frame;

  function handleDown(event) {
    if (event.which && event.which != 1) return;

    startPosition = elem.getBoundingClientRect().left;
    downX = getEventPosition(event);

    elem.ondragstart = function() {
      return false;
    };

    document.addEventListener(events[1], handleMove);
    document.addEventListener(events[2], handleUp);
  }

  function handleMove(event) {
    clearSelection();
    let path = getEventPosition(event) - downX;

    if ( Math.abs(path) < 3 ) return;

    position = getEventPosition(event) - downX + startPosition;

    move(position);
  }

  function handleUp(event) {
    document.removeEventListener(events[1], handleMove);
    document.removeEventListener(events[2], handleUp);

    self.moveTo();
    self.smoothScroll(self.position * 580);
  };

  function getEventPosition(event) {
    if (event instanceof MouseEvent) return event.pageX;
    if (event instanceof TouchEvent) return event.changedTouches[0].pageX;
  };

  function move(position) {
    console.log(position);
    elem.style.transform = `matrix(1,0,0,1,${position},0)`;
  };

  function clearSelection() {
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else { // старый IE
      document.selection.empty();
    }
  };

  elem.addEventListener(events[0], handleDown);
}

Slider.prototype.wheel = function() {
  const self = this;

  function onWheel(event) {
    let delta = event.deltaY || event.detail || event.wheelDelta;

    if (delta < 0) self.moveRight();
    if (delta > 0) self.moveLeft();

    event.preventDefault();
  }

  this.slider.addEventListener("wheel", onWheel);
}


const s = new Slider(".slider");
s.init();
s.drag(["mousedown", "mousemove", "mouseup"]);
s.drag(["touchstart", "touchmove", "touchend"]);
s.wheel();


const next = document.querySelector(".slider__next");
next.onclick = function(event) {
  s.moveRight();
}
const prev = document.querySelector(".slider__prev");
prev.onclick = function(event) {
  s.moveLeft();
}
