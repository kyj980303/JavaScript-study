import { routeChange } from "../lib/router.js";

export default function ProductList({ $target, initialState }) {
  const $productList = document.createElement("ul");
  $target.appendChild($productList);

  this.state = initialState;

  $productList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const { productId } = $li.dataset;

    if (productId) {
      routeChange(`/products/${productId}`);
    }
  });

  this.render = () => {
    if (!this.state) {
      return;
    }
    $productList.innerHTML = `
      ${this.state
        .map(
          (product) =>
            `
          <li class="Product" data-product-id="${product.id}">
            <img src="${product.imageUrl}">
            <div class="Product__info">
              <div>${product.name}</div>
              <div>${product.price}~</div>
            </div>
          </li>
        `
        )
        .join("")}`;
  };
}
