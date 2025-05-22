class ReusableButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const button: HTMLButtonElement = document.createElement("button");
    const label = this.getAttribute("label") || "Click Me"; // Texto del boton

    //Obtener los colores de los atributos( o valores por defecto)
    const bgColor: string = this.getAttribute("bg-color") || "#9CBBE9";
    const textColor: string = this.getAttribute("text-color") || "#fff";
    const border: string = this.getAttribute("border-color") || "none";
    //Estilos encapsulados
    const style = document.createElement("style");
    style.textContent = `
    button{
        background-color: ${bgColor};
        color: ${textColor};
        font-size: 30px;
        font-weight: 600;
        letter-spacing: 0.15rem;
        width: 100%;
        height: 84px;
        border: ${border};
        border-radius: 10px;
        transition: background-color 0.3s ease;
    }
     button:hover{
        background-color: ${this.getAttribute("hover-bg-color")};
        border: solid 10px rgb(75, 126, 202);
     }   
    button:active{
        background-color: ${this.getAttribute("active-bg-color")};
    }
    `;

    // Configuaracion del botón
    button.textContent = label;

    this.shadowRoot?.appendChild(style);
    this.shadowRoot?.appendChild(button);
  }
}

customElements.define("reusable-button", ReusableButton);
