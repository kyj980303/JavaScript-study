import { dummyRequest } from "../lib/api.js";
import ProductList from "./ProductList.js";

export default function ProductListPage({ $target }) {
  const $page = document.createElement("div");
  $page.className = "ProductListPage";
  $target.appendChild($page);

  this.setState = (nextState) => {
    // state 객체는 내부에서 변화하는 값을 저장하는 하나의 공간이다.
    this.state = nextState;
    this.render();
  };

  const fetchProducts = async () => {
    const products = await dummyRequest("/products");
    this.setState(products);
  };

  fetchProducts();

  this.render = () => {
    $page.innerHTML = "<h1>상품 목록</h1>";

    new ProductList({
      $target: $page,
      initialState: this.state,
    }).render();
  };
}
