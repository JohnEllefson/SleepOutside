import ExternalService from "./ExternalServices.mjs";

const externalServices = new ExternalService();

const categoryMap = {
  // This pluralizes the words as found in the data
  "sleeping bag": "sleeping-bags",
  "sleeping-bag": "sleeping-bags",
  sleepingbag: "sleeping-bags",
  tent: "tents",
  hammock: "hammocks",
  backpack: "backpacks",
};

const normalizeKeyword = (keyword) => {
  const normalizedKeyword = keyword.replace(/\s+/g, "-");

  return categoryMap[normalizedKeyword] || normalizedKeyword; //This verifies if the normalized word (plural and with dashes, exists in the object, it if does it returns it, otherwise, it will return the normalized Word)
};

export default function searchItem() {
  const searchButton = document.querySelector("#search-button");
  const searchBox = document.querySelector("#search-box");

  const performSearch = async () => {
    try {
      const keyword = searchBox.value.toLowerCase().trim();

      if (!keyword) {
        throw new Error(`Please enter a search term.`);
      }

      const normalizedKeyWord = normalizeKeyword(keyword);
      // console.log(normalizedKeyWord);

      const product = await externalServices.getData(normalizedKeyWord);

      if (product.length === 0) {
        throw new Error(`No items found for: ${keyword}`);
      }

      //   console.log(product);

      window.location.href = `/product-listing/index.html?catagory=${normalizedKeyWord}`;
    } catch (error) {
      alert(error.message);
      //   console.error(error);
    }
  };

  searchButton.addEventListener("click", performSearch);

  searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      performSearch();
      event.prefentDefault();
    }
  });
}
