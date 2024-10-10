import { getParams } from "./utils.mjs";
import ExternalService from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import searchItem from "./search-item.js";

const dataSource = new ExternalService();
const productId = getParams("product");
const product = new ProductDetails(productId, dataSource);
product.init();

loadHeaderFooter().then(() => {
  document.querySelector(".icon-cart").innerHTML =
    localStorage.getItem("so-cart-quantity") || 0;
  searchItem();
});
