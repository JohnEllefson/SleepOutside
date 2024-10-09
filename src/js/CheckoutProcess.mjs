import { getLocalStorage, calculateCartTotal } from "./utils.mjs";
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
        this.calculateSubtotal();
    }

    calculateItemSummary() {
        // calculate and display the total amount of the items in the cart, and the number of items.
            const itemsQuantity = document.querySelector('#quantity');
            if (itemsQuantity) {
                let cartItems = getLocalStorage(this.key);
                let totalQuantity = 0;
                if (cartItems) {
                    totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
                }
                
                itemsQuantity.innerHTML = totalQuantity;
        }
    }
    calculateSubtotal() {
        const itemsInCart = getLocalStorage(this.key);
        this.itemTotal = calculateCartTotal(itemsInCart);
        document.querySelector(".cart-subtotal").innerHTML = this.itemTotal.toFixed(2);
    }
    // calculateSubtotal() {
    //     let total = 0;
    //     const subtotal = document.querySelector(".cart-subtotal")
    //     const itemsInCart = getLocalStorage("so-cart");
    //     for (const element of itemsInCart) {
    //         total += element.TotalPrice;
    //     }
    //     subtotal.innerHTML = total;
    // }
    calculateShipping(itemCount) {
        this.shipping = itemCount > 1 ? 10 + (itemCount - 1) * 2 : 10;
        document.querySelector(`${this.outputSelector} .shipping`).textContent = `$${this.shipping.toFixed(2)}`;
    }
    calculateTax() {
        this.tax = this.itemTotal * 0.06;
        document.querySelector(`${this.outputSelector} .tax`).textContent = `$${this.tax.toFixed(2)}`;
    }

    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        const itemCount = getLocalStorage(this.key).reduce((sum, item) => sum + item.quantity, 0);
        this.calculateShipping(itemCount);
        this.calculateTax();
        this.orderTotal = this.itemTotal + this.shipping + this.tax;
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        document.querySelector(`${this.outputSelector} .total`).textContent = `$${this.orderTotal.toFixed(2)}`;
        const total = this.calcTotal();
        document.querySelector(".cart-total").innerHTML = `<b>Total: $${total}</b>`;
        document.querySelector(".cart-footer-hide").style.visibility = "visible";
    }
}