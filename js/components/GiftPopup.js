class GiftPopup extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // 접근성 속성 설정
    this.setAttribute("role", "dialog");
    this.setAttribute("aria-modal", "true");
    this.setAttribute("aria-labelledby", "gift-popup-title");

    this.className = "dim-layer hidden";
    this._render();
    this._attachEventListeners();
  }

  _render() {
    this.innerHTML = `
      <div class="mobile-popup">
        <h2 id="gift-popup-title" class="visually-hidden">브랜드 사은행사 검색</h2>
        <!-- 레이어 닫기 버튼  -->
        <button type="button" class="close-button" aria-label="팝업 닫기">
          <span aria-hidden="true">팝업 닫기 버튼</span>
        </button>
        <!-- 레이어 닫기 버튼 end -->
        <div class="mobile-popup-content-wrap">
          <div aria-live="polite" aria-atomic="true" class="visually-hidden" id="search-status"></div>
          <!-- 검색 form -->
          <div class="search-wrap">
            <button class="search-icon-button" type="button" aria-label="뒤로가기">
              <img src="./images/icons/ic-m-arrow2-right.svg" alt="" aria-hidden="true" />
              <span aria-hidden="true">뒤로가기</span>
            </button>
            <form action="" name="search" role="search">
              <label for="gift-search-input" class="visually-hidden">브랜드 검색</label>
              <input
                type="search"
                id="gift-search-input"
                name="keyword"
                class="search-input"
                placeholder="브랜드명으로 검색해보세요"
                autocomplete="off"
                aria-describedby="search-help"
              />
              <span id="search-help" class="visually-hidden">
                브랜드명을 입력하고 엔터를 누르거나 검색 버튼을 클릭하세요
              </span>
              <button type="button" class="search-icon-button search-form-submit" aria-label="검색">
                <img src="./images/icons/ic-m-search.svg" alt="" aria-hidden="true" />
                <span aria-hidden="true">검색</span>
              </button>
            </form>
          </div>
          <!-- 검색 form end -->

          <!-- 검색 카테고리 -->
          <div class="search-category-wrap">
            <ul class="search-category-list" role="tablist" aria-label="검색 카테고리">
              <li role="presentation">
                <button type="button" class="search-category-button active" role="tab" aria-selected="true" aria-controls="event-panel" id="tab-all">
                  전체
                </button>
              </li>
              <li role="presentation">
                <button type="button" class="search-category-button" role="tab" aria-selected="false" aria-controls="event-panel" id="tab-skincare">
                  스킨케어
                </button>
              </li>
              <li role="presentation">
                <button type="button" class="search-category-button" role="tab" aria-selected="false" aria-controls="event-panel" id="tab-makeup">
                  메이크업
                </button>
              </li>
              <li role="presentation">
                <button type="button" class="search-category-button" role="tab" aria-selected="false" aria-controls="event-panel" id="tab-perfume">
                  향수/헤어/바디
                </button>
              </li>
              <li role="presentation">
                <button type="button" class="search-category-button" role="tab" aria-selected="false" aria-controls="event-panel" id="tab-bag">
                  가방/지갑
                </button>
              </li>
            </ul>
          </div>
          <!-- 검색 카테고리 end -->

          <!-- 이벤트 목록 -->
          <ul class="event-list" role="tabpanel" id="event-panel" aria-label="사은행사 이벤트 목록">
            <li>
              <a href="#this" class="event-link">
                <div class="event-gift-image">
                  <img
                    src="./images/gifts/img-gift-1.png"
                    alt="아우구스티누스 바더 단독 구매 사은 이벤트"
                  />
                </div>
                <div class="event-gift-info">
                  <strong class="event-gift-name">
                    아우구스티누스 바더 <br />
                    단독 구매 사은 이벤트
                  </strong>
                  <span class="event-gift-text"
                    >When purchaasing GLASS SKIN ESSENCE PACT, Heart Quilting
                    Pouch Gift</span
                  >
                </div>
              </a>
            </li>
            <li>
              <a href="#this" class="event-link">
                <div class="event-gift-image">
                  <img
                    src="./images/gifts/img-gift-2.png"
                    alt="블리브유 신규입점 사은행사"
                  />
                </div>
                <div class="event-gift-info">
                  <strong class="event-gift-name">
                    블리브유 신규입점 사은행사
                  </strong>
                  <span class="event-gift-text"
                    >선착순 리뷰 이벤트 및 구매 금액별 사은행사</span
                  >
                </div>
              </a>
            </li>
            <li>
              <a href="#this" class="event-link">
                <div class="event-gift-image">
                  <img
                    src="./images/gifts/img-gift-3.png"
                    alt="설화수 8월 사은행사"
                  />
                </div>
                <div class="event-gift-info">
                  <strong class="event-gift-name"> 설화수 8월 사은행사 </strong>
                  <span class="event-gift-text">구매고객 100% 사은증정</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#this" class="event-link">
                <div class="event-gift-image">
                  <img
                    src="./images/gifts/img-gift-4.png"
                    alt="정관장 신상품 출시 기념 역대급 혜택"
                  />
                </div>
                <div class="event-gift-info">
                  <strong class="event-gift-name">
                    정관장 신상품 출시 기념 <br />
                    역대급 혜택
                  </strong>
                  <span class="event-gift-text">신상품 출시 구매 사은행사</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#this" class="event-link">
                <div class="event-gift-image">
                  <img
                    src="./images/gifts/img-gift-5.png"
                    alt="라네즈 단독 기획전"
                  />
                </div>
                <div class="event-gift-info">
                  <strong class="event-gift-name"> 라네즈 단독 기획전 </strong>
                  <span class="event-gift-text">구매고객 100% 사은증정</span>
                </div>
              </a>
            </li>
          </ul>
          <!-- 이벤트 목록 end -->
        </div>
      </div>
    `;
  }

  _attachEventListeners() {
    // 닫기 버튼 클릭
    const closeButton = this.querySelector(".close-button");
    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());
    }

    // dim 영역 클릭
    this.addEventListener("click", (e) => {
      if (e.target === this) {
        this.close();
      }
    });

    // 카테고리 버튼 클릭
    const categoryButtons = this.querySelectorAll(".search-category-button");
    categoryButtons.forEach((button, index) => {
      // 클릭 이벤트
      button.addEventListener("click", () => {
        // 모든 버튼에서 active 제거
        categoryButtons.forEach((btn) => {
          btn.classList.remove("active");
          btn.setAttribute("aria-selected", "false");
        });
        // 클릭한 버튼만 active
        button.classList.add("active");
        button.setAttribute("aria-selected", "true");
      });
    });
  }

  open() {
    this.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  close() {
    this.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

customElements.define("gift-popup", GiftPopup);
