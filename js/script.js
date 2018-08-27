const menuButton = document.querySelector(".page-header__button");
const menu = document.querySelector(".main-nav");
console.log("hello");



menuButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  menu.classList.toggle("main-nav--shown");
  menuButton.classList.toggle("menu-button--opened");
});
