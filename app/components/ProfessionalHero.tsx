'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

// Animated counter component
function AnimatedCounter({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function ProfessionalHero() {
  return (
    <>
      {/* Hero Section */}
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
          {/* Dark Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
          
          {/* Animated shine effect */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ x: [-1000, 2000] }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-0 -left-full h-full w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            />
          </div>
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
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <Image
                src="/gfm_logo_transparent.png"
                alt="GFM Training Academy"
                width={280}
                height={170}
                className="mx-auto drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>

          {/* Main Headline with better spacing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-wide leading-tight">
              <span 
                className="block mb-6 text-white" 
                style={{
                  textShadow: '3px 3px 12px rgba(0,0,0,0.9), 1px 1px 4px rgba(0,0,0,0.7)',
                  letterSpacing: '0.05em'
                }}
              >
                TRUST YOUR
              </span>
              <span 
                className="font-black block" 
                style={{
                  color: '#DC2626', // Pure red, not orange-red
                  textShadow: '3px 3px 12px rgba(0,0,0,0.9), 0 0 30px rgba(220,38,38,0.4)',
                  letterSpacing: '0.05em'
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

          {/* Single Set of CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16"
          >
            <motion.a
              href="/booking"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(220,38,38,0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-[#DC2626] text-white font-bold text-xl rounded-xl hover:bg-black transition-all duration-300 shadow-2xl"
              style={{ backgroundColor: '#DC2626' }} // Ensure pure red
            >
              BOOK SESSION
            </motion.a>
            
            <motion.a
              href="#programs"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-white/10 text-white font-bold text-xl rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/30"
            >
              VIEW PROGRAMS
            </motion.a>
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-5xl font-black text-[#DC2626] mb-2">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <div className="text-gray-300 font-medium text-lg">Elite Athletes</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-[#DC2626] mb-2">
                <AnimatedCounter end={15} suffix="+" />
              </div>
              <div className="text-gray-300 font-medium text-lg">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-[#DC2626] mb-2">
                24/7
              </div>
              <div className="text-gray-300 font-medium text-lg">Support</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* New Florida Virtual/Homeschool Banner */}
      <section className="bg-[#DC2626] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-pulse">🔥</span>
            <p className="font-bold text-lg">
              NEW! Daytime Training for Florida Virtual & Homeschool Athletes
            </p>
          </div>
          <motion.a
            href="#daytime-program"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-white text-[#DC2626] px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-all"
          >
            Learn More
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </section>
    </>
  );
}