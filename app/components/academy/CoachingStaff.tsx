'use client';

import { motion } from 'framer-motion';
import { Award, GraduationCap, Target, Users } from 'lucide-react';

const coaches = [
  {
    name: 'Larry Grayson',
    title: 'Head Coach & Director',
    experience: '10+ years coaching experience',
    background: 'Founder of GFMTF with extensive experience developing elite athletes',
    specialties: ['Hit With Intent', 'Elite Defense', 'Speed & Strength'],
    achievements: [
      '500+ athletes trained',
      '50+ college commits',
      'Former college player and instructor'
    ],
    image: '/placeholder-coach-1.jpg',
    color: 'green'
  },
  {
    name: 'Sarah Johnson',
    title: 'Pitching Coordinator',
    experience: '12 years coaching experience',
    background: 'Former professional player in National Pro Fastpitch',
    specialties: ['Pitching Mechanics', 'Velocity Development', 'Mental Performance'],
    achievements: [
      'Developed 20+ D1 pitchers',
      'Biomechanics certification',
      'Former Team USA coaching staff'
    ],
    image: '/placeholder-coach-2.jpg',
    color: 'blue'
  },
  {
    name: 'Carlos Martinez',
    title: 'Infield Specialist',
    experience: '10 years coaching experience',
    background: 'Former Minor League infielder with 8 years professional experience',
    specialties: ['Defensive Fundamentals', 'Footwork', 'Game Situations'],
    achievements: [
      'All-Star coaching recognition',
      'Gold Glove techniques specialist',
      '200+ players coached'
    ],
    image: '/placeholder-coach-3.jpg',
    color: 'yellow'
  },
  {
    name: 'David Thompson',
    title: 'Strength & Conditioning',
    experience: '8 years experience',
    background: 'Certified Strength and Conditioning Specialist (CSCS)',
    specialties: ['Athletic Performance', 'Injury Prevention', 'Speed Development'],
    achievements: [
      'NSCA certified',
      'Youth training specialist',
      'Performance enhancement expert'
    ],
    image: '/placeholder-coach-4.jpg',
    color: 'purple'
  }
];

const CoachingStaff = () => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-red-400/10',
          text: 'text-red-400',
          border: 'border-red-400/30'
        };
      case 'blue':
        return {
          bg: 'bg-blue-400/10',
          text: 'text-blue-400',
          border: 'border-blue-400/30'
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-400/10',
          text: 'text-yellow-400',
          border: 'border-yellow-400/30'
        };
      case 'purple':
        return {
          bg: 'bg-purple-400/10',
          text: 'text-purple-400',
          border: 'border-purple-400/30'
        };
      default:
        return {
          bg: 'bg-gray-400/10',
          text: 'text-gray-400',
          border: 'border-gray-400/30'
        };
    }
  };

  return (
    <section className="py-20 bg-gray-900">
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
            Expert <span className="text-red-400">Coaching Staff</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Learn from experienced coaches who have played and coached at the highest levels. 
            Our staff brings decades of professional experience to every training session.
          </p>
        </motion.div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {coaches.map((coach, index) => {
            const colors = getColorClasses(coach.color);
            
            return (
              <motion.div
                key={coach.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-black/50 backdrop-blur-sm border ${colors.border} rounded-xl p-8 hover:border-opacity-50 transition-all duration-300 hover:transform hover:-translate-y-2`}
              >
                {/* Coach Photo & Basic Info */}
                <div className="flex items-start space-x-6 mb-6">
                  <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-white">
                      {coach.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1">{coach.name}</h3>
                    <p className={`font-semibold mb-2 ${colors.text}`}>{coach.title}</p>
                    <p className="text-gray-400 text-sm mb-2">{coach.experience}</p>
                    <p className="text-gray-300 text-sm">{coach.background}</p>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {coach.specialties.map((specialty, specIndex) => (
                      <span
                        key={specIndex}
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {coach.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start space-x-3">
                        <div className={`w-5 h-5 ${colors.bg} rounded-full flex items-center justify-center mt-0.5 flex-shrink-0`}>
                          <Award className={`w-3 h-3 ${colors.text}`} />
                        </div>
                        <span className="text-gray-300 text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-600/10 to-blue-600/10 border border-red-400/20 rounded-xl p-8 mb-16"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Our Coaching Philosophy</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-red-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Individual Focus</h4>
                <p className="text-gray-400 text-sm">
                  Every player receives personalized attention and a customized development plan 
                  based on their unique strengths and areas for improvement.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Continuous Learning</h4>
                <p className="text-gray-400 text-sm">
                  We emphasize the importance of continuous improvement, both in baseball skills 
                  and life lessons that extend beyond the field.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-yellow-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Team Environment</h4>
                <p className="text-gray-400 text-sm">
                  We foster a supportive team environment where players learn from each other 
                  and develop strong relationships that last a lifetime.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Why Players Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Why Players <span className="text-red-400">Choose Us</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6 text-center hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 bg-red-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-red-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Proven Results</h4>
              <p className="text-gray-400 text-sm">Track record of developing college-bound athletes with measurable improvement</p>
            </div>
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6 text-center hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Individual Attention</h4>
              <p className="text-gray-400 text-sm">Personalized coaching approach tailored to each player's specific needs and goals</p>
            </div>
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6 text-center hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Expert Instruction</h4>
              <p className="text-gray-400 text-sm">Learn from experienced coaches who understand what it takes to compete at the next level</p>
            </div>
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6 text-center hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 bg-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Complete Development</h4>
              <p className="text-gray-400 text-sm">Focus on all aspects: hitting, defense, conditioning, and mental approach</p>
            </div>
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6 text-center hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 bg-red-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-red-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Small Group Training</h4>
              <p className="text-gray-400 text-sm">Low player-to-coach ratios ensure maximum attention and skill development</p>
            </div>
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6 text-center hover:border-gray-700 transition-colors">
              <div className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-cyan-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Family Atmosphere</h4>
              <p className="text-gray-400 text-sm">Supportive environment where players build confidence and lifelong friendships</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Meet Our Coaches in Person
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Schedule a facility tour and meet our coaching staff. See our training methods 
              in action and learn how we can help your player reach their potential.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Schedule Facility Tour
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoachingStaff;