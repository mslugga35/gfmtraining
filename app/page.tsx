'use client';

import ProfessionalHero from './components/ProfessionalHero';
import ProfessionalPrograms from './components/ProfessionalPrograms';
import ProfessionalGallery from './components/ProfessionalGallery';
import ProfessionalBooking from './components/ProfessionalBooking';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navigation Bar with Better Spacing */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo with proper spacing */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black text-white tracking-tight">GFM</span>
              <span className="text-sm font-bold text-[#DC2626] uppercase tracking-wider">
                Training Academy
              </span>
            </div>
            
            {/* Navigation with increased spacing */}
            <div className="hidden md:flex items-center gap-12">
              <a 
                href="/" 
                className="font-semibold text-white hover:text-[#DC2626] transition-colors text-lg"
              >
                Home
              </a>
              <a 
                href="#programs" 
                className="font-semibold text-white hover:text-[#DC2626] transition-colors text-lg"
              >
                Programs
              </a>
              <a 
                href="#gallery" 
                className="font-semibold text-white hover:text-[#DC2626] transition-colors text-lg"
              >
                Gallery
              </a>
              <a 
                href="#booking" 
                className="font-semibold text-white hover:text-[#DC2626] transition-colors text-lg"
              >
                Contact
              </a>
              <a 
                href="/booking" 
                className="px-8 py-3 bg-[#DC2626] text-white font-bold rounded-xl hover:bg-black transition-all duration-300 shadow-lg hover:shadow-[#DC2626]/25 text-lg"
              >
                Book Session
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div>
        <ProfessionalHero />
        <ProfessionalPrograms />
        <ProfessionalGallery />
        <ProfessionalBooking />
      </div>
      
      <FloatingWhatsApp />

      {/* Simplified Clean Footer */}
      <footer className="py-8 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo Badge */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black">GFM</span>
              <span className="text-[#DC2626] font-bold text-sm">TRAINING</span>
            </div>
            
            {/* Hours & Contact */}
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm">
              <span className="text-gray-400">Mon-Sat: 9AM-6PM</span>
              <a href="tel:407-519-0984" className="hover:text-[#DC2626] transition-colors font-semibold">
                (407) 519-0984
              </a>
              <a href="mailto:Larrygrayson@gfmtf.com" className="hover:text-[#DC2626] transition-colors">
                Contact
              </a>
              <a href="/booking" className="text-[#DC2626] font-bold hover:text-white transition-colors">
                Book Now
              </a>
            </div>
          </div>
          
          <div className="text-center mt-6 pt-6 border-t border-gray-800">
            <p className="text-xs text-gray-500">
              © 2025 GFM Training Academy • Central Florida & South Atlanta
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}