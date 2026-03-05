import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { UpceraHero } from "@/components/brand-upcera/UpceraHero";
import { UpceraWhySection } from "@/components/brand-upcera/UpceraWhySection";
import { UpceraEquipment } from "@/components/brand-upcera/UpceraEquipment";
import { UpceraZirconia } from "@/components/brand-upcera/UpceraZirconia";
import { UpceraColoring } from "@/components/brand-upcera/UpceraColoring";
import { UpceraWhyArticon } from "@/components/brand-upcera/UpceraWhyArticon";
import { UpceraCTAForm } from "@/components/brand-upcera/UpceraCTAForm";

const BrandUpcera = () => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://articon.pro/" },
      { "@type": "ListItem", position: 2, name: "Магазин", item: "https://articon.pro/shop" },
      { "@type": "ListItem", position: 3, name: "Бренды", item: "https://articon.pro/shop/brands" },
      { "@type": "ListItem", position: 4, name: "UPCERA", item: "https://articon.pro/shop/brands/upcera" },
    ],
  };

  return (
    <Layout>
      <Helmet>
        <title>UPCERA — оборудование и материалы для цифровой стоматологии | Артикон</title>
        <meta
          name="description"
          content="UPCERA: фрезерные станки, печи синтеризации, циркониевые диски, литий-дисиликат и расходные материалы. Официальный поставщик Articon — 110+ стран, 120+ патентов, прочность до 1300 МПа."
        />
        <link rel="canonical" href="https://articon.pro/shop/brands/upcera" />
        <meta property="og:title" content="UPCERA — CAD/CAM-решения для цифровой лаборатории | Артикон" />
        <meta property="og:description" content="Фрезерные станки, циркониевые диски, печи синтеризации и расходные материалы UPCERA. Официальный поставщик Articon." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://articon.pro/brands/upcera" />
        <meta property="og:image" content="https://articon.pro/og-shop.jpg" />
        <meta property="og:locale" content="ru_RU" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Breadcrumbs */}
      <nav className="bg-secondary/50 border-b border-border" aria-label="Breadcrumb">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm flex-wrap">
            <li>
              <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Главная</span>
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">Магазин</Link>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              <span className="text-muted-foreground">Бренды</span>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              <span className="text-foreground font-medium">UPCERA</span>
            </li>
          </ol>
        </div>
      </nav>

      <UpceraHero />
      <UpceraWhySection />
      <UpceraEquipment />
      <UpceraZirconia />
      <UpceraColoring />
      <UpceraWhyArticon />
      <UpceraCTAForm />
    </Layout>
  );
};

export default BrandUpcera;
