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
      this.product.Images.PrimaryLarge;

    document.getElementById('productImage').alt =
      this.product.Name;

    document.getElementById('productDescription').innerHTML =
      this.product.DescriptionHtmlSimple;  
    
    // calculate the discount
    const discount = this.product.SuggestedRetailPrice - this.product.FinalPrice;

    // only show the flag if there is a discount
    if (discount > 0) {
      const discountFlag = document.getElementById('discountFlag');
      discountFlag.textContent = `Save $${discount.toFixed(2)}!`;
      discountFlag.style.display = 'block';
    }
  }
}