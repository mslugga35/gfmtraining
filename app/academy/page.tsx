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
        <TrainingSchedule />
        <CoachingStaff />
        <AcademyEnrollmentForm />
        <PlayerPortalSection />
        
        {/* Simple Footer */}
        <footer className="py-12 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-xl mb-4 text-[#DC2626]">GFM Training Academy</h3>
                <p className="text-gray-300">
                  Elite baseball & softball training
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/academy" className="text-gray-300 hover:text-[#DC2626]">Academy</a></li>
                  <li><a href="/programs" className="text-gray-300 hover:text-[#DC2626]">Programs</a></li>
                  <li><a href="/gallery" className="text-gray-300 hover:text-[#DC2626]">Gallery</a></li>
                  <li><a href="/contact" className="text-gray-300 hover:text-[#DC2626]">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-4">Contact</h3>
                <p className="text-gray-300 mb-2">📞 (407) 519-0984</p>
                <p className="text-gray-300">📍 Sanford, FL</p>
              </div>
            </div>
            
            <div className="pt-8 border-t border-gray-800 text-center">
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