// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// extract the query string from the URL
export function getParams(params) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(params);
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parent, data, callback) {
  parent.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const html = await response.text();
  const template = document.createElement('template');
  template.innerHTML = html;
  return template;
}

export async function loadHeaderFooter() {
  const headerContent = await loadTemplate("/partials/header.html");
  const footerContent = await loadTemplate("/partials/footer.html");
  const headerElement = document.querySelector("#dynamic-header");
  const footerElement = document.querySelector("#dynamic-footer");
  renderWithTemplate(headerContent.innerHTML, headerElement);
  renderWithTemplate(footerContent.innerHTML, footerElement);
}

export function calculateCartTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.TotalPrice, 0);
}
export function alertMessage(message, scroll = true) {
  // this creates a new div for the alert
  const alert = document.createElement("div");
  // now we add a class to style the alert
  alert.classList.add("alert");
  // Set the inner HTML of the alert (message + close button)
  alert.innerHTML = `
    <span>${message}</span>
    <button class="alert-close">X</button>
  `;
  // Adds the alert to the top of the main element
  const main = document.querySelector("main");
  main.prepend(alert);  // Inserts the alert at the top
  // Scrolls to the top of the page if the scroll option is true
  if (scroll) {
    window.scrollTo(0, 0);
  }
  // this adds an event listener for the close button
  alert.addEventListener("click", function (e) {
    // now it checks if the user clicked the "X" button
    if (e.target && e.target.classList.contains("alert-close")) {
      // finaly this removes the alert from the DOM
      main.removeChild(alert);
    }
  });
}