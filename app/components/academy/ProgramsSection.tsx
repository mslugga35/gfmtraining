'use client';

import { motion } from 'framer-motion';
import { Users, Clock, Target, Trophy, Star, Calendar } from 'lucide-react';

const programs = [
  {
    id: 'elite-development',
    title: 'Elite Development Program',
    ageGroup: 'All Skill Levels',
    description: 'Foundation building program focusing on fundamental skills and proper mechanics.',
    features: [
      'Hitting mechanics and swing development',
      'Basic pitching fundamentals',
      'Fielding positions and techniques',
      'Base running and game awareness',
      'Mental approach and confidence building'
    ],
    schedule: {
      duration: '8 weeks',
      sessions: '3x per week',
      length: '90 minutes'
    },
    color: 'green',
    icon: Users
  },
  {
    id: 'high-school-prep',
    title: 'High School Prep',
    ageGroup: 'Ages 14-17',
    description: 'Advanced training to prepare players for high school baseball competition.',
    features: [
      'Advanced hitting mechanics',
      'Pitching velocity development',
      'Position-specific training',
      'Strength and conditioning',
      'College recruitment guidance'
    ],
    schedule: {
      duration: '12 weeks',
      sessions: '4x per week',
      length: '2 hours'
    },
    color: 'blue',
    icon: Target,
    popular: true
  },
  {
    id: 'elite-performance',
    title: 'Elite Performance',
    ageGroup: 'Ages 16+',
    description: 'Elite-level training for serious players pursuing college and professional opportunities.',
    features: [
      'Advanced biomechanical analysis',
      'Professional-level training methods',
      'Mental performance coaching',
      'Showcase preparation',
      'Professional scout connections'
    ],
    schedule: {
      duration: 'Year-round',
      sessions: '5x per week',
      length: '2.5 hours'
    },
    color: 'yellow',
    icon: Trophy
  }
];

const ProgramsSection = () => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-red-100',
          text: 'text-red-600',
          border: 'border-red-200',
          button: 'bg-red-600 hover:bg-red-700'
        };
      case 'blue':
        return {
          bg: 'bg-red-100',
          text: 'text-red-600',
          border: 'border-red-200',
          button: 'bg-red-600 hover:bg-red-700'
        };
      case 'yellow':
        return {
          bg: 'bg-red-100',
          text: 'text-red-600',
          border: 'border-red-200',
          button: 'bg-red-600 hover:bg-red-700'
        };
      default:
        return {
          bg: 'bg-red-100',
          text: 'text-red-600',
          border: 'border-red-200',
          button: 'bg-red-600 hover:bg-red-700'
        };
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
            Training <span className="text-red-600">Programs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the program that best fits your player's age, skill level, and goals. 
            All programs include video analysis and personalized coaching.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            const colors = getColorClasses(program.color);
            const IconComponent = program.icon;
            
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 ${
                  program.popular ? 'ring-2 ring-red-600/30' : ''
                }`}
              >
                {/* Popular Badge */}
                {program.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 ${colors.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">{program.title}</h3>
                  <p className="text-red-600 font-semibold">{program.ageGroup}</p>
                  <p className="text-gray-600 mt-2">{program.description}</p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-black mb-4">What's Included:</h4>
                  <ul className="space-y-3">
                    {program.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className={`w-5 h-5 ${colors.bg} rounded-full flex items-center justify-center mt-0.5 flex-shrink-0`}>
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Schedule */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-black mb-4">Schedule:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="text-black">{program.schedule.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sessions:</span>
                      <span className="text-black">{program.schedule.sessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Length:</span>
                      <span className="text-black">{program.schedule.length}</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <a href="/contact" className={`block w-full ${colors.button} text-white py-3 rounded-lg font-semibold transition-colors mb-3`}>
                    Contact for More Info
                  </a>
                  <a href="/booking" className="block w-full border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white py-3 rounded-lg font-semibold transition-colors">
                    Schedule Assessment
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-black mb-4">
              Not Sure Which Program is Right for You?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Schedule a free assessment with one of our coaches to determine 
              the best program fit for your player's current skill level and goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/booking" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Schedule Assessment</span>
              </a>
              <a href="/contact" className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-black px-8 py-3 rounded-lg font-semibold transition-colors">
                Contact for More Info
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramsSection;