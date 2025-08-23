'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function VeloHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl font-black tracking-tight">GFM</span>
            <span className="text-sm font-bold text-[#DC2626] uppercase tracking-wider">
              Training Academy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="font-semibold hover:text-[#DC2626] transition-colors">
              Home
            </Link>
            <Link href="/services" className="font-semibold hover:text-[#DC2626] transition-colors">
              Services
            </Link>
            <Link href="/daytime-program" className="font-semibold hover:text-[#DC2626] transition-colors">
              Daytime Program
            </Link>
            <Link href="/gallery" className="font-semibold hover:text-[#DC2626] transition-colors">
              Gallery
            </Link>
            <Link href="/blog" className="font-semibold hover:text-[#DC2626] transition-colors">
              Blog
            </Link>
            <Link href="/info" className="font-semibold hover:text-[#DC2626] transition-colors">
              Info
            </Link>
            <Link href="/contact" className="font-semibold hover:text-[#DC2626] transition-colors">
              Contact
            </Link>
            <Link 
              href="/booking" 
              className="px-6 py-2.5 bg-[#DC2626] text-white font-bold rounded-lg hover:bg-black transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Book Session
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-black"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden py-6 border-t">
            <div className="flex flex-col gap-4">
              <Link href="/" className="font-semibold hover:text-[#DC2626] transition-colors">
                Home
              </Link>
              <Link href="/services" className="font-semibold hover:text-[#DC2626] transition-colors">
                Services
              </Link>
              <Link href="/daytime-program" className="font-semibold hover:text-[#DC2626] transition-colors">
                Daytime Program
              </Link>
              <Link href="/gallery" className="font-semibold hover:text-[#DC2626] transition-colors">
                Gallery
              </Link>
              <Link href="/blog" className="font-semibold hover:text-[#DC2626] transition-colors">
                Blog
              </Link>
              <Link href="/info" className="font-semibold hover:text-[#DC2626] transition-colors">
                Info
              </Link>
              <Link href="/contact" className="font-semibold hover:text-[#DC2626] transition-colors">
                Contact
              </Link>
              <Link 
                href="/booking" 
                className="inline-block px-6 py-2.5 bg-[#DC2626] text-white font-bold rounded-lg hover:bg-black transition-all text-center"
              >
                Book Session
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}