document.addEventListener("DOMContentLoaded", function () {
  // 추천 상품 swiper (panel 02)
  const recommendSwiper = new Swiper(".recommend__product-list", {
    slidesPerView: "auto",
    spaceBetween: 16,
    navigation: {
      nextEl: ".recommend__product-list .swiper-button-next",
      prevEl: ".recommend__product-list .swiper-button-prev",
    },
    breakpoints: {
      0: {
        // mobile
        navigation: {
          enabled: false,
        },
      },
      768: {
        // desktop
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
    navigation: {
      nextEl: ".all-product__recommend__list .swiper-button-next",
      prevEl: ".all-product__recommend__list .swiper-button-prev",
    },
    breakpoints: {
      0: {
        // mobile
        navigation: {
          enabled: false,
        },
      },
      768: {
        // desktop
        navigation: {
          enabled: true,
        },
      },
    },
  });
});
