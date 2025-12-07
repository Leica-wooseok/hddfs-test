document.addEventListener("DOMContentLoaded", function () {
  const productSwiper = new Swiper(".recommend__product-list", {
    slidesPerView: "auto",
    spaceBetween: 16,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
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
