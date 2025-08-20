'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t" style={{ backgroundColor: 'rgba(22, 22, 22, 0.9)', borderColor: 'rgb(127, 128, 128)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white rounded-lg p-3 shadow-lg">
                <Image 
                  src="/gfm_logo.webp" 
                  alt="GFM Training Academy" 
                  width={80} 
                  height={80} 
                  className="w-auto h-auto"
                />
              </div>
              <div className="text-2xl font-bold heading-font" style={{ color: '#10b981' }}>GFM Training Academy</div>
            </div>
            <p className="mb-4 max-w-md body-font" style={{ color: 'rgb(127, 128, 128)' }}>
              Gainesville Future Major Leaguers Training Facility - Premier baseball training 
              in Gainesville, Florida. Developing champions on and off the field.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/gfm_training_academy"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.youtube.com/@CoachLarryGrayson11"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 heading-font" style={{ color: 'rgb(247, 247, 247)' }}>Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/academy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Academy Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Team Store
                </Link>
              </li>
              <li>
                <Link
                  href="/calendar"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 heading-font" style={{ color: 'rgb(247, 247, 247)' }}>Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Central Florida / South Atlanta, Georgia</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm">(407) 519-0984</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm">(407) 419-2087</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">Larrygrayson@gfmtf.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="text-sm">Hours: 09:00 am – 06:00 pm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center" style={{ borderTop: '1px solid rgb(127, 128, 128)' }}>
          <div className="text-sm body-font" style={{ color: 'rgb(127, 128, 128)' }}>
            © 2024 GFM Training Academy. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;