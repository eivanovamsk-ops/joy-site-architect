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
  // Mobile: top bar (36px) + main header (80px) = 116px
  // Desktop home: top bar (36px) + main header (80px) = 116px (but header hides on scroll)
  // Desktop other: top bar (36px) + main header (80px) + submenu (48px) = 164px
  const paddingClass = isHomePage 
    ? "pt-[116px] lg:pt-[116px]" 
    : "pt-[116px] lg:pt-[164px]";

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
