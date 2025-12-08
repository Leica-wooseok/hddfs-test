class Header extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "";

    this.innerHTML = `
      <header class="header">
        <div class="header__inner">
          <button type="button" class="header__button">
            <img src="./images/icons/ic-m-back.svg" alt="" aria-hidden="true" />
            뒤로가기
          </button>
          <div class="header__title">${title}</div>
          <div class="header__button-box">
            <button type="button" class="header__button">
              <img
                src="./images/icons/ic-m-search.svg"
                alt=""
                aria-hidden="true"
              />
              검색
            </button>
            <button type="button" class="header__button">
              <img
                src="./images/icons/ic-m-cart.svg"
                alt=""
                aria-hidden="true"
              />
            장바구니
            </button>
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define("app-header", Header);
