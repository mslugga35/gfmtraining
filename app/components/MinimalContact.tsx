'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function MinimalContact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-6xl font-black text-black mb-8">
            START YOUR JOURNEY
          </h2>
          
          <p className="text-xl text-gray-700 mb-12">
            Ready to take your game to the next level? Contact Coach Larry Grayson today.
          </p>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-center"
            >
              <Phone className="w-12 h-12 mx-auto mb-4 text-red-600" />
              <h3 className="font-bold text-lg mb-2">Call Us</h3>
              <Link 
                href="tel:407-519-0984"
                className="text-2xl font-black text-black hover:text-red-600 transition-colors"
              >
                407-519-0984
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <Mail className="w-12 h-12 mx-auto mb-4 text-red-600" />
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <Link 
                href="mailto:Larrygrayson@gfmtf.com"
                className="text-lg text-black hover:text-red-600 transition-colors break-all"
              >
                Larrygrayson@gfmtf.com
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <MapPin className="w-12 h-12 mx-auto mb-4 text-red-600" />
              <h3 className="font-bold text-lg mb-2">Locations</h3>
              <p className="text-lg text-black">
                Central Florida<br />
                South Atlanta, GA
              </p>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-12 py-5 bg-red-600 text-white font-bold text-lg rounded-full hover:bg-red-700 transition-all duration-300"
            >
              Book Your Session
            </Link>
            
            <Link
              href="https://wa.me/14075190984?text=Hi%20Coach%20Larry,%20I'm%20interested%20in%20training%20sessions."
              className="inline-flex items-center justify-center px-12 py-5 bg-green-600 text-white font-bold text-lg rounded-full hover:bg-green-700 transition-all duration-300"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              WhatsApp
            </Link>
          </motion.div>

          {/* Mission Reminder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-20 pt-20 border-t border-gray-200"
          >
            <p className="text-2xl font-bold text-gray-700">
              Our mission is to help every player reach their full potential
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}