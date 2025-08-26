'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Users, Target, CheckCircle, Calendar, MapPin, Trophy } from 'lucide-react';

const FloridaVirtualProgramSection = () => {
  const features = [
    {
      icon: Clock,
      title: 'Daytime Training',
      description: 'Monday - Thursday, 9 AM - 12 PM during school year',
      color: 'text-red-600'
    },
    {
      icon: BookOpen,
      title: 'Academic Flexibility',
      description: 'Compatible with virtual school and homeschool schedules',
      color: 'text-gray-600'
    },
    {
      icon: Users,
      title: 'Small Groups',
      description: 'Maximum 8 players per session for personalized attention',
      color: 'text-red-600'
    },
    {
      icon: Target,
      title: 'Skill Development',
      description: 'Focused training on hitting, pitching, and fielding fundamentals',
      color: 'text-gray-600'
    }
  ];

  const trainingFocus = [
    'Hitting mechanics and power development',
    'Pitching velocity and control',
    'Fielding fundamentals and positioning',
    'Base running and game awareness',
    'Strength and conditioning',
    'Mental performance and game strategy'
  ];

  const benefits = [
    'Accelerated skill development with consistent training',
    'Avoid crowded evening and weekend programs',
    'Perfect for homeschool and virtual school students',
    'Professional coaching during peak learning hours',
    'Smaller class sizes for individual attention',
    'College prep and showcase preparation',
    'Year-round consistency in training',
    'Academic schedule flexibility'
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-red-100 border border-red-300 rounded-lg px-6 py-3 mb-6">
            <span className="text-red-600 font-semibold text-lg">
              DAYTIME PROGRAM
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Florida Virtual & <span className="text-red-600">Homeschool Program</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Elite training designed for students with flexible academic schedules. 
            Train during optimal hours with dedicated coaching and small group attention.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Program Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-black mb-6 flex items-center">
                <Calendar className="w-6 h-6 text-red-600 mr-3" />
                Program Schedule
              </h3>
              <div className="space-y-4 mb-6">
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="font-bold text-lg text-black">Monday - Thursday</p>
                  <p className="text-2xl font-bold text-red-600">9:00 AM - 12:00 PM</p>
                  <p className="text-gray-600 mt-2">During School Year</p>
                </div>
              </div>
              
              <h4 className="font-bold text-lg mb-4 text-black">Daily Training Focus:</h4>
              <ul className="space-y-2">
                {trainingFocus.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start">
                  <div className={`${feature.color} mr-4`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-black mb-2">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-200 rounded-xl p-10 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-black mb-8 text-center">
            Program Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Join Our Daytime Program?</h3>
            <p className="text-lg mb-6 opacity-90">
              Limited spots available for Florida virtual and homeschool students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact for More Info
              </a>
              <a
                href="/booking"
                className="inline-block px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
              >
                Schedule Assessment
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FloridaVirtualProgramSection;