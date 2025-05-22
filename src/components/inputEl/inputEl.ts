export class ReusableInput extends HTMLElement {
  inputElement!: HTMLInputElement; // Declaración adecuada de la propiedad
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const wrapper: HTMLDivElement = document.createElement("div");
    const input: HTMLInputElement = document.createElement("input");
    const label: HTMLLabelElement = document.createElement("label");

    // Atributos configurables
    const labelText = this.getAttribute("label") || "";
    const sizeLabel = this.getAttribute("size-label") || "18px";
    const placeholder = this.getAttribute("placeholder") || "Escribe aqui...";
    const type = this.getAttribute("type") || "text";
    const required = this.hasAttribute("required");

    label.textContent = labelText;
    input.placeholder = placeholder;
    input.type = type;

    if (required) {
      input.required = true;
    }
    // Añadir referencias internas
    this.inputElement = input;

    // Estilos encapsulados
    const style: HTMLStyleElement = document.createElement("style");
    style.textContent = `
    div {
        margin-bottom: 10px;
              
        }
    label {
        display: block;
        font-size: ${sizeLabel};
        margin-bottom: 10px;     
    }
     input{
        box-sizing: border-box; 
        width: 100%;
        height: 79px;
        padding: 5px;
        font-size: 1.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
     }   
    `;

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    this.shadowRoot?.appendChild(style);
    this.shadowRoot?.appendChild(wrapper);
  }
  // Método personalizado para obtener el valor del input
  getValue() {
    return this.inputElement.value;
  }
}

customElements.define("reusable-input", ReusableInput);
