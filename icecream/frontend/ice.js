import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Baskin Robbins");
  }

  async getHtml() {
    return `
		<main class="App">
      <div class="ProductListPage">
        <a href="/" class="nav__link" data-link>
          <img class="logo" src="./static/img/logo.png" />
        </a>
        <ul>
          <li class="Product">
            <a href="/detail" class="nav__link" data-link>
              <img src="./static/img/ice1.png" />
              <div class="Product__info">
                <div>베리베리스트로베리</div>
                <div>3,500원~</div>
              </div>
            </a>
          </li>
          <li class="Product">
            <a href="/detail" class="nav__link" data-link>
              <img src="./static/img/ice2.png" />
              <div class="Product__info">
                <div>민트초코</div>
                <div>3,500원~</div>
              </div>
            </a>
          </li>
          <li class="Product">
            <a href="/detail" class="nav__link" data-link>
              <img src="./static/img/ice3.png" />
              <div class="Product__info">
                <div>바닐라</div>
                <div>3,500원~</div>
              </div>
            </a>
          </li>
          <li class="Product">
            <a href="/detail" class="nav__link" data-link>
              <img src="./static/img/ice4.png" />
              <div class="Product__info">
                <div>아몬드봉봉</div>
                <div>3,500원~</div>
              </div>
            </a>
          </li>
          <li class="Product">
            <a href="/detail" class="nav__link" data-link>
              <img src="./static/img/ice5.png" />
              <div class="Product__info">
                <div>마법사의할로윈</div>
                <div>3,500원~</div>
              </div>
            </a>
          </li>
          <li class="Product">
            <a href="/detail" class="nav__link" data-link>
              <img src="./static/img/ice6.png" />
              <div class="Product__info">
                <div>레인보우샤베트</div>
                <div>3,500원~</div>
              </div>
            </a>
          </li>
          <li class="Product">
            <a href="/detail" class="nav__link" data-link>
              <img src="./static/img/ice7.png" />
              <div class="Product__info">
                <div>요거트</div>
                <div>3,500원~</div>
              </div>
            </a>
          </li>
          <li class="Product">
            <a href="/detail" class="nav__link" data-link>
              <img src="./static/img/ice8.png" />
              <div class="Product__info">
                <div>그린티</div>
                <div>3,500원~</div>
              </div>
            </a>
          </li>
          <li class="Product">
            <a href="/detail" class="nav__link" data-link>
              <img src="./static/img/ice9.png" />
              <div class="Product__info">
                <div>쿠앤크</div>
                <div>3,500원~</div>
              </div>
            </a>
          </li>
          <li class="Product">
            <a href="/detail" class="nav__link" data-link>
              <img src="./static/img/ice10.png" />
              <div class="Product__info">
                <div>체리쥬빌레</div>
                <div>3,500원~</div>
              </div>
            </a>
          </li>
          <li class="Product">
            <a href="/detail" class="nav__link" data-link>
              <img src="./static/img/ice11.png" />
              <div class="Product__info">
                <div>초콜릿</div>
                <div>3,500원~</div>
              </div>
            </a>
          </li>
          <li class="Product">
            <a href="/detail" class="nav__link" data-link>
              <img src="./static/img/ice12.png" />
              <div class="Product__info">
                <div>초코나무숲</div>
                <div>3,500원~</div>
              </div>
            </a>
          </li>
        </ul>
        <footer>
          <p>Baskin Robbins</p>
        </footer>
      </div>
      </main>
	`;
  }
}
