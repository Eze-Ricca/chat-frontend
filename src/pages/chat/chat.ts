import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { state } from "../../state";
import type { ReusableInput } from "../../components/inputEl/inputEl";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function chat() {
  const divEl: HTMLDivElement = document.createElement("div");
  divEl.innerHTML = `
   <header-el></header-el>
  <main class="main">
  <h2>Chat</h2>
  <ul class="container-messages">
       
  </ul>
  <form class="form">
      <reusable-input
        class="input-mesagge"        
        size-label="30px" required></reusable-input>
    
      <reusable-button
        class="button"
        label="Enviar"
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
        margin-top: 10px;
        font-size: 50px;
        text-align: center;
    }
    .main{
        background-color:rgb(43, 42, 42);       
        max-width: 960px;
        min-height: 90vh;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        // gap: 40px;
        flex-direction: column;
    }
    .form{
        margin-top: auto;
        padding: 10px 10px;
    }
    .container-messages {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        max-height: 50vh;
        padding: 10px;
}
    .container-mesagge {
        display: flex;
        flex-direction: column;
        padding: 15px;
        width: fit-content;        
    }
    .container-mesagge-msg {
        background-color: #d8d8d8;
        color: #000000;
        border-radius: 4px;
        padding: 10px;
        font-weight: 500;
    }
    .usuario-message {
        margin-left: auto;
}

    .usuario-message .container-mesagge-msg {
      background-color: #8bc34a; /* Verde */
      
}
    .container-mesagge p {
        margin: 0;
    }
    .name-message {
        font-weight: 100;
    }

    .hour-message {
        text-align: end;
    }
        
    @media (max-width: 768px) {
      .app {
          max-width: 100%;
          padding: 10px;
      }
      .main {
          max-width: 100%;
          min-height: auto;
          padding: 10px;
      }
      h2 {
          font-size: 32px;
      }
      .container-messages {
          max-height: 57vh; 
          padding: 5px;
      }
      .container-mesagge-msg {
          font-size: 14px;
          padding: 8px;
      }
      .form {
        display: flex;
        flex-direction: column;     
        width: 100%;
        padding: 0 10px;
    }
    .input-mesagge {
        width: 100%; /* Asegurar que ocupe todo el ancho */
    }
    .button {
        width: 100%; /* Que el botón también se ajuste */
        margin-top: 5px; /* Espaciado mínimo */
    }
      .error-message {
          font-size: 14px;
          padding: 8px;
      }
  }
    `;

  // Funcion para enviar mensaje
  async function enviarMensaje(chatroomId: string, mensaje: string) {
    const authorName = state.data.nombre;
    const respuesta = await fetch(
      `https://chat-express-tgbm.onrender.com/chatroom/${chatroomId}/messages`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: mensaje,
          author: authorName, // Aquí va el usuario que envia el mensaje, este lo tengo en el state
        }),
      }
    );

    if (!respuesta.ok) {
      console.error("Error al enviar mensaje:", respuesta.status);
      return;
    }

    console.log("Mensaje enviado correctamente!");
  }

  (() => {
    const chatroomRefDynamicMessages = ref(
      database,
      "/chatroom/0dd78b2d-18f2-41b4-8f63-cd2e2095d6f9/messages"
    );

    onValue(chatroomRefDynamicMessages, (snapshot) => {
      const messages = snapshot.val();
      console.log(messages);

      // Ahora hay que renderizar los mensajes que vienen desde firebase
      const listMesagges = divEl.querySelector(".container-messages")!;
      listMesagges.innerHTML = "";

      function scrollToBottom() {
        listMesagges.scrollTop = listMesagges.scrollHeight;
      }

      Object.values(messages).forEach((msg: any) => {
        console.log(msg);
        const createMensaggeLi = document.createElement("li");

        const fecha = new Date(msg.timestamp);
        const horaFormateada = fecha.toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        const esMensajeDelUsuario = msg.author === state.data.nombre;
        createMensaggeLi.classList.add(
          esMensajeDelUsuario ? "usuario-message" : "otro-message"
        );

        createMensaggeLi.innerHTML = `
      <div class="container-mesagge">
        <p class="name-message"><em>${msg.author}</em></p>
        <p class="container-mesagge-msg">${msg.text}</p>
        <p class="hour-message"><em>${horaFormateada}</em></p>
      </div>
      `;
        listMesagges.appendChild(createMensaggeLi);
        scrollToBottom();
      });
    });

    // -------------------------------
    // console.log(listMesagges);

    const inputMessage = divEl.querySelector(".input-mesagge") as ReusableInput;

    const botonHome = divEl.querySelector(".button");
    botonHome?.addEventListener("click", () => {
      const inputMessageValue = inputMessage.getValue();
      enviarMensaje("0dd78b2d-18f2-41b4-8f63-cd2e2095d6f9", inputMessageValue);
      inputMessage.setValue("");
    });
    inputMessage.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        const inputMessageValue = inputMessage.getValue();
        enviarMensaje(
          "0dd78b2d-18f2-41b4-8f63-cd2e2095d6f9",
          inputMessageValue
        );

        // Limpia el input después de enviar el mensaje
        inputMessage.setValue("");
      }
    });
  })();

  divEl.appendChild(styles);
  return divEl;
}
