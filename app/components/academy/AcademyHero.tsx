'use client';

import { motion } from 'framer-motion';
import { Target, Users, Trophy, Calendar } from 'lucide-react';
import Image from 'next/image';

const AcademyHero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'rgb(22, 22, 22)' }}>
      {/* Logo Watermark Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
        <Image 
          src="/gfm_logo.webp" 
          alt="" 
          width={800} 
          height={800} 
          className="object-contain" 
        />
      </div>
      {/* Background */}
      <div className="absolute inset-0 z-1">
        <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(22, 22, 22, 0.8) 100%)' }}></div>
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(22, 22, 22, 0.4)' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {/* Large Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="flex justify-center lg:justify-start mb-6"
              >
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <Image 
                    src="/gfm_logo.webp" 
                    alt="GFM Training Academy" 
                    width={180} 
                    height={180} 
                    className="w-auto h-auto"
                    priority
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="inline-block gfmtf-button px-4 py-2 text-sm font-semibold body-font"
                style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}
              >
                Elite Training Academy
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight heading-font"
                style={{ color: 'rgb(247, 247, 247)' }}
              >
                Develop Your
                <span style={{ color: '#10b981' }}> Elite</span> Skills
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl leading-relaxed max-w-lg body-font"
                style={{ color: 'rgb(127, 128, 128)' }}
              >
                Our comprehensive baseball academy offers year-round training programs 
                designed to develop complete players from fundamentals to advanced techniques.
              </motion.p>
            </div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                  <Target className="w-5 h-5" style={{ color: '#10b981' }} />
                </div>
                <span className="body-font" style={{ color: 'rgb(127, 128, 128)' }}>Precision Training</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                  <Users className="w-5 h-5" style={{ color: '#10b981' }} />
                </div>
                <span className="body-font" style={{ color: 'rgb(127, 128, 128)' }}>Expert Coaches</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                  <Trophy className="w-5 h-5" style={{ color: '#10b981' }} />
                </div>
                <span className="body-font" style={{ color: 'rgb(127, 128, 128)' }}>Proven Results</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                  <Calendar className="w-5 h-5" style={{ color: '#10b981' }} />
                </div>
                <span className="body-font" style={{ color: 'rgb(127, 128, 128)' }}>Flexible Schedule</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <button className="gfmtf-button px-8 py-4 font-semibold text-lg transition-colors body-font" style={{
                backgroundColor: '#10b981',
                color: 'rgb(247, 247, 247)',
                border: '2px solid #10b981'
              }}>
                Enroll Now
              </button>
              <button className="gfmtf-button px-8 py-4 font-semibold text-lg transition-colors body-font" style={{
                backgroundColor: 'transparent',
                color: 'rgb(247, 247, 247)',
                border: '2px solid rgb(247, 247, 247)'
              }}>
                Schedule Tour
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column - Program Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-6"
          >
            <div className="backdrop-blur-sm border gfmtf-button p-6" style={{ 
              backgroundColor: 'rgba(22, 22, 22, 0.8)', 
              borderColor: 'rgb(127, 128, 128)',
              borderRadius: '12px'
            }}>
              <h3 className="text-xl font-semibold mb-4 heading-font" style={{ color: 'rgb(247, 247, 247)' }}>Academy Programs</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="body-font" style={{ color: 'rgb(127, 128, 128)' }}>Elite Development</span>
                  <span className="font-semibold body-font" style={{ color: '#10b981' }}>All Levels</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="body-font" style={{ color: 'rgb(127, 128, 128)' }}>High School Prep</span>
                  <span className="font-semibold body-font" style={{ color: '#10b981' }}>Ages 14-17</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="body-font" style={{ color: 'rgb(127, 128, 128)' }}>Elite Performance</span>
                  <span className="font-semibold body-font" style={{ color: '#10b981' }}>Ages 16+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="body-font" style={{ color: 'rgb(127, 128, 128)' }}>Private Coaching</span>
                  <span className="font-semibold body-font" style={{ color: '#10b981' }}>All Ages</span>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-sm border gfmtf-button p-6" style={{ 
              backgroundColor: 'rgba(22, 22, 22, 0.8)', 
              borderColor: 'rgb(127, 128, 128)',
              borderRadius: '12px'
            }}>
              <h3 className="text-xl font-semibold mb-4 heading-font" style={{ color: 'rgb(247, 247, 247)' }}>Training Focus</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold heading-font" style={{ color: '#10b981' }}>Hitting</div>
                  <div className="text-sm body-font" style={{ color: 'rgb(127, 128, 128)' }}>Mechanics & Power</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold heading-font" style={{ color: '#10b981' }}>Pitching</div>
                  <div className="text-sm body-font" style={{ color: 'rgb(127, 128, 128)' }}>Velocity & Control</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold heading-font" style={{ color: '#10b981' }}>Fielding</div>
                  <div className="text-sm body-font" style={{ color: 'rgb(127, 128, 128)' }}>Defense & Agility</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold heading-font" style={{ color: '#10b981' }}>Mental</div>
                  <div className="text-sm body-font" style={{ color: 'rgb(127, 128, 128)' }}>Game Strategy</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AcademyHero;