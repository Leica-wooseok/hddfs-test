class MoreButton extends HTMLElement {
  constructor() {
    super();
    this.button = document.createElement("button");
  }

  connectedCallback() {
    this.button.type = "button";
    this.button.className = "more-button";

    this.button.textContent =
      this.getAttribute("text") || this.textContent || "More";

    this.innerHTML = "";
    this.appendChild(this.button);
  }
}

customElements.define("more-button", MoreButton);
