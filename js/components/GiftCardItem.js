class GiftCardItem extends HTMLElement {
  constructor() {
    super();

    // 1. Create the component's internal structure directly in the light DOM
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

    // 2. Cache element references for performance
    this.imageEl = this.querySelector('.gift__image img');
    this.soldoutEl = this.querySelector('.soldout');
    this.termsEl = this.querySelector('.gift__info-terms');
    this.descEl = this.querySelector('.gift__info-desc');
  }

  // 3. Define which attributes to watch for changes
  static get observedAttributes() {
    return ["image-src", "image-alt", "terms", "description", "sold-out", "terms-color"];
  }

  // 4. Handle attribute changes by directly manipulating the DOM
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'image-src':
        this.imageEl.src = newValue;
        break;
      case 'image-alt':
        this.imageEl.alt = newValue;
        break;
      case 'terms':
        this.termsEl.textContent = newValue;
        break;
      case 'description':
        this.descEl.textContent = newValue;
        break;
      case 'terms-color':
        // Apply color directly as an inline style
        this.termsEl.style.color = newValue;
        break;
      case 'sold-out':
        // Toggle display style based on the attribute's string value
        this.soldoutEl.style.display = newValue === 'true' ? 'flex' : 'none';
        break;
    }
  }

  connectedCallback() {
    // Set the host element's class for external styling
    this.classList.add('gift__card-item');

    // Apply initial attributes that might have been set before the element was upgraded
    this.constructor.observedAttributes.forEach(attr => {
      if (this.hasAttribute(attr)) {
        this.attributeChangedCallback(attr, null, this.getAttribute(attr));
      }
    });
  }
}

customElements.define('gift-card-item', GiftCardItem);