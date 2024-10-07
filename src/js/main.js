import { loadHeaderFooter } from "./utils.mjs";
import searchItem from "./search-item.js";
import Alert from "./alert.js";

loadHeaderFooter().then(() => {
  document.querySelector(".icon-cart").innerHTML =
    localStorage.getItem("so-cart-quantity") || 0;
  searchItem();
});

new Alert();