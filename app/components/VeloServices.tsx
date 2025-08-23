'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Target, Brain, Users, Zap, TrendingUp, Calendar } from 'lucide-react';

const services = [
  {
    icon: Target,
    title: 'Hitting Mechanics',
    desc: 'Advanced biomechanical analysis for maximum power',
    price: '$75/session',
    iconColor: 'text-[#DC2626]'
  },
  {
    icon: Brain,
    title: 'Mental Performance',
    desc: 'Elite mental conditioning and approach training',
    price: '$60/session',
    iconColor: 'text-black'
  },
  {
    icon: TrendingUp,
    title: 'Travel Ball Prep',
    desc: 'Competition-ready training for serious players',
    price: '$80/session',
    iconColor: 'text-[#DC2626]'
  },
  {
    icon: Users,
    title: 'Team Training',
    desc: 'Group sessions for teams and organizations',
    price: 'Custom Quote',
    iconColor: 'text-black'
  },
  {
    icon: Zap,
    title: 'Speed & Agility',
    desc: 'Sport-specific athletic performance training',
    price: '$65/session',
    iconColor: 'text-[#DC2626]'
  },
  {
    icon: Calendar,
    title: 'Daytime Program',
    desc: 'Florida Virtual & Homeschool training blocks',
    price: 'Special Rates',
    featured: true,
    iconColor: 'text-[#DC2626]'
  }
];

export default function VeloServices() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
            TRAINING <span className="text-[#DC2626]">PROGRAMS</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional coaching programs designed to elevate your game
          </p>
        </motion.div>

        {/* Services Grid - ALWAYS 2 columns */}
        <div className="grid grid-cols-2 gap-4 lg:gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl bg-white border-2 ${
                service.featured ? 'border-[#DC2626] shadow-xl' : 'border-gray-200'
              } hover:shadow-xl transition-all duration-300 group`}
            >
              {service.featured && (
                <div className="absolute -top-3 left-8">
                  <span className="bg-[#DC2626] text-white text-xs font-bold px-4 py-1 rounded-full">
                    NEW
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="mb-6">
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-[#DC2626] transition-colors">
                  <service.icon className={`w-7 h-7 ${service.iconColor} group-hover:text-white transition-colors`} />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.desc}</p>
              
              {/* Price */}
              <div className="text-xl font-bold text-[#DC2626] mb-6">
                {service.price}
              </div>

              {/* CTA */}
              {service.featured ? (
                <div className="flex gap-3">
                  <Link
                    href="/daytime-program"
                    className="flex-1 text-center py-3 border-2 border-[#DC2626] text-[#DC2626] font-bold rounded-lg hover:bg-[#DC2626] hover:text-white transition-all"
                  >
                    Learn More
                  </Link>
                  <Link
                    href="/booking"
                    className="flex-1 text-center py-3 bg-[#DC2626] text-white font-bold rounded-lg hover:bg-black transition-all"
                  >
                    Book Now
                  </Link>
                </div>
              ) : (
                <Link
                  href="/booking"
                  className="block w-full text-center py-3 bg-[#DC2626] text-white font-bold rounded-lg hover:bg-black transition-all"
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