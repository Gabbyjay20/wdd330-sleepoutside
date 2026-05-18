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
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  // run each item in the list through the template function to get HTML strings
  const htmlStrings = list.map(templateFn);
  // insert all the HTML strings into the parent element
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}