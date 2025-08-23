'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function VeloHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-main.jpg"
          alt="Baseball Training"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Animated Shine Effect */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <motion.div
          animate={{ x: [-1000, 2000] }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 -left-full h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo - Bigger, No Box Background */}
          <div className="mb-12">
            <Image
              src="/gfm_logo_transparent.png"
              alt="GFM Training Academy"
              width={350}
              height={210}
              className="mx-auto drop-shadow-2xl"
              priority
            />
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight" 
              style={{ fontFamily: 'Oswald, sans-serif' }}>
            TRUST YOUR
            <span className="block text-[#DC2626] drop-shadow-lg">PROCESS</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10">
            At GFM Training Academy our mission is to help players of all ages reach their potential! 
            Coach Larry Grayson is one of the top hitting instructors in Central Florida and South Atlanta.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="px-8 py-4 bg-[#DC2626] text-white font-bold text-lg rounded-lg hover:bg-red-700 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Book Session
            </Link>
            <Link
              href="/daytime-program"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-white">500+</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider mt-2">Elite Athletes</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-white">15+</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider mt-2">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-white">24/7</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider mt-2">Indoor Facility</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}