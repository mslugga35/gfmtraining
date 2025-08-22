'use client';

import { motion } from 'framer-motion';
import { Target, Brain, Trophy, Users, Zap, TrendingUp, Medal, Star } from 'lucide-react';

const services = [
  {
    icon: Target,
    title: "Hitting Mechanics",
    description: "Advanced biomechanical analysis and personalized technique refinement for maximum power and consistency",
    features: ["Video Analysis", "Launch Angle Optimization", "Exit Velocity Training"],
    color: "from-red-600 to-red-500"
  },
  {
    icon: Brain,
    title: "Mental Performance",
    description: "Elite-level mental conditioning and approach training to dominate at the plate",
    features: ["Visualization Training", "Pressure Situations", "Focus Enhancement"],
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Trophy,
    title: "Elite Travel Ball Prep",
    description: "Comprehensive training program designed for competitive travel ball players",
    features: ["Position-Specific Training", "Game Simulation", "Competition Mindset"],
    color: "from-blue-600 to-blue-500"
  },
  {
    icon: Users,
    title: "Team Training",
    description: "Customized team sessions to elevate your entire roster's performance",
    features: ["Group Dynamics", "Team Chemistry", "Collective Excellence"],
    color: "from-green-600 to-green-500"
  },
  {
    icon: Zap,
    title: "Speed & Agility",
    description: "Sport-specific conditioning to enhance on-field athleticism and reaction time",
    features: ["Base Running", "First Step Quickness", "Lateral Movement"],
    color: "from-purple-600 to-purple-500"
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description: "Data-driven approach to track progress and optimize training programs",
    features: ["Progress Tracking", "Stat Analysis", "Custom Reports"],
    color: "from-indigo-600 to-indigo-500"
  }
];

export default function EliteServices() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid.svg')]" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
            <Medal className="w-4 h-4 text-red-600" />
            <span className="text-sm font-bold text-red-600 uppercase tracking-wider">
              Our Programs
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              ELITE TRAINING
            </span>
            <span className="block text-red-600 mt-2">PROGRAMS</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive development programs designed by Coach Larry Grayson to transform 
            athletes into champions. Every session is tailored to your specific goals.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} mb-6`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA */}
                <a 
                  href="/booking"
                  className={`inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent group-hover:gap-3 transition-all`}
                >
                  Learn More
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-black mb-4">
                Ready to Elevate Your Game?
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Join 500+ athletes who have transformed their performance with GFM Training
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a 
                  href="/booking"
                  className="px-8 py-4 bg-white text-red-600 rounded-xl font-bold hover:bg-gray-100 transition-all"
                >
                  Schedule Your Assessment
                </a>
                <a 
                  href="tel:407-519-0984"
                  className="px-8 py-4 bg-red-700 text-white rounded-xl font-bold hover:bg-red-800 transition-all"
                >
                  Call (407) 519-0984
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}