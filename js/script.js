const menuButton = document.querySelector(".page-header__button");
const menu = document.querySelector(".main-nav");
console.log("hello");

menuButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  menu.classList.toggle("main-nav--shown");
  menuButton.classList.toggle("menu-button--opened");
});

const header = document.querySelector(".page-header");
const works = document.querySelector(".works");
const about = document.querySelector(".about__text");

window.onscroll = function() {
  let whiteSections = [works, about].map( (a) => a.getBoundingClientRect());

  if ( !header.classList.contains(".page-header--invert")
    && whiteSections.some( (a) => a.top < 50 && a.bottom > 50 ) ) {
    header.classList.add("page-header--invert");
  } else {
    header.classList.remove("page-header--invert");
  }
};
