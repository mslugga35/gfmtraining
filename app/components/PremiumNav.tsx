'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' }
];

export default function PremiumNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
            : 'bg-transparent'
          }
        `}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <Image
                  src="/gfm_logo.webp"
                  alt="GFM Training Academy"
                  width={140}
                  height={70}
                  className={`transition-all duration-300 ${
                    isScrolled ? 'drop-shadow-md' : 'drop-shadow-xl'
                  }`}
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Nav Links */}
              <div className="flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative group px-4 py-2"
                  >
                    <span className={`
                      font-bold text-sm uppercase tracking-wider transition-colors duration-300
                      ${pathname === item.href 
                        ? 'text-red-600' 
                        : isScrolled 
                          ? 'text-gray-900 hover:text-red-600' 
                          : 'text-white hover:text-red-400'
                      }
                    `}>
                      {item.name}
                    </span>
                    
                    {/* Active/Hover Indicator */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: pathname === item.href ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center gap-3">
                <Link
                  href="tel:407-519-0984"
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all duration-300
                    ${isScrolled 
                      ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                    }
                  `}
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">407-519-0984</span>
                </Link>

                <Link
                  href="/booking"
                  className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="text-sm uppercase tracking-wider">Book Now</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`
                lg:hidden p-2 rounded-lg transition-colors duration-300
                ${isScrolled 
                  ? 'text-gray-900 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
                }
              `}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white lg:hidden"
          >
            <div className="flex flex-col h-full pt-24 pb-6 px-6">
              {/* Mobile Nav Links */}
              <div className="flex-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        block py-3 text-xl font-bold transition-colors duration-300
                        ${pathname === item.href 
                          ? 'text-red-600' 
                          : 'text-gray-900 hover:text-red-600'
                        }
                      `}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4 pt-6 border-t border-gray-200"
              >
                <Link
                  href="/booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-300"
                >
                  Book Training Session
                  <ChevronRight className="w-5 h-5" />
                </Link>

                <div className="flex gap-3">
                  <Link
                    href="tel:407-519-0984"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-900 font-bold rounded-lg hover:bg-gray-200 transition-all duration-300"
                  >
                    <Phone className="w-5 h-5" />
                    Call
                  </Link>
                  <Link
                    href="https://wa.me/14075190984"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}