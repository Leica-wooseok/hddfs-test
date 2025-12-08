class MoreButton extends HTMLElement {
  constructor() {
    super();
    this.button = document.createElement("button");
  }

  connectedCallback() {
    this.button.type = "button";
    this.button.className = "more-button";

    const buttonText = this.getAttribute("text") || this.textContent || "More";
    this.button.textContent = buttonText;
    this.button.setAttribute("aria-label", `${buttonText} - 브랜드 사은행사 검색 팝업 열기`);

    this.innerHTML = "";
    this.appendChild(this.button);

    // 버튼 클릭 시 사은행사 더보기 레이어 등장
    this.button.addEventListener("click", () => {
      const giftPopup = document.querySelector("gift-popup");
      if (giftPopup) {
        giftPopup.open();
      }
    });
  }
}

customElements.define("more-button", MoreButton);
