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
        <meta property="og:image" content="https://articon.pro/og-image.png" />
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

