import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { DataFlowSection } from "@/components/DataFlowSection";
import { DashboardSection } from "@/components/DashboardSection";
import { DataAnalyticsSection } from "@/components/DataAnalyticsSection";
import { ImpactVisualizationSection } from "@/components/ImpactVisualizationSection";
import { TeamSection } from "@/components/TeamSection";
import { ConclusionSection } from "@/components/ConclusionSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-coal-black text-foreground overflow-x-hidden">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <DataFlowSection />
      <DashboardSection />
      <DataAnalyticsSection />
      <ImpactVisualizationSection />
      <TeamSection />
      <ConclusionSection />
    </div>
  );
};

export default Index;
