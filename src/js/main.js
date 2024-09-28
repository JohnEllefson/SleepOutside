import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Create an instance of a ProductData object
const productData = new ProductData("tents");
const productList = new ProductList(
  "tents",
  productData,
  document.querySelector(".product-list"),
);
productList.init();
