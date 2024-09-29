import { getLocalStorage } from "./utils.mjs";
import { saveCartQuantity } from "./ProductDetails.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  let htmlItems;

  // If items exist in the cart, create a template and inject it into the HTML
  if (cartItems != null) {
    htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    document.querySelector(".icon-cart").innerHTML =
      localStorage.getItem("so-cart-quantity") || 0;
  }

  const removeItemBtns = document.querySelectorAll(".removeItemBtn");
  removeItemBtns.forEach((button) => {
    button.addEventListener("click", removeItem);
  });
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
    const updatedCartItems = currentItems.filter((item) => item.Id !== itemId);
    localStorage.setItem("so-cart", JSON.stringify(updatedCartItems));
    saveCartQuantity(updatedCartItems);
  }

  renderCartContents();
  displayCheckoutTotal();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class='cart-card__quantity'>qty: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="removeItemBtn" data-id=${item.Id}>❌</span>
</li>`;

  return newItem;
}

renderCartContents();
displayCheckoutTotal();
