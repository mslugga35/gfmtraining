'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const programs = [
  {
    title: 'Hitting Mechanics',
    desc: 'Advanced biomechanical analysis for maximum power',
    price: '$75/session',
    color: 'border-red-200 hover:border-[#DC2626]'
  },
  {
    title: 'Mental Performance',
    desc: 'Elite mental conditioning and approach training',
    price: '$60/session',
    color: 'border-gray-200 hover:border-black'
  },
  {
    title: 'Travel Ball Prep',
    desc: 'Competition-ready training for serious players',
    price: '$80/session',
    color: 'border-gray-200 hover:border-[#DC2626]'
  },
  {
    title: 'Team Training',
    desc: 'Group sessions for teams and organizations',
    price: 'Custom Quote',
    color: 'border-gray-200 hover:border-black'
  },
  {
    title: 'Speed & Agility',
    desc: 'Sport-specific athletic performance training',
    price: '$65/session',
    color: 'border-gray-200 hover:border-[#DC2626]'
  },
  {
    title: 'Daytime Program',
    desc: 'Florida Virtual & Homeschool training blocks',
    price: 'Special Rates',
    color: 'border-[#DC2626] hover:shadow-xl',
    featured: true
  }
];

export default function CleanPrograms() {
  return (
    <section id="programs" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-6xl font-black mb-6"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            TRAINING <span className="text-[#DC2626]">PROGRAMS</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional coaching programs designed to elevate your game to the next level
          </p>
        </motion.div>

        {/* Programs Grid - EXACTLY 2 columns */}
        <div 
          className="max-w-5xl mx-auto"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px'
          }}
        >
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white p-8 rounded-lg border-2 ${program.color} transition-all hover:shadow-lg relative`}
            >
              {program.featured && (
                <div className="absolute -top-3 left-8 bg-[#DC2626] text-white text-xs font-bold px-4 py-1 rounded-full">
                  NEW!
                </div>
              )}

              <h3 
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                {program.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {program.desc}
              </p>
              
              <div className="text-2xl font-bold text-[#DC2626] mb-6">
                {program.price}
              </div>

              {program.featured ? (
                <div className="flex gap-3">
                  <Link
                    href="/florida-virtual"
                    className="flex-1 text-center py-3 border-2 border-[#DC2626] text-[#DC2626] font-bold rounded hover:bg-[#DC2626] hover:text-white transition-all"
                  >
                    Learn More
                  </Link>
                  <Link
                    href="/booking"
                    className="flex-1 text-center py-3 bg-[#DC2626] text-white font-bold rounded hover:bg-black transition-all"
                  >
                    Book Now
                  </Link>
                </div>
              ) : (
                <Link
                  href="/booking"
                  className="block w-full text-center py-3 bg-black text-white font-bold rounded hover:bg-[#DC2626] transition-all"
                >
                  Book Session
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}