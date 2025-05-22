import "./style.css";
import "./components/headerEl/headerEl";
import "./components/buttonEl/buttonEl";
import "./components/inputEl/inputEl";
import { initRouter } from "./router";

(() => {
  const divEl: HTMLDivElement = document.querySelector<HTMLDivElement>("#app")!;
  if (!divEl) {
    throw new Error("Elemento divEl no encontrado");
  }
  initRouter(divEl);
})();
