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
        
        {/* Announcement Banner */}
        <Link href="/academy">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#DC2626] text-white py-4 px-6 text-center hover:bg-red-700 transition-colors cursor-pointer"
          >
            <span className="font-bold text-lg">🔥 NEW!</span>
            <span className="ml-2">Daytime Training for Florida Virtual & Homeschool Athletes</span>
            <span className="ml-4 underline">Learn More →</span>
          </motion.div>
        </Link>

        <GFMTFPrograms />

        {/* Gallery Preview */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
                SEE THE <span className="text-[#DC2626]">PROCESS</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real training, real results
              </p>
            </motion.div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-8">
              {[
                'Training Session',
                'Batting Practice',
                'Pitching Mechanics',
                'Fielding Drills',
                'Team Workout',
                'Elite Athletes',
                'Facility Tour',
                'Championship Team'
              ].map((title, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-600 group-hover:scale-110 transition-transform duration-300">
                    <div className="flex flex-col items-center justify-center h-full text-white p-4">
                      <div className="text-4xl mb-2">⚾</div>
                      <div className="text-sm font-semibold text-center">{title}</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/gallery"
                className="inline-block px-8 py-3 bg-[#DC2626] text-white font-bold rounded-lg hover:bg-black transition-colors"
              >
                View Full Gallery
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