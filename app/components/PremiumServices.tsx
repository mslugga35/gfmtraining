'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Target, Zap, Shield, Wind, Activity, Users, 
  Dumbbell, Laptop, ArrowRight, Clock, Star
} from 'lucide-react';

const services = [
  {
    icon: Target,
    title: 'HITTING EXCELLENCE',
    subtitle: '1 Hour Hitting Lesson',
    price: 85,
    description: 'Perfect your swing mechanics with video analysis and personalized drills.',
    features: ['Swing Analysis', 'Video Review', 'Custom Drills'],
    accent: 'red'
  },
  {
    icon: Zap,
    title: 'POWER DEVELOPMENT',
    subtitle: '90 Min Hitting & Bat Speed',
    price: 120,
    description: 'Advanced techniques for explosive bat speed and power generation.',
    features: ['Exit Velocity', 'Launch Angle', 'Power Metrics'],
    accent: 'red',
    featured: true
  },
  {
    icon: Shield,
    title: 'INFIELD MASTERY',
    subtitle: '1 Hour Infield Fielding',
    price: 85,
    description: 'Elite defensive fundamentals and positioning strategies.',
    features: ['Footwork', 'Glove Work', 'Double Plays'],
    accent: 'gray'
  },
  {
    icon: Wind,
    title: 'OUTFIELD ELITE',
    subtitle: '1 Hour Outfield Defense',
    price: 85,
    description: 'Master tracking, routes, and arm strength development.',
    features: ['Route Running', 'Wall Work', 'Arm Strength'],
    accent: 'gray'
  },
  {
    icon: Activity,
    title: 'THROWING POWER',
    subtitle: '1 Hour Throwing Lesson',
    price: 85,
    description: 'Build velocity and accuracy with proper mechanics.',
    features: ['Mechanics', 'Velocity', 'Accuracy'],
    accent: 'red'
  },
  {
    icon: Users,
    title: 'BASE RUNNING',
    subtitle: '1 Hour Base Running',
    price: 85,
    description: 'Gain competitive edge with elite base running techniques.',
    features: ['First Step', 'Sliding', 'Stealing'],
    accent: 'gray'
  },
  {
    icon: Dumbbell,
    title: 'STRENGTH TRAINING',
    subtitle: '1 Hour Strength Session',
    price: 85,
    description: 'Baseball-specific strength and conditioning program.',
    features: ['Core Power', 'Rotational', 'Injury Prevention'],
    accent: 'red'
  },
  {
    icon: Zap,
    title: 'SPEED & AGILITY',
    subtitle: '1 Hour Speed Training',
    price: 85,
    description: 'Explosive speed development for game situations.',
    features: ['Sprint Work', 'Lateral Speed', 'Reaction'],
    accent: 'gray'
  },
  {
    icon: Laptop,
    title: 'VIRTUAL COACHING',
    subtitle: 'Online Training Session',
    price: 85,
    description: 'Professional remote coaching with video analysis.',
    features: ['Video Analysis', 'Custom Programs', 'Check-ins'],
    accent: 'red'
  }
];

export default function PremiumServices() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 bg-white relative overflow-hidden" ref={ref}>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.05) 35px, rgba(0,0,0,.05) 70px)`
        }} />
      </div>

      {/* Watermark Logo */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
        <Image
          src="/gfm_logo.webp"
          alt=""
          width={800}
          height={800}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full mb-6"
          >
            <Star className="w-4 h-4 text-red-600" />
            <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Elite Training Programs
            </span>
            <Star className="w-4 h-4 text-red-600" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            CHOOSE YOUR PATH TO
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700">
              EXCELLENCE
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional training programs designed to elevate every aspect of your game
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative"
            >
              {/* Card */}
              <div className={`
                relative h-full bg-white rounded-2xl border-2 transition-all duration-500
                ${service.featured 
                  ? 'border-red-600 shadow-xl' 
                  : 'border-gray-200 hover:border-gray-300'
                }
                hover:shadow-2xl hover:-translate-y-1
              `}>
                {/* Featured Badge */}
                {service.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="px-4 py-1 bg-red-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6">
                  {/* Icon & Title */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className={`
                        inline-flex p-3 rounded-xl mb-3
                        ${service.accent === 'red' 
                          ? 'bg-red-50 text-red-600' 
                          : 'bg-gray-50 text-gray-700'
                        }
                      `}>
                        <service.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-black text-gray-900 mb-1">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {service.subtitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-gray-900">
                        ${service.price}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">
                        per session
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className={`
                          w-1.5 h-1.5 rounded-full
                          ${service.accent === 'red' ? 'bg-red-600' : 'bg-gray-400'}
                        `} />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href={`/booking?service=${encodeURIComponent(service.subtitle)}&price=${service.price}`}
                    className={`
                      w-full inline-flex items-center justify-center px-6 py-3 font-bold rounded-lg transition-all duration-300
                      ${service.featured
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-900 text-white hover:bg-black'
                      }
                      group
                    `}
                  >
                    Book Session
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center p-8 bg-gray-50 rounded-3xl">
            <Image
              src="/gfm_logo.webp"
              alt="GFM Training Academy"
              width={120}
              height={120}
              className="mb-6"
            />
            <h3 className="text-2xl font-black text-gray-900 mb-2">
              READY TO ELEVATE YOUR GAME?
            </h3>
            <p className="text-gray-600 mb-6">
              Join the elite athletes training with Coach Larry Grayson
            </p>
            <div className="flex gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-300"
              >
                Start Training Today
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="https://wa.me/14075190984"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-bold rounded-lg hover:border-gray-300 transition-all duration-300"
              >
                Chat with Coach
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}