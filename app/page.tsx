'use client';

import MinimalHero from './components/MinimalHero';
import MinimalServices from './components/MinimalServices';
import MinimalContact from './components/MinimalContact';
import MediaGrid from './components/gallery/MediaGrid';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Clean Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl font-black text-black">GFM</span>
            <div className="flex items-center gap-8">
              <a href="#services" className="font-bold text-gray-700 hover:text-black transition-colors">
                Services
              </a>
              <a href="#contact" className="font-bold text-gray-700 hover:text-black transition-colors">
                Contact
              </a>
              <a 
                href="/booking" 
                className="px-6 py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <MinimalHero />
      <div id="services">
        <MinimalServices />
      </div>
      <MediaGrid />
      <div id="contact">
        <MinimalContact />
      </div>
      <FloatingWhatsApp />

      {/* Simple Footer */}
      <footer className="py-8 bg-black text-white text-center">
        <p className="text-sm">
          © 2024 GFM Training Academy. All rights reserved.
        </p>
      </footer>
    </div>
  );
}