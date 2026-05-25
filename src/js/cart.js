import {
  getLocalStorage,
  loadHeaderFooter,
} from './utils.mjs';

loadHeaderFooter();

function renderCartContents() {
  let cartItems = getLocalStorage('so-cart') || [];

if (!Array.isArray(cartItems)) {
  cartItems = [cartItems];
}

  if (cartItems.length === 0) {
    document.querySelector('.product-list').innerHTML =
      '<li>Your cart is empty.</li>';
    return;
  }

  const htmlItems = cartItems.map((item) =>
    cartItemTemplate(item),
  );

  document.querySelector('.product-list').innerHTML =
    htmlItems.join('');

  const total = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice,
    0,
  );

  const cartFooter = document.querySelector('.cart-footer');

  if (cartFooter) {
    cartFooter.classList.remove('hide');
  }

  const cartTotal = document.querySelector('.cart-total');

  if (cartTotal) {
    cartTotal.innerHTML =
      `Total: $${total.toFixed(2)}`;
  }
}

function cartItemTemplate(item) {
  const image =
    item.Images?.PrimaryMedium || item.Image;

  const color =
    item.Colors?.[0]?.ColorName || '';

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${color}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

renderCartContents();