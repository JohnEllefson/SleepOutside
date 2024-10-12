import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
          <a href="/product_pages/index.html?product=${product.Id}">
          <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
          <h3 class="card__brand">${product.Brand.Name}</h3>
          <h2 class="card__name">${product.Name}</h2>
          <p class="product-card__price">$${product.ListPrice}</p>
          <p class="discount">$${(product.FinalPrice * .25).toFixed(2)} Off!</p>
          </a>
          <button id="quickLookup" class="icon-quickLookup" data-id="${product.Id}">🔍</button>
        </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;

      // Modal functionality
      this.modal = document.getElementById("productModal");
      this.closeButton = document.querySelector(".close-button");
    }

    async init() {
      // create an array of products from the data source
      this.products = await this.dataSource.getData(this.category);
      this.renderList(this.products);              
             

      this.closeButton.addEventListener("click", this.closeModal);

      window.addEventListener("click", (event) => {
        if (event.target == this.modal) {
          this.closeModal();
        }
      });

      
      // Loop through each product
      this.products.forEach(product => {
        // Find the HTML element with the matching data-id
        const element = document.querySelector(`[data-id="${product.Id}"]`);
        
        // Check if the element exists
        if (element) {
          // Add click event listener and bind the quickLookup function
            element.addEventListener("click", () => this.quickLookup(product.Id));
        }
      });
    }

    renderList(products) {
      this.listElement.innerHTML = ''; 
      // generate the list of products and insert them into the DOM
      renderListWithTemplate(productCardTemplate, 
                                    this.listElement, 
                                    products,
                                    "afterbegin", 
                                    false);
    }    

    openModal() {
      this.modal.style.display = "block";
    }
    
    closeModal = () => {
      this.modal.style.display = "none";
    }

    quickLookup(productId) {
      const selectedProduct = this.products.find(item => item.Id === productId);

      // Populate and show modal
      const modalProductDetails = document.getElementById("modalProductDetails");
      modalProductDetails.innerHTML = `

      <p><b>Product Name:</b> ${selectedProduct.NameWithoutBrand}</p>
      <p><b>Brand:</b> ${selectedProduct.Brand.Name}</p>
      <p><b>Product Description:</b> ${selectedProduct.DescriptionHtmlSimple}</p>
      <p><b>Product Price:</b> $${selectedProduct.ListPrice}</p>
      `;

      this.openModal();
    }  
}
