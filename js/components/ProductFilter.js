class ProductFilter extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["total-count", "sort-options", "default-sort"];
  }

  _render() {
    const totalCount = this.getAttribute("total-count") || "0";
    const sortOptionsJson = this.getAttribute("sort-options");
    const sortOptions = sortOptionsJson
      ? JSON.parse(sortOptionsJson)
      : [
          { value: "best", label: "베스트순" },
          { value: "asc", label: "오름차순" },
          { value: "desc", label: "내림차순" },
        ];
    const defaultSort = this.getAttribute("default-sort") || "best";
    const defaultSortLabel =
      sortOptions.find((opt) => opt.value === defaultSort)?.label ||
      sortOptions[0].label;

    this.className = "product-filter";
    this.innerHTML = `
      <button
        type="button"
        class="product-filter__button product-filter__button--desktop"
      >
        Filter 
      </button>
      <span class="product-filter__total">총
        <em>${totalCount}건</em>
      </span>
      <div class="product-filter__toggle">
        <img
          class="product-filter__toggle-icon"
          src="./images/icons/ic-m-info-line.svg"
          alt="정보 아이콘"
        />
        <span class="product-filter__toggle-text">품절</span>
        <label class="toggle-switch">
          <input
            class="toggle-switch-input"
            id="sortSoldOut"
            type="checkbox"
          />
          <span class="toggle-switch-round"></span>
        </label>
      </div>
      <div class="product-filter-divider"></div>
      <div class="product-filter__actions">
        <div class="product-filter__sort-wrapper">
          <button
            type="button"
            class="product-filter__button product-filter__button--sort"
            id="sortButton"
          >
            <span class="product-filter__sort-text">${defaultSortLabel}</span>
            <img
              class="product-filter__sort-icon"
              src="./images/icons/ic-m-arrow-down.svg"
              alt="아래 화살표 아이콘"
            />
          </button>
          <ul class="product-filter__sort-dropdown" id="sortDropdown">
            ${sortOptions
              .map(
                (option, index) => `
              <li class="product-filter__sort-item ${
                option.value === defaultSort ? "active" : ""
              }" data-value="${option.value}">
                ${option.label}
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
        <button
          type="button"
          class="product-filter__button product-filter__button--mobile"
        >
          필터 열기
          <img
            src="./images/icons/ic-m-filter(2lines).svg"
            alt="필터 아이콘"
          />
        </button>
      </div>
      <div class="dropdown-overlay" id="dropdownOverlay"></div>
    `;

    // 드롭다운 기능 초기화
    this._initDropdown();
  }

  _initDropdown() {
    const sortButton = this.querySelector("#sortButton");
    const sortDropdown = this.querySelector("#sortDropdown");
    const dropdownOverlay = this.querySelector("#dropdownOverlay");
    const sortText = this.querySelector(".product-filter__sort-text");
    const sortIcon = this.querySelector(".product-filter__sort-icon");
    const sortItems = this.querySelectorAll(".product-filter__sort-item");

    if (!sortButton || !sortDropdown) return;

    // 드롭다운 열기/닫기
    const toggleDropdown = () => {
      const isOpen = sortDropdown.classList.contains("active");
      if (isOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    };

    // 드롭다운 열기
    const openDropdown = () => {
      sortDropdown.classList.add("active");
      dropdownOverlay.classList.add("active");
      sortIcon.classList.add("rotate");
    };

    // 드롭다운 닫기
    const closeDropdown = () => {
      sortDropdown.classList.remove("active");
      dropdownOverlay.classList.remove("active");
      sortIcon.classList.remove("rotate");
    };

    // 정렬 버튼 클릭
    sortButton.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown();
    });

    // 드롭다운 아이템 클릭
    sortItems.forEach((item) => {
      item.addEventListener("click", () => {
        // 모든 아이템에서 active 제거
        sortItems.forEach((i) => i.classList.remove("active"));

        // 클릭한 아이템에 active 추가
        item.classList.add("active");

        // 버튼 텍스트 변경
        sortText.textContent = item.textContent.trim();

        // 커스텀 이벤트 발생
        this.dispatchEvent(
          new CustomEvent("sortchange", {
            detail: { value: item.dataset.value },
            bubbles: true,
          })
        );

        // 드롭다운 닫기
        closeDropdown();
      });
    });

    // 배경 오버레이 클릭 시 닫기
    dropdownOverlay.addEventListener("click", closeDropdown);

    // ESC 키로 닫기
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeDropdown();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // cleanup을 위한 참조 저장
    this._dropdownCleanup = () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }

  connectedCallback() {
    this._render();
  }

  disconnectedCallback() {
    // cleanup
    if (this._dropdownCleanup) {
      this._dropdownCleanup();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._render();
    }
  }
}

customElements.define("product-filter", ProductFilter);
