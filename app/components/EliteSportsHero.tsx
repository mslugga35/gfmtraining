'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Calendar, ChevronRight, Star, Trophy, Users, Target } from 'lucide-react';

export default function EliteSportsHero() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      text: "Coach Grayson transformed my son's hitting technique. He went from batting .220 to .340 in just one season!",
      author: "Michael Rodriguez",
      role: "Parent of Travel Ball Player"
    },
    {
      text: "The mental approach training was a game-changer. I'm more confident at the plate than ever before.",
      author: "Jake Thompson",
      role: "College Baseball Player"
    },
    {
      text: "Best investment we've made in our daughter's athletic future. The personalized training is exceptional.",
      author: "Sarah Williams",
      role: "Parent of High School Player"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-600/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/10 rounded-full filter blur-3xl animate-pulse delay-1000" />
        
        {/* Grid pattern */}
        
        {/* Dynamic lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-8"
          >
            {/* Premium Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 rounded-full"
            >
              <Star className="w-4 h-4 fill-white" />
              <span className="text-sm font-bold uppercase tracking-wider">Elite Training Academy</span>
            </motion.div>

            {/* Main Heading with Enhanced Typography */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-6xl md:text-7xl lg:text-8xl font-black leading-none"
              >
                <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  TRUST YOUR
                </span>
                <span className="block bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  PROCESS
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl text-gray-300 font-light"
              >
                At GFM Training Academy our mission is to help players of all ages reach their potential!
              </motion.p>
            </div>

            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6"
            >
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-black text-red-500">500+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Players Trained</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-black text-red-500">15+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-black text-red-500">95%</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Success Rate</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <a 
                href="/booking"
                className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 rounded-xl font-bold text-white overflow-hidden transition-all hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Journey
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <a 
                href="#services"
                className="px-8 py-4 border-2 border-white/20 rounded-xl font-bold text-white hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                View Programs
              </a>
            </motion.div>

            {/* Testimonial Carousel */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="relative h-32 overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-3"
                >
                  <p className="text-gray-300 italic text-sm">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-red-500" />
                    <p className="text-xs text-gray-400">
                      {testimonials[currentTestimonial].author}, {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Right Content - Enhanced Logo Display */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            {/* Logo Container with Premium Effects */}
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-yellow-500 opacity-30 blur-3xl animate-pulse" />
              
              {/* Rotating border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-yellow-500 animate-spin-slow" style={{
                padding: '2px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude'
              }} />
              
              {/* Logo with enhanced presentation */}
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10 p-8"
              >
                <Image
                  src="/gfm_logo.webp"
                  alt="GFM Training Academy"
                  width={500}
                  height={500}
                  className="w-full h-auto drop-shadow-2xl"
                  priority
                />
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-shine" />
              </motion.div>

              {/* Floating badges around logo */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8">
                  <div className="flex items-center gap-2 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full border border-red-500/50">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs text-white font-bold">Excellence</span>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 translate-y-8">
                  <div className="flex items-center gap-2 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full border border-red-500/50">
                    <Users className="w-4 h-4 text-red-500" />
                    <span className="text-xs text-white font-bold">Team First</span>
                  </div>
                </div>
                
                <div className="absolute bottom-0 right-0 translate-y-8">
                  <div className="flex items-center gap-2 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full border border-red-500/50">
                    <Target className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-white font-bold">Results Driven</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Coach Info Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-10 left-0 right-0 mx-auto max-w-sm"
            >
              <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-red-500/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center">
                    <span className="text-white font-black text-lg">LG</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Coach Larry Grayson</h3>
                    <p className="text-gray-400 text-sm">Elite Performance Coach</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}