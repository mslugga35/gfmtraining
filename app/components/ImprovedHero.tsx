'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ImprovedHero() {
  return (
    <section className="relative min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-main.jpg"
          alt="Baseball Training"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <Image
              src="/gfm_logo.webp"
              alt="GFM Training Academy"
              width={200}
              height={120}
              className="mx-auto"
              priority
            />
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-wider leading-tight">
            <span 
              className="block mb-6 text-white" 
              style={{
                textShadow: '3px 3px 12px rgba(0,0,0,0.8), 1px 1px 4px rgba(0,0,0,0.6)'
              }}
            >
              TRUST YOUR
            </span>
            <span 
              className="font-black block" 
              style={{
                color: '#DC2626',
                textShadow: '3px 3px 12px rgba(0,0,0,0.8), 0 0 30px rgba(220,38,38,0.3)'
              }}
            >
              PROCESS
            </span>
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <p className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-medium">
            At GFM Training Academy our mission is to help players of all ages reach their potential! 
            Coach Larry Grayson is one of the top hitting instructors in the Central Florida and South Atlanta, Georgia areas.
          </p>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-8 justify-center items-center"
        >
          <motion.a
            href="/booking"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(220,38,38,0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-red-600 text-white font-bold text-xl rounded-xl hover:bg-red-700 transition-all duration-300 shadow-2xl border border-red-500/50"
          >
            GET STARTED
          </motion.a>
          
          <motion.a
            href="#services"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-white/10 text-white font-bold text-xl rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/30"
          >
            LEARN MORE
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-4xl font-black text-red-500 mb-2">500+</div>
            <div className="text-gray-300 font-medium">Elite Athletes</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-red-500 mb-2">15+</div>
            <div className="text-gray-300 font-medium">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-red-500 mb-2">24/7</div>
            <div className="text-gray-300 font-medium">Support</div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [-10, 10, -10],
          rotate: [-1, 1, -1]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-10 w-16 h-16 bg-red-500/20 rounded-full blur-xl"
      />
      
      <motion.div
        animate={{ 
          y: [10, -10, 10],
          rotate: [1, -1, 1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"
      />
    </section>
  );
}