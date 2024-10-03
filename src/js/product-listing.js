import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

async function main() {
    await loadHeaderFooter();

    // Create an instance of a ProductData object
    const productData = new ProductData("tents");
    const productList = new ProductList(
      "tents",
      productData,
      document.querySelector(".product-list"),
    );
  
    productList.init();
    document.querySelector(".icon-cart").innerHTML =
      localStorage.getItem("so-cart-quantity") || 0;
  }
  
  main();