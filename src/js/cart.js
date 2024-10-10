import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";
import searchItem from "./search-item.js";

loadHeaderFooter().then(() => {
  document.querySelector(".icon-cart").innerHTML =
    localStorage.getItem("so-cart-quantity") || 0;

  const cart = new ShoppingCart("so-cart", ".product-list");
  cart.init();
  if (cart.total > 0) {
    // show our checkout button and total if there are items in the cart.
    document.querySelector(".list-footer").classList.remove("hide");
  }
  searchItem();
});
