document.addEventListener("DOMContentLoaded", () => {
  const filterTab = document.querySelector(".filter-tab");

  if (!filterTab) return;

  const buttons = filterTab.querySelectorAll(".filter-tab__button");

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // 모든 버튼에서 active 클래스 제거 및 aria-selected 업데이트
      buttons.forEach((btn) => {
        btn.classList.remove("filter-tab__button--active");
        btn.setAttribute("aria-selected", "false");
      });

      // 클릭된 버튼에 active 클래스 추가 및 aria-selected 업데이트
      button.classList.add("filter-tab__button--active");
      button.setAttribute("aria-selected", "true");
    });
  });
});
