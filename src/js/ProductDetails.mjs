
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="discount">${product.Discount}% Off!</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails("main");
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
      let cartArray = getLocalStorage("so-cart");
      if (!Array.isArray(cartArray)) {
          cartArray = [];
      }

      const itemsInCart = cartArray.find(item => item.id === this.product.Id);

      if (itemsInCart) {
        itemsInCart.quantity += 1;
      }
      else {
        this.product.quantity = 1;
        cartArray.push(this.product);
      }    

      setLocalStorage("so-cart", cartArray);

      updateCartQuantity();

      saveCartQuantity(cartArray);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
}

function updateCartQuantity() {
  const iconCartSpan = document.querySelector('.icon-cart');
  if (iconCartSpan) {
    let cartItems = getLocalStorage('so-cart');
    let totalQuantity = 0;
  if (cartItems) {
      totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    }
    iconCartSpan.innerHTML = totalQuantity;
  }
}

function saveCartQuantity(cartItems) {
  // we get again the total in cart
  const totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  // and we save in the local storage
  localStorage.setItem('so-cart-quantity', totalQuantity);
}