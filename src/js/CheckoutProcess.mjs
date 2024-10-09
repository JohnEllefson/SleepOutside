import { getLocalStorage } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";


export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        // calculate and display the total amount of the items in the cart, and the number of items.
            const itemsQuantity = document.querySelector('#quantity');
            if (itemsQuantity) {
                let cartItems = getLocalStorage('so-cart');
                let totalQuantity = 0;
                if (cartItems) {
                    totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
                }
                
                itemsQuantity.innerHTML = totalQuantity;
        }
    }

    calculateSubtotal() {
        let total = 0;
        const subtotal = document.querySelector(".cart-subtotal")
        const itemsInCart = getLocalStorage("so-cart");
        for (const element of itemsInCart) {
            total += element.TotalPrice;
        }
        subtotal.innerHTML = total;
    }

    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total

        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page

    }
}