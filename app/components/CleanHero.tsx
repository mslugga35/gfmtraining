'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CleanHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white -z-10" />
      
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo - Bigger, No Box */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Image
              src="/gfm_logo_transparent.png"
              alt="GFM Training Academy"
              width={400}
              height={240}
              className="mx-auto"
              priority
            />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black mb-8"
            style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.02em' }}
          >
            <span className="text-black">TRUST YOUR</span>
            <br />
            <span className="text-[#DC2626] text-6xl md:text-8xl">PROCESS</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            At GFM Training Academy our mission is to help players of all ages reach their potential! 
            Coach Larry Grayson is one of the top hitting instructors in Central Florida and South Atlanta.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <Link
              href="/booking"
              className="px-10 py-4 bg-[#DC2626] text-white font-bold text-lg rounded hover:bg-red-700 transition-all shadow-lg"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              BOOK SESSION
            </Link>
            <Link
              href="#programs"
              className="px-10 py-4 bg-white text-black font-bold text-lg rounded border-2 border-black hover:bg-black hover:text-white transition-all"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              VIEW PROGRAMS
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div>
              <div className="text-4xl font-black text-[#DC2626]" style={{ fontFamily: 'Oswald, sans-serif' }}>500+</div>
              <div className="text-sm text-gray-600 uppercase tracking-wider mt-2">Elite Athletes</div>
            </div>
            <div>
              <div className="text-4xl font-black text-[#DC2626]" style={{ fontFamily: 'Oswald, sans-serif' }}>15+</div>
              <div className="text-sm text-gray-600 uppercase tracking-wider mt-2">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-black text-[#DC2626]" style={{ fontFamily: 'Oswald, sans-serif' }}>24/7</div>
              <div className="text-sm text-gray-600 uppercase tracking-wider mt-2">Support</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}