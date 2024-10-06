import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  console.log(product);
    return `<li class="product-card">
              <a href="/product_pages/index.html?product=${product.Id}">
                <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.Name}</h2>
                <p class="product-card__price">$${product.ListPrice}</p>
                <p class="discount">$${(product.FinalPrice * .25).toFixed(2)} Off!</p>
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
      // const list = await this.dataSource.getData(this.category);
      this.products = await this.dataSource.getData(this.category);
       // create an array of products from the data source
             // Use list for rendering if you want
             this.renderList(this.products);                               
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
}
