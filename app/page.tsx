'use client';

import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection';
import MediaGrid from './components/gallery/MediaGrid';
import VideoHighlights from './components/gallery/VideoHighlights';
import ContactSection from './components/home/ContactSection';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ServicesSection />
      <VideoHighlights />
      <TestimonialsSection />
      <MediaGrid />
      <ContactSection />
      <FloatingWhatsApp />
    </div>
  );
}