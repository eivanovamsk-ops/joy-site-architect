import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { ShopHeroBanner } from "@/components/shop/HeroBanner";
import { ShopQuickLinks } from "@/components/shop/QuickLinks";
import { ProductCatalog } from "@/components/shop/ProductCatalog";
import { ShopAdvantages } from "@/components/shop/Advantages";
import { ShopBrands } from "@/components/shop/Brands";

const Shop = () => {
  return (
    <Layout>
      <Helmet>
        <title>Магазин стоматологического оборудования | Артикон — CAD/CAM системы</title>
        <meta name="description" content="Купить 3D-принтеры, сканеры, фрезерные станки, циркониевые диски и расходные материалы для зуботехнических лабораторий. Официальные дилеры Asiga, Medit, Upcera, imes-icore. Доставка по России." />
        <meta name="keywords" content="стоматологическое оборудование купить, CAD/CAM стоматология, 3D принтер стоматологический, интраоральный сканер, фрезерный станок стоматологический, циркониевые диски, фотополимеры для 3D печати, Артикон" />
        <link rel="canonical" href="https://articon.pro/shop" />
        
        <meta property="og:title" content="Магазин стоматологического оборудования | Артикон" />
        <meta property="og:description" content="CAD/CAM оборудование и материалы для зуботехнических лабораторий. Доставка по России, гарантия, техподдержка." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://articon.pro/shop" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "Артикон — Магазин стоматологического оборудования",
            "description": "CAD/CAM оборудование и материалы для зуботехнических лабораторий",
            "url": "https://articon.pro/shop",
            "telephone": "+7 (495) 123-45-67",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "RU",
              "addressLocality": "Москва"
            },
            "openingHours": "Mo-Fr 09:00-18:00",
            "priceRange": "₽₽₽"
          })}
        </script>
      </Helmet>
      
      <ShopHeroBanner />
      <ShopQuickLinks />
      <ProductCatalog />
      <ShopAdvantages />
      <ShopBrands />
    </Layout>
  );
};

export default Shop;
