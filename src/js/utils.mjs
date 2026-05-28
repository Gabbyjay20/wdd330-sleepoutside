// wrapper for querySelector
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// get URL parameter
export function getParam(param) {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  return urlParams.get(param);
}

// click listener
export function setClick(selector, callback) {
  qs(selector).addEventListener(
    'touchend',
    (event) => {
      event.preventDefault();
      callback();
    },
  );

  qs(selector).addEventListener(
    'click',
    callback,
  );
}

// render list with template
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false,
) {
  if (clear) {
    parentElement.innerHTML = '';
  }

  const htmlStrings = list.map(templateFn);

  parentElement.insertAdjacentHTML(
    position,
    htmlStrings.join(''),
  );
}

// update cart count
export function updateCartCount() {
  let cartItems =
    getLocalStorage('so-cart') || [];

  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  const countElement =
    document.querySelector('#cart-count');

  if (countElement) {
    countElement.textContent =
      cartItems.length;
  }
}

// load header/footer
export async function loadHeaderFooter() {
  const header = await fetch(
    '/partials/header.html',
  );

  const footer = await fetch(
    '/partials/footer.html',
  );

  const headerText = await header.text();

  const footerText = await footer.text();

  const mainHeader =
    document.querySelector('#main-header');

  const mainFooter =
    document.querySelector('#main-footer');

  if (mainHeader) {
    mainHeader.innerHTML = headerText;
  }

  if (mainFooter) {
    mainFooter.innerHTML = footerText;
  }

  updateCartCount();
}