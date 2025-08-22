'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function EliteContact() {
  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="block">GET IN</span>
                <span className="block bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  TOUCH
                </span>
              </h2>
              <p className="text-xl text-gray-300">
                Take the first step towards reaching your full potential. 
                Contact Coach Larry Grayson today to begin your transformation.
              </p>
            </div>

            {/* Coach Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black text-2xl">LG</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Coach Larry Grayson</h3>
                  <p className="text-gray-400 mb-4">
                    Professional Baseball Coach & Performance Specialist
                  </p>
                  <div className="space-y-3">
                    <a 
                      href="tel:407-519-0984"
                      className="flex items-center gap-3 text-white hover:text-red-400 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center group-hover:bg-red-600/30 transition-colors">
                        <Phone className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Primary</div>
                        <div className="font-bold">(407) 519-0984</div>
                      </div>
                    </a>
                    
                    <a 
                      href="tel:407-419-2087"
                      className="flex items-center gap-3 text-white hover:text-red-400 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center group-hover:bg-red-600/30 transition-colors">
                        <Phone className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Secondary</div>
                        <div className="font-bold">(407) 419-2087</div>
                      </div>
                    </a>
                    
                    <a 
                      href="mailto:Larrygrayson@gfmtf.com"
                      className="flex items-center gap-3 text-white hover:text-red-400 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center group-hover:bg-red-600/30 transition-colors">
                        <Mail className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Email</div>
                        <div className="font-bold">Larrygrayson@gfmtf.com</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <MapPin className="w-5 h-5 text-red-400 mb-2" />
                <h4 className="font-bold mb-1">Location</h4>
                <p className="text-sm text-gray-400">Central Florida Area</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <Clock className="w-5 h-5 text-red-400 mb-2" />
                <h4 className="font-bold mb-1">Hours</h4>
                <p className="text-sm text-gray-400">Mon-Sun: Flexible</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <MessageCircle className="w-5 h-5 text-red-400 mb-2" />
                <h4 className="font-bold mb-1">Response Time</h4>
                <p className="text-sm text-gray-400">Within 24 hours</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <Calendar className="w-5 h-5 text-red-400 mb-2" />
                <h4 className="font-bold mb-1">Booking</h4>
                <p className="text-sm text-gray-400">Online or Phone</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="/booking"
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 rounded-xl font-bold hover:scale-105 transition-transform"
              >
                Book Online
              </a>
              <a 
                href="tel:407-519-0984"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl font-bold hover:bg-white/20 transition-colors border border-white/20"
              >
                Call Now
              </a>
            </div>
          </motion.div>

          {/* Right Content - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
                    placeholder="(407) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Service Interested In
                  </label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 text-white">
                    <option value="">Select a service</option>
                    <option value="hitting">Hitting Mechanics</option>
                    <option value="mental">Mental Performance</option>
                    <option value="travel">Travel Ball Prep</option>
                    <option value="team">Team Training</option>
                    <option value="speed">Speed & Agility</option>
                    <option value="analytics">Performance Analytics</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400 resize-none"
                    placeholder="Tell us about your goals..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}