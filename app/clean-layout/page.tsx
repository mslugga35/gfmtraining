'use client';

import CleanHero from '../components/CleanHero';
import CleanPrograms from '../components/CleanPrograms';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function CleanLayout() {
  return (
    <div className="min-h-screen bg-white">
      {/* Clean Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black" style={{ fontFamily: 'Oswald, sans-serif' }}>GFM</span>
              <span className="text-sm font-bold text-[#DC2626]">TRAINING ACADEMY</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="font-medium hover:text-[#DC2626] transition-colors">Home</Link>
              <Link href="#programs" className="font-medium hover:text-[#DC2626] transition-colors">Programs</Link>
              <Link href="#gallery" className="font-medium hover:text-[#DC2626] transition-colors">Gallery</Link>
              <Link href="#contact" className="font-medium hover:text-[#DC2626] transition-colors">Contact</Link>
              <Link 
                href="/booking" 
                className="px-6 py-2 bg-[#DC2626] text-white font-bold rounded hover:bg-black transition-all"
              >
                Book Session
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <CleanHero />
      
      {/* Florida Virtual Banner */}
      <Link href="/daytime-program">
        <div className="bg-[#DC2626] text-white py-3 text-center hover:bg-red-700 transition-colors cursor-pointer">
          <span className="font-bold">🔥 NEW!</span>
          <span className="ml-2">Daytime Training for Florida Virtual & Homeschool Athletes</span>
          <span className="ml-4 underline">Learn More →</span>
        </div>
      </Link>

      <CleanPrograms />

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
              SEE THE <span className="text-[#DC2626]">PROCESS</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real work, real reps, real results. Take a look inside our training facility.
            </p>
          </motion.div>

          {/* Simple Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              { src: '/1.webp', caption: 'Hitting - Contact Point' },
              { src: '/2.webp', caption: 'Load & Launch' },
              { src: '/3.webp', caption: 'Sprint Work' },
              { src: '/4.webp', caption: 'Arm Care' },
              { src: '/5.webp', caption: 'Small Group' },
              { src: '/6.webp', caption: 'Cage Work' },
              { src: '/7.webp', caption: 'Fielding' },
              { src: '/8.webp', caption: 'Game Prep' }
            ].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative aspect-square overflow-hidden rounded-lg group"
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="absolute bottom-2 left-2 right-2 text-white text-sm font-semibold">
                    {img.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
              START <span className="text-[#DC2626]">TRAINING</span> TODAY
            </h2>
            <p className="text-xl text-gray-600">
              Ready to take your game to the next level?
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/booking"
              className="bg-white p-8 rounded-lg shadow hover:shadow-xl transition-all text-center"
            >
              <div className="text-4xl mb-4">📅</div>
              <h3 className="font-bold text-lg mb-2">Book Online</h3>
              <p className="text-gray-600">Schedule 24/7</p>
            </Link>

            <a
              href="tel:407-519-0984"
              className="bg-white p-8 rounded-lg shadow hover:shadow-xl transition-all text-center"
            >
              <div className="text-4xl mb-4">📞</div>
              <h3 className="font-bold text-lg mb-2">Call Us</h3>
              <p className="text-[#DC2626] font-bold text-xl">(407) 519-0984</p>
            </a>

            <a
              href="mailto:info@gfmtraining.com"
              className="bg-white p-8 rounded-lg shadow hover:shadow-xl transition-all text-center"
            >
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <p className="text-gray-600">info@gfmtraining.com</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-6">
            <span className="text-3xl font-black" style={{ fontFamily: 'Oswald, sans-serif' }}>GFM</span>
            <span className="text-[#DC2626] font-bold ml-2">TRAINING ACADEMY</span>
          </div>
          <p className="text-gray-400 mb-4">
            Elite Baseball Training • Central Florida & South Atlanta
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <span>Mon-Sat: 9AM-6PM</span>
            <span>•</span>
            <a href="tel:407-519-0984" className="hover:text-[#DC2626]">(407) 519-0984</a>
            <span>•</span>
            <span>Sanford, FL</span>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-xs text-gray-500">
              © 2025 GFM Training Academy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}