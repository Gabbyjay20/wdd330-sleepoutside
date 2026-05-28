import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

// load the header and footer
loadHeaderFooter();

// get the category from the URL e.g. ?category=tents
const category = getParam('category');

// show the category name in the page title
document.querySelector('#category-name').textContent = category;

// create a new ProductData instance (no category needed in constructor)
const dataSource = new ProductData();

// get the element where the product list will be rendered
const listElement = document.querySelector('.product-list');

// create a new ProductList and pass it the category, data source, and list element
const myList = new ProductList(category, dataSource, listElement);

// load and display the products
myList.init();
