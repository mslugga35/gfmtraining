import MainLayout from '../components/MainLayout';
import AcademyHero from '../components/academy/AcademyHero';
import ProgramsSection from '../components/academy/ProgramsSection';
import TrainingSchedule from '../components/academy/TrainingSchedule';
import CoachingStaff from '../components/academy/CoachingStaff';
import PricingSection from '../components/academy/PricingSection';

export default function AcademyPage() {
  return (
    <MainLayout>
      <div className="space-y-0">
        <AcademyHero />
        <ProgramsSection />
        <TrainingSchedule />
        <CoachingStaff />
        <PricingSection />
      </div>
    </MainLayout>
  );
}