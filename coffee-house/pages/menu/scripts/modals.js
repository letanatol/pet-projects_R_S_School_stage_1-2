import products from './products.json' assert {type: 'json'};

const body = document.getElementById('body');
const blackout = document.getElementById('blackout');
const tabsMenuBlock = document.getElementById('tabs-menu');
const menuCardsBlock = document.getElementById('menu-cards');
const modal = document.getElementById('modal');
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
})

refresh.addEventListener('click', addProducts);

function addProducts() {
  const arrayCategory = [];

  for (let i = 0; i < products.length; i++) {
    if (products[i].category == currentCategory) {
      arrayCategory.push(products[i]);
    }
  }

  if (arrayCategory.length > 4) {
    menuCardsBlock.innerHTML = arrayCategory.map(item => (

      `<div class="menu__card" data-id="${item.name}">
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
    `<div class="menu__card" data-id="${item.name}">
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

menuCardsBlock.addEventListener('click', (event) => {
  let targetItem = event.target;

  if (targetItem.closest('.menu__card')) {

    renderModal(targetItem.closest('.menu__card').dataset.id);
    openModal(modal);

    document.getElementById('button-close').addEventListener('click', () => {
      closeModal(modal);
    });

    document.getElementById('modal-info').addEventListener('click', (event) => {

      let currentPrice = document.getElementById('total-price').dataset.price;
      let addPriceSize = 0;
      let addPriceAdd = 0;

      if (event.target.closest('.tab__input')) {
        addPriceSize = Number(event.target.closest('.tab__input').value) + Number(currentPrice);

        let addPriceAdd = document.querySelectorAll('.tab__input-add');
        for (let i = 0; i < addPriceAdd.length; i++) {
          if (addPriceAdd[i].checked) {
            addPriceSize += Number(document.querySelector('.tab__input-add').value);
          }
        }

        document.getElementById('total-price').innerHTML = `$${addPriceSize.toPrecision(3)}`;
      }

      if (event.target.closest('.tab__input-add')) {
        let currentPriceAdd = Number((document.getElementById('total-price').innerHTML).slice(1));

        if (event.target.closest('.tab__input-add').checked) {
          addPriceAdd += Number(event.target.closest('.tab__input-add').value);
        } else {
          addPriceAdd -= Number(event.target.closest('.tab__input-add').value);
        }

        document.getElementById('total-price').innerHTML = `$${(currentPriceAdd + addPriceAdd).toPrecision(3)}`;
      }
    });
  }
});

blackout.addEventListener('click', () => {
  closeModal(modal);
})

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

function renderModal(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].name == id) {
      let item = products[i];

      modalCard.innerHTML = (
        `<div class="modal__card-image">
          <img src=${item.image} alt="coffee-1">
        </div>
        <div class="modal__card-info" id="modal-info">
          <h3 class="modal__card-title">${item.name}</h3>
          <p class="modal__card-description">${item.description}</p>
          <p class="modal__card-selection">Size</p>
          <div class="modal__card-tabs" id="modal__tabs-sizes">
            <label>
              <input type="radio" class="tab__input" name="size" value="${item.sizes.s['add-price']}" checked>
              <div class="modal__tab">
                <div class="modal__tab-icon">
                  <span>S</span>
                </div>
                <div class="modal__tab-text">${item.sizes.s.size}</div>
              </div>
            </label>
            <label>
              <input type="radio" class="tab__input" name="size" value="${item.sizes.m['add-price']}">
              <div class="modal__tab">
                <div class="modal__tab-icon">
                  <span>M</span>
                </div>
                <div class="modal__tab-text">${item.sizes.m.size}</div>
              </div>
            </label>
            <label>
              <input type="radio" class="tab__input" name="size" value="${item.sizes.l['add-price']}">
              <div class="modal__tab">
                <div class="modal__tab-icon">
                  <span>L</span>
                </div>
                <div class="modal__tab-text">${item.sizes.l.size}</div>
              </div>
            </label>
          </div>

          <p class="modal__card-selection">Additives</p>
          <div class="modal__card-tabs" id="modal__tabs-additives">
            <label>
              <input type="checkbox" class="tab__input-add" name="add" value="${item.additives[0]['add-price']}">
              <div class="modal__tab">
                <div class="modal__tab-icon">
                  <span>1</span>
                </div>
                <div class="modal__tab-text">${item.additives[0].name}</div>
              </div>
            </label>
            <label>
              <input type="checkbox" class="tab__input-add" name="add" value="${item.additives[1]['add-price']}">
              <div class="modal__tab">
                <div class="modal__tab-icon">
                  <span>2</span>
                </div>
                <div class="modal__tab-text">${item.additives[1].name}</div>
              </div>
            </label>
            <label>
              <input type="checkbox" class="tab__input-add" name="add" value="${item.additives[2]['add-price']}">
              <div class="modal__tab">
                <div class="modal__tab-icon">
                  <span>3</span>
                </div>
                <div class="modal__tab-text">${item.additives[2].name}</div>
              </div>
            </label>
          </div>

          <div class="modal__card-price">
            <div class="price-title">Total:</div>
            <div class="price" id="total-price" data-price="${item.price}">$${item.price}</div>
          </div>

          <div class="modal__card-warning">
            <div class="warning-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g clip-path="url(#clip0_268_12877)">
                  <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path
                    d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00004C14.6663 4.31814 11.6816 1.33337 7.99967 1.33337C4.31778 1.33337 1.33301 4.31814 1.33301 8.00004C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z"
                    stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_268_12877">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p class="warning-description">The cost is not final. Download our mobile app to see the final price and
              place your order. Earn loyalty points and
              enjoy your favorite coffee with up to 20% discount.</p>
          </div>
          <div class="button modal__card-button" id="button-close">Close</div>
        </div>
        `
      );
    }
  }
}