'use client';

import Link from 'next/link';
import { ArrowRight, Play, Target, Award, Users } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AnimatedLogo from '../premium/AnimatedLogo';
import PremiumButton from '../premium/PremiumButton';
import Card3D from '../premium/Card3D';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const title = "Trust Your Process";
  
  return (
    <motion.section 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden py-20"
      style={{ y, opacity }}
    >
      {/* Asymmetric Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Geometric shapes */}
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-red-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-40 left-10 w-96 h-96 bg-gradient-to-tr from-blue-500/5 to-red-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-screen">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Animated Logo */}
            <motion.div 
              className="flex justify-start"
              variants={itemVariants}
            >
              <AnimatedLogo 
                width={180} 
                height={180}
                className="animate-on-load"
                autoPlay={true}
                delay={0.5}
              />
            </motion.div>

            {/* Main Title with Mixed Fonts */}
            <motion.div variants={titleVariants} className="space-y-4">
              <motion.h1 
                className="text-6xl lg:text-8xl font-bold leading-tight"
                style={{ fontFamily: 'var(--font-bebas-neue)' }}
              >
                {title.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className={`inline-block ${letter === ' ' ? 'w-4' : ''} ${
                      index < 5 ? 'text-red-600' : 
                      index < 9 ? 'text-gray-800' : 'text-blue-600'
                    }`}
                    style={{
                      transformOrigin: 'bottom',
                      fontFamily: index < 5 ? 'var(--font-bebas-neue)' : 
                                 index < 9 ? 'var(--font-oswald)' : 'var(--font-rajdhani)'
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={itemVariants} className="max-w-xl">
              <motion.p 
                className="text-xl lg:text-2xl text-gray-700 leading-relaxed"
                style={{ fontFamily: 'var(--font-inter)' }}
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                At <span className="font-bold text-red-600">GFM Training Academy</span> our mission is to help players of all ages reach their{' '}
                <span className="font-bold text-blue-600">potential!</span>
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <PremiumButton
                variant="primary"
                size="lg"
                href="/services"
                className="group"
                data-cursor-text="Book Training"
                gooeyEffect={true}
                glowEffect={true}
                magneticStrength={0.3}
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Book Training
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </PremiumButton>
              
              <PremiumButton
                variant="outline"
                size="lg"
                href="/gallery"
                data-cursor-text="View Gallery"
                magneticStrength={0.2}
              >
                View Gallery
              </PremiumButton>
            </motion.div>

            {/* Stats Row */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-8"
            >
              {[
                { icon: Users, value: "500+", label: "Athletes Trained" },
                { icon: Award, value: "15+", label: "Years Experience" },
                { icon: Target, value: "95%", label: "Success Rate" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-red-600" />
                  <motion.div 
                    className="text-2xl font-bold text-gray-800"
                    style={{ fontFamily: 'var(--font-rajdhani)' }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-inter)' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div variants={itemVariants}>
              <Card3D className="p-6" tiltStrength={0.5}>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-oswald)' }}>
                    Elite Training
                  </h3>
                  <p className="text-gray-600" style={{ fontFamily: 'var(--font-inter)' }}>
                    Professional coaching techniques used by college and pro athletes
                  </p>
                </div>
              </Card3D>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card3D className="p-6" tiltStrength={0.5}>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-oswald)' }}>
                    All Ages Welcome
                  </h3>
                  <p className="text-gray-600" style={{ fontFamily: 'var(--font-inter)' }}>
                    From youth leagues to adult competitive players
                  </p>
                </div>
              </Card3D>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card3D className="p-6" tiltStrength={0.5}>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-oswald)' }}>
                    Proven Results
                  </h3>
                  <p className="text-gray-600" style={{ fontFamily: 'var(--font-inter)' }}>
                    Track record of developing championship players
                  </p>
                </div>
              </Card3D>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-red-500 rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.section>
  );
};

export default HeroSection;