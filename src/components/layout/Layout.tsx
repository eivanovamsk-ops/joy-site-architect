import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import JivoChatButton from "@/components/JivoChatButton";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  const paddingClass = isHomePage 
    ? "pt-[116px] lg:pt-[116px]" 
    : "pt-[116px] lg:pt-[164px]";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 ${paddingClass}`}>
        <Breadcrumbs />
        {children}
      </main>
      <Footer />
      <JivoChatButton />
    </div>
  );
}
