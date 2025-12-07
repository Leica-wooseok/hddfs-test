class ProductCard extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return [
      "image-src",
      "image-alt",
      "product-link",
      "brand",
      "keyword",
      "product-name",
      "has-video",
      "is-19plus",
      "is-sold-out",
      "refill-link",
      "cart-link",
      "is-logged-in",
      "discount-percent",
      "default-price",
      "current-price",
      "won-price",
      "badges",
      "image-blend-mode",
    ];
  }

  _render() {
    const imageSrc = this.getAttribute("image-src") || "";
    const imageAlt = this.getAttribute("image-alt") || "";
    const productLink = this.getAttribute("product-link") || "#";
    const brand = this.getAttribute("brand") || "";
    const keyword = this.getAttribute("keyword") || "";
    const productName = this.getAttribute("product-name") || "";
    const hasVideo = this.getAttribute("has-video") === "true";
    const is19Plus = this.getAttribute("is-19plus") === "true";
    const isSoldOut = this.getAttribute("is-sold-out") === "true";
    const refillLink = this.getAttribute("refill-link") || "#";
    const cartLink = this.getAttribute("cart-link") || "#";
    const isLoggedIn = this.getAttribute("is-logged-in") === "true";
    const discountPercent = this.getAttribute("discount-percent") || "";
    const defaultPrice = this.getAttribute("default-price") || "";
    const currentPrice = this.getAttribute("current-price") || "";
    const wonPrice = this.getAttribute("won-price") || "";
    const badgesJson = this.getAttribute("badges");
    const badges = badgesJson ? JSON.parse(badgesJson) : [];
    const imageBlendMode = this.getAttribute("image-blend-mode") || "on";
    const blendModeStyle =
      imageBlendMode === "on" ? "mix-blend-mode: multiply;" : "";
    const blendModeBgColor =
      imageBlendMode === "off" ? "background-color:#fff" : "";

    this.className = "productCard";
    this.innerHTML = `
      <div class="productCard__image-box"  style="${blendModeBgColor}">
        <a href="${productLink}" class="productCard__image_anchor">
          <img
            class="productCard__image"
            src="${imageSrc}"
            alt="${imageAlt}"
            style="${blendModeStyle}"
          />
          ${
            hasVideo
              ? `<span class="flag-video">
            <img
              src="./images/products/flag-video.svg"
              alt="썸네일 비디오"
            />
            썸네일 비디오
          </span>`
              : ""
          }
          ${
            is19Plus
              ? `<span class="flag-19">
            <img
              src="./images/products/flag-19.svg"
              alt="19세 미만 구매 불가 상품"
            />
            19세 미만 구매 불가 상품
          </span>`
              : ""
          }
        </a>
        ${
          isSoldOut
            ? `<a href="${refillLink}" class="alert-refill">재입고 알림</a>`
            : `<a
          href="${cartLink}"
          class="add-cart"
        >
          <span>
            <img
              src="./images/icons/ic-m-shoppinbag.svg"
              alt="장바구니 담기"
            />
          </span>
          장바구니 담기
        </a>`
        }
      </div>
      <div class="productCard__info-box">
        <a href="${productLink}">
          <h5 class="productCard__info-brand">
            ${brand}
          </h5>
          ${
            keyword
              ? `<p class="productCard__info-keyword">
            ${keyword}
          </p>`
              : ""
          }
          <p class="productCard__info-name">
            ${productName}
          </p>
          <div class="productCard__info-discount">
            ${
              isLoggedIn
                ? `<span class="percent">${discountPercent}%</span>
            <span class="default-price">${defaultPrice}$</span>`
                : `<p class="alert-non-member">
              <a href="#" class="pink">로그인</a>후 할인율 확인
            </p>`
            }
          </div>
          <p class="productCard__info-price">
            <strong class="current-price">$${currentPrice}</strong>
            ${
              wonPrice
                ? `<span class="won">
              ${wonPrice}
              <em> 원 </em>
            </span>`
                : ""
            }
          </p>
          ${
            badges.length > 0
              ? `<div class="productCard__info-badge-group flex">
            ${badges
              .map(
                (badge) => `<div class="productCard__info-badge">${badge}</div>`
              )
              .join("")}
          </div>`
              : ""
          }
        </a>
      </div>
    `;
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._render();
    }
  }
}

customElements.define("product-card", ProductCard);
