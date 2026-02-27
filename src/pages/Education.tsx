import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { EducationHeroSection } from "@/components/education/HeroSection";
import { EducationStatsSection } from "@/components/education/StatsSection";
import { EducationUpcomingCourses } from "@/components/education/UpcomingCourses";
import { EducationCategories } from "@/components/education/Categories";
import { EducationAdvantages } from "@/components/education/Advantages";
import { EducationOrthoSection } from "@/components/education/OrthoSection";
import { EducationCTASection } from "@/components/education/CTASection";
import { EducationSEOContentSection } from "@/components/education/SEOContentSection";

const Education = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://articon.pro/education",
    "name": "Учебный центр Артикон",
    "description": "Профессиональные курсы для стоматологов и зубных техников. Обучение CAD/CAM технологиям, цифровой ортодонтии, работе с циркониевыми материалами.",
    "url": "https://articon.pro/education",
    "telephone": "+7 (495) 123-45-67",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Москва",
      "addressCountry": "RU"
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "Артикон",
      "url": "https://articon.pro"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Курсы и обучение",
      "itemListElement": [
        {
          "@type": "Course",
          "name": "CAD/CAM технологии в стоматологии",
          "provider": {
            "@type": "Organization",
            "name": "Артикон"
          }
        },
        {
          "@type": "Course",
          "name": "Цифровая ортодонтия",
          "provider": {
            "@type": "Organization",
            "name": "Артикон"
          }
        },
        {
          "@type": "Course",
          "name": "Работа с циркониевыми материалами",
          "provider": {
            "@type": "Organization",
            "name": "Артикон"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2000"
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Курсы для стоматологов и зубных техников — Учебный центр Артикон</title>
        <meta 
          name="description" 
          content="Профессиональные курсы CAD/CAM, цифровой ортодонтии, работы с цирконием. 2000+ обученных специалистов, практика на современном оборудовании, сертификаты. Учебный центр Артикон в Москве." 
        />
        <meta 
          name="keywords" 
          content="курсы для стоматологов, обучение зубных техников, CAD/CAM курсы, цифровая ортодонтия, exocad обучение, цирконий обучение, стоматологические курсы Москва" 
        />
        <link rel="canonical" href="https://articon.pro/education" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Курсы для стоматологов и зубных техников — Учебный центр Артикон" />
        <meta property="og:description" content="Практические курсы по цифровой стоматологии: ортопедия, ортодонтия, CAD/CAM. 2000+ выпускников, 30+ авторских курсов. Обучение от практикующих экспертов." />
        <meta property="og:url" content="https://articon.pro/education" />
        <meta property="og:image" content="https://articon.pro/og-education.jpg" />
        <meta property="og:site_name" content="Артикон" />
        <meta property="og:locale" content="ru_RU" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Курсы для стоматологов и зубных техников — Учебный центр Артикон" />
        <meta name="twitter:description" content="Практические курсы по цифровой стоматологии: ортопедия, ортодонтия, CAD/CAM. 2000+ выпускников, 30+ авторских курсов." />
        <meta name="twitter:image" content="https://articon.pro/og-education.jpg" />
        
        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <EducationHeroSection />
      <EducationStatsSection />
      <EducationUpcomingCourses />
      <EducationSEOContentSection />
      <EducationCategories />
      <EducationAdvantages />
      <EducationOrthoSection />
      <EducationCTASection />
    </Layout>
  );
};

export default Education;
