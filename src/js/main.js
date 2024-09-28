import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const productListing = new ProductListing(
  "tents",
  dataSource,
  document.querySelector(".product-list"),
);
productListing.init();
