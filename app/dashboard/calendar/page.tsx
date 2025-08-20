'use client';

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar, Clock, MapPin, Users, Plus } from 'lucide-react';

// Mock events data
const mockEvents = [
  {
    id: '1',
    title: 'Team Practice',
    start: '2024-01-20T10:00:00',
    end: '2024-01-20T12:00:00',
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
    extendedProps: {
      type: 'TRAINING',
      location: 'Main Field',
      participants: 15,
      maxParticipants: 20,
      description: 'Regular team practice session focusing on fundamentals'
    }
  },
  {
    id: '2',
    title: 'Skills Assessment',
    start: '2024-01-22T14:00:00',
    end: '2024-01-22T16:00:00',
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
    extendedProps: {
      type: 'ASSESSMENT',
      location: 'Training Facility',
      participants: 8,
      maxParticipants: 10,
      description: 'Monthly skills evaluation and progress review'
    }
  },
  {
    id: '3',
    title: 'Tournament Prep',
    start: '2024-01-25T09:00:00',
    end: '2024-01-25T11:30:00',
    backgroundColor: '#10b981',
    borderColor: '#10b981',
    extendedProps: {
      type: 'TOURNAMENT',
      location: 'Competition Field',
      participants: 12,
      maxParticipants: 15,
      description: 'Preparation for upcoming regional tournament'
    }
  },
  {
    id: '4',
    title: 'Academy Session',
    start: '2024-01-27T15:00:00',
    end: '2024-01-27T17:00:00',
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
    extendedProps: {
      type: 'ACADEMY',
      location: 'Academy Building',
      participants: 6,
      maxParticipants: 8,
      description: 'Specialized training for academy members'
    }
  }
];

const upcomingEvents = [
  {
    id: '1',
    title: 'Team Practice',
    date: '2024-01-20',
    time: '10:00 AM - 12:00 PM',
    type: 'TRAINING',
    location: 'Main Field',
    registered: true
  },
  {
    id: '2',
    title: 'Skills Assessment',
    date: '2024-01-22',
    time: '2:00 PM - 4:00 PM',
    type: 'ASSESSMENT',
    location: 'Training Facility',
    registered: false
  },
  {
    id: '3',
    title: 'Tournament Prep',
    date: '2024-01-25',
    time: '9:00 AM - 11:30 AM',
    type: 'TOURNAMENT',
    location: 'Competition Field',
    registered: true
  }
];

export default function CalendarPage() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent(clickInfo.event);
    setShowEventModal(true);
  };

  const handleDateSelect = (selectInfo: any) => {
    // Handle date selection for creating new events (admin only)
    console.log('Date selected:', selectInfo);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'TRAINING': return 'bg-red-100 text-red-800';
      case 'TOURNAMENT': return 'bg-green-100 text-green-800';
      case 'ASSESSMENT': return 'bg-blue-100 text-blue-800';
      case 'ACADEMY': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Training Calendar</h1>
          <p className="text-gray-400 mt-1">
            View and register for upcoming training sessions and events
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3 bg-gray-800 rounded-lg p-6">
          <div className="calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              initialView="dayGridMonth"
              editable={false}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              events={mockEvents}
              select={handleDateSelect}
              eventClick={handleEventClick}
              height="auto"
              themeSystem="standard"
              eventDisplay="block"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Upcoming Events</h3>
            
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-medium text-sm">{event.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-xs text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {event.location}
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    {event.registered ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Registered
                      </span>
                    ) : (
                      <button className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition-colors">
                        Register
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Event Types</h3>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <span className="text-gray-300 text-sm">Training</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-300 text-sm">Assessment</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-300 text-sm">Tournament</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-gray-300 text-sm">Academy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{selectedEvent.title}</h3>
              <button 
                onClick={() => setShowEventModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Calendar className="h-4 w-4 mr-2" />
                {selectedEvent.start.toLocaleDateString()}
              </div>
              
              <div className="flex items-center text-gray-300">
                <Clock className="h-4 w-4 mr-2" />
                {selectedEvent.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                {selectedEvent.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              
              {selectedEvent.extendedProps.location && (
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-4 w-4 mr-2" />
                  {selectedEvent.extendedProps.location}
                </div>
              )}
              
              {selectedEvent.extendedProps.participants && (
                <div className="flex items-center text-gray-300">
                  <Users className="h-4 w-4 mr-2" />
                  {selectedEvent.extendedProps.participants} / {selectedEvent.extendedProps.maxParticipants} participants
                </div>
              )}
              
              {selectedEvent.extendedProps.description && (
                <p className="text-gray-300 text-sm">
                  {selectedEvent.extendedProps.description}
                </p>
              )}
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                Register
              </button>
              <button 
                onClick={() => setShowEventModal(false)}
                className="flex-1 bg-gray-700 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .fc {
          background: transparent;
        }
        .fc-theme-standard td,
        .fc-theme-standard th {
          border: 1px solid #374151;
        }
        .fc-toolbar {
          background: #1f2937;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
        }
        .fc-toolbar-title {
          color: white !important;
          font-size: 1.25rem;
          font-weight: 600;
        }
        .fc-button {
          background-color: #ef4444 !important;
          border-color: #ef4444 !important;
          color: white !important;
        }
        .fc-button:hover {
          background-color: #dc2626 !important;
          border-color: #dc2626 !important;
        }
        .fc-button:disabled {
          background-color: #6b7280 !important;
          border-color: #6b7280 !important;
        }
        .fc-daygrid-day {
          background: #1f2937;
        }
        .fc-daygrid-day:hover {
          background: #374151;
        }
        .fc-col-header-cell {
          background: #111827;
          color: #9ca3af;
          font-weight: 500;
        }
        .fc-daygrid-day-number {
          color: #d1d5db;
        }
        .fc-day-today {
          background-color: #1e40af !important;
        }
        .fc-event {
          border: none !important;
          font-size: 0.75rem;
          padding: 2px 4px;
          margin: 1px 0;
        }
        .fc-event-title {
          color: white !important;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}