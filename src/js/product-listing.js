import ExternalService from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";
import searchItem from "./search-item.js";

async function main() {
  await loadHeaderFooter();

  // Create an instance of a externalServices object
  const productType = getParams("catagory");

  // Capitalize the first letter of the product type
  const capitalizedProductType = capitalizeFirstLetter(productType);

  // Display the product type in the HTML page
  const section = document.querySelector("span.product-type-name");
  section.textContent = capitalizedProductType;

  // Gather data about the products of the specified type
  const externalServices = new ExternalService();
  const productList = new ProductList(
    productType,
    externalServices,
    document.querySelector(".product-list"),
  );

  // Initialize the product list and display the products
  await productList.init();

  document
    .getElementById("sort-products")
    .addEventListener("change", (event) => {
      const sortedProducts = sortProducts(
        productList.products,
        event.target.value,
      );
      productList.renderList(sortedProducts); // Assuming renderList is defined in ProductList
    });

  document.querySelector(".icon-cart").innerHTML =
    localStorage.getItem("so-cart-quantity") || 0;

  searchItem();
}

// Capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function sortProducts(products, criteria) {
  if (criteria === "") {
    return products;
  } else if (criteria === "name") {
    return products.sort((a, b) => a.Name.localeCompare(b.Name));
  } else if (criteria === "price-asc") {
    return products.sort((a, b) => a.FinalPrice - b.FinalPrice);
  } else if (criteria === "price-desc") {
    return products.sort((a, b) => b.FinalPrice - a.FinalPrice);
  } else if (criteria === "brand") {
    return products.sort((a, b) => a.Brand.Name.localeCompare(b.Brand.Name));
  } else if (criteria === "discount") {
    return products.sort((a, b) => b.Discount - a.Discount);
  }
}

main();
