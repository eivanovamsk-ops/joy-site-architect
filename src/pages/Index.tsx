import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { HeroSection } from "@/components/home/HeroSection";
import { DirectionsSection } from "@/components/home/DirectionsSection";
import { EcosystemSection } from "@/components/home/EcosystemSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Артикон — Экосистема цифровых решений для стоматологии</title>
        <meta name="description" content="Артикон — зуботехническая лаборатория, магазин оборудования и учебный центр. Полный цикл цифровой стоматологии: от обучения до производства. 15+ лет опыта, 170+ специалистов." />
        <link rel="canonical" href="https://articon.pro/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Артикон — Экосистема цифровых решений для стоматологии" />
        <meta property="og:description" content="Лаборатория, магазин оборудования и учебный центр цифровой стоматологии." />
        <meta property="og:url" content="https://articon.pro/" />
        <meta property="og:image" content="https://articon.pro/og-image.png" />
        <meta property="og:site_name" content="Артикон" />
        <meta property="og:locale" content="ru_RU" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Артикон — Экосистема цифровых решений для стоматологии" />
        <meta name="twitter:description" content="Лаборатория, магазин оборудования и учебный центр цифровой стоматологии." />
        <meta name="twitter:image" content="https://articon.pro/og-image.png" />
      </Helmet>
      <HeroSection />
      <DirectionsSection />
      <EcosystemSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;

