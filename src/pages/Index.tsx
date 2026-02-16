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
        <meta property="og:image" content="https://articon.pro/og-image.jpg" />
        <meta name="twitter:image" content="https://articon.pro/og-image.jpg" />
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

