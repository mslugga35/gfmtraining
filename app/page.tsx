'use client';

import GFMTFHeader from './components/GFMTFHeader';
import GFMTFHero from './components/GFMTFHero';
import GFMTFPrograms from './components/GFMTFPrograms';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <GFMTFHeader />
      
      {/* Add padding-top to account for fixed header */}
      <div className="pt-24">
        <GFMTFHero />
        
        <GFMTFPrograms />

        {/* Player Portal Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              PLAYER PORTAL
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Upload videos for coach review • View personalized feedback • Track your progress
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-bold text-lg rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Sign Up / Sign In
              </Link>
              <Link
                href="/player-portal"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-800 text-white font-bold text-lg rounded-lg hover:bg-green-900 transition-colors"
              >
                Go to Player Portal
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
                GET <span className="text-[#DC2626]">STARTED</span>
              </h2>
              <p className="text-xl text-gray-600">
                Multiple ways to connect
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/booking"
                className="block p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-all text-center"
              >
                <div className="text-3xl mb-2">📅</div>
                <h3 className="font-bold text-lg mb-1">Book Online</h3>
                <p className="text-gray-600">Schedule your session</p>
              </Link>

              <a
                href="tel:407-519-0984"
                className="block p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-all text-center"
              >
                <div className="text-3xl mb-2">📞</div>
                <h3 className="font-bold text-lg mb-1">Call Us</h3>
                <p className="text-[#DC2626] font-bold">(407) 519-0984</p>
              </a>

              <Link
                href="/contact"
                className="block p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-all text-center"
              >
                <div className="text-3xl mb-2">📍</div>
                <h3 className="font-bold text-lg mb-1">Visit Us</h3>
                <p className="text-gray-600">Sanford, FL</p>
              </Link>
            </div>
          </div>
        </section>

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
                  <li><Link href="/academy" className="text-gray-300 hover:text-[#DC2626]">Academy</Link></li>
                  <li><Link href="/programs" className="text-gray-300 hover:text-[#DC2626]">Programs</Link></li>
                  <li><Link href="/gallery" className="text-gray-300 hover:text-[#DC2626]">Gallery</Link></li>
                  <li><Link href="/shop" className="text-gray-300 hover:text-[#DC2626]">Shop</Link></li>
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