'use client';

import { motion } from 'framer-motion';
import { Target, Users, TrendingUp, Award } from 'lucide-react';

const MissionSection = () => {
  const features = [
    {
      icon: Target,
      title: "Precision Training",
      description: "Data-driven techniques for measurable improvement"
    },
    {
      icon: Users,
      title: "Expert Coaching",
      description: "Professional guidance from experienced trainers"
    },
    {
      icon: TrendingUp,
      title: "Progressive Growth",
      description: "Continuous development at every skill level"
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Track record of athletic excellence"
    }
  ];

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Modern Background */}
      <div className="absolute inset-0 animated-gradient opacity-10" />
      <div className="absolute inset-0 floating-particles" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Modern Mission Statement */}
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
              OUR MISSION
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-black heading-font mb-8 leading-tight"
          >
            <span className="text-gradient block">ELEVATE</span>
            <span className="text-white block">EVERY</span>
            <span className="text-glow block">ATHLETE</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
              We believe every athlete has <span className="text-neon-lime font-semibold">untapped potential</span> waiting to be discovered. 
              Through personalized training, expert coaching, and proven methodologies, we help players 
              <span className="text-gradient font-semibold"> transform their skills</span> and achieve their athletic dreams.
            </p>
          </motion.div>
        </motion.div>

        {/* Modern Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group"
              >
                <div className="glass-card p-8 text-center h-full hover-glow">
                  {/* Icon with modern effect */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-neon-lime to-cyber-blue mb-6 group-hover:shadow-lg"
                  >
                    <Icon className="w-8 h-8 text-black" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold heading-font text-white mb-4 group-hover:text-neon-lime transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Modern CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="glass-card p-12 max-w-4xl mx-auto">
            <motion.h3
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold heading-font text-gradient mb-6"
            >
              Ready to unlock your potential?
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-300 text-lg mb-8"
            >
              Join hundreds of athletes who have transformed their game with our proven training methods.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="/academy"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="modern-button hover-magnetic"
              >
                START TRAINING
              </motion.a>
              
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="modern-button-secondary hover-magnetic"
              >
                LEARN MORE
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;