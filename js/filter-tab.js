// Filter Tab 기능
document.addEventListener('DOMContentLoaded', () => {
  const filterTab = document.querySelector('.filter-tab');

  if (!filterTab) return;

  const buttons = filterTab.querySelectorAll('.filter-tab__button');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      // 모든 버튼에서 active 클래스 제거
      buttons.forEach((btn) => {
        btn.classList.remove('filter-tab__button--active');
      });

      // 클릭된 버튼에 active 클래스 추가
      button.classList.add('filter-tab__button--active');
    });
  });
});
