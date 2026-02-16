import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { LaboratoryHeroSection } from "@/components/laboratory/HeroSection";
import { LaboratoryStatsSection } from "@/components/laboratory/StatsSection";
import { LaboratoryServicesSection } from "@/components/laboratory/ServicesSection";
import { LaboratoryTechnologiesSection } from "@/components/laboratory/TechnologiesSection";
import { LaboratoryAdvantagesSection } from "@/components/laboratory/AdvantagesSection";
import { LaboratoryHowToOrderSection } from "@/components/laboratory/HowToOrderSection";
import { LaboratoryGalleryPreview } from "@/components/laboratory/GalleryPreview";
import { LaboratoryCTASection } from "@/components/laboratory/CTASection";

const Laboratory = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://articon.pro/laboratory",
    "name": "Артикон — Цифровая зуботехническая лаборатория",
    "description": "Зуботехническая лаборатория полного цикла с CAD/CAM технологиями. Изготовление циркониевых коронок, виниров, имплантации и ортодонтических конструкций в Москве.",
    "url": "https://articon.pro/laboratory",
    "telephone": "+7 (495) 123-45-67",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Москва",
      "addressCountry": "RU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "55.7558",
      "longitude": "37.6173"
    },
    "image": "https://articon.pro/og-laboratory.jpg",
    "priceRange": "₽₽",
    "openingHours": "Mo-Fr 09:00-18:00",
    "parentOrganization": {
      "@type": "Organization",
      "name": "Артикон",
      "url": "https://articon.pro"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Услуги зуботехнической лаборатории",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Циркониевые коронки"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Виниры E-max"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Имплантация"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ортодонтические конструкции"
          }
        }
      ]
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Зуботехническая лаборатория в Москве — CAD/CAM технологии | Артикон</title>
        <meta 
          name="description" 
          content="Цифровая зуботехническая лаборатория Артикон — изготовление циркониевых коронок, виниров, имплантатов. CAD/CAM технологии, 15+ лет опыта, топ-3 лабораторий России. Доставка по всей России." 
        />
        <meta 
          name="keywords" 
          content="зуботехническая лаборатория, цифровая лаборатория, CAD/CAM стоматология, циркониевые коронки, виниры e-max, зубные протезы, имплантация зубов, Москва, Россия" 
        />
        <link rel="canonical" href="https://articon.pro/laboratory" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Зуботехническая лаборатория Артикон — CAD/CAM технологии" />
        <meta property="og:description" content="Цифровая зуботехническая лаборатория полного цикла. Изготовление коронок, виниров, имплантатов с использованием CAD/CAM технологий." />
        <meta property="og:url" content="https://articon.pro/laboratory" />
        <meta property="og:image" content="https://articon.pro/og-laboratory.jpg" />
        <meta property="og:site_name" content="Артикон" />
        <meta property="og:locale" content="ru_RU" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Зуботехническая лаборатория Артикон" />
        <meta name="twitter:description" content="Цифровая зуботехническая лаборатория полного цикла с CAD/CAM технологиями." />
        <meta name="twitter:image" content="https://articon.pro/og-laboratory.jpg" />
        
        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <LaboratoryHeroSection />
      <LaboratoryStatsSection />
      <LaboratoryServicesSection />
      <LaboratoryTechnologiesSection />
      <LaboratoryAdvantagesSection />
      <LaboratoryHowToOrderSection />
      <LaboratoryGalleryPreview />
      <LaboratoryCTASection />
    </Layout>
  );
};

export default Laboratory;
