import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    ym?: (...args: any[]) => void;
  }
}

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (typeof window.ym === "function") {
      window.ym(95632694, "hit", window.location.href);
    }
  }, [pathname]);

  return null;
}
