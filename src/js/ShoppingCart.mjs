import { getLocalStorage, calculateCartTotal } from "./utils.mjs";
import { saveCartQuantity } from "./ProductDetails.mjs";
function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class='cart-card__quantity'>qty: ${item.quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <p class="cart-card__total_price">Total: $${item.TotalPrice}</p>
    <span class="removeItemBtn" data-id="${item.Id}">❌</span>
  </li>`;

    return newItem;
}

export default class ShoppingCart {
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
    }

    renderCartContents() {
        const cartItems = getLocalStorage(this.key);
        let htmlItems;

        // If items exist in the cart, create a template and inject it into the HTML
        if (cartItems != null) {
            htmlItems = cartItems.map((item) => cartItemTemplate(item));
            document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
            document.querySelector(".icon-cart").innerHTML =
                localStorage.getItem("so-cart-quantity") || 0;
        }

        const removeItemBtns = document.querySelectorAll(".removeItemBtn");
        removeItemBtns.forEach((button) => {
            button.addEventListener("click", (event) => this.removeItem(event));
        });

        function isCartFilled() {
            if (getLocalStorage("so-cart") != undefined) {
                return true;
            }
        }

        const calcTotal = () => {
            const itemsInCart = getLocalStorage(this.key);
            return calculateCartTotal(itemsInCart);
        };

        // Make the total visible if the cart is filled
        function displayCheckoutTotal() {
            let total = calcTotal();
            if (isCartFilled()) {
                total = calcTotal();
            }
            total = total.toFixed(2);
            document.querySelector(".cart-total").innerHTML = `<b>Total: $${total}</b>`;
            document.querySelector(".cart-footer-hide").style.visibility = "visible";
        }

        displayCheckoutTotal();
    }

    removeItem(event) {
        const itemId = event.target.dataset.id;
        const currentItems = getLocalStorage(this.key);

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

            localStorage.setItem(this.key, JSON.stringify(currentItems));
            saveCartQuantity(currentItems);
        }

        this.renderCartContents();
    }

}
