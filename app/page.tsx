'use client';

import EliteSportsHero from './components/EliteSportsHero';
import EliteServices from './components/EliteServices';
import EliteContact from './components/EliteContact';
import MediaGrid from './components/gallery/MediaGrid';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Elite Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-red-600/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xl">GFM</span>
              </div>
              <div>
                <div className="text-white font-black text-lg">GFM TRAINING</div>
                <div className="text-red-500 text-xs font-bold tracking-wider">ELITE ACADEMY</div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <a href="#services" className="font-bold text-gray-300 hover:text-red-500 transition-colors">
                Programs
              </a>
              <a href="#gallery" className="font-bold text-gray-300 hover:text-red-500 transition-colors">
                Gallery
              </a>
              <a href="#contact" className="font-bold text-gray-300 hover:text-red-500 transition-colors">
                Contact
              </a>
              <a 
                href="/booking" 
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl hover:scale-105 transition-transform"
              >
                Start Training
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <EliteSportsHero />
      <div id="services">
        <EliteServices />
      </div>
      <div id="gallery">
        <MediaGrid />
      </div>
      <div id="contact">
        <EliteContact />
      </div>
      <FloatingWhatsApp />

      {/* Elite Footer */}
      <footer className="py-12 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
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
              © 2024 GFM Training Academy. All rights reserved. | Powered by Elite Performance
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}