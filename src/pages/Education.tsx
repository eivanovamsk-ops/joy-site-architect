import { Layout } from "@/components/layout/Layout";
import { EducationHeroSection } from "@/components/education/HeroSection";
import { EducationStatsSection } from "@/components/education/StatsSection";
import { EducationUpcomingCourses } from "@/components/education/UpcomingCourses";
import { EducationCategories } from "@/components/education/Categories";
import { EducationAdvantages } from "@/components/education/Advantages";
import { EducationOrthoSection } from "@/components/education/OrthoSection";
import { EducationCTASection } from "@/components/education/CTASection";

const Education = () => {
  return (
    <Layout>
      <EducationHeroSection />
      <EducationStatsSection />
      <EducationUpcomingCourses />
      <EducationCategories />
      <EducationAdvantages />
      <EducationOrthoSection />
      <EducationCTASection />
    </Layout>
  );
};

export default Education;
