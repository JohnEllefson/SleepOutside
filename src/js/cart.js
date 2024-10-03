import { getLocalStorage } from "./utils.mjs";
import { saveCartQuantity } from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

function renderCartContents() {
  const cart = new ShoppingCart("so-cart", ".product-list");
  cart.renderCartContents();

  const removeItemBtns = document.querySelectorAll(".removeItemBtn");
  removeItemBtns.forEach((button) => {
    button.addEventListener("click", removeItem);
  });
}

function updateCartQuantity() {
  document.querySelector(".icon-cart").innerHTML =
    localStorage.getItem("so-cart-quantity") || 0;
}

function isCartFilled() {
  if (getLocalStorage("so-cart") != undefined) {
    return true;
  }
}

function calcTotal() {
  let total = 0;
  for (const element of getLocalStorage("so-cart")) {
    total += element.FinalPrice;
  }

  return total;
}

// Make the total visible if the cart is filled
function displayCheckoutTotal() {
  if (isCartFilled()) {
    let total = calcTotal();
    document.querySelector(".cart-total").innerHTML = `<b>Total: $${total}</b>`;
    document.querySelector(".cart-footer-hide").style.visibility = "visible";
  }
}

function removeItem(event) {
  const itemId = event.target.dataset.id;
  const currentItems = getLocalStorage("so-cart");

  if (currentItems) {
    //If we have matching id's, it will return an index, if there is not match, it will return -1 meaning not found
    const itemIndex = currentItems.findIndex(
      (item) => item.Id.toString() === itemId.toString(),
    );
    //If it is found then ...
    if (itemIndex !== -1) {
      //It will eliminate just one of the element with the matching id
      currentItems.splice(itemIndex, 1);
    }

    localStorage.setItem("so-cart", JSON.stringify(currentItems));
    saveCartQuantity(currentItems);
  }

  renderCartContents();
  displayCheckoutTotal();
  updateCartQuantity();
}

async function main() {
  await loadHeaderFooter();

  renderCartContents();
  displayCheckoutTotal();
  updateCartQuantity();
}

main();
