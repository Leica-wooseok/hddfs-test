const template = document.createElement("template");
template.innerHTML = `
  <style>
    /*
     * Styles are encapsulated inside the Shadow DOM and use CSS variables
     * defined in the global :root to maintain consistency with the design system.
     */
    :host {
      display: flex;
      align-items: center;
      gap: 17px;
      min-height: 100px;
      position: relative; 
      width: 100%;
    }

    :host([hidden]) {
      display: none;
    }

    .image-wrapper {
      width: 100px;
      height: 100px;
      position: relative;
      flex-shrink: 0;
    }

    .image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .sold-out-overlay {
      display: none; 
      position: absolute;
      inset: 0;
      width: auto;
      max-width: max-content;
      margin: auto;
      padding: 0 12px;
      height: 27px;
      border-radius: 4px;
      background: rgba(var(--bg-slate-grey-rgb), 0.8); 
      color: var(--color-white);
      white-space: nowrap;
      justify-content: center;
      align-items: center;
      /* Assuming kr-cp1-700 styles */
      font-size: 11px;
      font-weight: 700;
    }
    
    :host([sold-out='true']) .sold-out-overlay {
      display: flex; 
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
      min-width: 0;
    }

    .info__terms {
      color: var(--terms-color, var(--font-accent-color)); 
      /* kr-p3-500 styles */
      font-size: 13px;
      font-weight: 500;
      /* Multi-line ellipsis */
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .info__desc {
    color:var(--font-medium-dark);
      /* kr-p2-400 styles */
      font-size: 14px;
      font-weight: 400;
      /* Multi-line ellipsis */
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  </style>

  <div class="image-wrapper">
    <img class="image" src="" alt="">
    <div class="sold-out-overlay">재고소진</div>
  </div>
  <div class="info">
    <strong class="info__terms"></strong>
    <p class="info__desc"></p>
  </div>
`;

class GiftCardItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
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
    if (name === "image-src") {
      this.shadowRoot.querySelector(".image").src = newValue;
    } else if (name === "image-alt") {
      this.shadowRoot.querySelector(".image").alt = newValue;
    } else if (name === "terms") {
      this.shadowRoot.querySelector(".info__terms").textContent = newValue;
    } else if (name === "description") {
      this.shadowRoot.querySelector(".info__desc").textContent = newValue;
    } else if (name === "terms-color") {
      this.style.setProperty("--terms-color", newValue);
    }
  }
}

customElements.define("gift-card-item", GiftCardItem);
