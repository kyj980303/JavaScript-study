import { dummyRequest } from "../lib/api.js";
import ProductDetail from "./ProductDetail.js";

export default function ProductDetailPage({ $target, productId }) {
  const $page = document.createElement("div");
  $page.className = "ProductDetailPage";
  $target.appendChild($page);

  this.state = {
    productId,
    product: null,
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.fetchProduct = async () => {
    const { productId } = this.state;
    const product = await dummyRequest(`/products/${productId}`);
    this.setState({
      productId,
      product,
    });
  };

  this.fetchProduct();

  this.render = () => {
    if (!this.state.product) {
      $page.innerHTML = "Loading...";
      return;
    }

    $page.innerHTML = "<h1>상품 정보</h1>";

    new ProductDetail({
      $target: $page,
      initialState: {
        product: this.state.product,
        selectedOptions: [],
      },
    }).render();
  };
}
