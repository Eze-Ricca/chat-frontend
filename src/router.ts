// Rutas
import { home } from "./pages/home/home";
import { chat } from "./pages/chat/chat";

// Tipo para las rutas
type Route = {
  path: RegExp;
  component: Function;
};

const routes: Route[] = [
  {
    path: /\/home/,
    component: home,
  },
  {
    path: /\/chat/,
    component: chat,
  },
];

export function initRouter(rootEl: Element): void {
  function router(route: string): void {
    const cleanRoute = route.replace("/chat-frontend", "");

    if (cleanRoute === "/") {
      goTo("/home");
      return;
    }

    routes.forEach((r: Route) => {
      // Busca la ruta que coincida con el path
      if (r.path.test(cleanRoute)) {
        const viewEl = r.component({ goTo: goTo }); // Genera la vista desde el componente
        rootEl.innerHTML = ""; // Limpia el HTML
        rootEl.appendChild(viewEl); // Inserta la vista
      }
    });
  }

  // Función utilitaria que pasa a la vista seleccionada para poder navegar a otras rutas
  function goTo(uri: string): void {
    const fullUri = "/chat-frontend" + uri;
    history.pushState({}, "", fullUri);
    router(uri);
  }

  // Ejecuta el router con la ruta tomada de la url
  router(location.pathname);

  // Escucha el evento popstate para actualizar la vista cuando se navega para adelante o para atrás
  window.addEventListener("popstate", () => {
    router(location.pathname);
  });
  // window.onpopstate = function (event) {
  //   console.log(
  //     "location: " + document.location + ",state" + JSON.stringify(event.state)
  //   );
  // };
}
