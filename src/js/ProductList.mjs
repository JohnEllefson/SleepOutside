import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.ListPrice}</p>
        </a>
    </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }

    async init() {
      // create an array of products from the data source
      const list = await this.dataSource.getData();

      // filter out the products that don't have images
      const filteredList = await this.filterProducts(list);

      // generate the list of products and insert them into the DOM
      renderListWithTemplate(productCardTemplate, 
                             this.listElement, 
                             filteredList, 
                             "afterbegin", 
                             false);
    }

    // filter out products that don't have images
    async filterProducts(products) {
      // Fetch the list of image files from the JSON file
      const response = await fetch('/json/imageFiles.json');
      if (!response.ok) {
        throw new Error('Failed to fetch image files');
      }
      const imageFiles = await response.json();
  
      // Filter products based on the image files
      return products.filter(product => {
        const imageName = product.Image.split('/').pop();
        return imageFiles.includes(imageName);
      });
    }
}
