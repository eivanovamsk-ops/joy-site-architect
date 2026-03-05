import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { ShopHeroBanner } from "@/components/shop/HeroBanner";

import { ShopQuickLinks } from "@/components/shop/QuickLinks";
import { ProductCarousel } from "@/components/shop/ProductCarousel";
import { ShopAdvantages } from "@/components/shop/Advantages";
import { ShopBrands } from "@/components/shop/Brands";
import { WhyArticon } from "@/components/shop/WhyArticon";
import { products } from "@/data/products";

const Shop = () => {
  const saleProducts = products.filter(p => p.isSale);
  const newProducts = products.filter(p => p.isNew);

  return (
    <Layout>
      <Helmet>
        <title>Магазин стоматологического оборудования | Артикон — CAD/CAM системы</title>
        <meta name="description" content="Купить 3D-принтеры, сканеры, фрезерные станки, циркониевые диски и расходные материалы для зуботехнических лабораторий. Официальные дилеры Asiga, Medit, Upcera, imes-icore. Доставка по России." />
        <meta name="keywords" content="стоматологическое оборудование купить, CAD/CAM стоматология, 3D принтер стоматологический, интраоральный сканер, фрезерный станок стоматологический, циркониевые диски, фотополимеры для 3D печати, Артикон" />
        <link rel="canonical" href="https://articon.pro/shop" />
        
        <meta property="og:title" content="Магазин стоматологического оборудования — Артикон" />
        <meta property="og:description" content="CAD/CAM оборудование и материалы для зуботехнических лабораторий. Доставка по России, гарантия, техподдержка." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://articon.pro/shop" />
        <meta property="og:image" content="https://articon.pro/og-shop.jpg" />
        <meta property="og:site_name" content="Артикон" />
        <meta property="og:locale" content="ru_RU" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Магазин стоматологического оборудования — Артикон" />
        <meta name="twitter:description" content="CAD/CAM оборудование и материалы для зуботехнических лабораторий. Доставка по России, гарантия, техподдержка." />
        <meta name="twitter:image" content="https://articon.pro/og-shop.jpg" />
        
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
      
      <ProductCarousel 
        title="🔥 Акции" 
        products={saleProducts} 
        viewAllHref="/shop/catalog/sale" 
      />
      
      <ProductCarousel 
        title="✨ Новинки" 
        products={newProducts} 
      />
      
      <ShopAdvantages />
      <ShopBrands />
    </Layout>
  );
};

export default Shop;
