'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { User, Phone, Mail, MessageSquare, Calendar, Clock, CheckCircle } from 'lucide-react';

export default function ProfessionalBooking() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const services = [
    'Hitting Mechanics - $75',
    'Mental Performance - $60',
    'Travel Ball Prep - $80',
    'Team Training - Custom',
    'Speed & Agility - $65',
    'Daytime Program - Special Rates'
  ];

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            BOOK YOUR <span className="text-[#DC2626]">SESSION</span>
          </h2>
          <p className="text-xl text-gray-600">
            Fill out the form below and we'll get you scheduled within 24 hours
          </p>
        </motion.div>

        {/* Booking Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-lg"
        >
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="relative">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-2" />
                Athlete / Parent Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#DC2626] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 transition-all"
                placeholder="Enter full name"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Phone className="inline w-4 h-4 mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#DC2626] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 transition-all"
                placeholder="(407) 555-0123"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              <Mail className="inline w-4 h-4 mr-2" />
              Email Address (Optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#DC2626] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 transition-all"
              placeholder="athlete@example.com"
            />
          </div>

          {/* Service Selection */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <CheckCircle className="inline w-4 h-4 mr-2" />
                Select Service
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#DC2626] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 transition-all appearance-none bg-white"
              >
                <option value="">Choose a program...</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-2" />
                Preferred Date
              </label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#DC2626] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 transition-all"
              />
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              <Clock className="inline w-4 h-4 mr-2" />
              Preferred Time
            </label>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {timeSlots.map(time => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, preferredTime: time }))}
                  className={`py-2 px-3 rounded-lg font-semibold transition-all ${
                    formData.preferredTime === time
                      ? 'bg-[#DC2626] text-white'
                      : 'bg-white border-2 border-gray-300 hover:border-[#DC2626] hover:text-[#DC2626]'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              <MessageSquare className="inline w-4 h-4 mr-2" />
              Additional Information
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#DC2626] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 transition-all resize-none"
              placeholder="Tell us about your goals, current level, or any specific needs (Private, Group, Daytime Program, etc.)"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#DC2626] text-white font-bold text-lg py-4 rounded-xl hover:bg-black transition-all duration-300 shadow-lg"
          >
            Schedule Your First Session
          </motion.button>

          {/* Alternative Contact Methods */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600 mb-4">Or contact us directly:</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a 
                href="tel:407-519-0984"
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl hover:border-[#DC2626] hover:text-[#DC2626] transition-all"
              >
                <Phone className="w-5 h-5" />
                (407) 519-0984
              </a>
              <a 
                href="https://wa.me/14075190984"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}