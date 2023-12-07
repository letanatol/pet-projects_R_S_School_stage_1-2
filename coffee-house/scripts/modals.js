import products from './products.json' assert {type: 'json'};

const body = document.getElementById('body');
const blackout = document.getElementById('blackout');
const tabsMenuBlock = document.getElementById('tabs-menu');
const menuCardsBlock = document.getElementById('menu-cards');
const modalCard = document.getElementById('modal-card');
const refresh = document.getElementById('refresh');


let currentCategory = 'coffee';

window.addEventListener('load', renderCards());
window.addEventListener(`resize`, (event) => {
  renderCards(currentCategory);
}, true);

tabsMenuBlock.addEventListener('change', (event) => {
  renderCards(event.target.value);
  currentCategory = event.target.value;
  console.log(currentCategory);
})

refresh.addEventListener('click', addProducts);

function addProducts() {
  const arrayCategory = [];
console.log(currentCategory);
  for (let i = 0; i < products.length; i++) {
    if (products[i].category == currentCategory) {
      arrayCategory.push(products[i]);
    }
  }
  if (arrayCategory.length > 4) {
    menuCardsBlock.innerHTML = arrayCategory.map(item => (

      `<div class="menu__card" id="card-coffee-01">
      <div class="menu__card-image">
        <img src=${item.image} alt="coffee-1">
      </div>
      <div class="menu__card-info">
        <h3 class="menu__card-title">${item.name}</h3>
        <p class="menu__card-description">${item.description}</p>
        <p class="menu__card-price">$${item.price}</p>
      </div>
    </div>`
    )).join(' ');

    refresh.style.display = 'none';
  }
}


function renderCards(category = 'coffee') {
  const arrayCategory = [];

  for (let i = 0; i < products.length; i++) {
    if (products[i].category == category) {
      arrayCategory.push(products[i]);
    }
  }

  if (window.innerWidth <= 768) {
    refresh.style.display = 'flex';

    if (arrayCategory.length > 4) {
      arrayCategory.length = 4;
      refresh.style.display = 'flex';
    } else {
      refresh.style.display = 'none';
    }
  } else {
    refresh.style.display = 'none';
  }

  menuCardsBlock.innerHTML = arrayCategory.map(item => (

    `<div class="menu__card" id="card-coffee-01">
      <div class="menu__card-image">
        <img src=${item.image} alt="coffee-1">
      </div>
      <div class="menu__card-info">
        <h3 class="menu__card-title">${item.name}</h3>
        <p class="menu__card-description">${item.description}</p>
        <p class="menu__card-price">$${item.price}</p>
      </div>
    </div>`
  )).join(' ');
}



// menuCardsBlock.addEventListener('click', openModal);
function openModal(elem) {
  elem.classList.replace('modal_state_close', 'modal_state_open');
  body.classList.add('scroll');
  blackout.classList.add('blackout__open');
}

function closeModal(elem) {
  elem.classList.replace('modal_state_open', 'modal_state_close');
  body.classList.remove('scroll');
  blackout.classList.remove('blackout__open');
}



// function addRefresh(arrayCategory) {
//   if (window.innerWidth <= 768) {
//     refresh.style.display = 'flex';

//     if (arrayCategory.length > 4) {
//       arrayCategory.length = 4;
//       refresh.style.display = 'flex';
//     } else {
//       refresh.style.display = 'none';
//     }
//   } else {
//     refresh.style.display = 'none';
//   }
// }