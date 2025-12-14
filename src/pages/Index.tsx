import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { DirectionsSection } from "@/components/home/DirectionsSection";
import { WhyArticonSection } from "@/components/home/WhyArticonSection";
import { EcosystemSection } from "@/components/home/EcosystemSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <DirectionsSection />
      <WhyArticonSection />
      <EcosystemSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
