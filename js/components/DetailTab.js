class DetailTab extends HTMLElement {
  constructor() {
    super();
    this.panels = [];
    this.handleScroll = null;
    this.scrollListener = null;
    this.headerHeight = 60;
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
        <ul class="flex container">
          ${items
            .map(
              (item, index) => `
            <li class="detailTab__item">
              <a class="detailTab__anchor ${
                index === 0 ? "active" : ""
              }" href="#${item.target}">
                <span>${item.label}</span>
              </a>
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
    const anchors = this.querySelectorAll(".detailTab__anchor");

    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = anchor.getAttribute("href").substring(1);
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
          this.setActiveTab(anchor);
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
      const scrollPosition = window.pageYOffset + offset + 10;

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
        const correspondingAnchor = this.querySelector(
          `a[href="#${activePanel.id}"]`
        );

        if (
          correspondingAnchor &&
          !correspondingAnchor.classList.contains("active")
        ) {
          this.setActiveTab(correspondingAnchor);
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

  setActiveTab(activeAnchor) {
    // 모든 anchor에서 active 클래스 제거
    const anchors = this.querySelectorAll(".detailTab__anchor");
    anchors.forEach((anchor) => anchor.classList.remove("active"));

    // 선택된 anchor에 active 클래스 추가
    activeAnchor.classList.add("active");
  }
}

customElements.define("detail-tab", DetailTab);
