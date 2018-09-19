const body = document.body;
const menuButton = document.querySelector(".page-header__button");
const pageHeader = document.querySelector(".page-header");

const scrollbar = (function() {
  const div = document.createElement("div");
  div.style.cssText = "width: 50px; \
    height: 50px;\
    overflow: scroll;\
  ";
  body.appendChild(div);

  const scrollbar = div.offsetWidth - div.clientWidth;
  body.removeChild(div);
  console.log(scrollbar);

  return scrollbar;
})();


function Menu(options) {
  const menu = options.menu;
  const button = options.button;
  console.log(button);

  menu.onclick = function(event) {
    if (event.target.classList.contains("main-nav__link") ||
      event.target.classList.contains("main-nav__social-link")) {
      close();
    }
  }

  let isOpen = false;

  function toggle() {
    if(isOpen) {
      close();
    } else open();
  }

  function open() {
    menu.classList.add("main-nav--opened");
    console.log("menu-opened");
    isOpen = true;

    const menuEvent = new Event("open", {
      bubbles: true
    });

    menu.dispatchEvent(menuEvent);
  }

  function close() {
    menu.classList.remove("main-nav--opened");
    console.log("menu-closed");
    isOpen = false;

    const menuEvent = new Event("close", {
      bubbles: true
    });

    menu.dispatchEvent(menuEvent);
  }

  button.addEventListener("click", (event) => {
    console.log("Hello, Nick");
    toggle();
  })
}

const menu = new Menu({
  menu: document.querySelector(".main-nav"),
  button: document.querySelector(".page-header__button")
});



body.addEventListener("open", () => {
  body.style.cssText = `overflow: hidden; \
  padding-right: ${scrollbar}px`
});

body.addEventListener("close", () => {
  body.style.cssText = "";
});

let timerId;

pageHeader.addEventListener("open", () => {
  pageHeader.style.paddingRight = `${scrollbar}px`;

  if (!timerId) {
    pageHeader.style.color = "#ffffff";
  }

  clearTimeout(timerId);
  timerId = false;
});

pageHeader.addEventListener("close", () => {
  pageHeader.style.paddingRight = "";

  timerId = setTimeout(function() {
    pageHeader.style.color = "";
    timerId = false;
  }, 500);
});

menuButton.addEventListener("click", () => {
  menuButton.classList.toggle("menu-button--closed");
});


const works = document.querySelector(".works");
const about = document.querySelector(".about");

window.onscroll = function() {
  let whiteSections = [works, about].map( (a) => a.getBoundingClientRect());

  if ( !pageHeader.classList.contains(".page-header--invert")
    && whiteSections.some( (a) => a.top < 50 && a.bottom > 50 ) ) {
    pageHeader.classList.add("page-header--invert");
  } else {
    pageHeader.classList.remove("page-header--invert");
  }
};
