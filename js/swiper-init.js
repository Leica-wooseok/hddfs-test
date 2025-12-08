document.addEventListener("DOMContentLoaded", function () {
  // 추천 상품 swiper (panel 02)
  const recommendSwiper = new Swiper(".recommend__product-list", {
    slidesPerView: "auto",
    spaceBetween: 16,
    slidesPerGroup: 1,
    navigation: {
      nextEl: ".recommend__swiper-button--next",
      prevEl: ".recommend__swiper-button--prev",
    },
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
        announcement.textContent = `${this.activeIndex + 1} / ${
          this.slides.length
        } 슬라이드`;
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
      },
    },
    breakpoints: {
      0: {
        // mobile
        slidesPerView: "auto",
        navigation: {
          enabled: false,
        },
      },
      768: {
        // desktop
        slidesPerView: 4,
        navigation: {
          enabled: true,
        },
      },
    },
  });

  // 전체 상품 추천 swiper (panel 03)
  const allProductSwiper = new Swiper(".all-product__recommend__list", {
    slidesPerView: "auto",
    spaceBetween: 16,
    slidesPerGroup: 1,
    navigation: {
      nextEl: ".all-product__swiper-button--next",
      prevEl: ".all-product__swiper-button--prev",
    },
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
        announcement.textContent = `${this.activeIndex + 1} / ${
          this.slides.length
        } 슬라이드`;
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
      },
    },
    breakpoints: {
      0: {
        // mobile
        slidesPerView: "auto",
        navigation: {
          enabled: false,
        },
      },
      768: {
        // desktop
        slidesPerView: 4,
        navigation: {
          enabled: true,
        },
      },
    },
  });
});
