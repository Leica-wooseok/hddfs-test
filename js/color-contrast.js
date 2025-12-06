/**
 * hero section 배경색에 따라 font color 변경
 * @param {string} bgColor
 * @returns {'#000000' | '#ffffff'}
 */
function getTextColorForBg(bgColor) {
  if (!bgColor || !bgColor.includes("rgb")) {
    return "#000000";
  }

  const [r, g, b] = bgColor.match(/\d+/g).map(Number);

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? "#000000" : "#ffffff";
}

function applyTextContrast(selector = ".hero") {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    const backgroundColor = window.getComputedStyle(element).backgroundColor;
    const textColor = getTextColorForBg(backgroundColor);
    element.style.color = textColor;
  });
}

document.addEventListener("DOMContentLoaded", () => applyTextContrast(".hero"));
