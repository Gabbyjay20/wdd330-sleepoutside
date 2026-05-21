// wrapper for querySelector...returns matching element
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

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });

  qs(selector).addEventListener('click', callback);
}

// renders a list of items to the DOM using a template function
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

// loads header and footer
export async function loadHeaderFooter() {
  const header = await fetch('/partials/header.html');

  const footer = await fetch('/partials/footer.html');

  const headerText = await header.text();

  const footerText = await footer.text();

  document.querySelector('#main-header').innerHTML =
    headerText;

  document.querySelector('#main-footer').innerHTML =
    footerText;
}