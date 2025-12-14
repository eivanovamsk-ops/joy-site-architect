import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  // Different padding based on header height
  // Home page: top bar (32px) + main header (56-64px) = 88-96px
  // Other pages: top bar (32px) + main header (56-64px) + submenu (48px) = 136-144px
  const paddingClass = isHomePage 
    ? "pt-[88px] lg:pt-[96px]" 
    : "pt-[88px] lg:pt-[144px]";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 ${paddingClass}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
