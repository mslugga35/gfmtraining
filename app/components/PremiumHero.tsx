'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown, Star, Trophy, Users, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

export default function PremiumHero() {
  const [ref, inView] = useInView({ triggerOnce: true });
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);
  
  // Parallax effects
  const logoY = useTransform(scrollY, [0, 500], [0, -50]);
  const textY = useTransform(scrollY, [0, 500], [0, -30]);
  const bgScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Premium Background Gradient */}
      <motion.div 
        style={{ scale: bgScale }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(220,38,38,0.1)_0%,transparent_50%)]" />
      </motion.div>

      {/* Premium Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(220,38,38,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(220,38,38,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Dots Animation */}
      {mounted && [...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-red-500 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <motion.div
                style={{ y: textY }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-left"
              >
                {/* Premium Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-full mb-6"
                >
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                  <span className="text-red-500 text-sm font-semibold tracking-wide">ELITE PERFORMANCE TRAINING</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-7xl font-black mb-6 leading-tight"
                >
                  <span className="text-white">TRANSFORM</span>
                  <br />
                  <span className="text-white">YOUR</span>{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                    GAME
                  </span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-300 mb-8 leading-relaxed"
                >
                  Professional baseball training with Coach Larry Grayson. 
                  Join over 500 elite athletes who've elevated their performance 
                  to championship levels.
                </motion.p>

                {/* Stats Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-3 gap-6 mb-10"
                >
                  {[
                    { value: 500, suffix: '+', label: 'Athletes Trained' },
                    { value: 15, suffix: '+', label: 'Years Experience' },
                    { value: 95, suffix: '%', label: 'Success Rate' }
                  ].map((stat, idx) => (
                    <div key={idx} className="text-left">
                      <div className="text-3xl font-bold text-white mb-1">
                        {inView && (
                          <CountUp
                            start={0}
                            end={stat.value}
                            duration={2}
                            suffix={stat.suffix}
                          />
                        )}
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    href="/booking"
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:bg-red-700"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-2">
                      Start Training
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>

                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300"
                  >
                    View Programs
                  </Link>
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center gap-6 mt-10 pt-10 border-t border-white/10"
                >
                  <div className="flex items-center gap-2 text-gray-400">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm">D1 Athletes</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm">5.0 Rating</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm">Pro Level</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column - Logo */}
              <motion.div
                style={{ y: logoY }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
                ref={ref}
              >
                {/* Glow Effect Behind Logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
                </div>
                
                {/* Logo Container with Premium Effects */}
                <div className="relative">
                  {/* Rotating Border */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-[500px] h-[500px] border-2 border-red-600/20 rounded-full" />
                    <div className="absolute w-[450px] h-[450px] border border-red-600/10 rounded-full" />
                  </motion.div>

                  {/* Main Logo */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative z-10 flex items-center justify-center p-20"
                  >
                    <Image
                      src="/gfm_logo.webp"
                      alt="GFM Training Academy"
                      width={400}
                      height={400}
                      className="drop-shadow-2xl"
                      priority
                    />
                  </motion.div>

                  {/* Orbiting Elements */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="absolute w-6 h-6 bg-red-600 rounded-full top-10 left-1/2 transform -translate-x-1/2 shadow-lg shadow-red-600/50" />
                    <div className="absolute w-4 h-4 bg-white rounded-full bottom-20 right-20 shadow-lg" />
                    <div className="absolute w-5 h-5 bg-red-500 rounded-full top-1/2 left-10 shadow-lg shadow-red-500/50" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}