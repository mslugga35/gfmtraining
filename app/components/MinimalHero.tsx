'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function MinimalHero() {
  return (
    <section className="min-h-screen flex items-center bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <Image
                src="/gfm_logo.webp"
                alt="GFM Training Academy"
                width={300}
                height={300}
                className="mx-auto"
                priority
              />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl font-black text-black mb-6"
            >
              TRUST YOUR
              <span className="block text-red-600">PROCESS</span>
            </motion.h1>

            {/* Mission Statement */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-4"
            >
              At GFM Training Academy our mission is to help players of all ages reach their potential!
            </motion.p>

            {/* About Coach */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto mb-12"
            >
              Coach Larry Grayson is one of the top hitting instructors in Central Florida and South Atlanta, Georgia
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/booking"
                className="inline-flex items-center justify-center px-12 py-5 bg-black text-white font-bold text-lg rounded-full hover:bg-gray-900 transition-all duration-300 group"
              >
                Start Training
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="tel:407-519-0984"
                className="inline-flex items-center justify-center px-12 py-5 bg-white border-2 border-black text-black font-bold text-lg rounded-full hover:bg-black hover:text-white transition-all duration-300"
              >
                Call 407-519-0984
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-20 pt-20 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-black text-black mb-2">500+</div>
                  <div className="text-gray-600">Players Trained</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-black mb-2">15+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-black mb-2">All Ages</div>
                  <div className="text-gray-600">Youth to Professional</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}