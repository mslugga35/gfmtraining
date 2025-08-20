'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Zap, Shield, Users, Trophy, Video, BarChart3, Flame, Rocket, Award } from 'lucide-react';
import { useRef } from 'react';

const features = [
  {
    icon: Target,
    title: 'ELITE HITTING',
    description: 'Master the art of aggressive, purposeful hitting with cutting-edge mechanics and mental dominance.',
    gradient: 'from-red-500 to-orange-500',
    accent: 'text-red-400'
  },
  {
    icon: Shield,
    title: 'DEFENSIVE MASTERY',
    description: 'Become an unstoppable force in the field with advanced positioning and game-changing awareness.',
    gradient: 'from-blue-500 to-cyan-500',
    accent: 'text-blue-400'
  },
  {
    icon: Rocket,
    title: 'EXPLOSIVE POWER',
    description: 'Unleash devastating speed and strength that separates champions from the competition.',
    gradient: 'from-purple-500 to-pink-500',
    accent: 'text-purple-400'
  },
  {
    icon: Video,
    title: 'PRO ANALYSIS',
    description: 'Precision video breakdown with advanced analytics to perfect every swing and movement.',
    gradient: 'from-red-500 to-red-600',
    accent: 'text-red-400'
  },
  {
    icon: Users,
    title: 'ELITE COACHING',
    description: 'Train with former pros and college stars who know what it takes to reach the top.',
    gradient: 'from-yellow-500 to-orange-500',
    accent: 'text-yellow-400'
  },
  {
    icon: BarChart3,
    title: 'PERFORMANCE TRACKING',
    description: 'Data-driven insights and metrics that prove your improvement and fuel your hunger.',
    gradient: 'from-indigo-500 to-purple-500',
    accent: 'text-indigo-400'
  }
];

const FeaturesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-black">
      {/* DYNAMIC BACKGROUND ELEMENTS */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-electric/10 to-transparent clip-diagonal" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-tr from-electric/5 to-transparent clip-angle" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* EXPLOSIVE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ y: textY }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 mb-6"
          >
            <Flame className="w-8 h-8 text-electric" />
            <span className="text-electric font-bold text-lg uppercase tracking-wider">WHY CHOOSE</span>
            <Flame className="w-8 h-8 text-electric" />
          </motion.div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black heading-font text-white mb-8">
            GFM TRAINING
            <motion.span 
              className="block text-electric"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              ACADEMY
            </motion.span>
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "300px" }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
            className="h-2 bg-electric mx-auto mb-8"
          />

          <p className="text-2xl md:text-3xl max-w-4xl mx-auto body-font text-gray-300 font-medium">
            WHERE ELITE ATHLETES ARE <span className="text-electric font-bold">TRANSFORMED</span> INTO CHAMPIONS
          </p>
        </motion.div>

        {/* FEATURES GRID - NIKE STYLE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* CARD CONTAINER */}
              <div className="relative h-full bg-gradient-to-br from-gray-900 to-black border border-gray-800 overflow-hidden hover-lift">
                {/* DYNAMIC ACCENT */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${feature.gradient} opacity-20 clip-diagonal`} />
                
                {/* CONTENT */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* ICON */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="mb-6"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center shadow-lg`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>

                  {/* TITLE */}
                  <h3 className="text-2xl font-black heading-font text-white mb-4 group-hover:text-electric transition-colors">
                    {feature.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="body-font text-gray-400 leading-relaxed flex-grow group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>

                  {/* HOVER EFFECT LINE */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    className="h-1 bg-electric mt-6 transition-all duration-300"
                  />
                </div>

                {/* EXPLOSIVE HOVER OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-r from-electric/0 via-electric/5 to-electric/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CALL TO ACTION - EXPLOSIVE DESIGN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative bg-gradient-to-r from-black via-gray-900 to-black border-2 border-electric/30 overflow-hidden">
            {/* DYNAMIC BACKGROUND */}
            <div className="absolute inset-0 bg-gradient-to-r from-electric/5 via-electric/10 to-electric/5" />
            <div className="absolute top-0 left-0 w-full h-1 bg-electric" />
            <div className="absolute bottom-0 right-0 w-full h-1 bg-electric" />

            <div className="relative z-10 p-12 text-center">
              <div className="flex justify-center items-center space-x-4 mb-6">
                <Award className="w-12 h-12 text-electric" />
                <h3 className="text-4xl md:text-5xl font-black heading-font text-white">
                  READY TO <span className="text-electric">DOMINATE</span>?
                </h3>
                <Award className="w-12 h-12 text-electric" />
              </div>

              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto body-font">
                Join the elite ranks of champions who've transformed their game and 
                achieved their <span className="text-electric font-bold">ATHLETIC DREAMS</span> with our proven system.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="athletic-button btn-primary px-16 py-6 text-2xl font-black relative overflow-hidden"
              >
                <span className="relative z-10">START YOUR JOURNEY</span>
                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FLOATING ELEMENTS */}
      <div className="absolute top-1/4 left-8 w-2 h-32 bg-electric/30 transform rotate-12" />
      <div className="absolute bottom-1/4 right-8 w-2 h-32 bg-electric/30 transform -rotate-12" />
    </section>
  );
};

export default FeaturesSection;