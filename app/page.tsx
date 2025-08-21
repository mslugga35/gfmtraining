'use client';

import HeroSectionV2 from './components/HeroSectionV2';
import ServicesSectionV2 from './components/ServicesSectionV2';
import TestimonialsSection from './components/TestimonialsSection';
import MediaGrid from './components/gallery/MediaGrid';
import VideoHighlights from './components/gallery/VideoHighlights';
import ContactSection from './components/home/ContactSection';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSectionV2 />
      <ServicesSectionV2 />
      <VideoHighlights />
      <TestimonialsSection />
      <MediaGrid />
      <ContactSection />
      <FloatingWhatsApp />
    </div>
  );
}