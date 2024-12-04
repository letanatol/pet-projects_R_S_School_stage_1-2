const navList = document.getElementById('nav-list');
const headerMenuLink = document.getElementById('header-menu-link');

navList.addEventListener('click', openLink);
headerMenuLink.addEventListener('click', openLinkMenu);

function openLink(event) {
  if (event.target.closest('.nav__link')) {

    let targetItem = event.target.closest('.nav__link');
    let url = targetItem.getAttribute('href');
    event.preventDefault();

    setTimeout(() => { document.location.href = url }, 500);
  }
}

function openLinkMenu(event) {
  if (event.target.closest('.header__menu-link')) {

    let targetItem = event.target.closest('.header__menu-link');
    let url = targetItem.getAttribute('href');
    event.preventDefault();

    setTimeout(() => { document.location.href = url }, 500);
  }
}
