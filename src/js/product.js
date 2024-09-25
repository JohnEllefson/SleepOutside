import { setLocalStorage, getLocalStorage, getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const productId = getParams("product");
console.log(dataSource.findProductById(productId));

function addProductToCart(product) {
  let cartArray = getLocalStorage("so-cart") || [];
  cartArray.push(product);
  setLocalStorage("so-cart", cartArray);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

