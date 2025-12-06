class CautionArea extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["icon-src", "icon-alt", "title", "items", "danger-item-index"];
  }

  _render() {
    const iconSrc =
      this.getAttribute("icon-src") || "./images/icons/ic-m-exclamation.svg";
    const iconAlt = this.getAttribute("icon-alt") || "유의사항 아이콘";
    const title = this.getAttribute("title") || "유의사항";
    const itemsJson = this.getAttribute("items");
    const items = itemsJson ? JSON.parse(itemsJson) : [];
    const dangerIndex = parseInt(this.getAttribute("danger-item-index"), 10);

    this.className = "caution_area";
    this.innerHTML = `
      <div class="caution_area__title">
        <img src="${iconSrc}" alt="${iconAlt}" />
        <p>${title}</p>
      </div>
      <ul class="caution__list">
        ${items
          .map(
            (item, index) => `
          <li class="caution__list-item ${
            index === dangerIndex ? "danger" : ""
          }">${item}</li>
        `
          )
          .join("")}
      </ul>
    `;
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._render();
  }
}

customElements.define("caution-area", CautionArea);
