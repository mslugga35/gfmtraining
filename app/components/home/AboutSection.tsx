'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, Users, MapPin, Calendar, Trophy } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { icon: Users, value: "500+", label: "Athletes Trained", color: "text-neon-lime" },
    { icon: Clock, value: "15+", label: "Years Experience", color: "text-cyber-blue" },
    { icon: Trophy, value: "98%", label: "Success Rate", color: "text-electric-purple" },
    { icon: Star, value: "4.9", label: "Rating", color: "text-neon-lime" }
  ];

  const highlights = [
    "Professional private baseball & softball training",
    "Personalized coaching for all skill levels", 
    "Proven methodologies for measurable results",
    "College recruitment preparation programs"
  ];

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Modern Background Effects */}
      <div className="absolute inset-0 animated-gradient opacity-5" />
      <div className="absolute inset-0 floating-particles" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block glass px-6 py-3 rounded-full mb-8"
          >
            <span className="text-neon-lime font-bold text-sm uppercase tracking-wider">
              ABOUT US
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black heading-font mb-6"
          >
            <span className="text-gradient">GFM TRAINING</span>
            <br />
            <span className="text-glow">ACADEMY</span>
          </motion.h2>
        </motion.div>

        {/* Modern Bento Grid Layout */}
        <div className="bento-grid">
          {/* Main Content Card - Large */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bento-card large hover-magnetic"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center h-full">
              {/* Content */}
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold heading-font text-gradient mb-6"
                >
                  Unlock Your Athletic Potential
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-gray-300 text-lg leading-relaxed mb-8"
                >
                  Led by <span className="text-neon-lime font-semibold">Coach Larry Grayson</span>, GFM Training Academy provides 
                  professional private baseball and softball training designed to elevate your game to the next level. 
                  Our proven methodologies and personalized approach help athletes of all skill levels develop the 
                  technical skills, mental toughness, and confidence needed to succeed.
                </motion.p>

                {/* Highlights List */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-3 mb-8"
                >
                  {highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-neon-lime to-cyber-blue" />
                      <span className="text-gray-300">{highlight}</span>
                    </motion.div>
                  ))}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="modern-button hover-magnetic flex items-center space-x-2"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>SCHEDULE LESSON</span>
                  </motion.a>
                  
                  <motion.a
                    href="/academy"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="modern-button-secondary hover-magnetic"
                  >
                    LEARN MORE
                  </motion.a>
                </motion.div>
              </div>

              {/* 3D Image */}
              <motion.div
                initial={{ opacity: 0, x: 50, rotateY: 15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
                className="transform-3d"
              >
                <motion.div
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.6 }}
                  className="relative h-96 rounded-3xl overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-lime/20 to-cyber-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <Image
                    src="/3.webp"
                    alt="Professional baseball training session"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bento-card text-center hover-glow group"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-neon-lime to-cyber-blue mb-4 ${stat.color}`}
                >
                  <Icon className="w-8 h-8 text-black" />
                </motion.div>
                
                <div className={`text-3xl font-black heading-font ${stat.color} mb-2 group-hover:text-neon-lime transition-colors`}>
                  {stat.value}
                </div>
                
                <div className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}

          {/* Coach Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="bento-card hover-magnetic"
          >
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 bg-gradient-to-r from-neon-lime to-cyber-blue rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-2xl font-black text-black">LG</span>
              </motion.div>
              
              <h4 className="text-xl font-bold heading-font text-white mb-2">
                Coach Larry Grayson
              </h4>
              
              <p className="text-gray-400 mb-4">
                Head Coach & Founder
              </p>
              
              <div className="flex items-center justify-center space-x-1 text-neon-lime">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="bento-card hover-magnetic"
          >
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyber-blue to-electric-purple mb-4"
              >
                <MapPin className="w-8 h-8 text-white" />
              </motion.div>
              
              <h4 className="text-lg font-bold heading-font text-white mb-2">
                Prime Location
              </h4>
              
              <p className="text-gray-400 text-sm">
                State-of-the-art training facilities
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;