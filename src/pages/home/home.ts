import type { ReusableInput } from "../../components/inputEl/inputEl";
import { state } from "../../state";

export function home(params: { goTo: (arg: string) => void }) {
  const divEl: HTMLDivElement = document.createElement("div");
  divEl.classList.add("app");
  divEl.innerHTML = `
  <header-el></header-el>
  <main class="main">
  <h2>Bienvenidos</h2>
  <form class="container-btn-input">
      <reusable-input
        class="input-name"
        label="Nombre"
        size-label="30px" required></reusable-input>
    <span class="error-message"></span>
      <reusable-button
        class="button"
        label="Comenzar"
        text-color="fff"
        border-color="none"
        hover-bg-color="#88afeb"
        active-bg-color="#639cf1"
      ></reusable-button>
    </form>
    </main>
 
  
  `;

  const styles = document.createElement("style");
  styles.textContent = `
    .app {
        background-color:rgb(43, 42, 42);
        margin-left: auto;
        margin-right: auto;
        max-width: 1260px;
        min-height: 100vh;  
    }
    h2{
        margin-top: 50px;
        font-size: 50px
    }
    .main{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px
 
    }
     .container-btn-input{
         width: 500px    
        
    }
    .button{
        display: block;
        margin: 25px 0;
    }
    
    .error-message {
        background: #f08484;
        padding: 10px;
        border-radius: 4px;
        border: solid 6px rgb(241, 80, 80);
        margin-bottom: 10px;
        display: none;
        color: black;
        font-size: 16px;
        margin-top: 5px;
    }
  `;

  async function activarRender() {
    await fetch(
      `https://chat-express-tgbm.onrender.com/chatroom/0dd78b2d-18f2-41b4-8f63-cd2e2095d6f9/messages`
    );
  }
  activarRender();
  const inputEl = divEl.querySelector(".input-name") as ReusableInput;
  const buttonHome = divEl.querySelector(".button")!;
  const errorMessage: HTMLElement = divEl.querySelector(".error-message")!;

  buttonHome.addEventListener("click", () => {
    const inputValue = inputEl.getValue().trim();

    const newState = state.getState();
    newState.nombre = inputValue;

    if (!inputValue) {
      errorMessage.textContent =
        "Por favor, ingrese un nombre antes de continuar.";
      errorMessage.style.display = "block";
      return;
    }

    // Si hay texto, ocultar el mensaje de error
    errorMessage.style.display = "none";

    console.log(inputValue);
    params.goTo("/chat");
  });

  divEl.appendChild(styles);
  return divEl;
}
