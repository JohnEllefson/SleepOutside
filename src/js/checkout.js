import { loadHeaderFooter } from "./utils.mjs";
import searchItem from "./search-item.js";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter().then(() => {
  document.querySelector(".icon-cart").innerHTML =
    localStorage.getItem("so-cart-quantity") || 0;
  searchItem();
  const checkoutProcess = new CheckoutProcess('so-cart', '#checkout-form');
  checkoutProcess.init();
});
