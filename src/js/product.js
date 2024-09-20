import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  
  //get cart items from local storage
  let existingCart = getLocalStorage('so-cart');
  
  //If the cart is not an array, cause it has no items initialize it as an array empty
  
  if (!Array.isArray(existingCart)){
    existingCart = [];
  }
 
  // Add the products
  
  existingCart.push(product)
  setLocalStorage('so-cart', existingCart)
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
