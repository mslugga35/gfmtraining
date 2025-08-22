'use client';

import ModernHero from './components/ModernHero';
import ModernServices from './components/ModernServices';
import ModernContact from './components/ModernContact';
import MediaGrid from './components/gallery/MediaGrid';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Clean Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="text-3xl font-black">
                <span className="text-black">GFM</span>
                <span className="text-red-600"> TRAINING</span>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <a href="#services" className="font-semibold text-gray-700 hover:text-red-600 transition-colors">
                Programs
              </a>
              <a href="#gallery" className="font-semibold text-gray-700 hover:text-red-600 transition-colors">
                Gallery
              </a>
              <a href="#contact" className="font-semibold text-gray-700 hover:text-red-600 transition-colors">
                Contact
              </a>
              <a 
                href="/booking" 
                className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
              >
                Book Session
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20">
        <ModernHero />
        <div id="services">
          <ModernServices />
        </div>
        <div id="gallery" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl font-black text-center mb-12">
              <span className="text-black">TRAINING</span>{' '}
              <span className="text-red-600">GALLERY</span>
            </h2>
            <MediaGrid />
          </div>
        </div>
        <div id="contact">
          <ModernContact />
        </div>
      </div>
      <FloatingWhatsApp />

      {/* Clean Footer */}
      <footer className="py-12 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-2xl font-black mb-2">GFM TRAINING ACADEMY</p>
              <p className="text-gray-400">Trust Your Process • Reach Your Potential</p>
            </div>
            <div className="flex items-center gap-6">
              <a href="tel:407-519-0984" className="hover:text-red-500 transition-colors">
                (407) 519-0984
              </a>
              <span className="text-gray-600">|</span>
              <a href="mailto:Larrygrayson@gfmtf.com" className="hover:text-red-500 transition-colors">
                Larrygrayson@gfmtf.com
              </a>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-500">
              © 2024 GFM Training Academy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}