'use client';

import { motion } from 'framer-motion';
import { Target, Brain, Users, Zap, TrendingUp, Calendar } from 'lucide-react';

const programs = [
  {
    name: 'Hitting Mechanics',
    desc: 'Advanced biomechanical analysis for maximum power',
    price: '$75/session',
    icon: Target,
    color: 'text-[#DC2626]',
    bgColor: 'bg-red-50'
  },
  {
    name: 'Mental Performance',
    desc: 'Elite mental conditioning and approach training',
    price: '$60/session',
    icon: Brain,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    name: 'Travel Ball Prep',
    desc: 'Competition-ready training for serious players',
    price: '$80/session',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    name: 'Team Training',
    desc: 'Group sessions for teams and organizations',
    price: 'Custom Quote',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    name: 'Speed & Agility',
    desc: 'Sport-specific athletic performance training',
    price: '$65/session',
    icon: Zap,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    name: 'Daytime Program',
    desc: 'Florida Virtual & Homeschool training blocks',
    price: 'Special Rates',
    icon: Calendar,
    color: 'text-[#DC2626]',
    bgColor: 'bg-red-50',
    featured: true
  }
];

export default function ProfessionalPrograms() {
  return (
    <section id="programs" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            TRAINING <span className="text-[#DC2626]">PROGRAMS</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional coaching programs designed to elevate your game to the next level
          </p>
        </motion.div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className={`relative rounded-2xl border ${program.featured ? 'border-[#DC2626] ring-2 ring-[#DC2626]/20' : 'border-gray-200'} bg-white p-8 hover:shadow-xl transition-all duration-300`}
              >
                {program.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#DC2626] text-white text-xs font-bold px-4 py-1 rounded-full">
                      NEW
                    </span>
                  </div>
                )}
                
                {/* Icon */}
                <div className={`${program.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className={`w-8 h-8 ${program.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">{program.name}</h3>
                <p className="text-gray-600 mb-6">{program.desc}</p>

                {/* Price Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-block bg-gray-100 px-4 py-2 rounded-full text-sm font-bold">
                    {program.price}
                  </span>
                </div>

                {/* Single CTA per card */}
                <motion.a
                  href="/booking"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-center bg-[#DC2626] text-white font-bold py-3 rounded-xl hover:bg-black transition-colors duration-300"
                >
                  Book Session
                </motion.a>
              </motion.div>
            );
          })}
        </div>

        {/* Performance Analytics Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center p-6 bg-gray-50 rounded-2xl"
        >
          <p className="text-lg font-medium text-gray-700">
            <span className="text-[#DC2626] font-bold">✓ Performance Analytics Included</span> - 
            Data-driven progress tracking and optimization with every program
          </p>
        </motion.div>
      </div>
    </section>
  );
}