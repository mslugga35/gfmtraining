'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Quote, Trophy, Target, Crown, Medal } from 'lucide-react';
import { useRef } from 'react';

const testimonials = [
  {
    name: 'MARCUS RODRIGUEZ',
    role: 'D1 BASEBALL COMMIT',
    image: '/2.webp',
    rating: 5,
    text: 'GFM Training Academy transformed me from a bench player to a D1 recruit. The intensity, the dedication, the championship mindset - it\'s all here. This place builds LEGENDS.',
    achievement: 'FULL RIDE SCHOLARSHIP',
    stats: '+40 EXIT VELOCITY',
    icon: Crown
  },
  {
    name: 'SARAH CHEN',
    role: 'ALL-STATE ATHLETE',
    image: '/4.webp',
    rating: 5,
    text: 'The mental conditioning here is unmatched. They don\'t just train your body - they forge your mind. I\'m now mentally bulletproof on the field and it shows in every at-bat.',
    achievement: 'STATE CHAMPION',
    stats: '3X ALL-CONFERENCE',
    icon: Medal
  },
  {
    name: 'COACH THOMPSON',
    role: 'HIGH SCHOOL COACH',
    image: '/6.webp',
    rating: 5,
    text: 'Every player who comes through GFM Training Academy returns as a different athlete. The technical mastery combined with elite conditioning creates game-changers.',
    achievement: 'REGIONAL TITLE',
    stats: '15 COLLEGE COMMITS',
    icon: Trophy
  }
];

const TestimonialsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={containerRef} className="relative py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* DYNAMIC BACKGROUND */}
      <motion.div style={{ y }} className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-electric/10 to-transparent clip-diagonal" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-electric/5 to-transparent clip-angle" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* EXPLOSIVE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 mb-6"
          >
            <Target className="w-8 h-8 text-electric" />
            <span className="text-electric font-bold text-lg uppercase tracking-wider">CHAMPION STORIES</span>
            <Target className="w-8 h-8 text-electric" />
          </motion.div>

          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black heading-font text-white mb-8">
            PROVEN
            <motion.span 
              className="block text-electric"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              RESULTS
            </motion.span>
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "350px" }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
            className="h-2 bg-electric mx-auto mb-8"
          />

          <p className="text-2xl md:text-3xl max-w-4xl mx-auto body-font text-gray-300 font-medium">
            REAL ATHLETES. <span className="text-electric font-bold">REAL TRANSFORMATION.</span> REAL SUCCESS.
          </p>
        </motion.div>

        {/* CHAMPION TESTIMONIALS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-electric/50 overflow-hidden hover-lift"
            >
              {/* BACKGROUND IMAGE */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* CONTENT */}
              <div className="relative z-10 p-8">
                {/* ICON HEADER */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-electric/20 border-2 border-electric rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <testimonial.icon className="w-8 h-8 text-electric" />
                  </div>
                </div>

                {/* RATING */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* QUOTE */}
                <blockquote className="text-gray-300 text-center mb-8 leading-relaxed text-lg font-medium italic">
                  "{testimonial.text}"
                </blockquote>

                {/* ACHIEVEMENTS */}
                <div className="space-y-3 mb-8">
                  <div className="text-center">
                    <span className="inline-block bg-electric/20 text-electric px-4 py-2 text-sm font-black uppercase tracking-wide border border-electric/30">
                      {testimonial.achievement}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-white font-bold text-lg">
                      {testimonial.stats}
                    </span>
                  </div>
                </div>

                {/* ATHLETE INFO */}
                <div className="text-center">
                  <h4 className="text-white font-black text-xl heading-font mb-2 group-hover:text-electric transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400 font-medium uppercase tracking-wide">
                    {testimonial.role}
                  </p>
                </div>

                {/* BOTTOM ACCENT */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                  viewport={{ once: true }}
                  className="h-1 bg-electric mt-6"
                />
              </div>

              {/* CORNER ACCENTS */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-electric/30 group-hover:border-electric transition-colors" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-electric/30 group-hover:border-electric transition-colors" />
            </motion.div>
          ))}
        </div>

        {/* CALL TO ACTION */}
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
                <Crown className="w-12 h-12 text-electric" />
                <h3 className="text-4xl md:text-5xl font-black heading-font text-white">
                  READY TO <span className="text-electric">DOMINATE</span>?
                </h3>
                <Crown className="w-12 h-12 text-electric" />
              </div>

              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto body-font">
                Join the elite ranks of champions and experience the transformation that 
                <span className="text-electric font-bold"> CHANGES EVERYTHING</span>.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="athletic-button btn-primary px-12 py-6 text-xl font-black relative overflow-hidden"
                >
                  <span className="relative z-10">BEGIN YOUR LEGEND</span>
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="athletic-button btn-secondary px-12 py-6 text-xl font-black"
                >
                  MORE SUCCESS STORIES
                </motion.button>
              </div>
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

export default TestimonialsSection;