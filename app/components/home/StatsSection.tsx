'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Award, Users, GraduationCap } from 'lucide-react';

const stats = [
  {
    icon: Users,
    number: '500+',
    label: 'Athletes Trained',
    description: 'Players developed over 10+ years',
    color: '#10b981'
  },
  {
    icon: GraduationCap,
    number: '50+',
    label: 'College Commits',
    description: 'Student-athletes placed in programs',
    color: '#10b981'
  },
  {
    icon: Award,
    number: '10+',
    label: 'Years Experience',
    description: 'Developing championship-level talent',
    color: '#10b981'
  },
  {
    icon: TrendingUp,
    number: '100%',
    label: 'Commitment',
    description: 'Dedicated to each player\'s success',
    color: '#10b981'
  }
];

const StatsSection = () => {
  return (
    <section className="py-20" style={{ backgroundColor: 'rgb(22, 22, 22)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 heading-font" style={{ color: 'rgb(247, 247, 247)' }}>
            Our <span style={{ color: '#10b981' }}>Track Record</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto body-font" style={{ color: 'rgb(127, 128, 128)' }}>
            Numbers don't lie. See the measurable impact of our training programs 
            on player development and success rates.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="border gfmtf-button p-8 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl" style={{ 
                backgroundColor: 'rgba(22, 22, 22, 0.8)', 
                borderColor: 'rgb(127, 128, 128)',
                borderRadius: '12px'
              }}>
                <div className="flex justify-center mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`} style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                    <stat.icon className={`w-8 h-8`} style={{ color: stat.color }} />
                  </div>
                </div>
                
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className={`text-4xl md:text-5xl font-bold mb-2 heading-font`}
                  style={{ color: stat.color }}
                >
                  {stat.number}
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-2 heading-font" style={{ color: 'rgb(247, 247, 247)' }}>
                  {stat.label}
                </h3>
                
                <p className="text-sm body-font" style={{ color: 'rgb(127, 128, 128)' }}>
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="border gfmtf-button p-8" style={{ 
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
            borderColor: 'rgba(16, 185, 129, 0.2)'
          }}>
            <h3 className="text-2xl font-bold mb-4 heading-font" style={{ color: 'rgb(247, 247, 247)' }}>
              Join the Success Story
            </h3>
            <p className="mb-6 max-w-2xl mx-auto body-font" style={{ color: 'rgb(127, 128, 128)' }}>
              These results come from dedicated training, expert coaching, and 
              our commitment to each player's individual development journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="gfmtf-button px-6 py-3 font-semibold transition-colors body-font" style={{
                backgroundColor: '#10b981',
                color: 'rgb(247, 247, 247)',
                border: '2px solid #10b981'
              }}>
                View Success Stories
              </button>
              <button className="gfmtf-button px-6 py-3 font-semibold transition-colors body-font" style={{
                backgroundColor: 'transparent',
                color: 'rgb(247, 247, 247)',
                border: '2px solid rgb(247, 247, 247)'
              }}>
                Schedule Assessment
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;