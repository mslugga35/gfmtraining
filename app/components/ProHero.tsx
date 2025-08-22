'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronRight, Star, Trophy, Users } from 'lucide-react';

export default function ProHero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/20 rounded-full filter blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/20 rounded-full filter blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 rounded-full mb-6"
            >
              <Star className="w-4 h-4 fill-white" />
              <span className="text-sm font-bold uppercase tracking-wider">Elite Training Academy</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-6"
            >
              <span className="block text-white">TRUST YOUR</span>
              <span className="block text-red-600">PROCESS</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-300 mb-8"
            >
              At GFM Training Academy our mission is to help players of all ages reach their potential!
            </motion.p>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mb-8"
            >
              <div>
                <div className="text-3xl font-black text-red-600">500+</div>
                <div className="text-sm text-gray-400">Players Trained</div>
              </div>
              <div>
                <div className="text-3xl font-black text-red-600">15+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-black text-red-600">95%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
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
                className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
              >
                Start Your Journey
                <ChevronRight className="w-5 h-5" />
              </a>
              
              <a 
                href="#services"
                className="px-8 py-4 border-2 border-white/30 text-white rounded-lg font-bold hover:bg-white/10 transition-colors"
              >
                View Programs
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-red-600/30 blur-[100px]" />
              
              {/* Logo */}
              <div className="relative bg-white rounded-2xl p-12 shadow-2xl">
                <Image
                  src="/gfm_logo.webp"
                  alt="GFM Training Academy"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Coach Info */}
              <div className="absolute -bottom-6 left-0 right-0 mx-auto max-w-sm">
                <div className="bg-black/90 backdrop-blur rounded-lg p-4 border border-red-600/30">
                  <div className="text-center">
                    <h3 className="text-white font-bold">Coach Larry Grayson</h3>
                    <p className="text-gray-400 text-sm">Elite Performance Coach</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}