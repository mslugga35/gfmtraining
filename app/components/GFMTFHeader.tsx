'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Twitter, Facebook, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GFMTFHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for backdrop blur and shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll behavior
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    document.documentElement.style.scrollBehavior = 'smooth';
  };

  return (
    <motion.header 
      className={`nav fixed top-0 w-full z-50 transition-all duration-500 ease-out h-24 ${
        isScrolled 
          ? 'bg-white shadow-lg border-b border-gray-200' 
          : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="nav-container h-24 flex items-center justify-between px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Enhanced Athletic Logo */}
        <motion.div
          whileHover={{ scale: 1.08, y: -1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative"
        >
          <Link 
            href="/" 
            className="flex items-center group"
            onClick={handleLinkClick}
          >
            <Image
              src="/gfm_logo_transparent.png"
              alt="GFM Training Academy"
              width={180}
              height={60}
              className="h-16 w-auto"
              priority
            />
          </Link>
        </motion.div>

        {/* Enhanced Desktop Athletic Navigation */}
        <nav className="hidden lg:flex items-center gap-12 xl:gap-16">
          {[
            { href: '/', label: 'Home' },
            { href: '/services', label: 'Services' },
            { href: '/gallery', label: 'Gallery' },
            { href: '/academy', label: 'Academy' },
            { href: '/contact', label: 'Contact' }
          ].map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ y: -3, scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative"
            >
              <Link 
                href={link.href} 
                className="nav-link text-gray-700 hover:text-black font-semibold text-sm xl:text-base uppercase tracking-wide relative group transition-all duration-300 py-2 px-1"
                onClick={handleLinkClick}
              >
                {link.label}
                {/* Enhanced underline animation */}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 via-red-500 to-red-400 transition-all duration-400 group-hover:w-full rounded-full"></span>
                {/* Subtle glow effect */}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-red-500/50 blur-sm transition-all duration-400 group-hover:w-full rounded-full"></span>
                {/* Text glow on hover */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]">
                  {link.label}
                </span>
              </Link>
            </motion.div>
          ))}
          
          {/* Enhanced Social Media Icons */}
          <div className="flex items-center gap-4 ml-4 xl:ml-6">
            {[
              { icon: Instagram, href: '#', label: 'Instagram' },
              { icon: Twitter, href: '#', label: 'Twitter' },
              { icon: Facebook, href: '#', label: 'Facebook' }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="text-gray-400 hover:text-red-500 transition-colors duration-300 p-2"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
          
          {/* Player Portal Button */}
          <motion.div
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <Link 
              href="/sign-up" 
              className="relative overflow-hidden bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-500 hover:via-green-400 hover:to-green-500 text-white font-bold text-sm xl:text-base uppercase tracking-wide px-6 py-4 rounded-lg transition-all duration-300 shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-500/40 border border-green-500/20 flex items-center gap-2"
              onClick={handleLinkClick}
            >
              <UserCircle className="h-5 w-5" />
              <span className="relative z-10">Player Portal</span>
            </Link>
          </motion.div>

          {/* Enhanced Premium Book Now Button */}
          <motion.div
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <Link 
              href="/booking" 
              className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:via-red-400 hover:to-red-500 text-white font-bold text-sm xl:text-base uppercase tracking-wide px-8 py-4 rounded-lg transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-500/40 border border-red-500/20"
              onClick={handleLinkClick}
            >
              <span className="relative z-10">Book Training</span>
              {/* Animated background shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></span>
              {/* Pulsing glow */}
              <span className="absolute inset-0 bg-red-500/20 rounded-lg blur-xl animate-pulse"></span>
            </Link>
          </motion.div>
        </nav>

        {/* Enhanced Mobile Menu Button */}
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-black hover:text-red-500 transition-all duration-300 relative z-50 p-3 rounded-lg bg-gray-100 border border-gray-200 hover:bg-red-50 hover:border-red-300"
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: 0, scale: 0.8 }}
                animate={{ rotate: 180, scale: 1 }}
                exit={{ rotate: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <X size={32} strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 180, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 180, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Menu size={32} strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Enhanced Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Mobile Menu Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Mobile Menu Content */}
            <motion.nav
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed inset-0 top-24 lg:hidden bg-gradient-to-br from-black via-gray-900 to-black backdrop-blur-2xl z-50 overflow-y-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(17,17,17,0.95) 50%, rgba(0,0,0,0.98) 100%)'
              }}
            >
              <div className="container px-6 py-12 min-h-full flex flex-col">
                <div className="flex flex-col gap-8 flex-1">
                  {[
                    { href: '/', label: 'Home', icon: '🏠' },
                    { href: '/services', label: 'Services', icon: '💪' },
                    { href: '/gallery', label: 'Gallery', icon: '📸' },
                    { href: '/academy', label: 'Academy', icon: '🎯' },
                    { href: '/contact', label: 'Contact', icon: '📞' }
                  ].map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -50, rotateX: 45 }}
                      animate={{ opacity: 1, x: 0, rotateX: 0 }}
                      transition={{ 
                        delay: index * 0.1 + 0.2, 
                        duration: 0.5, 
                        ease: "easeOut" 
                      }}
                      className="relative"
                    >
                      <Link 
                        href={link.href} 
                        className="group flex items-center gap-4 text-white hover:text-red-500 text-2xl font-bold uppercase tracking-wider py-4 px-6 rounded-xl bg-white/5 hover:bg-red-600/20 backdrop-blur-sm border border-white/10 hover:border-red-500/30 transition-all duration-300"
                        onClick={handleLinkClick}
                      >
                        <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                          {link.icon}
                        </span>
                        <span className="relative">
                          {link.label}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                        <motion.span
                          className="ml-auto text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ x: 5 }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Mobile Social Media */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="flex justify-center gap-6 mt-8"
                  >
                    {[
                      { icon: Instagram, href: '#', label: 'Instagram' },
                      { icon: Twitter, href: '#', label: 'Twitter' },
                      { icon: Facebook, href: '#', label: 'Facebook' }
                    ].map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        whileHover={{ scale: 1.3, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-300 p-4 rounded-full bg-white/5 border border-white/10 hover:border-red-500/30"
                        aria-label={social.label}
                      >
                        <social.icon size={28} />
                      </motion.a>
                    ))}
                  </motion.div>
                  
                  {/* Premium Mobile CTAs */}
                  <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.1, duration: 0.6, ease: "easeOut" }}
                    className="mt-auto pt-8 space-y-4"
                  >
                    {/* Player Portal Button */}
                    <Link 
                      href="/sign-up" 
                      className="group relative w-full bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-500 hover:via-green-400 hover:to-green-500 text-white font-bold text-xl uppercase tracking-wide px-8 py-6 rounded-xl transition-all duration-300 shadow-2xl shadow-green-600/40 hover:shadow-green-500/60 border border-green-500/30 overflow-hidden flex items-center justify-center gap-3"
                      onClick={handleLinkClick}
                    >
                      <UserCircle className="h-6 w-6 flex-shrink-0" />
                      <span className="relative z-10">Player Portal</span>
                      <motion.span 
                        className="relative z-10 group-hover:translate-x-2 transition-transform duration-300"
                        initial={{ x: 0 }}
                        whileHover={{ x: 8 }}
                      >
                        →
                      </motion.span>
                    </Link>

                    {/* Book Training Button */}
                    <Link 
                      href="/booking" 
                      className="group relative w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:via-red-400 hover:to-red-500 text-white font-bold text-xl uppercase tracking-wide px-8 py-6 rounded-xl transition-all duration-300 shadow-2xl shadow-red-600/40 hover:shadow-red-500/60 border border-red-500/30 overflow-hidden flex items-center justify-center gap-3"
                      onClick={handleLinkClick}
                    >
                      <span className="relative z-10">Book Training Session</span>
                      <motion.span 
                        className="relative z-10 group-hover:translate-x-2 transition-transform duration-300"
                        initial={{ x: 0 }}
                        whileHover={{ x: 8 }}
                      >
                        →
                      </motion.span>
                      {/* Animated shine effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}