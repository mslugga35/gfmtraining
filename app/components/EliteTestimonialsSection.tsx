'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  achievement: string;
  quote: string;
  image: string;
  rating: number;
  sport: string;
  video?: string;
}

const EliteTestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Marcus Rodriguez',
      title: 'College Baseball Star',
      achievement: 'Full Scholarship to Stanford',
      quote: 'GFM Training transformed my game completely. The elite coaching and advanced techniques took me from local player to college champion. The mental conditioning program was game-changing.',
      image: '/4.webp',
      rating: 5,
      sport: 'Baseball',
      video: '/testimonial-1.mp4'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      title: 'Professional Athlete',
      achievement: 'Draft Pick 2023',
      quote: 'The individual training at GFM pushed me beyond my limits. Every session was precisely designed to improve my weaknesses and amplify my strengths. Worth every penny.',
      image: '/5.webp',
      rating: 5,
      sport: 'Softball',
      video: '/testimonial-2.mp4'
    },
    {
      id: '3',
      name: 'Jake Thompson',
      title: 'High School MVP',
      achievement: 'State Championship Winner',
      quote: 'The academy program at GFM is incredible. From technical skills to mental toughness, they cover everything. My performance improved 200% in just 6 months.',
      image: '/6.webp',
      rating: 5,
      sport: 'Baseball',
      video: '/testimonial-3.mp4'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotation
  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [isVisible, testimonials.length]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={sectionRef} className="py-32 px-4 relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="video-container h-full">
          <video
            key={currentTestimonial.id}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={currentTestimonial.video || '/hero-video.mp4'} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/70" />
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-electric-red rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatUp ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-16 h-0.5 bg-fire-gradient" />
            <span className="text-electric-orange font-bold uppercase tracking-wider">
              CHAMPION TESTIMONIALS
            </span>
            <div className="w-16 h-0.5 bg-fire-gradient" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            <span className="block">HEAR FROM THE</span>
            <span className="block text-electric">CHAMPIONS</span>
          </h2>
        </div>

        {/* Main Testimonial Display */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Testimonial Content */}
          <div 
            className={`space-y-8 transition-all duration-1000 ease-out ${
              isVisible 
                ? 'opacity-100 transform translate-x-0' 
                : 'opacity-0 transform -translate-x-20'
            }`}
          >
            {/* Quote */}
            <div className="relative">
              <div className="text-8xl text-electric-red/20 font-black absolute -top-4 -left-4">"</div>
              <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed text-white pl-12">
                {currentTestimonial.quote}
              </blockquote>
              <div className="text-8xl text-electric-red/20 font-black absolute -bottom-8 right-0">"</div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <div 
                  key={i}
                  className="w-8 h-8 text-gold text-2xl"
                  style={{ 
                    animation: `electricSpark 0.5s ease-in-out`,
                    animationDelay: `${i * 0.1}s`
                  }}
                >
                  ⭐
                </div>
              ))}
            </div>

            {/* Author Info */}
            <div className="glass-card p-6 rounded-2xl border border-electric-red/30">
              <h4 className="text-2xl font-black text-electric mb-2">
                {currentTestimonial.name}
              </h4>
              <p className="text-lg text-platinum mb-1">
                {currentTestimonial.title}
              </p>
              <p className="text-gold font-bold">
                🏆 {currentTestimonial.achievement}
              </p>
              <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-electric-red/20 rounded-full">
                <span className="text-sm font-bold text-electric-red">
                  {currentTestimonial.sport}
                </span>
              </div>
            </div>
          </div>

          {/* Athlete Image */}
          <div 
            className={`relative transition-all duration-1000 ease-out ${
              isVisible 
                ? 'opacity-100 transform translate-x-0' 
                : 'opacity-0 transform translate-x-20'
            }`}
          >
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden group">
              <Image
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Electric Border Effect */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-electric-red rounded-3xl transition-all duration-500" />
              
              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-electric-red/20 blur-xl rounded-3xl" />
              </div>
            </div>

            {/* Floating Achievement Badge */}
            <div className="absolute -top-6 -right-6 glass-card p-4 rounded-2xl border border-gold">
              <div className="text-3xl mb-2">🏆</div>
              <p className="text-sm font-bold text-gold">CHAMPION</p>
            </div>
          </div>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center items-center gap-8 mb-16">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="btn btn-ghost p-4 w-16 h-16 rounded-full"
          >
            ←
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-electric-red shadow-electric-glow' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
            className="btn btn-ghost p-4 w-16 h-16 rounded-full"
          >
            →
          </button>
        </div>

        {/* All Testimonials Preview */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              onClick={() => setCurrentIndex(index)}
              className={`card-3d p-6 cursor-pointer transition-all duration-500 ${
                index === currentIndex 
                  ? 'border-electric-red scale-105' 
                  : 'border-white/20 hover:border-electric-red/50'
              } ${
                isVisible 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-20'
              }`}
              style={{
                transitionDelay: `${index * 200}ms`,
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-white">{testimonial.name}</h5>
                  <p className="text-sm text-platinum/70">{testimonial.sport}</p>
                </div>
              </div>
              
              <p className="text-sm text-white/80 line-clamp-3">
                {testimonial.quote}
              </p>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-gold text-sm">⭐</span>
                  ))}
                </div>
                <span className="text-xs text-electric-red font-bold">
                  {index === currentIndex ? 'ACTIVE' : 'VIEW'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <div className="glass-card p-12 rounded-3xl border border-electric-red/30">
            <h3 className="text-3xl md:text-4xl font-black mb-6">
              Ready to Write Your <span className="text-electric">SUCCESS STORY</span>?
            </h3>
            <p className="text-xl text-platinum/90 mb-8 max-w-3xl mx-auto">
              Join these champions and countless others who have transformed their careers with GFM Training.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-electric px-10 py-4 text-lg">
                START YOUR TRANSFORMATION
              </button>
              <button className="btn btn-gold px-10 py-4 text-lg">
                READ MORE STORIES
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EliteTestimonialsSection;