'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, MapPin, Users, Clock, Send, CheckCircle } from 'lucide-react';

interface FormData {
  playerName: string;
  playerAge: string;
  playerPosition: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  program: string;
  experience: string;
  goals: string;
  availability: string;
  emergencyContact: string;
  emergencyPhone: string;
}

const AcademyEnrollmentForm = () => {
  const [formData, setFormData] = useState<FormData>({
    playerName: '',
    playerAge: '',
    playerPosition: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    program: '',
    experience: '',
    goals: '',
    availability: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const programs = [
    { id: 'private', name: 'Private Training', description: '1-on-1 personalized coaching' },
    { id: 'group', name: 'Group Training', description: 'Small group sessions (3-6 players)' },
    { id: 'daytime', name: 'Florida Virtual/Homeschool Program', description: 'Daytime training during school hours' },
    { id: 'elite', name: 'Elite Development', description: 'Comprehensive skill development' },
    { id: 'prep', name: 'High School Prep', description: 'Preparation for high school baseball' },
    { id: 'performance', name: 'Elite Performance', description: 'Advanced training for serious players' }
  ];

  const positions = [
    'Pitcher', 'Catcher', 'First Base', 'Second Base', 'Third Base', 
    'Shortstop', 'Left Field', 'Center Field', 'Right Field', 'Utility'
  ];

  const experienceLevels = [
    'Beginner (0-1 years)', 'Recreational (1-3 years)', 
    'Intermediate (3-5 years)', 'Advanced (5+ years)', 'Elite/Travel Ball'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would send the data to your backend
      console.log('Form submitted:', formData);
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20" style={{ backgroundColor: '#111111' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center bg-black/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-12"
          >
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Enrollment Submitted!</h2>
            <p className="text-gray-400 text-lg mb-6">
              Thank you for your interest in GFMTF Academy. Our coaching staff will review your application 
              and contact you within 24-48 hours to discuss next steps.
            </p>
            <div className="bg-red-600/10 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-red-400 font-semibold">
                Check your email for a confirmation and additional information about your selected program.
              </p>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  playerName: '',
                  playerAge: '',
                  playerPosition: '',
                  parentName: '',
                  parentEmail: '',
                  parentPhone: '',
                  program: '',
                  experience: '',
                  goals: '',
                  availability: '',
                  emergencyContact: '',
                  emergencyPhone: ''
                });
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Submit Another Application
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20" style={{ backgroundColor: '#111111' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Academy <span className="text-red-600">Enrollment</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Ready to take your baseball skills to the next level? Complete our enrollment form 
            and our coaching staff will contact you to discuss the best program for your goals.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-black/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-8"
        >
          {/* Player Information */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center" style={{ fontFamily: 'Oswald, sans-serif' }}>
              <User className="w-6 h-6 text-red-600 mr-3" />
              Player Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Player Name *</label>
                <input
                  type="text"
                  name="playerName"
                  value={formData.playerName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="Enter player's full name"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Age *</label>
                <select
                  name="playerAge"
                  value={formData.playerAge}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                >
                  <option value="">Select age</option>
                  {Array.from({ length: 15 }, (_, i) => i + 8).map(age => (
                    <option key={age} value={age}>{age} years old</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Primary Position *</label>
                <select
                  name="playerPosition"
                  value={formData.playerPosition}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                >
                  <option value="">Select position</option>
                  {positions.map(position => (
                    <option key={position} value={position}>{position}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Experience Level *</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                >
                  <option value="">Select experience level</option>
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Parent/Guardian Information */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center" style={{ fontFamily: 'Oswald, sans-serif' }}>
              <Users className="w-6 h-6 text-red-600 mr-3" />
              Parent/Guardian Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Parent/Guardian Name *</label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="Enter parent/guardian name"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  name="parentEmail"
                  value={formData.parentEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Emergency Contact Phone</label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="Enter emergency contact phone"
                />
              </div>
            </div>
          </div>

          {/* Program Selection */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center" style={{ fontFamily: 'Oswald, sans-serif' }}>
              <Calendar className="w-6 h-6 text-red-600 mr-3" />
              Program Selection
            </h3>
            <div className="space-y-4">
              <label className="block text-gray-300 font-semibold mb-4">Select Program *</label>
              {programs.map(program => (
                <div key={program.id} className="border border-gray-600 rounded-lg p-4 hover:border-red-500/50 transition-colors">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="radio"
                      name="program"
                      value={program.id}
                      checked={formData.program === program.id}
                      onChange={handleInputChange}
                      className="mt-1 mr-4 text-red-600 focus:ring-red-500"
                    />
                    <div>
                      <div className="text-white font-semibold">{program.name}</div>
                      <div className="text-gray-400 text-sm">{program.description}</div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center" style={{ fontFamily: 'Oswald, sans-serif' }}>
              <Clock className="w-6 h-6 text-red-600 mr-3" />
              Additional Information
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Player Goals & Objectives</label>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors resize-vertical"
                  placeholder="Tell us about the player's goals, what they want to improve, and any specific objectives..."
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Availability & Schedule Preferences</label>
                <textarea
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors resize-vertical"
                  placeholder="Let us know your preferred days/times and any scheduling constraints..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center mx-auto space-x-3"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Enrollment</span>
                </>
              )}
            </button>
            <p className="text-gray-500 mt-4 text-sm">
              By submitting this form, you agree to be contacted by GFMTF Academy staff regarding your enrollment.
            </p>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
};

export default AcademyEnrollmentForm;