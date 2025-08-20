'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar, Filter, Plus, Eye } from 'lucide-react';

// Sample events data
const sampleEvents = [
  {
    id: '1',
    title: 'Elite Training Session',
    start: '2024-03-20T16:00:00',
    end: '2024-03-20T17:30:00',
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
    textColor: '#ffffff',
    extendedProps: {
      type: 'TRAINING',
      location: 'Main Field',
      participants: 12,
      maxParticipants: 15,
      description: 'Hitting mechanics and fielding fundamentals'
    }
  },
  {
    id: '2',
    title: 'High School Prep',
    start: '2024-03-20T18:00:00',
    end: '2024-03-20T20:00:00',
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
    textColor: '#ffffff',
    extendedProps: {
      type: 'TRAINING',
      location: 'Main Field',
      participants: 14,
      maxParticipants: 16,
      description: 'Complete training session with scrimmage'
    }
  },
  {
    id: '3',
    title: 'Regional Tournament',
    start: '2024-03-22T09:00:00',
    end: '2024-03-22T17:00:00',
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
    textColor: '#ffffff',
    extendedProps: {
      type: 'TOURNAMENT',
      location: 'Regional Sports Complex',
      participants: 45,
      maxParticipants: 50,
      description: 'Spring regional championship tournament'
    }
  },
  {
    id: '4',
    title: 'College Showcase',
    start: '2024-03-25T10:00:00',
    end: '2024-03-25T16:00:00',
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
    textColor: '#ffffff',
    extendedProps: {
      type: 'SHOWCASE',
      location: 'University Complex',
      participants: 30,
      maxParticipants: 35,
      description: 'Showcase event with college scouts'
    }
  },
  {
    id: '5',
    title: 'Elite Performance',
    start: '2024-03-21T16:00:00',
    end: '2024-03-21T18:30:00',
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
    textColor: '#ffffff',
    extendedProps: {
      type: 'ACADEMY',
      location: 'Indoor Facility',
      participants: 8,
      maxParticipants: 10,
      description: 'Advanced biomechanical analysis session'
    }
  }
];

const eventTypes = [
  { value: 'ALL', label: 'All Events', color: '#6b7280' },
  { value: 'TRAINING', label: 'Training', color: '#22c55e' },
  { value: 'TOURNAMENT', label: 'Tournaments', color: '#f59e0b' },
  { value: 'SHOWCASE', label: 'Showcases', color: '#8b5cf6' },
  { value: 'ACADEMY', label: 'Academy', color: '#ef4444' }
];

const CalendarView = () => {
  const [events, setEvents] = useState(sampleEvents);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [filterType, setFilterType] = useState('ALL');
  const [currentView, setCurrentView] = useState('dayGridMonth');

  // Filter events based on type
  const filteredEvents = filterType === 'ALL' 
    ? events 
    : events.filter(event => event.extendedProps.type === filterType);

  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent(clickInfo.event);
  };

  const handleDateSelect = (selectInfo: any) => {
    console.log('Date selected:', selectInfo);
    // Handle new event creation
  };

  const closeModal = () => {
    setSelectedEvent(null);
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
            Training <span className="text-green-400">Calendar</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            View all training sessions, tournaments, and events. Click on any event 
            to see details and register your participation.
          </p>
        </motion.div>

        {/* Calendar Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Event Type Filter */}
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setFilterType(type.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                    filterType === type.value
                      ? 'text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  style={{ 
                    backgroundColor: filterType === type.value ? type.color : undefined 
                  }}
                >
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: type.color }}
                  ></div>
                  <span>{type.label}</span>
                </button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-4">
              <select
                value={currentView}
                onChange={(e) => setCurrentView(e.target.value)}
                className="bg-black border border-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-green-400"
              >
                <option value="dayGridMonth">Month View</option>
                <option value="timeGridWeek">Week View</option>
                <option value="timeGridDay">Day View</option>
              </select>

              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
        >
          <div className="calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              initialView={currentView}
              events={filteredEvents}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              eventClick={handleEventClick}
              select={handleDateSelect}
              height="auto"
              themeSystem="standard"
              eventDisplay="block"
              dayHeaderClassNames="text-gray-300 bg-gray-800"
              eventClassNames="cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
        </motion.div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-md w-full"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-white">{selectedEvent.title}</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Type:</label>
                  <p className="text-white">{selectedEvent.extendedProps.type}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Date & Time:</label>
                  <p className="text-white">
                    {selectedEvent.start.toLocaleDateString()} at{' '}
                    {selectedEvent.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {selectedEvent.end && (
                      <span> - {selectedEvent.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    )}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Location:</label>
                  <p className="text-white">{selectedEvent.extendedProps.location}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Participants:</label>
                  <p className="text-white">
                    {selectedEvent.extendedProps.participants} / {selectedEvent.extendedProps.maxParticipants}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Description:</label>
                  <p className="text-white">{selectedEvent.extendedProps.description}</p>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  Register
                </button>
                <button 
                  onClick={closeModal}
                  className="flex-1 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Calendar Styles */}
      <style jsx global>{`
        .fc {
          color: #ffffff;
        }
        .fc-theme-standard td,
        .fc-theme-standard th {
          border-color: #374151;
        }
        .fc-theme-standard .fc-scrollgrid {
          border-color: #374151;
        }
        .fc-col-header-cell {
          background-color: #374151;
          color: #d1d5db;
        }
        .fc-daygrid-day {
          background-color: transparent;
        }
        .fc-daygrid-day:hover {
          background-color: rgba(55, 65, 81, 0.3);
        }
        .fc-day-today {
          background-color: rgba(34, 197, 94, 0.1) !important;
        }
        .fc-button {
          background-color: #374151;
          border-color: #4b5563;
          color: #ffffff;
        }
        .fc-button:hover {
          background-color: #4b5563;
          border-color: #6b7280;
        }
        .fc-button-active {
          background-color: #22c55e !important;
          border-color: #22c55e !important;
        }
        .fc-event {
          border-radius: 4px;
          font-size: 12px;
          padding: 2px 4px;
        }
        .fc-h-event {
          background-color: inherit;
          border: 1px solid;
        }
      `}</style>
    </section>
  );
};

export default CalendarView;