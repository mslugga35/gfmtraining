'use client';

import MainLayout from '../components/MainLayout';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Instagram, Youtube } from 'lucide-react';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted');
  };

  return (
    <MainLayout>
      <div className="min-h-screen pt-20" style={{ backgroundColor: 'rgb(22, 22, 22)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 heading-font" style={{ color: 'rgb(247, 247, 247)' }}>
              Contact <span style={{ color: '#10b981' }}>GFM Training Academy</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto body-font" style={{ color: 'rgb(127, 128, 128)' }}>
              Ready to start your journey to baseball excellence? Get in touch with us today.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6 heading-font" style={{ color: 'rgb(247, 247, 247)' }}>Get in Touch</h2>
                <p className="mb-8 body-font" style={{ color: 'rgb(127, 128, 128)' }}>
                  Contact us to schedule a free assessment, tour our facility, or ask any questions 
                  about our training programs.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                    <Phone className="w-6 h-6" style={{ color: '#10b981' }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 heading-font" style={{ color: 'rgb(247, 247, 247)' }}>Phone</h3>
                    <p className="body-font" style={{ color: 'rgb(127, 128, 128)' }}>(407) 519-0984 (Primary)</p>
                    <p className="body-font" style={{ color: 'rgb(127, 128, 128)' }}>(407) 419-2087 (Secondary)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                    <p className="text-gray-300">Larrygrayson@gfmtf.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
                    <p className="text-gray-300">Central Florida / South Atlanta, Georgia</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Training Hours</h3>
                    <p className="text-gray-300">Mon–Sat: 9:00a – 8:00p</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/gfm_training_academy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center text-pink-400 hover:bg-pink-500/30 transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.youtube.com/@CoachLarryGrayson11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors"
                  >
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="border gfmtf-button p-8"
              style={{ 
                backgroundColor: 'rgba(22, 22, 22, 0.8)', 
                borderColor: 'rgb(127, 128, 128)',
                borderRadius: '12px'
              }}
            >
              <h2 className="text-2xl font-bold mb-6 heading-font" style={{ color: 'rgb(247, 247, 247)' }}>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2 body-font" style={{ color: 'rgb(127, 128, 128)' }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 border gfmtf-button body-font focus:outline-none"
                      style={{ 
                        backgroundColor: 'rgba(22, 22, 22, 0.8)',
                        borderColor: 'rgb(127, 128, 128)',
                        color: 'rgb(247, 247, 247)'
                      }}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 border gfmtf-button body-font focus:outline-none"
                      style={{ 
                        backgroundColor: 'rgba(22, 22, 22, 0.8)',
                        borderColor: 'rgb(127, 128, 128)',
                        color: 'rgb(247, 247, 247)'
                      }}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
                    placeholder="john.doe@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="program" className="block text-sm font-medium text-gray-300 mb-2">
                    Interested Program
                  </label>
                  <select
                    id="program"
                    name="program"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-400"
                  >
                    <option value="">Select a program</option>
                    <option value="elite-development">Elite Development</option>
                    <option value="high-school-prep">High School Prep</option>
                    <option value="elite-performance">Elite Performance</option>
                    <option value="private-lessons">Private Lessons</option>
                    <option value="assessment">Free Assessment</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
                    placeholder="Tell us about your training goals and any questions you have..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full gfmtf-button py-3 font-semibold transition-colors body-font"
                  style={{
                    backgroundColor: '#10b981',
                    color: 'rgb(247, 247, 247)',
                    border: '2px solid #10b981'
                  }}
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-400/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Start Training?
              </h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Don't wait to begin your journey to baseball excellence. 
                Schedule your free assessment today and see what makes GFM Training Academy different.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="tel:4075190984"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
                >
                  Call Now: (407) 519-0984
                </a>
                <a
                  href="mailto:Larrygrayson@gfmtf.com"
                  className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
                >
                  Send Email
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}