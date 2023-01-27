export const dummyRequest = async (url, option = {}) => {
  await new Promise((r) => setTimeout(r, 100));

  if (url === "/products") {
    const response = await fetch("../../data/product-list.json");
    const json = await response.json();
    console.log(json);
    return json;
  } else if (url.indexOf("/products/") === 0) {
    const [, , id] = url.split("/");
    const response = await fetch("../../data/products.json");
    const json = await response.json();
    const [product] = json.filter((i) => i.id === parseInt(id));
    return product;
  }
};
