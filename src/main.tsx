import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

const ensureSafeStorage = () => {
  try {
    const key = "__storage_test__";
    window.localStorage.setItem(key, key);
    window.localStorage.removeItem(key);
  } catch {
    const memoryStore = new Map<string, string>();
    const storage: Storage = {
      get length() {
        return memoryStore.size;
      },
      clear: () => memoryStore.clear(),
      getItem: (key) => memoryStore.get(key) ?? null,
      key: (index) => Array.from(memoryStore.keys())[index] ?? null,
      removeItem: (key) => memoryStore.delete(key),
      setItem: (key, value) => memoryStore.set(key, String(value)),
    };
    try {
      Object.defineProperty(window, "localStorage", { configurable: true, value: storage });
    } catch {
      // If the browser forbids patching storage, still let React try to render.
    }
  }
};

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Очищаем root от возможных артефактов (текстовых узлов от сторонних скриптов),
// чтобы избежать конфликтов гидратации/рендера на некоторых устройствах.
while (rootElement.firstChild) {
  rootElement.removeChild(rootElement.firstChild);
}

ensureSafeStorage();

import("./App.tsx").then(({ default: App }) => {
  createRoot(rootElement).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
});
