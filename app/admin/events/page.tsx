'use client';

import { useState } from 'react';
import { Plus, Calendar, MapPin, Users, Edit, Trash2, Eye } from 'lucide-react';

// Mock events data
const mockEvents = [
  {
    id: '1',
    title: 'Team Practice',
    description: 'Regular team practice session focusing on fundamentals',
    eventType: 'TRAINING',
    startTime: '2024-01-20T10:00:00',
    endTime: '2024-01-20T12:00:00',
    location: 'Main Field',
    maxParticipants: 20,
    currentParticipants: 15,
    recurringRule: null,
    registrations: [
      { playerId: '1', playerName: 'Sarah Wilson', status: 'CONFIRMED' },
      { playerId: '2', playerName: 'Mike Rodriguez', status: 'CONFIRMED' },
    ]
  },
  {
    id: '2',
    title: 'Skills Assessment',
    description: 'Monthly skills evaluation and progress review',
    eventType: 'ASSESSMENT',
    startTime: '2024-01-22T14:00:00',
    endTime: '2024-01-22T16:00:00',
    location: 'Training Facility',
    maxParticipants: 10,
    currentParticipants: 8,
    recurringRule: null,
    registrations: []
  },
  {
    id: '3',
    title: 'Tournament Prep',
    description: 'Preparation for upcoming regional tournament',
    eventType: 'TOURNAMENT',
    startTime: '2024-01-25T09:00:00',
    endTime: '2024-01-25T11:30:00',
    location: 'Competition Field',
    maxParticipants: 15,
    currentParticipants: 12,
    recurringRule: null,
    registrations: []
  },
  {
    id: '4',
    title: 'Academy Session',
    description: 'Specialized training for academy members',
    eventType: 'ACADEMY',
    startTime: '2024-01-27T15:00:00',
    endTime: '2024-01-27T17:00:00',
    location: 'Academy Building',
    maxParticipants: 8,
    currentParticipants: 6,
    recurringRule: 'weekly',
    registrations: []
  },
];

interface NewEventForm {
  title: string;
  description: string;
  eventType: string;
  startTime: string;
  endTime: string;
  location: string;
  maxParticipants: number;
  recurringRule: string;
}

export default function EventsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [formData, setFormData] = useState<NewEventForm>({
    title: '',
    description: '',
    eventType: 'TRAINING',
    startTime: '',
    endTime: '',
    location: '',
    maxParticipants: 20,
    recurringRule: '',
  });

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'TRAINING': return 'bg-blue-100 text-blue-800';
      case 'TOURNAMENT': return 'bg-green-100 text-green-800';
      case 'ASSESSMENT': return 'bg-purple-100 text-purple-800';
      case 'ACADEMY': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log('Creating event:', formData);
    setShowCreateModal(false);
    // Reset form
    setFormData({
      title: '',
      description: '',
      eventType: 'TRAINING',
      startTime: '',
      endTime: '',
      location: '',
      maxParticipants: 20,
      recurringRule: '',
    });
  };

  const handleViewDetails = (event: any) => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Event Management</h1>
          <p className="text-gray-400 mt-1">
            Create and manage training sessions, tournaments, and assessments
          </p>
        </div>
        
        <button 
          onClick={() => setShowCreateModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.map((event) => (
          <div key={event.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.eventType)}`}>
                  {event.eventType}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleViewDetails(event)}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-white transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-1 text-red-400 hover:text-red-300 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-400">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(event.startTime).toLocaleDateString()} at {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              
              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                {event.location}
              </div>
              
              <div className="flex items-center text-gray-400">
                <Users className="h-4 w-4 mr-2" />
                {event.currentParticipants} / {event.maxParticipants} participants
              </div>
            </div>

            <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
              />
            </div>

            {event.recurringRule && (
              <div className="mt-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                  Recurring {event.recurringRule}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Create New Event</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Event Type *
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData(prev => ({ ...prev, eventType: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="TRAINING">Training</option>
                  <option value="TOURNAMENT">Tournament</option>
                  <option value="ASSESSMENT">Assessment</option>
                  <option value="ACADEMY">Academy</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Start Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    End Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.endTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max Participants
                </label>
                <input
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
                  min="1"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Recurring
                </label>
                <select
                  value={formData.recurringRule}
                  onChange={(e) => setFormData(prev => ({ ...prev, recurringRule: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">No recurrence</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {showDetailsModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{selectedEvent.title}</h3>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(selectedEvent.eventType)}`}>
                  {selectedEvent.eventType}
                </span>
              </div>

              <p className="text-gray-300">{selectedEvent.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(selectedEvent.startTime).toLocaleString()} - {new Date(selectedEvent.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                
                <div className="flex items-center text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  {selectedEvent.location}
                </div>
                
                <div className="flex items-center text-gray-400">
                  <Users className="h-4 w-4 mr-2" />
                  {selectedEvent.currentParticipants} / {selectedEvent.maxParticipants} participants
                </div>
              </div>

              {selectedEvent.registrations && selectedEvent.registrations.length > 0 && (
                <div>
                  <h4 className="text-white font-medium mb-2">Registered Players</h4>
                  <div className="space-y-1">
                    {selectedEvent.registrations.map((reg: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-300">{reg.playerName}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          reg.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 
                          reg.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {reg.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Edit Event
              </button>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 bg-gray-700 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}