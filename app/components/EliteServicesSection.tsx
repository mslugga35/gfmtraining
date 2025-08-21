'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface Service {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  duration: string;
  features: string[];
  icon: string;
  gradient: string;
  image: string;
  popular?: boolean;
}

const EliteServicesSection = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  const services: Service[] = [
    {
      id: 'individual',
      title: 'Elite Individual',
      subtitle: 'One-on-One Mastery',
      price: '$150',
      duration: '60 min',
      features: [
        'Personalized training plan',
        'Advanced technique analysis',
        'Mental conditioning',
        'Performance tracking',
        'Video breakdown sessions'
      ],
      icon: '👑',
      gradient: 'from-electric-red to-electric-orange',
      image: '/1.webp',
      popular: true
    },
    {
      id: 'small-group',
      title: 'Elite Squad',
      subtitle: 'Small Group Excellence',
      price: '$75',
      duration: '90 min',
      features: [
        'Max 4 players per session',
        'Team dynamics training',
        'Competitive drills',
        'Position-specific work',
        'Progress tracking'
      ],
      icon: '⚡',
      gradient: 'from-electric-orange to-gold',
      image: '/2.webp'
    },
    {
      id: 'academy',
      title: 'Elite Academy',
      subtitle: 'Complete Development',
      price: '$200',
      duration: 'Monthly',
      features: [
        'Unlimited training access',
        'Mental performance coaching',
        'Nutrition consulting',
        '24/7 facility access',
        'Tournament preparation'
      ],
      icon: '🔥',
      gradient: 'from-gold to-electric-red',
      image: '/3.webp'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.service-card');
      cards.forEach((card) => observer.observe(card));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-4 relative overflow-hidden">
      {/* Section Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-red/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-orange/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-0.5 bg-fire-gradient" />
            <span className="text-electric-orange font-bold uppercase tracking-wider text-sm">
              ELITE TRAINING PROGRAMS
            </span>
            <div className="w-12 h-0.5 bg-fire-gradient" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            <span className="block">FORGE YOUR</span>
            <span className="block text-electric">LEGACY</span>
          </h2>
          
          <p className="text-xl md:text-2xl max-w-4xl mx-auto text-platinum/90 leading-relaxed">
            Experience training programs designed for <span className="text-electric font-bold">CHAMPIONS</span>. 
            Each session is crafted to push your limits and unlock your full potential.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-index={index}
              className={`service-card card-3d group relative transition-all duration-1000 ease-out ${
                visibleCards.has(index) 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-20'
              }`}
              style={{
                transitionDelay: `${index * 200}ms`,
              }}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-fire-gradient px-6 py-2 rounded-full text-sm font-bold text-black uppercase tracking-wider">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className="relative h-full">
                {/* Service Image */}
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-fire-gradient rounded-full flex items-center justify-center text-black text-xl font-bold">
                    {service.icon}
                  </div>
                </div>

                {/* Service Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2 group-hover:text-electric transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-platinum/80 font-medium">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-electric">
                      {service.price}
                    </span>
                    <span className="text-platinum/60 font-medium">
                      / {service.duration}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex}
                        className="flex items-center gap-3 text-platinum/90"
                      >
                        <div className="w-2 h-2 bg-electric-red rounded-full flex-shrink-0" />
                        <span className="text-sm font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="pt-6">
                    <button className="btn btn-electric w-full group-hover:btn-neon transition-all duration-300">
                      START TRAINING
                    </button>
                  </div>
                </div>

                {/* Card Hover Effects */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Electric Border Animation */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-electric-red transition-all duration-500" />
                  
                  {/* Floating Particles on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-electric-red rounded-full"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          animation: `electricSpark 2s ease-in-out infinite`,
                          animationDelay: `${Math.random() * 2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-24 text-center">
          <div className="glass-card p-12 rounded-3xl border border-electric-red/30">
            <h3 className="text-3xl md:text-4xl font-black mb-6">
              Ready to <span className="text-electric">DOMINATE</span>?
            </h3>
            <p className="text-xl text-platinum/90 mb-8 max-w-2xl mx-auto">
              Join the elite athletes who trust GFM Training to take their game to the next level.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-gold px-8 py-4 text-lg">
                SCHEDULE CONSULTATION
              </button>
              <button className="btn btn-ghost px-8 py-4 text-lg">
                VIEW ALL PROGRAMS
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EliteServicesSection;