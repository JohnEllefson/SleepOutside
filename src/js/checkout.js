import { loadHeaderFooter } from "./utils.mjs";

async function main() {
  await loadHeaderFooter();

  document.querySelector(".icon-cart").innerHTML =
    localStorage.getItem("so-cart-quantity") || 0;
}

document.addEventListener("DOMContentLoaded", main);
