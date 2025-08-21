'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { ArrowRight, Play, Star, Trophy, Users, Target } from 'lucide-react';
import { useState } from 'react';

export default function HeroSection() {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          {/* Fallback image */}
          <img 
            src="/training-1.jpg" 
            alt="Training" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-sm border border-red-600/30 rounded-full px-4 py-2 mb-6"
          >
            <Trophy className="w-4 h-4 text-red-400" />
            <span className="text-red-100 text-sm font-medium">Elite Baseball Training Academy</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            <span className="block">Transform Your</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
              Baseball Performance
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
          >
            Professional coaching by Larry Grayson with 15+ years of experience. 
            Join 500+ athletes who've elevated their game.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              href="/booking"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Training Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <button
              onClick={() => setIsVideoPlaying(true)}
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Success Stories
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
              { icon: Users, value: '500+', label: 'Athletes Trained' },
              { icon: Trophy, value: '95%', label: 'Success Rate' },
              { icon: Target, value: '15+', label: 'Years Experience' },
              { icon: Star, value: '4.9', label: 'Average Rating' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4"
              >
                <stat.icon className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
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
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}