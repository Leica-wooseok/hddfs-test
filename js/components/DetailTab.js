class DetailTab extends HTMLElement {
  // Layout constants
  static HEADER_HEIGHT = 60;
  static SCROLL_OFFSET_ADJUSTMENT = 10;

  constructor() {
    super();
    this.panels = [];
    this.handleScroll = null;
    this.scrollListener = null;
    this.headerHeight = DetailTab.HEADER_HEIGHT;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.setupScrollObserver();
  }

  disconnectedCallback() {
    if (this.scrollListener) {
      window.removeEventListener("scroll", this.scrollListener);
    }
  }

  render() {
    const items = JSON.parse(this.getAttribute("items") || "[]");

    const html = `
      <div class="detailTab">
        <ul class="flex container" role="tablist" aria-label="사은행사 정보">
          ${items
            .map(
              (item, index) => `
            <li class="detailTab__item" role="presentation">
              <button
                type="button"
                class="detailTab__anchor ${index === 0 ? "active" : ""}"
                role="tab"
                aria-selected="${index === 0 ? "true" : "false"}"
                aria-controls="${item.target}"
                id="tab_${item.target}"
                data-target="${item.target}">
                <span>${item.label}</span>
              </button>
            </li>
          `
            )
            .join("")}
        </ul>
      </div>
    `;

    this.innerHTML = html;
  }

  setupEventListeners() {
    const tabs = this.querySelectorAll(".detailTab__anchor");

    tabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const targetId = tab.getAttribute("data-target");
        const targetPanel = document.getElementById(targetId);

        if (targetPanel) {
          // header height + tab height 계산
          const tabElement = this.querySelector(".detailTab");
          const tabHeight = tabElement ? tabElement.offsetHeight : 0;
          const offset = this.headerHeight + tabHeight;

          // 패널의 상단 위치 계산
          const targetPosition =
            targetPanel.getBoundingClientRect().top +
            window.pageYOffset -
            offset;

          // 부드럽게 스크롤
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // 활성화 상태 업데이트
          this.setActiveTab(tab);
        }
      });
    });
  }

  setupScrollObserver() {
    const items = JSON.parse(this.getAttribute("items") || "[]");
    this.panels = items
      .map((item) => document.getElementById(item.target))
      .filter(Boolean);

    // 스크롤 이벤트 핸들러
    this.handleScroll = () => {
      const tabElement = this.querySelector(".detailTab");
      const tabHeight = tabElement ? tabElement.offsetHeight : 0;
      const offset = this.headerHeight + tabHeight;

      // 현재 스크롤 위치
      const scrollPosition = window.pageYOffset + offset + DetailTab.SCROLL_OFFSET_ADJUSTMENT;

      // 각 패널을 확인하여 현재 보이는 패널 찾기
      let activePanel = null;

      for (let i = this.panels.length - 1; i >= 0; i--) {
        const panel = this.panels[i];
        const panelTop = panel.offsetTop;

        if (scrollPosition >= panelTop) {
          activePanel = panel;
          break;
        }
      }

      // 활성화할 패널이 있으면 해당 탭 활성화
      if (activePanel) {
        const correspondingTab = this.querySelector(
          `button[data-target="${activePanel.id}"]`
        );

        if (
          correspondingTab &&
          !correspondingTab.classList.contains("active")
        ) {
          this.setActiveTab(correspondingTab);
        }
      }
    };

    // 스크롤 이벤트 리스너 등록
    let ticking = false;
    this.scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", this.scrollListener);

    this.handleScroll();
  }

  setActiveTab(activeTab) {
    // 모든 tab에서 active 클래스 및 aria-selected 제거
    const tabs = this.querySelectorAll(".detailTab__anchor");
    tabs.forEach((tab) => {
      tab.classList.remove("active");
      tab.setAttribute("aria-selected", "false");
    });

    // 선택된 tab에 active 클래스 및 aria-selected 추가
    activeTab.classList.add("active");
    activeTab.setAttribute("aria-selected", "true");
  }
}

customElements.define("detail-tab", DetailTab);
