class AlertToast extends HTMLElement {
  connectedCallback() {
    const defaultMessage =
      this.getAttribute("message") || "장바구니에 담겼습니다 :)";

    this.setAttribute("role", "alert");
    this.setAttribute("aria-live", "polite");
    this.setAttribute("aria-atomic", "true");

    this.className = "alert-toast";
    this.textContent = defaultMessage;
    this.classList.add("hidden");
  }

  // 1.5초간 표시
  show(message, duration = 1500) {
    if (message) {
      this.textContent = message;
    }

    this.classList.remove("hidden");
    this.classList.add("visible");

    setTimeout(() => {
      this.classList.remove("visible");
      this.classList.add("hidden");
    }, duration);
  }
}

customElements.define("alert-toast", AlertToast);
