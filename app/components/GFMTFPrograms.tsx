'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Target, Brain, Users, Zap, TrendingUp, Calendar } from 'lucide-react';

const programs = [
  {
    icon: Target,
    title: 'Private Training',
    desc: '1-on-1 personalized coaching with advanced biomechanical analysis and technique refinement',
    features: ['Individual Focus', 'Custom Training Plan', 'Video Analysis']
  },
  {
    icon: Users,
    title: 'Group Training',
    desc: 'Small group sessions (3-6 players) combining competitive atmosphere with focused instruction',
    features: ['Peer Learning', 'Team Dynamics', 'Skill Development']
  },
  {
    icon: Calendar,
    title: 'Florida Virtual/Homeschool Program',
    desc: 'Specialized daytime training program for Florida Virtual School and homeschool athletes',
    featured: true,
    mostPopular: true,
    features: ['Flexible Schedule', 'Academic Balance', 'Elite Development']
  },
  {
    icon: TrendingUp,
    title: 'Academy Elite Development',
    desc: 'Comprehensive year-round program for serious athletes seeking college scholarships',
    features: ['College Prep', 'Showcase Training', 'Recruiting Support']
  },
  {
    icon: Brain,
    title: 'Mental Performance Training',
    desc: 'Championship mindset development and competitive approach training for peak performance',
    features: ['Focus Training', 'Pressure Situations', 'Confidence Building']
  },
  {
    icon: Zap,
    title: 'Baseball/Softball Conditioning',
    desc: 'Sport-specific athletic performance enhancement and conditioning programs',
    features: ['Speed Training', 'Agility Work', 'Injury Prevention']
  }
];

export default function GFMTFPrograms() {
  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 via-gray-50 to-red-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)]"></div>
      <div className="container relative z-10">
        {/* Athletic Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-black text-black mb-8 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            GFM <span className="text-red-600">PROGRAMS</span>
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Elite baseball & softball training programs designed for championship performance
          </motion.p>
        </motion.div>

        {/* Elite Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" } 
              }}
              className={`group relative overflow-hidden p-10 rounded-3xl backdrop-blur-sm
                bg-white/80 border border-white/20 shadow-lg hover:shadow-2xl 
                transition-all duration-500 cursor-pointer
                ${program.featured ? 
                  'ring-2 ring-red-600/20 bg-gradient-to-br from-white via-white to-red-50/30' : 
                  'hover:bg-white/90'
                }
                ${program.mostPopular ? 'scale-105' : ''}
              `}
              style={{
                background: program.featured ? 
                  'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 50%, rgba(220,38,38,0.05) 100%)' :
                  'rgba(255,255,255,0.8)'
              }}
            >
              {/* Gradient Border on Hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-500 via-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
              

              {/* Most Popular Badge */}
              {program.mostPopular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold px-6 py-2 rounded-full uppercase tracking-wider shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Featured Badge */}
              {program.featured && !program.mostPopular && (
                <div className="absolute -top-4 left-8 z-20">
                  <span className="bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                    Featured
                  </span>
                </div>
              )}

              {/* Athletic Icon with Background Circle */}
              <motion.div 
                className="mb-10"
                whileHover={{ scale: 1.15, rotate: 8 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              >
                <div className="relative">
                  {/* Icon Background Circle */}
                  <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center 
                                  group-hover:from-red-600 group-hover:to-red-700 transition-all duration-500 shadow-lg
                                  border-4 border-white group-hover:border-red-100">
                    <program.icon className="w-10 h-10 text-red-600 group-hover:text-white transition-colors duration-500" />
                  </div>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 w-20 h-20 bg-red-600 rounded-full opacity-0 group-hover:opacity-20 
                                  blur-xl transition-opacity duration-500"></div>
                </div>
              </motion.div>

              {/* Enhanced Content */}
              <div className="space-y-6">
                <h3 className="text-3xl font-black text-black group-hover:text-red-600 transition-colors duration-300 leading-tight"
                    style={{ fontFamily: 'var(--font-display)' }}>
                  {program.title}
                </h3>
                
                <p className="text-gray-700 text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {program.desc}
                </p>

                {/* Features List with Enhanced Styling */}
                <ul className="space-y-3">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full mr-4 
                                      group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button Inside Card */}
              <div className="mt-10">
                {program.featured ? (
                  <div className="flex gap-3">
                    <Link 
                      href="/academy" 
                      className="flex-1 px-6 py-3 bg-white border-2 border-red-600 text-red-600 font-bold rounded-xl 
                                hover:bg-red-600 hover:text-white transition-all duration-300 text-center
                                group-hover:shadow-lg transform group-hover:-translate-y-1"
                    >
                      Learn More
                    </Link>
                    <Link 
                      href="/booking" 
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl 
                                hover:from-red-700 hover:to-red-800 transition-all duration-300 text-center shadow-lg
                                group-hover:shadow-xl transform group-hover:-translate-y-1"
                    >
                      Book Now
                    </Link>
                  </div>
                ) : (
                  <Link 
                    href="/booking" 
                    className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl 
                              hover:from-red-700 hover:to-red-800 transition-all duration-300 text-center shadow-lg
                              group-hover:shadow-xl transform group-hover:-translate-y-1 block"
                  >
                    Book Training
                  </Link>
                )}
              </div>

              {/* Glass Morphism Overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-white/5 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Call-to-Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-20 p-12 bg-black rounded-3xl text-white relative overflow-hidden"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-32 h-32 border border-red-600/20 rounded-full"
          />
          
          <h3 className="text-3xl font-black mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            READY TO ELEVATE YOUR GAME?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the elite athletes training at GFMTF Academy. 
            Experience world-class baseball and softball instruction.
          </p>
          <Link href="/booking" className="btn btn-primary btn-lg hover-glow">
            Start Training Today
          </Link>
        </motion.div>
      </div>
    </section>
  );
}