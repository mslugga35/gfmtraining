'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, BarChart3, Video, Calendar, MessageSquare, Trophy, 
  Target, Clock, BookOpen, Download, Play, TrendingUp 
} from 'lucide-react';
import Image from 'next/image';

const PlayerPortalSection = () => {
  const portalFeatures = [
    {
      icon: Video,
      title: 'Video Analysis',
      description: 'Review your swing mechanics, pitching form, and fielding techniques with frame-by-frame analysis',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Monitor your improvement with detailed statistics and performance metrics over time',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Calendar,
      title: 'Training Schedule',
      description: 'View upcoming sessions, reschedule training, and track your attendance history',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: MessageSquare,
      title: 'Coach Communication',
      description: 'Direct messaging with your coaches, receive personalized feedback and training notes',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: Trophy,
      title: 'Goals & Achievements',
      description: 'Set training goals, track milestones, and celebrate your baseball achievements',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: BookOpen,
      title: 'Training Resources',
      description: 'Access exclusive training drills, educational content, and skill development guides',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10'
    }
  ];

  const mockStats = [
    { label: 'Sessions Completed', value: '47', change: '+12%', trend: 'up' },
    { label: 'Batting Average', value: '.342', change: '+.058', trend: 'up' },
    { label: 'Exit Velocity', value: '89 MPH', change: '+7 MPH', trend: 'up' },
    { label: 'Training Hours', value: '124', change: '+23h', trend: 'up' }
  ];

  return (
    <section className="py-20" style={{ backgroundColor: '#0f0f0f' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-red-600/20 border border-red-500/30 rounded-lg px-6 py-3 mb-6">
            <span className="text-red-400 font-semibold text-lg" style={{ fontFamily: 'Oswald, sans-serif' }}>
              EXCLUSIVE ACCESS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Player <span className="text-red-400">Portal</span> Access
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Every academy player gets exclusive access to our comprehensive digital platform 
            for tracking progress, analyzing performance, and connecting with coaches.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Portal Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Mock Dashboard */}
            <div className="bg-black/60 backdrop-blur-sm border border-red-500/20 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Player Dashboard
                </h3>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <User className="w-4 h-4" />
                  <span>Welcome back, Alex</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {mockStats.map((stat, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-lg p-4">
                    <div className="text-gray-400 text-xs mb-1">{stat.label}</div>
                    <div className="text-white text-xl font-bold mb-1">{stat.value}</div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-green-400" />
                      <span className="text-green-400 text-xs">{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="space-y-3">
                <h4 className="text-white font-semibold mb-3">Recent Activity</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-sm">
                    <Video className="w-4 h-4 text-red-400" />
                    <span className="text-gray-300">New swing analysis uploaded</span>
                    <span className="text-gray-500 ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <MessageSquare className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">Coach feedback received</span>
                    <span className="text-gray-500 ml-auto">1 day ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300">Goal achieved: Exit velocity +5 MPH</span>
                    <span className="text-gray-500 ml-auto">3 days ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Access Information */}
            <div className="bg-gradient-to-r from-red-600/10 to-purple-600/10 border border-red-400/20 rounded-xl p-6">
              <h4 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
                Portal Access Included
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-gray-300">Available 24/7 on desktop and mobile</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-gray-300">Secure login with parent/player access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-gray-300">Real-time updates and notifications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-gray-300">Downloadable progress reports</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Portal Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {portalFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-red-500/30 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                        {feature.title}
                      </h4>
                      <p className="text-gray-400 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Video Analysis Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-black/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-red-400" />
            </div>
          </div>
          
          <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Advanced Video Analysis
          </h3>
          <p className="text-gray-400 mb-8 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            See your training sessions from multiple angles with slow-motion analysis, 
            frame-by-frame breakdowns, and side-by-side comparisons with professional players.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800/50 rounded-lg p-6">
              <Video className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Multi-Angle Recording</h4>
              <p className="text-gray-400 text-sm">Front, side, and overhead camera angles</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6">
              <Target className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Precision Analysis</h4>
              <p className="text-gray-400 text-sm">Frame-by-frame mechanics breakdown</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6">
              <Download className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Take It Home</h4>
              <p className="text-gray-400 text-sm">Download videos for personal review</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2">
              <User className="w-5 h-5" />
              <span>Request Demo Access</span>
            </button>
            <button className="border border-red-500 hover:border-red-400 text-red-400 hover:text-red-300 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              View Sample Portal
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlayerPortalSection;