'use client';

import { Target, Brain, Trophy, Users, Zap, TrendingUp } from 'lucide-react';

const services = [
  {
    icon: Target,
    title: "Hitting Mechanics",
    description: "Advanced biomechanical analysis for maximum power",
    price: "$75/session"
  },
  {
    icon: Brain,
    title: "Mental Performance",
    description: "Elite mental conditioning and approach training",
    price: "$60/session"
  },
  {
    icon: Trophy,
    title: "Travel Ball Prep",
    description: "Competition-ready training for serious players",
    price: "$80/session"
  },
  {
    icon: Users,
    title: "Team Training",
    description: "Group sessions for teams and organizations",
    price: "Custom Quote"
  },
  {
    icon: Zap,
    title: "Speed & Agility",
    description: "Sport-specific athletic performance training",
    price: "$65/session"
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description: "Data-driven progress tracking and optimization",
    price: "Included"
  }
];

export default function ModernServices() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black mb-4">
            <span className="text-black">TRAINING</span>{' '}
            <span className="text-red-600">PROGRAMS</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional coaching programs designed to elevate your game to the next level
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service.title}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <service.icon className="w-7 h-7 text-red-600" />
              </div>
              
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="text-2xl font-bold text-red-600">{service.price}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="/booking"
            className="inline-block px-10 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
          >
            Schedule Your First Session
          </a>
        </div>
      </div>
    </section>
  );
}