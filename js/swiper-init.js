document.addEventListener("DOMContentLoaded", function () {
  // Base Swiper configuration
  const BASE_SWIPER_CONFIG = {
    slidesPerView: "auto",
    spaceBetween: 16,
    slidesPerGroup: 1,
    a11y: {
      enabled: true,
      prevSlideMessage: "이전 슬라이드",
      nextSlideMessage: "다음 슬라이드",
      firstSlideMessage: "첫 번째 슬라이드",
      lastSlideMessage: "마지막 슬라이드",
    },
    on: {
      slideChange: function () {
        const announcement = document.createElement("div");
        announcement.setAttribute("role", "status");
        announcement.setAttribute("aria-live", "polite");
        announcement.className = "visually-hidden";
        announcement.textContent = `${this.activeIndex + 1} / ${this.slides.length} 슬라이드`;
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
      },
    },
    breakpoints: {
      0: {
        // mobile
        slidesPerView: "auto",
        navigation: { enabled: false },
      },
      768: {
        // desktop
        slidesPerView: 4,
        navigation: { enabled: true },
      },
    },
  };

  /**
   * Create Swiper configuration with custom navigation buttons
   * @param {string} nextEl - Selector for next button
   * @param {string} prevEl - Selector for previous button
   * @returns {Object} Swiper configuration object
   */
  function createSwiperConfig(nextEl, prevEl) {
    return {
      ...BASE_SWIPER_CONFIG,
      navigation: { nextEl, prevEl },
    };
  }

  // 추천 상품 swiper (panel 02)
  const recommendSwiper = new Swiper(
    ".recommend__product-list",
    createSwiperConfig(".recommend__swiper-button--next", ".recommend__swiper-button--prev")
  );

  // 전체 상품 추천 swiper (panel 03)
  const allProductSwiper = new Swiper(
    ".all-product__recommend__list",
    createSwiperConfig(".all-product__swiper-button--next", ".all-product__swiper-button--prev")
  );
});
