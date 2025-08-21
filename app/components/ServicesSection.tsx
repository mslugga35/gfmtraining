'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { 
  Target, Zap, Shield, Wind, Activity, Users, 
  Dumbbell, Laptop, ChevronRight, Clock, DollarSign 
} from 'lucide-react';

const services = [
  {
    icon: Target,
    title: '1 Hour Hitting Lesson',
    price: 85,
    duration: '60 min',
    description: 'Perfect your swing mechanics and timing with personalized hitting instruction.',
    features: ['Swing Analysis', 'Video Review', 'Personalized Drills'],
    color: 'from-red-500 to-red-600',
    popular: false
  },
  {
    icon: Zap,
    title: '90 Min Hitting & Bat Speed',
    price: 120,
    duration: '90 min',
    description: 'Advanced hitting technique combined with explosive bat speed training.',
    features: ['Power Development', 'Exit Velocity Training', 'Launch Angle Optimization'],
    color: 'from-orange-500 to-red-500',
    popular: true
  },
  {
    icon: Shield,
    title: '1 Hour Infield Fielding',
    price: 85,
    duration: '60 min',
    description: 'Master defensive fundamentals and positioning for infield excellence.',
    features: ['Footwork Drills', 'Glove Work', 'Double Play Mechanics'],
    color: 'from-blue-500 to-blue-600',
    popular: false
  },
  {
    icon: Wind,
    title: '1 Hour Outfield Defense',
    price: 85,
    duration: '60 min',
    description: 'Develop elite outfield skills including tracking, routes, and arm strength.',
    features: ['Route Efficiency', 'Wall Work', 'Crow Hop Technique'],
    color: 'from-green-500 to-green-600',
    popular: false
  },
  {
    icon: Activity,
    title: '1 Hour Throwing Lesson',
    price: 85,
    duration: '60 min',
    description: 'Build arm strength and accuracy with proper throwing mechanics.',
    features: ['Mechanics Analysis', 'Velocity Training', 'Accuracy Drills'],
    color: 'from-purple-500 to-purple-600',
    popular: false
  },
  {
    icon: Users,
    title: '1 Hour Base Running',
    price: 85,
    duration: '60 min',
    description: 'Gain competitive edge with elite base running and stealing techniques.',
    features: ['First Step Quickness', 'Sliding Technique', 'Base Stealing'],
    color: 'from-indigo-500 to-indigo-600',
    popular: false
  },
  {
    icon: Dumbbell,
    title: '1 Hour Strength Training',
    price: 85,
    duration: '60 min',
    description: 'Baseball-specific strength and conditioning for peak performance.',
    features: ['Core Power', 'Rotational Strength', 'Injury Prevention'],
    color: 'from-pink-500 to-pink-600',
    popular: false
  },
  {
    icon: Zap,
    title: '1 Hour Speed & Agility',
    price: 85,
    duration: '60 min',
    description: 'Explosive speed development and agility training for game situations.',
    features: ['Sprint Mechanics', 'Lateral Quickness', 'Reaction Training'],
    color: 'from-yellow-500 to-orange-500',
    popular: false
  },
  {
    icon: Laptop,
    title: 'Virtual Training',
    price: 85,
    duration: '60 min',
    description: 'Professional remote coaching with video analysis and personalized programs.',
    features: ['Video Analysis', 'Custom Programs', 'Weekly Check-ins'],
    color: 'from-cyan-500 to-blue-500',
    popular: false
  }
];

export default function ServicesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Elite Training <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700">Programs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive training programs designed to elevate every aspect of your game
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-8">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-6`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title & Price */}
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-3xl font-bold text-gray-900">
                      <DollarSign className="w-6 h-6 text-gray-400" />
                      {service.price}
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      {service.duration}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <ChevronRight className="w-4 h-4 text-red-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href={`/booking?service=${encodeURIComponent(service.title)}&price=${service.price}`}
                    className={`w-full inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-xl bg-gradient-to-r ${service.color} transition-all duration-300 hover:shadow-lg hover:scale-105 group`}
                  >
                    Book Session
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            Not sure which program is right for you?
          </p>
          <Link
            href="https://wa.me/14075190984?text=Hi%20Coach%20Larry,%20I%20need%20help%20choosing%20the%20right%20training%20program."
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Chat with Coach Larry
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}