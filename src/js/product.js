import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import searchItem from "./search-item.js";
import ExternalServices from "./ExternalServices.mjs";

// const dataSource = new ProductData();
const dataSource = new ExternalServices("tents");
const productId = getParams("product");
const product = new ProductDetails(productId, dataSource);
product.init();

loadHeaderFooter().then(() => {
  document.querySelector(".icon-cart").innerHTML =
    localStorage.getItem("so-cart-quantity") || 0;
  searchItem();
});
