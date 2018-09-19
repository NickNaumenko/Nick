const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".main-nav");
const menuLinks = document.querySelectorAll(".main-nav__link");
console.log(menuLinks);
const body = document.querySelector(".home-page");

menuButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  menu.classList.toggle("main-nav--hidden");
  // menuButton.classList.toggle("menu-button--opened");
  body.classList.toggle("menu-opened");
});

menuLinks.forEach( (a) => {
  a.addEventListener("click", (evt) => {
    body.classList.remove("menu-opened");
  })
})

const header = document.querySelector(".page-header");
const works = document.querySelector(".works");
const about = document.querySelector(".about");
const worksList = document.querySelectorAll(".works__item");

window.onscroll = function() {
  let whiteSections = [works, about].map( (a) => a.getBoundingClientRect());

  if ( !header.classList.contains(".page-header--invert")
    && whiteSections.some( (a) => a.top < 50 && a.bottom > 50 ) ) {
    header.classList.add("page-header--invert");
  } else {
    header.classList.remove("page-header--invert");
  }
};


// --------
const scrollbar = (function() {
  const div = document.createElement("div");
  div.style.cssText = "width: 50px; \
    height: 50px;\
    overflow: scroll;\
  ";
  body.appendChild(div);
  console.log(div);

  let scrollbar = div.offsetWidth - div.clientWidth;
  body.removeChild(div);

  return scrollbar;
})();

function alignMenu() {
  if (!scrollbar) return;

}

console.log(scrollbar);

