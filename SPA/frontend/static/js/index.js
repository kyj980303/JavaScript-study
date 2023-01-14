// /static/js/indes.js는 클라이언트 단 자바스크립트의 엔트리 포인트(시작점)이다.

import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Settings from "./views/Settings.js";
import NotFound from "./pages/NotFound.js";

//router 함수 구현
const router = async () => {
  const routes = [
    // view 는 해당 경로에서 나타내는 html을 의미한다.
    { path: "/", view: Dashboard },
    { path: "/posts", view: Posts },
    { path: "/settings", view: Settings },
    { path: "/404", view: NotFound },
  ];

  // 현재 route와 현재 페이지 경로가 일치하는지 테스트하는 코드
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  // find 메서드를 사용해 isMatch가 true인 객체를 찾는다.
  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  console.log(match);

  // isMatch true인 객체가 없을 때 메인 페이지로 이동
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
    // 404에러가 뜰 경우
    const page = new NotFound();
    document.querySelector("#app").innerHTML = await page.getHtml();
  } else {
    // 활성화된 view 담기
    const page = new match.route.view();
    // #app 엘리먼트에 활성화된 view의 html 삽입
    // 자바스크립트는 await 키워드를 만나면 프라미스가 처리될 때까지 기다린다.
    // 결과는 그 이후 반환됩니다.
    document.querySelector("#app").innerHTML = await page.getHtml();
  }
};

// 뒤로 가기 할 때 데이터 나오게 하기 위한 코드
window.addEventListener("popstate", router);

// HTML 이 모두 로드됐을 때 첫 페이지를 보여주기 위해서 DOMContentLoaded를 사용한다.
document.addEventListener("DOMContentLoaded", () => {
  // click 이벤트를 등록하고
  document.body.addEventListener("click", (e) => {
    // data-link라는 속성(a 태그)이 있는 곳에서만 동작하도록 조건을 달아준다.
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      // history.pushState()를 사용하면 새로고침 없이 페이지 전환을 할 수 있고
      // 뒤로가기와 앞으로가기도 활성화된다.
      history.pushState(null, null, e.target.href);
      // router 함수를 실행시켜 렌더링한다.
      router();
    }
  });
  router();
});
