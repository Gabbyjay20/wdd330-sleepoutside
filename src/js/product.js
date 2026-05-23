import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

// load the header and footer
loadHeaderFooter();

// get the product id from the URL e.g. ?id=123
const productId = getParam('id');

// create a new ProductData instance
const dataSource = new ProductData();

// create a new ProductDetails instance and pass it the id and data source
const product = new ProductDetails(productId, dataSource);

// load and display the product
product.init();