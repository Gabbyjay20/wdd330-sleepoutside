import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(
      this.productId
    );

    this.renderProductDetails();

    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addProductToCart(product) {
    let cartItems = getLocalStorage('so-cart') || [];
    cartItems.push(product);
    setLocalStorage('so-cart', cartItems);
  }

  addToCart() {
    this.addProductToCart(this.product);
  }

  renderProductDetails() {
    document.getElementById('productName').textContent =
      this.product.Name;

    document.getElementById('productBrand').textContent =
      this.product.Brand.Name;

    document.getElementById('productPrice').textContent =
      `$${this.product.FinalPrice}`;

    document.getElementById('productImage').src =
      this.product.Image;

    document.getElementById('productImage').alt =
      this.product.Name;

    document.getElementById('productDescription').innerHTML =
      this.product.DescriptionHtmlSimple;
  }
}