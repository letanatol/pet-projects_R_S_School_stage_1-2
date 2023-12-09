const navList = document.getElementById('nav-list');

navList.addEventListener('click', openLink);

function openLink(event) {
  if (event.target.closest('.nav__link')) {

    let targetItem = event.target.closest('.nav__link');
    let url = targetItem.getAttribute('href');
    console.log(url);
    event.preventDefault();

    setTimeout(() => { document.location.href = url }, 500);
  }
}
