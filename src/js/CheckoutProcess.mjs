import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}
function packageItems(items) {
    const simplifiedItems = items.map((item) => {
      console.log(item);
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
      };
    });
    return simplifiedItems;
}


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
        // this.calculateSubtotal();
        // this.calculateOrdertotal();
        
    }
    
    calculateItemSummary() {
        const cartSummary = document.querySelector(this.outputSelector + ".cartSummary"
            
        );
        const quantity = document.querySelector(this.outputSelector + "#quantity"
            
        );
        quantity.innerText = this.list.length;
        
        const itemAmounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = itemAmounts.reduce((sum,item) => sum + item);
        cartSummary.innerText = "$" + this.itemTotal;
        
    }
    
    calculateOrderTotal() {
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
            parseFloat(this.itemTotal) + parseFloat(this.shipping) + parseFloat(this.tax)).toFixed(2);
        
        this.displayOrderTotals();
    
    }
    
        // document.getElementById('shipping').textContent = this.shipping.toFixed(2);
        // document.getElementById('tax').textContent = this.tax.toFixed(2);
        // document.getElementById('orderTotal').textContent = this.orderTotal.toFixed(2);
    
    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const shipping = document.querySelector(this.outputSelector + ".shipping");
        const tax = document.querySelector(this.outputSelector + ".tax");
        const orderTotal = document.querySelector(this.outputSelector + ".orderTotal");

        shipping.innerText = "$" + this.shipping;
        tax.innerText = "$" + this.tax;
        orderTotal.innerText = "$" + this.orderTotal; 
        
        // document.querySelector(`${this.outputSelector} .total`).textContent = `$${this.orderTotal.toFixed(2)}`;
        // const total = this.calcTotal();
        // document.querySelector(".cart-total").innerHTML = `<b>Total: $${total}</b>`;
        // document.querySelector(".cart-footer-hide").style.visibility = "visible";
        // const orderTotalDisplay = document.querySelector("#order-total");
        // const totalCalulated = this.total + this.shipping + this.tax
        // orderTotalDisplay.innerHTML = ` $${totalCalulated.toFixed(2)}`;
        
    }
    async checkout() {
        const formElement = document.forms["checkout-form"];

        const json = formDataToJSON(formElement);
        json.orderDate = new Date();
        json.orderTotal =  this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);

        try {
            const res = await services.checkout(json);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
    // calculateSubtotal() {
    //     const itemsInCart = getLocalStorage(this.key);
    //     this.itemTotal = calculateCartTotal(itemsInCart);
    //     document.querySelector(".cart-subtotal").innerHTML = this.itemTotal.toFixed(2);
    // }
    // calculateSubtotal() {
    //     let total = 0;
    //     const subtotal = document.querySelector(".cart-subtotal")
    //     const itemsInCart = getLocalStorage("so-cart");
    //     for (const element of itemsInCart) {
    //         total += element.TotalPrice;
    //     }
    //     subtotal.innerHTML = total;
    // }
    // calculateShipping(itemCount) {
    //     this.shipping = itemCount > 1 ? 10 + (itemCount - 1) * 2 : 10;
    //     document.querySelector(`${this.outputSelector} .shipping`).textContent = `$${this.shipping.toFixed(2)}`;
    // }
    // calculateTax() {
    //     this.tax = this.itemTotal * 0.06;
    //     document.querySelector(`${this.outputSelector} .tax`).textContent = `$${this.tax.toFixed(2)}`;
    //     let total = 0;
    //     const subtotal = document.querySelector(".cart-subtotal")
    //     const itemsInCart = getLocalStorage(this.key);
    //     for (const element of itemsInCart) {
    //         total += element.TotalPrice;
    //     }
    //     this.total = total;  
    //     if (subtotal) {
    //         subtotal.innerHTML = `$${this.total.toFixed(2)}`;  
    //     }
    // }

    // calculateOrdertotal() {
    //     // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    //     const itemCount = getLocalStorage(this.key).reduce((sum, item) => sum + item.quantity, 0);
    //     this.calculateShipping(itemCount);
    //     this.calculateTax();
    //     this.orderTotal = this.itemTotal + this.shipping + this.tax;

    //     //Shipping
    //     if (this.itemTotal > 0) {
    //         this.shipping = 10;

    //         if (this.itemTotal > 1) {
    //             this.shipping += (this.itemTotal - 1) * 2;
    //         }

    //         const shippingTotal = document.querySelector("#shipping")
    //         shippingTotal.innerHTML = ` $${this.shipping}`
    //     }
    
    //     //Tax
    //     const taxElement = document.querySelector("#tax");
    //     this.tax = this.total * 0.06;
    //     taxElement.innerHTML = ` $${this.tax.toFixed(2)}`;        
    
    //     // display the totals.
    
    //     this.displayOrderTotals();
    // }
}