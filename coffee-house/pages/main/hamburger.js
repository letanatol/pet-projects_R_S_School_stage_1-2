const body = document.getElementById('body');
const hamburger = document.getElementById('hamburger');
const headerBox = document.getElementById('header-box');

hamburger.addEventListener('click', function () {
  headerBox.classList.toggle('header__box-open');
  hamburger.classList.toggle('hamburger-open');
  body.classList.toggle('scroll');
});

headerBox.addEventListener('click', function () {
  if (headerBox.classList.contains('header__box-open')) {
    headerBox.classList.remove('header__box-open');
    hamburger.classList.remove('hamburger-open');
    body.classList.remove("scroll");
  }
});