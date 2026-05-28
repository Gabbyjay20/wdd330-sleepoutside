import { getLocalStorage } from './utils.mjs';

export default class CheckoutProcess {
  constructor() {
    this.items = getLocalStorage('so-cart') || [];
    this.subtotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.total = 0;
  }

  init() {
    this.calculateSubtotal();

    const zip = document.querySelector('#zip');

    if (zip) {
      zip.addEventListener('blur', () => {
        this.calculateOrderTotal();
      });
    }
  }

  calculateSubtotal() {
    this.subtotal = this.items.reduce(
      (sum, item) => sum + item.FinalPrice,
      0,
    );

    document.querySelector('#subtotal').textContent =
      `$${this.subtotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    this.tax = this.subtotal * 0.06;

    this.shipping =
      this.items.length > 0
        ? 10 + (this.items.length - 1) * 2
        : 0;

    this.total =
      this.subtotal + this.tax + this.shipping;

    document.querySelector('#tax').textContent =
      `$${this.tax.toFixed(2)}`;

    document.querySelector('#shipping').textContent =
      `$${this.shipping.toFixed(2)}`;

    document.querySelector('#orderTotal').textContent =
      `$${this.total.toFixed(2)}`;
  }

  async checkout() {
    try {
      console.log('Checkout successful');

      localStorage.removeItem('so-cart');

      window.location.href = '/checkout/success.html';
    } catch (err) {
      console.log(err);
    }
  }
}