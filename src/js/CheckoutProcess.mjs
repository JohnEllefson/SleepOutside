import { getLocalStorage } from "./utils.mjs";


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
        this.calculateOrdertotal();
    }

    calculateItemSummary() {
        // calculate and display the total amount of the items in the cart, and the number of items.
        const itemsQuantity = document.querySelector('#quantity');
        if (itemsQuantity) {
            let cartItems = getLocalStorage('so-cart');
            if (cartItems) {
                this.itemTotal = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
            }

            itemsQuantity.innerHTML = this.itemTotal;
        }
    }

    calculateSubtotal() {
        let total = 0;
        const subtotal = document.querySelector(".cart-subtotal")
        const itemsInCart = getLocalStorage("so-cart");
        for (const element of itemsInCart) {
            total += element.TotalPrice;
        }
        this.total = total;  
        if (subtotal) {
            subtotal.innerHTML = `$${this.total.toFixed(2)}`;  
        }
    }

    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total

        //Shipping
        if (this.itemTotal > 0) {
            this.shipping = 10;

            if (this.itemTotal > 1) {
                this.shipping += (this.itemTotal - 1) * 2;
            }

            const shippingTotal = document.querySelector("#shipping")
            shippingTotal.innerHTML = ` $${this.shipping}`
        }

        //Tax
        const taxElement = document.querySelector("#tax");
        this.tax = this.total * 0.06;
        taxElement.innerHTML = ` $${this.tax.toFixed(2)}`;        

        // display the totals.

        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const orderTotalDisplay = document.querySelector("#order-total");
        const totalCalulated = this.total + this.shipping + this.tax
        orderTotalDisplay.innerHTML = ` $${totalCalulated.toFixed(2)}`;
    }
}