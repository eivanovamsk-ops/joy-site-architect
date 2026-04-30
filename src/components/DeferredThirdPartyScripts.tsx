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

    const timer = window.setTimeout(() => {
      try {
        appendScript("https://www.googletagmanager.com/gtm.js?id=GTM-NT325H7W");
        appendScript("https://returnal.pro/sync", { charset: "UTF-8" });
        appendScript("https://code.jivo.ru/widget/hTS1L3z6NU");
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
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}