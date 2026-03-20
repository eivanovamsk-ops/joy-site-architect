import { useEffect, useRef } from "react";
import { HelpCircle } from "lucide-react";

declare global {
  interface Window {
    jivo_api?: { open: () => void };
  }
}

const JIVO_SCRIPT_SRC = "//code.jivo.ru/widget/hTS1L3z6NU";

const openViaApi = () => {
  if (window.jivo_api?.open) {
    window.jivo_api.open();
    return true;
  }

  return false;
};

const openViaLauncherFallback = () => {
  const selectors = [
    "jdiv.__jivoMobileButton",
    "jdiv[class*='globalClass'] jdiv[class*='button']",
    "jdiv[class*='button'][class*='mobile']",
    "jdiv[class*='button']",
  ];

  for (const selector of selectors) {
    const launcher = document.querySelector<HTMLElement>(selector);

    if (launcher) {
      launcher.click();
      return true;
    }
  }

  return false;
};

const ensureJivoScript = () => {
  const existingScript = document.querySelector<HTMLScriptElement>(`script[src*="${JIVO_SCRIPT_SRC}"]`);

  if (existingScript) {
    return;
  }

  const script = document.createElement("script");
  script.src = JIVO_SCRIPT_SRC;
  script.async = true;
  document.head.appendChild(script);
};

const JivoChatButton = () => {
  const retryTimerRef = useRef<number | null>(null);

  const clearRetryTimer = () => {
    if (retryTimerRef.current !== null) {
      window.clearInterval(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  };

  const handleClick = () => {
    if (openViaApi() || openViaLauncherFallback()) {
      return;
    }

    ensureJivoScript();
    clearRetryTimer();

    const startedAt = Date.now();
    retryTimerRef.current = window.setInterval(() => {
      const opened = openViaApi() || openViaLauncherFallback();
      const timedOut = Date.now() - startedAt > 7000;

      if (opened || timedOut) {
        clearRetryTimer();
      }
    }, 250);
  };

  useEffect(() => {
    return () => {
      clearRetryTimer();
    };
  }, []);

  return (
    <button
      onClick={handleClick}
      aria-label="Открыть чат поддержки"
      className="hidden md:flex fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-accent text-accent-foreground shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 items-center justify-center"
    >
      <HelpCircle className="h-6 w-6" />
    </button>
  );
};

export default JivoChatButton;
