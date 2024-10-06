import { loadHeaderFooter } from "./utils.mjs";
import searchItem from "./search-item.js";

loadHeaderFooter().then(() => {
  document.querySelector(".icon-cart").innerHTML =
    localStorage.getItem("so-cart-quantity") || 0;
  searchItem();
});
