'use client';

import { motion } from 'framer-motion';
import { Clock, Calendar, Users, MapPin } from 'lucide-react';

const scheduleData = [
  {
    day: 'Monday',
    sessions: [
      {
        time: '4:00 PM - 5:30 PM',
        program: 'Elite Development',
        type: 'Hitting & Fielding',
        capacity: '12 players',
        location: 'Main Field'
      },
      {
        time: '6:00 PM - 8:00 PM',
        program: 'High School Prep',
        type: 'Complete Training',
        capacity: '16 players',
        location: 'Main Field'
      }
    ]
  },
  {
    day: 'Tuesday',
    sessions: [
      {
        time: '4:00 PM - 6:30 PM',
        program: 'Elite Performance',
        type: 'Advanced Mechanics',
        capacity: '8 players',
        location: 'Indoor Facility'
      },
      {
        time: '7:00 PM - 8:30 PM',
        program: 'Elite Development',
        type: 'Pitching Focus',
        capacity: '10 players',
        location: 'Bullpen Area'
      }
    ]
  },
  {
    day: 'Wednesday',
    sessions: [
      {
        time: '4:00 PM - 5:30 PM',
        program: 'Elite Development',
        type: 'Game Situations',
        capacity: '12 players',
        location: 'Main Field'
      },
      {
        time: '6:00 PM - 8:00 PM',
        program: 'High School Prep',
        type: 'Complete Training',
        capacity: '16 players',
        location: 'Main Field'
      }
    ]
  },
  {
    day: 'Thursday',
    sessions: [
      {
        time: '4:00 PM - 6:30 PM',
        program: 'Elite Performance',
        type: 'Mental Performance',
        capacity: '8 players',
        location: 'Classroom'
      },
      {
        time: '7:00 PM - 8:30 PM',
        program: 'Private Sessions',
        type: '1-on-1 Coaching',
        capacity: 'Individual',
        location: 'Various'
      }
    ]
  },
  {
    day: 'Friday',
    sessions: [
      {
        time: '4:00 PM - 5:30 PM',
        program: 'Elite Development',
        type: 'Skills Assessment',
        capacity: '12 players',
        location: 'Main Field'
      },
      {
        time: '6:00 PM - 8:30 PM',
        program: 'All Programs',
        type: 'Scrimmage Games',
        capacity: '24 players',
        location: 'Main Field'
      }
    ]
  }
];

const TrainingSchedule = () => {
  const getProgramColor = (program: string) => {
    switch (program) {
      case 'Elite Development':
        return 'bg-green-400/20 text-green-400 border-green-400/30';
      case 'High School Prep':
        return 'bg-blue-400/20 text-blue-400 border-blue-400/30';
      case 'Elite Performance':
        return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'Private Sessions':
        return 'bg-purple-400/20 text-purple-400 border-purple-400/30';
      case 'All Programs':
        return 'bg-cyan-400/20 text-cyan-400 border-cyan-400/30';
      default:
        return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
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
            Weekly <span className="text-green-400">Schedule</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our structured training schedule ensures consistent development 
            while accommodating school and other activities.
          </p>
        </motion.div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {scheduleData.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: dayIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
            >
              {/* Day Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{day.day}</h3>
                <div className="w-12 h-1 bg-green-400 mx-auto rounded-full"></div>
              </div>

              {/* Sessions */}
              <div className="space-y-4">
                {day.sessions.map((session, sessionIndex) => (
                  <motion.div
                    key={sessionIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: dayIndex * 0.1 + sessionIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-black/50 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
                  >
                    {/* Time */}
                    <div className="flex items-center space-x-2 mb-3">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-white">{session.time}</span>
                    </div>

                    {/* Program Badge */}
                    <div className="mb-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getProgramColor(session.program)}`}>
                        {session.program}
                      </span>
                    </div>

                    {/* Session Type */}
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-300">{session.type}</p>
                    </div>

                    {/* Details */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Users className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-400">{session.capacity}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-400">{session.location}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Flexible Makeup</h3>
            <p className="text-gray-400 text-sm">Missed sessions can be made up within the same week</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Year Round</h3>
            <p className="text-gray-400 text-sm">Training available 12 months with seasonal adjustments</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Small Groups</h3>
            <p className="text-gray-400 text-sm">Low player-to-coach ratios for personalized attention</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Multiple Locations</h3>
            <p className="text-gray-400 text-sm">Indoor and outdoor facilities for all weather training</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-400/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Reserve your spot in one of our training programs. 
              Contact us to discuss scheduling and program options.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Reserve Your Spot
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingSchedule;