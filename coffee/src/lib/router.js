const ROUTE_CHANGE_EVENT = "ROUTE_CHANGE";

export const init = (onRouteChange) => {
  window.addEventListener(ROUTE_CHANGE_EVENT, () => {
    onRouteChange();
  });
};

export const routeChange = (url, params) => {
  history.pushState(null, null, url); // 새로고침없이 주소를 바꿔줌
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, params));
};
