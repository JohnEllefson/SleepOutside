import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";
import searchItem from "./search-item.js";

async function main() {
  await loadHeaderFooter();

  // Create an instance of a ProductData object
  const productType = getParams("catagory");

  // Capitalize the first letter of the product type
  const capitalizedProductType = capitalizeFirstLetter(productType);

  // Display the product type in the HTML page
  const section = document.querySelector("span.product-type-name");
  section.textContent = capitalizedProductType;

  // Gather data about the products of the specified type
  const productData = new ProductData();
  const productList = new ProductList(
    productType,
    productData,
    document.querySelector(".product-list"),
  );

  // Initialize the product list and display the products
  productList.init();
  document.querySelector(".icon-cart").innerHTML =
    localStorage.getItem("so-cart-quantity") || 0;

  searchItem();
}

// Capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

main();
