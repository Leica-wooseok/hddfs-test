// Filter Tab 기능
document.addEventListener('DOMContentLoaded', () => {
  const filterTab = document.querySelector('.filter-tab');

  if (!filterTab) return;

  const buttons = filterTab.querySelectorAll('.filter-tab__button');

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // 모든 버튼에서 active 클래스 제거 및 aria-selected 업데이트
      buttons.forEach((btn) => {
        btn.classList.remove('filter-tab__button--active');
        btn.setAttribute('aria-selected', 'false');
      });

      // 클릭된 버튼에 active 클래스 추가 및 aria-selected 업데이트
      button.classList.add('filter-tab__button--active');
      button.setAttribute('aria-selected', 'true');
    });

    // 키보드 네비게이션 (WCAG 2.1.1 준수)
    button.addEventListener('keydown', (e) => {
      let targetIndex;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        targetIndex = (index + 1) % buttons.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        targetIndex = (index - 1 + buttons.length) % buttons.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        targetIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        targetIndex = buttons.length - 1;
      } else {
        return;
      }

      buttons[targetIndex].focus();
      buttons[targetIndex].click();
    });
  });
});
