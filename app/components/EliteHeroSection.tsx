'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const EliteHeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Trigger entrance animation
    setTimeout(() => setIsLoaded(true), 500);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="video-container h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay" />
        </div>
      </div>

      {/* Floating Energy Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-electric-red rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatUp ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              boxShadow: 'var(--neon-glow)',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        {/* Massive GFM Logo - THE HERO */}
        <div 
          className={`mb-12 transition-all duration-2000 ease-out ${
            isLoaded 
              ? 'opacity-100 transform translate-y-0 scale-100' 
              : 'opacity-0 transform translate-y-20 scale-90'
          }`}
          style={{
            transform: `translateY(${scrollY * 0.2}px) scale(${1 + scrollY * 0.0002})`,
          }}
        >
          <div className="logo-hero relative">
            <Image
              src="/gfm_logo.webp"
              alt="GFM Training"
              width={600}
              height={600}
              className="mx-auto filter drop-shadow-2xl"
              priority
            />
            
            {/* Electric Aura Around Logo */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-electric-red opacity-20 blur-3xl rounded-full animate-pulse" />
              <div className="absolute inset-4 bg-electric-orange opacity-15 blur-2xl rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute inset-8 bg-gold opacity-10 blur-xl rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>

        {/* Dynamic Title */}
        <div 
          className={`transition-all duration-2000 ease-out delay-500 ${
            isLoaded 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-20'
          }`}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none">
            <span className="block text-electric">ELITE</span>
            <span className="block text-neon">TRAINING</span>
          </h1>
        </div>

        {/* Subtitle with Electric Effect */}
        <div 
          className={`transition-all duration-2000 ease-out delay-1000 ${
            isLoaded 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-20'
          }`}
        >
          <p className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto font-light">
            Where <span className="text-electric font-bold">CHAMPIONS</span> are forged through 
            <span className="text-neon font-bold"> ELITE TRAINING</span> and 
            <span className="text-electric font-bold"> UNBREAKABLE DEDICATION</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-2000 ease-out delay-1500 ${
            isLoaded 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-20'
          }`}
        >
          <button className="btn btn-electric px-12 py-4 text-lg">
            START YOUR JOURNEY
          </button>
          <button className="btn btn-neon px-12 py-4 text-lg">
            WATCH HIGHLIGHTS
          </button>
        </div>

        {/* Floating Stats */}
        <div 
          className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-2000 ease-out delay-2000 ${
            isLoaded 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-20'
          }`}
        >
          {[
            { number: '500+', label: 'Elite Athletes' },
            { number: '15+', label: 'Years Experience' },
            { number: '100+', label: 'Championships' },
            { number: '24/7', label: 'Training Access' },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="glass-card p-6 text-center"
              style={{
                animation: `floatUp 3s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <div className="counter-display mb-2">{stat.number}</div>
              <p className="text-sm uppercase tracking-wider font-medium text-platinum">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-2000 ease-out delay-2500 ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex flex-col items-center animate-bounce">
          <p className="text-sm text-platinum mb-2 uppercase tracking-wider">SCROLL TO EXPLORE</p>
          <div className="w-6 h-10 border-2 border-electric-red rounded-full relative">
            <div className="w-1 h-3 bg-electric-red rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Energy Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-fire-gradient opacity-50">
        <div 
          className="h-full bg-electric-red transform origin-left"
          style={{ animation: 'energyWave 3s ease-in-out infinite' }}
        />
      </div>
    </section>
  );
};

export default EliteHeroSection;