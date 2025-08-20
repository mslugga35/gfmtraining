'use client';

import { motion } from 'framer-motion';
import { Check, Star, Clock, Users } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Elite Development',
    price: 299,
    period: 'month',
    description: 'Perfect for young players building fundamental skills',
    features: [
      '3 training sessions per week',
      '90-minute sessions',
      'Video analysis included',
      'Fundamental skills focus',
      'Small group training (max 12)',
      'Progress tracking',
      'Parent communication'
    ],
    popular: false,
    color: 'green'
  },
  {
    name: 'High School Prep',
    price: 399,
    period: 'month',
    description: 'Advanced training for competitive high school players',
    features: [
      '4 training sessions per week',
      '2-hour sessions',
      'Advanced video analysis',
      'Position-specific training',
      'Strength & conditioning',
      'College recruitment guidance',
      'Tournament preparation',
      'Mental performance coaching'
    ],
    popular: true,
    color: 'blue'
  },
  {
    name: 'Elite Performance',
    price: 599,
    period: 'month',
    description: 'Elite training for serious college-bound players',
    features: [
      '5 training sessions per week',
      '2.5-hour sessions',
      'Professional-level analysis',
      'Biomechanical assessment',
      'Individual training plans',
      'Showcase preparation',
      'Scout connections',
      'Mental performance coaching',
      'Nutrition guidance'
    ],
    popular: false,
    color: 'yellow'
  }
];

const additionalServices = [
  {
    name: 'Private Lessons',
    price: 85,
    period: 'hour',
    description: 'One-on-one coaching for personalized development'
  },
  {
    name: '90-Minute Hitting + Bat Speed',
    price: 120,
    period: 'session',
    description: 'Intensive hitting and bat speed development session'
  },
  {
    name: 'Monthly Hitting Package',
    price: 500,
    period: '6 hours',
    description: 'Comprehensive monthly hitting development (6 hours total)'
  }
];

const PricingSection = () => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-red-400/10',
          text: 'text-red-400',
          border: 'border-red-400',
          button: 'bg-red-600 hover:bg-red-700'
        };
      case 'blue':
        return {
          bg: 'bg-blue-400/10',
          text: 'text-blue-400',
          border: 'border-blue-400',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-400/10',
          text: 'text-yellow-400',
          border: 'border-yellow-400',
          button: 'bg-yellow-600 hover:bg-yellow-700'
        };
      default:
        return {
          bg: 'bg-gray-400/10',
          text: 'text-gray-400',
          border: 'border-gray-400',
          button: 'bg-gray-600 hover:bg-gray-700'
        };
    }
  };

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Training <span className="text-red-400">Investment</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the program that fits your player's commitment level and development goals. 
            All programs include professional coaching and video analysis.
          </p>
        </motion.div>

        {/* Main Pricing Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => {
            const colors = getColorClasses(tier.color);
            
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-gray-900/50 backdrop-blur-sm border-2 rounded-xl p-8 hover:border-opacity-75 transition-all duration-300 hover:transform hover:-translate-y-2 ${
                  tier.popular ? `${colors.border} ring-2 ring-opacity-30` : 'border-gray-800'
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`${colors.button} text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1`}>
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-gray-400 mb-6">{tier.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">${tier.price}</span>
                    <span className="text-gray-400 text-lg">/{tier.period}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <ul className="space-y-4">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className={`w-5 h-5 ${colors.bg} rounded-full flex items-center justify-center mt-0.5 flex-shrink-0`}>
                          <Check className={`w-3 h-3 ${colors.text}`} />
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button className={`w-full ${colors.button} text-white py-3 rounded-lg font-semibold transition-colors`}>
                  Get Started
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Additional Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center hover:border-gray-700 transition-colors"
              >
                <h4 className="text-lg font-semibold text-white mb-2">{service.name}</h4>
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                <div className="text-2xl font-bold text-red-400">
                  ${service.price}
                  <span className="text-gray-400 text-sm">/{service.period}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Payment Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-red-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Flexible Billing</h4>
              <p className="text-gray-400 text-sm">Monthly payments with no long-term contracts required</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Family Discounts</h4>
              <p className="text-gray-400 text-sm">10% discount when enrolling multiple family members</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Money-Back Guarantee</h4>
              <p className="text-gray-400 text-sm">30-day satisfaction guarantee for new members</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Equipment Included</h4>
              <p className="text-gray-400 text-sm">All training equipment provided during sessions</p>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-red-400/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Take the first step towards reaching your baseball potential. 
              Contact us today to schedule a free assessment and facility tour.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Schedule Free Assessment
              </button>
              <button className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;