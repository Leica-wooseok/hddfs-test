class Footer extends HTMLElement {
  connectedCallback() {
    const noticeText =
      this.getAttribute("notice-text") ||
      "[공지사항] 로즈몽 外 4개 브랜드 적립금 사용안내";
    const noticeLink = this.getAttribute("notice-link") || "#this";
    const exchangeRate = this.getAttribute("exchange-rate") || "$1 = 1,103.1원";

    this.innerHTML = `
      <footer class="footer">
        <!-- 공지사항  -->
        <a href="${noticeLink}" class="footer__notice">
          <span>${noticeText}</span>
          <img src="./images/icons/ic-m-arrow-right.svg" alt="" />
        </a>
        <!-- /공지사항 end -->

        <!-- Footer 메뉴 -->
        <div class="footer__menu">
          <div class="container">
            <a href="#this" class="footer__menu-link">지점안내</a>
            <a href="#this" class="footer__menu-link">인도장안내</a>
            <a href="#this" class="footer__menu-link">고객센터</a>
            <a href="#this" class="footer__menu-link">입점/제휴</a>
          </div>
        </div>
        <!-- Footer 메뉴 end -->

        <!-- Footer main content -->
        <div class="footer__main">
        <div class="container">
            <ul class="footer__main-menu">
              <li>
                <a href="#this" class="footer__main-menu-button footer__main-menu-button--link">
                  <span>H.Point</span>
                  <img src="./images/icons/ic-m-fill-arrow-right.svg" alt="" />
                </a>
              </li>
              <li>
                <button type="button" class="footer__main-menu-button">
                  <span>Family Site</span>
                  <img src="./images/icons/ic-m-fill-arrow-right.svg" alt="" />
                </button>
              </li>
              <li>
                <button type="button" class="footer__main-menu-button">
                  <span>㈜현대디에프</span>
                  <img src="./images/icons/ic-m-fill-arrow-right.svg" alt="" />
                </button>
              </li>
            </ul>
            <hr class="footer__main-divider" />
            <div class="footer__main-guide">
              <button type="button" class="vertical-line">PC버전</button>
              <button type="button" class="vertical-line">中文网</button>
              <div class="footer__main-exchange">
                <span>환율</span>
                <strong>${exchangeRate}</strong>
              </div>
            </div>
            <hr class="footer__main-divider" />
            <div class="footer__main-terms">
              <a href="#this" class="vertical-line">이용약관</a>
              <a href="#this" class="vertical-line footer__main-terms--pale-grey">
                개인정보처리방침</a
              >
              <a href="#this" class="vertical-line">영상정보 처리기기/관리방침</a>
            </div>
            <div class="footer__main-copyright">
              COPYRIGHT © HYUNDAI DF Co,. Ltd. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
        <!-- Footer main content end -->
      </footer>
    `;
  }
}

customElements.define("app-footer", Footer);
