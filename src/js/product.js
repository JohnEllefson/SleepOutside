import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

async function main() {
  await loadHeaderFooter();

  const dataSource = new ProductData("tents");
  const productId = getParams("product");
  const product = new ProductDetails(productId, dataSource);

  product.init();

  document.querySelector(".icon-cart").innerHTML =
    localStorage.getItem("so-cart-quantity") || 0;
}

document.addEventListener("DOMContentLoaded", main);
