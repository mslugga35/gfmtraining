'use client';

import PremiumNav from './components/PremiumNav';
import PremiumHero from './components/PremiumHero';
import PremiumServices from './components/PremiumServices';
import EliteStatsSection from './components/EliteStatsSection';
import TestimonialsSection from './components/TestimonialsSection';
import MediaGrid from './components/gallery/MediaGrid';
import VideoHighlights from './components/gallery/VideoHighlights';
import ContactSection from './components/home/ContactSection';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <PremiumNav />
      <PremiumHero />
      <PremiumServices />
      <EliteStatsSection />
      <VideoHighlights />
      <TestimonialsSection />
      <MediaGrid />
      <ContactSection />
      <FloatingWhatsApp />
    </div>
  );
}