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

export default class ProductListing {

    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        const imagesInFolder = await this.getImages(); // We get the images using the getImages() methos and store them in imagesInFolder
        const filteredList = await this.filterListByImage(list, imagesInFolder) //Filter the image list and store it in filteredList, using the filterListByImage() method which takes two parameters necessary to filter the list.
        console.log(filteredList);
        this.renderList(filteredList);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    async getImages() { //We get the list of images from a JSON file an return that list
        const response = await fetch('json/images.json');
        const images = await response.json();
        return images;
    }

    async filterListByImage(list, elementsWithAnImage) { //The actual list and the images are parameters

        return list.filter(product => { //We will filter the list using filter, each element inside that list is a "product"

            if (!product.Image) {
                return false;
            }

            const image = product.Image.split('/').pop();

            return elementsWithAnImage.includes(image); //It will return only the elements that have an image whose name matches one of the names of the images within elementsWithAnImage.

        });
    }


}