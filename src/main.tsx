import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

const initialFallbackHtml = document.getElementById("root")?.innerHTML ?? "";

const restoreStaticFallback = () => {
  const root = document.getElementById("root");
  if (!root || root.childElementCount > 0 || !initialFallbackHtml) return;

  root.innerHTML = initialFallbackHtml;
};

const ensureSafeStorage = () => {
  const patchStorage = (name: "localStorage" | "sessionStorage") => {
    try {
      const key = "__storage_test__";
      window[name].setItem(key, key);
      window[name].removeItem(key);
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
        Object.defineProperty(window, name, { configurable: true, value: storage });
      } catch {
        // If the browser forbids patching storage, still let React try to render.
      }
    }
  };

  patchStorage("localStorage");
  patchStorage("sessionStorage");
};

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ensureSafeStorage();

try {
  window.addEventListener("error", restoreStaticFallback);
  window.addEventListener("unhandledrejection", restoreStaticFallback);

  const root = createRoot(rootElement, {
    onRecoverableError: (error) => console.warn("React recovered from render issue", error),
  });

  root.render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
} catch (error) {
  console.error("App bootstrap failed", error);
  rootElement.innerHTML = `
    <main style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;font-family:Arial,sans-serif;background:#f6f7fb;color:#172033;text-align:center">
      <section style="max-width:560px">
        <h1 style="font-size:28px;line-height:1.2;margin:0 0 12px">Артикон</h1>
        <p style="font-size:16px;line-height:1.6;margin:0 0 20px">Не удалось загрузить интерактивную версию сайта. Обновите страницу или откройте сайт в актуальной версии браузера.</p>
        <button onclick="window.location.reload()" style="border:0;border-radius:8px;background:#1f3a66;color:#fff;padding:12px 18px;font-weight:700;cursor:pointer">Обновить страницу</button>
      </section>
    </main>
  `;
}
