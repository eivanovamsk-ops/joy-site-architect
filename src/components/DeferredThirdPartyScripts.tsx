import { useEffect } from "react";

const appendScript = (src: string, attrs: Record<string, string> = {}) => {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
  script.onerror = () => undefined;
  document.head.appendChild(script);
};

export function DeferredThirdPartyScripts() {
  useEffect(() => {
    if ((window as any).__PRERENDER__) return;
    if (new URLSearchParams(window.location.search).has("no_third_party")) return;

    const loadScripts = () => {
      try {
        appendScript("https://www.googletagmanager.com/gtm.js?id=GTM-NT325H7W");
        appendScript("https://returnal.pro/sync", { charset: "UTF-8" });
        appendScript("https://mc.yandex.ru/metrika/tag.js");
        appendScript("https://top-fwz1.mail.ru/js/code.js", { id: "tmr-code" });

        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).ym?.(95632694, "init", {
          webvisor: true,
          clickmap: true,
          ecommerce: "dataLayer",
          accurateTrackBounce: true,
          trackLinks: true,
        });
        (window as any)._tmr = (window as any)._tmr || [];
        (window as any)._tmr.push({ id: "3749351", type: "pageView", start: Date.now() });
      } catch (error) {
        console.warn("Third-party scripts skipped", error);
      }
    };

    const timer = window.setTimeout(loadScripts, 10000);
    window.addEventListener("load", () => window.setTimeout(loadScripts, 3000), { once: true });

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}