import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

// load header and footer
loadHeaderFooter();

// get product id from URL
const productId = getParam('id');

// create data source
const dataSource = new ProductData();

// create product details object
const product = new ProductDetails(productId, dataSource);

// initialize product page
product.init();