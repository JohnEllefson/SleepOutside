import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function displayWishlist() {
  const wishlistContainer = document.getElementById("wishlist");
  const wishlistArray = getLocalStorage("so-wishlist") || [];

  // Clear the container before rendering
  wishlistContainer.innerHTML = "";

  if (wishlistArray.length === 0) {
    wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
    return;
  }

  wishlistArray.forEach((item) => {
    // Create a div for each wishlist item
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("wishlist-item");

    // Add product details (image, name, price, etc.)
    itemDiv.innerHTML = `
        <img src="${item.Images?.PrimaryLarge || item.imageUrl}" alt="${item.NameWithoutBrand || item.name}" class="wishlist-image" />
        <h3>${item.Brand?.Name || " "} - ${item.NameWithoutBrand || item.name}</h3>
        <p>$${item.FinalPrice || "N/A"}</p>
        <button class="remove-button" data-id="${item.Id}">Remove</button>
      `;

    wishlistContainer.appendChild(itemDiv);
    const removeButton = itemDiv.querySelector(".remove-button");
    removeButton.addEventListener("click", () => {
      removeFromWishlist(item.Id);
      displayWishlist();
    });
  });
}

function removeFromWishlist(productId) {
  let wishlistArray = getLocalStorage("so-wishlist");
  wishlistArray = wishlistArray.filter((item) => item.Id !== productId);
  setLocalStorage("so-wishlist", wishlistArray);
}

// Call the function to display items when the page loads
document.addEventListener("DOMContentLoaded", displayWishlist);
