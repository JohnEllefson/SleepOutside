import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Create an instance of a ProductData object
const productData = new ProductData("tents");
const productList = new ProductList(
  "tents",
  productData,
  document.querySelector(".product-list"),
);

productList.init();

document.addEventListener("DOMContentLoaded", () => {
  // document.querySelector(".icon-cart").innerHTML =
  // localStorage.getItem("so-cart-quantity") || 0;
  loadHeaderFooter();
});


