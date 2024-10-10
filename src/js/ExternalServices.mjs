const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}
export default class ExternalService {
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(order) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    };

    try {
        const res = await fetch(baseURL + "checkout/", options);
        return await convertToJson(res);
    } catch (err) {
        
        console.error("Request error:", err); 

        
        const errorResponse = await (await fetch(baseURL + "checkout/", options)).text();
        console.error("Response Error:", errorResponse);
        
        throw err; 
    }
}

}


