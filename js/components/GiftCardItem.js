class GiftCardItem extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <div class="gift__image">
        <img src="" alt="">
        <div class="soldout" style="display: none;">재고소진</div>
      </div>
      <div class="gift__info">
        <strong class="gift__info-terms"></strong>
        <p class="gift__info-desc"></p>
      </div>
    `;

    this.imageEl = this.querySelector(".gift__image img");
    this.soldoutEl = this.querySelector(".soldout");
    this.termsEl = this.querySelector(".gift__info-terms");
    this.descEl = this.querySelector(".gift__info-desc");
  }

  static get observedAttributes() {
    return [
      "image-src",
      "image-alt",
      "terms",
      "description",
      "sold-out",
      "terms-color",
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "image-src":
        this.imageEl.src = newValue;
        break;
      case "image-alt":
        this.imageEl.alt = newValue;
        break;
      case "terms":
        this.termsEl.textContent = newValue;
        break;
      case "description":
        this.descEl.textContent = newValue;
        break;
      case "terms-color":
        this.termsEl.style.color = newValue;
        break;
      case "sold-out":
        this.soldoutEl.style.display = newValue === "true" ? "flex" : "none";
        break;
    }
  }

  connectedCallback() {
    this.classList.add("gift__card-item");

    this.constructor.observedAttributes.forEach((attr) => {
      if (this.hasAttribute(attr)) {
        this.attributeChangedCallback(attr, null, this.getAttribute(attr));
      }
    });
  }
}

customElements.define("gift-card-item", GiftCardItem);
