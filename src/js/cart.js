import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";
import searchItem from "./search-item.js";

loadHeaderFooter().then(() => {
  document.querySelector(".icon-cart").innerHTML =
    localStorage.getItem("so-cart-quantity") || 0;

  const cart = new ShoppingCart("so-cart", ".product-list");
  cart.renderCartContents();
  searchItem();
});
