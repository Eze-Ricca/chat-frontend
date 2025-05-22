class HeaderEl extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const headerEl = document.createElement("header");
    const h3El = document.createElement("h3");
    h3El.textContent = "Header";

    const style = document.createElement("style");
    style.textContent = `
    header{
        background-color: #ff8282;
         max-width: 1280px;
         height: 80px;
         margin-left: auto;
         margin-right: auto;
         display: grid;
         place-content: center;
         }
    `;

    headerEl.appendChild(h3El);
    headerEl.appendChild(style);
    this.shadowRoot?.appendChild(headerEl);
  }
}
customElements.define("header-el", HeaderEl);
