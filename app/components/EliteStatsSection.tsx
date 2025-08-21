'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Stat {
  id: string;
  number: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: string;
  color: string;
}

const EliteStatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState<Record<string, number>>({});
  const sectionRef = useRef<HTMLElement>(null);

  const stats: Stat[] = [
    {
      id: 'athletes',
      number: 500,
      suffix: '+',
      label: 'Elite Athletes',
      sublabel: 'Trained to Excellence',
      icon: '🏆',
      color: 'electric-red'
    },
    {
      id: 'experience',
      number: 15,
      suffix: '+',
      label: 'Years Experience',
      sublabel: 'Professional Excellence',
      icon: '⚡',
      color: 'electric-orange'
    },
    {
      id: 'championships',
      number: 100,
      suffix: '+',
      label: 'Championships',
      sublabel: 'Won by Our Athletes',
      icon: '🔥',
      color: 'gold'
    },
    {
      id: 'success',
      number: 98,
      suffix: '%',
      label: 'Success Rate',
      sublabel: 'Goal Achievement',
      icon: '💎',
      color: 'electric-blue'
    }
  ];

  // Initialize counters
  useEffect(() => {
    const initialCounters: Record<string, number> = {};
    stats.forEach(stat => {
      initialCounters[stat.id] = 0;
    });
    setCounters(initialCounters);
  }, []);

  // Intersection Observer for triggering animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            startCountAnimation();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const startCountAnimation = () => {
    stats.forEach((stat, index) => {
      // Stagger the start of each counter
      setTimeout(() => {
        animateCounter(stat.id, stat.number);
      }, index * 200);
    });
  };

  const animateCounter = (id: string, target: number) => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 FPS
    const stepDuration = duration / steps;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      
      // Use easing function for smooth animation
      const progress = step / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const value = Math.floor(target * easeOutQuart);
      
      setCounters(prev => ({
        ...prev,
        [id]: value
      }));

      if (step >= steps) {
        setCounters(prev => ({
          ...prev,
          [id]: target
        }));
        clearInterval(timer);
      }
    }, stepDuration);
  };

  return (
    <section ref={sectionRef} className="py-32 px-4 relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 -z-10">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-electric-red rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatUp ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-16 h-0.5 bg-fire-gradient" />
            <span className="text-electric-orange font-bold uppercase tracking-wider">
              CHAMPIONSHIP NUMBERS
            </span>
            <div className="w-16 h-0.5 bg-fire-gradient" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            <span className="block">PROVEN</span>
            <span className="block text-electric">EXCELLENCE</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`glass-card p-8 text-center relative group transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-20'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                animation: isVisible ? `floatUp 4s ease-in-out infinite` : 'none',
                animationDelay: `${index * 0.5}s`,
              }}
            >
              {/* Electric Border Effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-electric-red transition-all duration-500" />
              
              {/* Floating Icon */}
              <div className="text-6xl mb-4 filter grayscale group-hover:grayscale-0 transition-all duration-500">
                {stat.icon}
              </div>

              {/* Animated Counter */}
              <div className="counter-display mb-2 relative">
                <span className="text-transparent bg-fire-gradient bg-clip-text">
                  {counters[stat.id] || 0}
                </span>
                <span className="text-electric-red">
                  {stat.suffix}
                </span>
                
                {/* Counter Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-electric-red/20 blur-xl rounded-lg" />
                </div>
              </div>

              {/* Labels */}
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-electric transition-colors duration-300">
                {stat.label}
              </h3>
              <p className="text-sm text-platinum/70 uppercase tracking-wider font-medium">
                {stat.sublabel}
              </p>

              {/* Hover Spark Effects */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-electric-red rounded-full"
                    style={{
                      left: `${15 + Math.random() * 70}%`,
                      top: `${15 + Math.random() * 70}%`,
                      animation: `electricSpark 1.5s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 1}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Highlights */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'National Champions',
              description: 'Our athletes have won championships at the highest levels',
              achievement: '25+ National Titles',
              icon: '🏆'
            },
            {
              title: 'College Scholarships',
              description: 'Students earning full rides to top universities',
              achievement: '$50M+ in Scholarships',
              icon: '🎓'
            },
            {
              title: 'Professional Athletes',
              description: 'GFM trained athletes playing at pro levels',
              achievement: '15+ Pro Players',
              icon: '⚡'
            }
          ].map((achievement, index) => (
            <div
              key={index}
              className={`card-3d p-8 text-center transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-20'
              }`}
              style={{
                transitionDelay: `${(index + 4) * 150}ms`,
              }}
            >
              <div className="text-5xl mb-4">{achievement.icon}</div>
              <h4 className="text-xl font-bold text-electric mb-3">
                {achievement.title}
              </h4>
              <p className="text-platinum/80 mb-4 leading-relaxed">
                {achievement.description}
              </p>
              <div className="text-2xl font-black text-gold">
                {achievement.achievement}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <div className="inline-block glass-card p-12 rounded-3xl border border-electric-red/30">
            <h3 className="text-3xl font-black mb-6">
              Ready to Join the <span className="text-electric">ELITE</span>?
            </h3>
            <p className="text-xl text-platinum/90 mb-8 max-w-2xl">
              These numbers represent years of dedication, proven methods, and championship results.
            </p>
            <button className="btn btn-electric px-10 py-4 text-lg">
              START YOUR JOURNEY TODAY
            </button>
          </div>
        </div>
      </div>

      {/* Section Divider Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-fire-gradient opacity-60">
        <div className="h-full bg-electric-red transform origin-left animate-pulse" />
      </div>
    </section>
  );
};

export default EliteStatsSection;