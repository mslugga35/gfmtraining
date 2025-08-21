'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Target, Zap, Shield, Wind, Activity, Users, 
  Dumbbell, Laptop, ChevronRight, Clock, DollarSign,
  Flame, Award, TrendingUp
} from 'lucide-react';

const services = [
  {
    icon: Target,
    title: '1 HOUR HITTING LESSON',
    price: 85,
    duration: '60 MIN',
    description: 'Perfect your swing mechanics and timing with personalized hitting instruction.',
    features: ['Swing Analysis', 'Video Review', 'Personalized Drills'],
    gradient: 'from-red-600 to-orange-600',
    shadow: 'shadow-red-600/50',
    popular: false
  },
  {
    icon: Zap,
    title: '90 MIN HITTING & BAT SPEED',
    price: 120,
    duration: '90 MIN',
    description: 'Advanced hitting technique combined with explosive bat speed training.',
    features: ['Power Development', 'Exit Velocity Training', 'Launch Angle Optimization'],
    gradient: 'from-orange-500 to-yellow-500',
    shadow: 'shadow-orange-500/50',
    popular: true
  },
  {
    icon: Shield,
    title: '1 HOUR INFIELD FIELDING',
    price: 85,
    duration: '60 MIN',
    description: 'Master defensive fundamentals and positioning for infield excellence.',
    features: ['Footwork Drills', 'Glove Work', 'Double Play Mechanics'],
    gradient: 'from-blue-600 to-cyan-600',
    shadow: 'shadow-blue-600/50',
    popular: false
  },
  {
    icon: Wind,
    title: '1 HOUR OUTFIELD DEFENSE',
    price: 85,
    duration: '60 MIN',
    description: 'Develop elite outfield skills including tracking, routes, and arm strength.',
    features: ['Route Efficiency', 'Wall Work', 'Crow Hop Technique'],
    gradient: 'from-green-600 to-emerald-600',
    shadow: 'shadow-green-600/50',
    popular: false
  },
  {
    icon: Activity,
    title: '1 HOUR THROWING LESSON',
    price: 85,
    duration: '60 MIN',
    description: 'Build arm strength and accuracy with proper throwing mechanics.',
    features: ['Mechanics Analysis', 'Velocity Training', 'Accuracy Drills'],
    gradient: 'from-purple-600 to-pink-600',
    shadow: 'shadow-purple-600/50',
    popular: false
  },
  {
    icon: Users,
    title: '1 HOUR BASE RUNNING',
    price: 85,
    duration: '60 MIN',
    description: 'Gain competitive edge with elite base running and stealing techniques.',
    features: ['First Step Quickness', 'Sliding Technique', 'Base Stealing'],
    gradient: 'from-indigo-600 to-purple-600',
    shadow: 'shadow-indigo-600/50',
    popular: false
  },
  {
    icon: Dumbbell,
    title: '1 HOUR STRENGTH TRAINING',
    price: 85,
    duration: '60 MIN',
    description: 'Baseball-specific strength and conditioning for peak performance.',
    features: ['Core Power', 'Rotational Strength', 'Injury Prevention'],
    gradient: 'from-pink-600 to-red-600',
    shadow: 'shadow-pink-600/50',
    popular: false
  },
  {
    icon: Flame,
    title: '1 HOUR SPEED & AGILITY',
    price: 85,
    duration: '60 MIN',
    description: 'Explosive speed development and agility training for game situations.',
    features: ['Sprint Mechanics', 'Lateral Quickness', 'Reaction Training'],
    gradient: 'from-yellow-500 to-red-500',
    shadow: 'shadow-yellow-500/50',
    popular: false
  },
  {
    icon: Laptop,
    title: 'VIRTUAL TRAINING',
    price: 85,
    duration: '60 MIN',
    description: 'Professional remote coaching with video analysis and personalized programs.',
    features: ['Video Analysis', 'Custom Programs', 'Weekly Check-ins'],
    gradient: 'from-cyan-600 to-blue-600',
    shadow: 'shadow-cyan-600/50',
    popular: false
  }
];

export default function ServicesSectionV2() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(220,38,38,.1) 35px, rgba(220,38,38,.1) 70px)`
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with Logo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <Image
              src="/gfm_logo.webp"
              alt="GFM Training"
              width={80}
              height={80}
              className="opacity-80"
            />
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            ELITE TRAINING <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">PROGRAMS</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Professional coaching designed to transform your game and unlock your full potential
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Award className="w-6 h-6 text-yellow-500" />
            <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">
              Proven Results • Professional Methods • Personal Excellence
            </span>
            <Award className="w-6 h-6 text-yellow-500" />
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500 ${service.shadow}`} />
              
              <div className="relative h-full bg-white rounded-3xl border-2 border-gray-100 overflow-hidden transition-all duration-500 hover:border-transparent hover:shadow-2xl hover:-translate-y-2 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50">
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-black px-6 py-2 rounded-bl-2xl shadow-lg">
                      <Flame className="w-4 h-4 inline mr-1" />
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-8">
                  {/* Icon */}
                  <motion.div 
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.gradient} mb-6 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <service.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-black mb-4 text-gray-900">{service.title}</h3>

                  {/* Price & Duration */}
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-1">
                      <span className="text-4xl font-black bg-gradient-to-r from-red-600 to-orange-600 text-transparent bg-clip-text">${service.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-5 h-5 text-red-500" />
                      <span className="font-bold">{service.duration}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-6 font-medium leading-relaxed">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${service.gradient} flex items-center justify-center flex-shrink-0`}>
                          <ChevronRight className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href={`/booking?service=${encodeURIComponent(service.title)}&price=${service.price}`}
                    className={`w-full inline-flex items-center justify-center px-6 py-4 text-white font-black rounded-2xl bg-gradient-to-r ${service.gradient} transition-all duration-300 hover:shadow-xl hover:scale-105 group uppercase tracking-wider text-sm`}
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    BOOK NOW
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
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
          className="text-center mt-20"
        >
          <div className="inline-flex flex-col items-center p-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl border-2 border-red-200">
            <h3 className="text-2xl font-black mb-4 text-gray-900">READY TO DOMINATE?</h3>
            <p className="text-lg text-gray-700 mb-6 font-medium">
              Join the elite athletes training with Coach Larry
            </p>
            <div className="flex gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-black rounded-full hover:shadow-2xl hover:scale-110 transition-all duration-300 uppercase tracking-wider"
              >
                <Flame className="w-6 h-6" />
                START TODAY
              </Link>
              <Link
                href="https://wa.me/14075190984"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-black rounded-full hover:shadow-2xl hover:scale-110 transition-all duration-300 uppercase tracking-wider"
              >
                <MessageCircle className="w-6 h-6" />
                CHAT NOW
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Add MessageCircle import
import { MessageCircle } from 'lucide-react';