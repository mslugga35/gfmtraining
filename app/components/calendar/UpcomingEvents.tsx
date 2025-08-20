'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ChevronRight, Star } from 'lucide-react';

const upcomingEvents = [
  {
    id: 1,
    title: 'Spring Training Camp',
    type: 'ACADEMY',
    date: '2024-03-25',
    time: '09:00 AM - 4:00 PM',
    location: 'Main Training Facility',
    participants: 45,
    maxParticipants: 60,
    description: 'Intensive 2-day spring training camp focusing on fundamentals and conditioning.',
    price: 150,
    featured: true,
    registrationDeadline: '2024-03-20',
    image: '/placeholder-camp.jpg'
  },
  {
    id: 2,
    title: 'College Showcase Event',
    type: 'SHOWCASE',
    date: '2024-03-30',
    time: '10:00 AM - 5:00 PM',
    location: 'University Baseball Complex',
    participants: 28,
    maxParticipants: 35,
    description: 'Showcase your skills in front of college coaches and scouts.',
    price: 75,
    featured: true,
    registrationDeadline: '2024-03-25',
    image: '/placeholder-showcase.jpg'
  },
  {
    id: 3,
    title: 'Regional Tournament',
    type: 'TOURNAMENT',
    date: '2024-04-05',
    time: '8:00 AM - 6:00 PM',
    location: 'Regional Sports Complex',
    participants: 32,
    maxParticipants: 40,
    description: 'Competitive tournament featuring teams from across the region.',
    price: 100,
    featured: false,
    registrationDeadline: '2024-03-30',
    image: '/placeholder-tournament.jpg'
  },
  {
    id: 4,
    title: 'Pitching Clinic',
    type: 'TRAINING',
    date: '2024-04-10',
    time: '2:00 PM - 5:00 PM',
    location: 'Indoor Training Center',
    participants: 15,
    maxParticipants: 20,
    description: 'Specialized pitching clinic with former professional pitcher.',
    price: 50,
    featured: false,
    registrationDeadline: '2024-04-07',
    image: '/placeholder-pitching.jpg'
  },
  {
    id: 5,
    title: 'Parent-Player Workshop',
    type: 'ACADEMY',
    date: '2024-04-15',
    time: '6:00 PM - 8:00 PM',
    location: 'Conference Room',
    participants: 20,
    maxParticipants: 30,
    description: 'Educational workshop on nutrition, mental health, and college recruitment.',
    price: 0,
    featured: false,
    registrationDeadline: '2024-04-12',
    image: '/placeholder-workshop.jpg'
  }
];

const UpcomingEvents = () => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'TRAINING':
        return 'bg-green-400/20 text-green-400 border-green-400/30';
      case 'TOURNAMENT':
        return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'SHOWCASE':
        return 'bg-purple-400/20 text-purple-400 border-purple-400/30';
      case 'ACADEMY':
        return 'bg-blue-400/20 text-blue-400 border-blue-400/30';
      default:
        return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isRegistrationOpen = (deadline: string) => {
    return new Date(deadline) > new Date();
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
            Upcoming <span className="text-green-400">Events</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Don't miss out on these special training opportunities, tournaments, 
            and showcase events designed to advance your baseball career.
          </p>
        </motion.div>

        {/* Featured Events */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <Star className="w-6 h-6 text-yellow-400 mr-2" />
            Featured Events
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.filter(event => event.featured).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-300 hover:transform hover:-translate-y-2 group"
              >
                {/* Event Image */}
                <div className="aspect-video bg-gray-800 relative overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-green-400/20 to-blue-400/20 flex items-center justify-center">
                    <Calendar className="w-16 h-16 text-gray-600" />
                  </div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Featured</span>
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                    {event.title}
                  </h4>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{event.participants}/{event.maxParticipants} registered</span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-green-400">
                      {event.price === 0 ? 'Free' : `$${event.price}`}
                    </div>
                    <div className="text-sm text-gray-400">
                      Register by {new Date(event.registrationDeadline).toLocaleDateString()}
                    </div>
                  </div>

                  <button 
                    disabled={!isRegistrationOpen(event.registrationDeadline)}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                      isRegistrationOpen(event.registrationDeadline)
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <span>
                      {isRegistrationOpen(event.registrationDeadline) ? 'Register Now' : 'Registration Closed'}
                    </span>
                    {isRegistrationOpen(event.registrationDeadline) && (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* All Events List */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8">All Upcoming Events</h3>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  {/* Event Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-white">{event.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                      {event.featured && (
                        <span className="bg-yellow-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{event.participants}/{event.maxParticipants}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price and Registration */}
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">
                        {event.price === 0 ? 'Free' : `$${event.price}`}
                      </div>
                      <div className="text-xs text-gray-400">
                        Until {new Date(event.registrationDeadline).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <button 
                      disabled={!isRegistrationOpen(event.registrationDeadline)}
                      className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2 ${
                        isRegistrationOpen(event.registrationDeadline)
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <span>
                        {isRegistrationOpen(event.registrationDeadline) ? 'Register' : 'Closed'}
                      </span>
                      {isRegistrationOpen(event.registrationDeadline) && (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-400/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated on New Events
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive notifications about new training 
              opportunities, tournaments, and showcase events.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Subscribe to Updates
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

export default UpcomingEvents;