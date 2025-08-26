'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function GFMTFHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-white overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-red-50/20"></div>
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle, rgba(220, 38, 38, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Logo */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
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
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-black mb-8 tracking-tight leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="block">TRUST YOUR</span>
            <span className="block text-red-600 mt-2">PROCESS</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-6 text-gray-700 font-bold">
              TRAIN SMARTER
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Elite Baseball & Softball Development at GFM Training Academy.
            <span className="block mt-2">
              Where champions are forged through world-class instruction and proven training methodologies.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link 
              href="/booking" 
              className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Book Training
            </Link>
            <Link 
              href="/academy" 
              className="px-10 py-4 border-2 border-black hover:bg-black hover:text-white text-black font-bold text-lg rounded-lg transform hover:scale-105 transition-all duration-300"
            >
              Academy Programs
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20"
        >
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-black text-red-600 mb-2">500+</div>
            <div className="text-gray-700 font-semibold">Elite Athletes Trained</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-black text-red-600 mb-2">1</div>
            <div className="text-gray-700 font-semibold">Elite Trainer</div>
            <div className="text-gray-500 text-sm">Dedicated Professional Coach</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-black text-red-600 mb-2">24/7</div>
            <div className="text-gray-700 font-semibold">Elite Facility</div>
          </div>
        </motion.div>

        {/* Announcement Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16"
        >
          <Link href="/academy" className="inline-block">
            <div className="bg-red-600 text-white py-3 px-6 rounded-full font-bold hover:bg-red-700 transition-colors">
              🔥 NEW: Daytime Training for Florida Virtual & Homeschool Athletes - Learn More →
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}