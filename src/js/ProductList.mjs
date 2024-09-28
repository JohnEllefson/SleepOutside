import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
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
        const list = await this.dataSource.getData();
        // this.list = list;
        // this.renderLisit(list);
        const filteredList = await this.filterProducts(list);
        // console.log(list);
        renderListWithTemplate(productCardTemplate, this.listElement, filteredList, "afterbegin", false);
    }


    // renderLisit(list){
    //     renderListWithTemplate(productCardTemplate, this.listElement, list);
    // }

    async filterProducts(products) {
        const response = await fetch("/json/imagesFiles.json");
        if(!response.ok) {
            throw new Error("Failed to get image");
        }
        const imagesFiles = await response.json();

        return products.filter(product => {
            const imageName = product.Image.split("/").pop();
            return imagesFiles.includes(imageName);
        });
    }
    
    // renderLisit(list){
    //     const htmlStrings = list.map(productCardTemplate);
    //     this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
    // }
}

