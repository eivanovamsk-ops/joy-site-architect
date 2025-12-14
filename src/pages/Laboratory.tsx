import { Layout } from "@/components/layout/Layout";
import { LaboratoryHeroSection } from "@/components/laboratory/HeroSection";
import { LaboratoryStatsSection } from "@/components/laboratory/StatsSection";
import { LaboratoryServicesSection } from "@/components/laboratory/ServicesSection";
import { LaboratoryTechnologiesSection } from "@/components/laboratory/TechnologiesSection";
import { LaboratoryAdvantagesSection } from "@/components/laboratory/AdvantagesSection";
import { LaboratoryHowToOrderSection } from "@/components/laboratory/HowToOrderSection";
import { LaboratoryGalleryPreview } from "@/components/laboratory/GalleryPreview";
import { LaboratoryCTASection } from "@/components/laboratory/CTASection";

const Laboratory = () => {
  return (
    <Layout>
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
