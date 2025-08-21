'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, Star, Trophy, Users, Target, Flame, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import CountUp from 'react-countup';

export default function HeroSectionV2() {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-red-950 to-black">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(220,38,38,0.3)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(220,38,38,0.2)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(220,38,38,0.2)_0%,transparent_50%)]" />
        
        {/* Animated lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(220,38,38,0.3) 100px, rgba(220,38,38,0.3) 101px)`,
          }} />
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 100px, rgba(220,38,38,0.3) 100px, rgba(220,38,38,0.3) 101px)`,
          }} />
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Logo and Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center mb-8"
          >
            <Image
              src="/gfm_logo.webp"
              alt="GFM Training Academy"
              width={150}
              height={150}
              className="mb-4 drop-shadow-2xl"
            />
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 backdrop-blur-sm rounded-full px-6 py-3 shadow-2xl shadow-red-600/30">
              <Flame className="w-5 h-5 text-white animate-pulse" />
              <span className="text-white text-sm font-bold uppercase tracking-wider">Elite Performance Training</span>
              <Flame className="w-5 h-5 text-white animate-pulse" />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-center mb-6 leading-tight"
          >
            <span className="block text-white">UNLEASH YOUR</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-orange-500 animate-gradient">
              BASEBALL POWER
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto text-center font-medium"
          >
            Train with Coach Larry Grayson • 15+ Years of Excellence • 
            <span className="text-red-400 font-bold"> 500+ Champions Created</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              href="/booking"
              className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-red-600 to-orange-600 rounded-full overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-red-600/50 transform"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Zap className="w-6 h-6 mr-2 relative z-10" />
              <span className="relative z-10 flex items-center gap-2">
                START TRAINING NOW
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>

            <button
              onClick={() => window.open('https://wa.me/14075190984', '_blank')}
              className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-green-600/50"
            >
              <MessageCircle className="w-6 h-6 mr-2" />
              INSTANT CONSULTATION
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: Users, value: 500, suffix: '+', label: 'ATHLETES TRAINED', color: 'from-red-500 to-orange-500' },
              { icon: Trophy, value: 95, suffix: '%', label: 'SUCCESS RATE', color: 'from-yellow-500 to-orange-500' },
              { icon: Target, value: 15, suffix: '+', label: 'YEARS EXPERIENCE', color: 'from-red-500 to-pink-500' },
              { icon: Star, value: 4.9, suffix: '', label: 'RATING', color: 'from-orange-500 to-red-500' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                <div className="relative bg-black/50 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 hover:border-red-400 transition-all duration-300 hover:scale-105">
                  <stat.icon className="w-10 h-10 text-red-400 mx-auto mb-3" />
                  <div className="text-4xl font-black text-white mb-2">
                    {inView && (
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2}
                        decimals={stat.label === 'RATING' ? 1 : 0}
                        suffix={stat.suffix}
                      />
                    )}
                  </div>
                  <div className="text-xs font-bold text-red-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-8 flex-wrap justify-center">
              <div className="flex items-center gap-2 text-gray-300">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium">D1 Athlete Development</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium">Professional Certified</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Users className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium">All-Star Creator</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-8 h-12 border-2 border-red-500/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-4 bg-gradient-to-b from-red-500 to-transparent rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Add MessageCircle import
import { MessageCircle } from 'lucide-react';