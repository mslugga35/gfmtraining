'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { Menu, X, Phone } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/academy', label: 'Academy' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Clean Minimalist Navigation */}
      <nav className="nav">
        <div className="nav-container">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4">
            <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-200">
              <Image 
                src="/gfm_logo.webp" 
                alt="GFM Training Academy" 
                width={60} 
                height={60} 
                className="nav-logo-compact"
              />
            </div>
            <span className="text-xl font-semibold text-gray-800 hidden sm:block">
              GFM Training Academy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-menu hidden md:flex">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link 
                  href={href}
                  className={`nav-link ${isActive(href) ? 'active' : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Phone Number & Mobile Menu */}
          <div className="flex items-center gap-4">
            <a 
              href="tel:407-519-0984" 
              className="hidden sm:flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">407-519-0984</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="container py-4">
              <ul className="space-y-4">
                {navItems.map(({ href, label }) => (
                  <li key={href}>
                    <Link 
                      href={href}
                      className={`block py-2 text-gray-700 hover:text-gray-900 transition-colors ${
                        isActive(href) ? 'text-gray-900 font-medium' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
                <li className="pt-4 border-t border-gray-200">
                  <a 
                    href="tel:407-519-0984" 
                    className="flex items-center gap-2 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="font-medium">407-519-0984</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;