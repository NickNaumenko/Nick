const menuButton = document.querySelector(".page-header__button");
const menu = document.querySelector(".main-nav");
const menuLinks = document.querySelectorAll(".main-nav__link");
console.log(menuLinks);

menuButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  menu.classList.toggle("main-nav--shown");
  menuButton.classList.toggle("menu-button--opened");
});

menuLinks.forEach( (a) => {
  a.addEventListener("click", (evt) => {
    menu.classList.remove("main-nav--shown");
    menuButton.classList.remove("menu-button--opened");
  })
})

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





const myButton = document.querySelector(".my-button");
const worksButtons = document.querySelectorAll(".button-link");

myButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  worksButtons.forEach( (a) => {
    a.classList.toggle("button-link--inview");
  })
})
