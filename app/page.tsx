import HeroSection from './components/home/HeroSection';
import ServicesSection from './components/home/ServicesSection';
import MediaGrid from './components/gallery/MediaGrid';
import VideoHighlights from './components/gallery/VideoHighlights';
import ContactSection from './components/home/ContactSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ServicesSection />
      <VideoHighlights />
      <MediaGrid />
      <ContactSection />
    </div>
  );
}