'use client';

import VeloHeader from './components/VeloHeader';
import VeloHero from './components/VeloHero';
import VeloServices from './components/VeloServices';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <VeloHeader />
      
      {/* Add padding-top to account for fixed header */}
      <div className="pt-20">
        <VeloHero />
        
        {/* Announcement Banner */}
        <Link href="/florida-virtual">
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

        <VeloServices />

        {/* Gallery Preview */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-4xl md:text-5xl font-black mb-4">
                SEE THE <span className="text-[#DC2626]">PROCESS</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real work, real reps, real results
              </p>
            </motion.div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: num * 0.05 }}
                  className="relative aspect-square rounded-xl overflow-hidden group"
                >
                  <Image
                    src={`/${num}.webp`}
                    alt={`Training ${num}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/gallery"
                className="inline-block px-8 py-3 bg-[#DC2626] text-white font-bold rounded-lg hover:bg-black transition-all"
              >
                View Full Gallery
              </Link>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-4xl md:text-5xl font-black mb-4">
                BOOK YOUR <span className="text-[#DC2626]">SESSION</span>
              </h2>
              <p className="text-xl text-gray-600">
                Call, text, or use our online booking system
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/booking"
                className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all text-center"
              >
                <div className="text-3xl mb-3">📅</div>
                <h3 className="font-bold text-lg mb-2">Online Booking</h3>
                <p className="text-gray-600 text-sm">Book your session 24/7</p>
              </Link>

              <a
                href="tel:407-519-0984"
                className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all text-center"
              >
                <div className="text-3xl mb-3">📞</div>
                <h3 className="font-bold text-lg mb-2">Call Us</h3>
                <p className="text-[#DC2626] font-bold">(407) 519-0984</p>
              </a>

              <a
                href="https://wa.me/14075190984"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all text-center"
              >
                <div className="text-3xl mb-3">💬</div>
                <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
                <p className="text-gray-600 text-sm">Message us directly</p>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl md:text-5xl font-black mb-6">
                READY TO <span className="text-[#DC2626]">ELEVATE</span> YOUR GAME?
              </h2>
              <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-300">
                Join 500+ elite athletes who trust GFM Training Academy
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/booking"
                  className="px-10 py-4 bg-[#DC2626] text-white font-bold text-lg rounded-lg hover:bg-red-700 transition-all"
                >
                  Book Your Session
                </Link>
                <Link
                  href="tel:407-519-0984"
                  className="px-10 py-4 border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white hover:text-black transition-all"
                >
                  Call Coach Larry
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">GFM Training</h3>
                <p className="text-gray-400 text-sm">
                  Elite baseball training in Central Florida & South Atlanta
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/services" className="text-gray-400 hover:text-[#DC2626]">Services</Link></li>
                  <li><Link href="/florida-virtual" className="text-gray-400 hover:text-[#DC2626]">Daytime Program</Link></li>
                  <li><Link href="/gallery" className="text-gray-400 hover:text-[#DC2626]">Gallery</Link></li>
                  <li><Link href="/blog" className="text-gray-400 hover:text-[#DC2626]">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Contact</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Sanford, FL</li>
                  <li><a href="tel:407-519-0984" className="hover:text-[#DC2626]">(407) 519-0984</a></li>
                  <li><a href="mailto:info@gfmtraining.com" className="hover:text-[#DC2626]">info@gfmtraining.com</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Hours</h3>
                <p className="text-gray-400 text-sm">
                  Monday - Saturday<br />
                  9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-800 text-center">
              <p className="text-gray-500 text-sm">
                © 2025 GFM Training Academy. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}