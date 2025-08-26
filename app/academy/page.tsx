'use client';

import GFMTFHeader from '../components/GFMTFHeader';
import AcademyHero from '../components/academy/AcademyHero';
import ProgramsSection from '../components/academy/ProgramsSection';
import FloridaVirtualProgramSection from '../components/academy/FloridaVirtualProgramSection';
import TrainingSchedule from '../components/academy/TrainingSchedule';
import CoachingStaff from '../components/academy/CoachingStaff';
import AcademyEnrollmentForm from '../components/academy/AcademyEnrollmentForm';
import PlayerPortalSection from '../components/academy/PlayerPortalSection';
import Footer from '../components/Footer';

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-white">
      <GFMTFHeader />
      
      <div className="pt-24">
        <AcademyHero />
        <ProgramsSection />
        <FloridaVirtualProgramSection />
        
        {/* Simple Footer */}
        <footer className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-xl mb-4 text-red-600">GFM Training Academy</h3>
                <p className="text-gray-600">
                  Elite baseball & softball training
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-4 text-black">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/" className="text-gray-600 hover:text-red-600">Home</a></li>
                  <li><a href="/services" className="text-gray-600 hover:text-red-600">Services</a></li>
                  <li><a href="/gallery" className="text-gray-600 hover:text-red-600">Gallery</a></li>
                  <li><a href="/contact" className="text-gray-600 hover:text-red-600">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-4 text-black">Contact</h3>
                <p className="text-gray-600 mb-2">📞 (407) 519-0984</p>
                <p className="text-gray-600">📍 Central Florida</p>
              </div>
            </div>
            
            <div className="pt-8 border-t border-gray-300 text-center">
              <p className="text-gray-500">
                © 2025 GFM Training Academy. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}