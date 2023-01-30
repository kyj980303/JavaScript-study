import { dummyRequest } from "../lib/api.js";
import { routeChange } from "../lib/router.js";
import { getItem } from "../lib/storage.js";
import Cart from "./Cart.js";

export default function CartPage({ $target }) {
  const $page = document.createElement("div");
  $page.className = "CartPage";
  $target.appendChild($page);

  const cartData = getItem("products_cart", []);

  this.state = {
    products: null,
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.fetchProducts = async () => {
    const products = await Promise.all(
      cartData.map(async (cartItem) => {
        const product = await dummyRequest(`/products/${cartItem.productId}`);
        const selectedOption = product.productOptions.find(
          (option) => option.id === cartItem.optionId
        );

        return {
          imageUrl: product.imageUrl,
          productName: product.name,
          quantity: cartItem.quantity,
          productPrice: product.price,
          optionName: selectedOption.name,
          optionPrice: selectedOption.price,
        };
      })
    );

    this.setState({ products });
  };
  this.fetchProducts();

  let renderCart = false;

  this.render = () => {
    if (cartData.length === 0) {
      alert("장바구니가 비어있습니다.");
      routeChange("/");
      return;
    }

    $page.innerHTML = "<h1>장바구니</h1>";

    if (this.state.products && !renderCart) {
      new Cart({
        $target: $page,
        initialState: this.state.products,
      }).render();

      renderCart = true;
    }
  };
}
