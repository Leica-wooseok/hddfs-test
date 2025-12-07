document.addEventListener("DOMContentLoaded", function () {
  const sortButton = document.getElementById("sortButton");
  const sortDropdown = document.getElementById("sortDropdown");
  const dropdownOverlay = document.getElementById("dropdownOverlay");
  const sortText = document.querySelector(".product-filter__sort-text");
  const sortIcon = document.querySelector(".product-filter__sort-icon");
  const sortItems = document.querySelectorAll(".product-filter__sort-item");

  // 드롭다운 열기/닫기
  function toggleDropdown() {
    const isOpen = sortDropdown.classList.contains("active");

    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  // 드롭다운 열기
  function openDropdown() {
    sortDropdown.classList.add("active");
    dropdownOverlay.classList.add("active");
    sortIcon.classList.add("rotate");
  }

  // 드롭다운 닫기
  function closeDropdown() {
    sortDropdown.classList.remove("active");
    dropdownOverlay.classList.remove("active");
    sortIcon.classList.remove("rotate");
  }

  // 정렬 버튼 클릭
  sortButton.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleDropdown();
  });

  // 드롭다운 아이템 클릭
  sortItems.forEach((item) => {
    item.addEventListener("click", function () {
      // 모든 아이템에서 active 제거
      sortItems.forEach((i) => i.classList.remove("active"));

      // 클릭한 아이템에 active 추가
      this.classList.add("active");

      // 버튼 텍스트 변경
      sortText.textContent = this.textContent.trim();

      // 드롭다운 닫기
      closeDropdown();
    });
  });

  // 배경 오버레이 클릭 시 닫기
  dropdownOverlay.addEventListener("click", closeDropdown);

  // ESC 키로 닫기
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeDropdown();
    }
  });
});
