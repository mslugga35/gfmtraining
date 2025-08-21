'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const EliteNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Academy', href: '/academy', icon: '⚡' },
    { name: 'Training', href: '/services', icon: '🔥' },
    { name: 'Gallery', href: '/gallery', icon: '📸' },
    { name: 'Shop', href: '/shop', icon: '🛒' },
    { name: 'Contact', href: '/contact', icon: '📞' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'glass-card border-b border-electric-red/30 backdrop-blur-xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section - HERO TREATMENT */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <Image
                src="/gfm_logo.webp"
                alt="GFM Training"
                width={80}
                height={80}
                className={`transition-all duration-500 ease-out logo-hero ${
                  isScrolled ? 'w-16 h-16' : 'w-20 h-20'
                } group-hover:scale-110`}
                priority
              />
              
              {/* Logo Glow Effect */}
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-electric-red blur-xl rounded-full animate-pulse" />
              </div>
            </div>
            
            {/* Brand Text */}
            <div className="ml-4 hidden sm:block">
              <h2 className="text-2xl font-black text-electric">GFM</h2>
              <p className="text-xs text-platinum uppercase tracking-wider">ELITE TRAINING</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg filter grayscale group-hover:grayscale-0 transition-all duration-300">
                    {item.icon}
                  </span>
                  <span className="text-white font-medium uppercase tracking-wide text-sm group-hover:text-electric transition-colors duration-300">
                    {item.name}
                  </span>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-fire-gradient group-hover:w-full transition-all duration-300" />
                
                {/* Electric Glow on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-electric-red/20 blur-sm rounded-lg" />
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="btn btn-electric text-sm px-6 py-3">
              BOOK SESSION
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg glass-card"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span 
                className={`block h-0.5 w-6 bg-electric-red transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`} 
              />
              <span 
                className={`block h-0.5 w-6 bg-electric-red mt-1 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`} 
              />
              <span 
                className={`block h-0.5 w-6 bg-electric-red mt-1 transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`} 
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden transition-all duration-500 ease-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 pointer-events-none'
        } overflow-hidden`}
      >
        <div className="glass-card mx-4 my-4 rounded-2xl border border-electric-red/30">
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-white/10"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-2xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
                  {item.icon}
                </span>
                <span className="text-white font-medium uppercase tracking-wide group-hover:text-electric transition-colors duration-300">
                  {item.name}
                </span>
              </Link>
            ))}
            
            {/* Mobile CTA */}
            <div className="pt-4 border-t border-white/20">
              <button 
                className="btn btn-electric w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                BOOK SESSION
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Enhancement Effects */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-fire-gradient opacity-50">
          <div className="h-full bg-electric-red transform origin-left animate-pulse" />
        </div>
      )}
    </nav>
  );
};

export default EliteNavigation;