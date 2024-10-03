import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

await loadHeaderFooter();

// Create an instance of a ProductData object
const productData = new ProductData("tents");
const productList = new ProductList(
  "tents",
  productData,
  document.querySelector(".product-list"),
);

await productList.init();

/* document.addEventListener("DOMContentLoaded", () => {
   document.querySelector(".icon-cart").innerHTML =
   localStorage.getItem("so-cart-quantity") || 0;
  
}); */

document.querySelector(".icon-cart").innerHTML =
  localStorage.getItem("so-cart-quantity") || 0;


