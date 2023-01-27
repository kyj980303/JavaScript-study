import ProductListPage from "./components/ProductListPage.js";
import ProductDetailPage from "./components/ProductDetailPage.js";
import CartPage from "./components/CartPage.js";
import { init } from "./lib/router.js"; // router안에 있는 함수들 중에서 필요한 init함수만 임포트함으로써 불필요한 코드가 제거되어 빌드 결과물의 크기가 작아진다.

// export default를 사용하면 '해당 모듈엔 개체가 하나만 있다’는 사실을 명확히 나타낼 수 있다.
// 이렇게 default를 붙여서 모듈을 내보내면 중괄호 {} 없이 모듈을 가져올 수 있다.
export default function App({ $target }) {
  this.route = () => {
    // const pathname = location.pathname;
    // ==> const {pathname} = location;
    const { pathname } = location;

    $target.innerHTML = "";

    if (pathname === "/") {
      new ProductListPage({ $target }).render();
    } else if (pathname.indexOf("/products/") === 0) {
      const [, , productId] = pathname.split("/");
      new ProductDetailPage({ $target, productId }).render();
    } else if (pathname === "/cart") {
      new CartPage({ $target }).render();
    }
  };

  init(this.route);
  window.addEventListener("popstate", this.route);

  this.route();
}
