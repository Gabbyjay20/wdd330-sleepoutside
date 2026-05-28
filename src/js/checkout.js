import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const myCheckout = new CheckoutProcess();

// Initialize checkout totals
myCheckout.init();

document
  .querySelector('#checkoutSubmit')
  .addEventListener('click', (e) => {
    e.preventDefault();

    const myForm = document.querySelector('#checkoutForm');

    if (!myForm.checkValidity()) {
      myForm.reportValidity();
      return;
    }

    myCheckout.checkout();
  });