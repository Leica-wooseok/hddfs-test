class MoreButton extends HTMLElement {
  constructor() {
    super();
    this.button = document.createElement("button");
  }

  connectedCallback() {
    this.button.type = "button";
    this.button.className = "more-button";

    this.button.textContent =
      this.getAttribute("text") || this.textContent || "More";

    this.innerHTML = "";
    this.appendChild(this.button);
    // TODO: 버튼 클릭 시 사은행사 더보기 레이어 등장
  }
}

customElements.define("more-button", MoreButton);
