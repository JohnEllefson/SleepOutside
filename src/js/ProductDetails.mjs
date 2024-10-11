
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="discount">$${( product.FinalPrice * .25).toFixed(2)} Off!</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      <button id="addToWishlist" class="icon-wishlist" data-id="${product.Id}">⭐ Add to Wishlist</button>
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

    document.getElementById("addToWishlist").addEventListener("click", this.addToWishlist.bind(this));
  }

  addToCart() {
      let cartArray = getLocalStorage("so-cart");
      if (!Array.isArray(cartArray)) {
          cartArray = [];
      }

      const cartItem = cartArray.find(item => item.Id === this.product.Id);

      if (cartItem) {
        cartArray[cartArray.indexOf(cartItem)].quantity += 1;
      }
      else {
        this.product.quantity = 1;
        cartArray.push(this.product);
      }

      if (cartArray) {
        cartArray.forEach((item) => {
        item.TotalPrice = Number((item.FinalPrice * item.quantity).toFixed(2));
        });
      }

      setLocalStorage("so-cart", cartArray);

      updateCartQuantity();

      saveCartQuantity(cartArray);
  }

  addToWishlist() {
    let wishlistArray = getLocalStorage("so-wishlist");
    if(!Array.isArray(wishlistArray)) {
      wishlistArray = [];
    }

    const wishlistItem = wishlistArray.find(item => item.id === this.product.Id);

    if (!wishlistItem) {
      wishlistArray.push(this.product);
      setLocalStorage("so-wishlist", wishlistArray);
      alert("Item successfully added to your Wish List");
    } else {
      alert("Hey guess what? That item is already in your Wish List.");
    }
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

export function saveCartQuantity(cartItems) {
  // we get again the total in cart
  const totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  // and we save in the local storage
  localStorage.setItem('so-cart-quantity', totalQuantity);
}