class MyHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <h1>${this.getAttribute("title") || "Default Title"}</h1>
      </header>
    `;
  }
}

customElements.define("my-header", MyHeader);
