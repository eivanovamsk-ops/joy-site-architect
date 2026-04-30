import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Очищаем root от возможных артефактов (текстовых узлов от сторонних скриптов),
// чтобы избежать конфликтов гидратации/рендера на некоторых устройствах.
while (rootElement.firstChild) {
  rootElement.removeChild(rootElement.firstChild);
}

createRoot(rootElement).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
