'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Clock, DollarSign, User } from 'lucide-react';

interface BookingCalendarProps {
  service?: {
    name: string;
    price: number;
    duration: string;
    description: string;
  };
  onDateTimeSelect?: (date: string, time: string) => void;
}

const BookingCalendar = ({ service, onDateTimeSelect }: BookingCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Available time slots
  const timeSlots = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
    "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"
  ];

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const today = new Date();
      const isAvailable = date >= today && date.getDay() !== 0; // Not Sundays and not past dates
      days.push({
        day,
        date: date.toISOString().split('T')[0],
        isAvailable,
        isToday: date.toDateString() === today.toDateString()
      });
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedDate && onDateTimeSelect) {
      onDateTimeSelect(selectedDate, time);
    }
  };

  const handleCalendlyBooking = () => {
    // Open Calendly popup
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: 'https://calendly.com/gfmtraining'
      });
    } else {
      // Fallback to opening Calendly in new tab
      window.open('https://calendly.com/gfmtraining', '_blank');
    }
  };

  return (
    <div className="booking-calendar-container" style={{ backgroundColor: '#f5f5f5' }}>
      {/* Header with Service Info */}
      {service && (
        <div className="p-4 border-b border-gray-200" style={{ backgroundColor: '#e5e5e5' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full p-2 shadow-sm">
              <Image 
                src="/gfm_logo.webp" 
                alt="GFM Training" 
                width={32} 
                height={32} 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{service.name}</h2>
              <p className="text-gray-600 text-xs">{service.description}</p>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-red-600">
                  <DollarSign className="w-3 h-3" />
                  <span className="font-semibold text-sm">${service.price}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span className="text-sm">{service.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Calendar Section */}
        <div className="p-4">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-900">Select a Date</h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={goToPreviousMonth}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <span className="text-xs font-medium text-gray-700 min-w-[100px] text-center">
                  {monthName}
                </span>
                <button
                  onClick={goToNextMonth}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="mb-3">
            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="p-1 text-center text-[10px] font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            <div className="calendar-grid">
              {days.map((day, index) => (
                <div key={index} className="aspect-square">
                  {day && (
                    <button
                      onClick={() => day.isAvailable && handleDateSelect(day.date)}
                      className={`
                        calendar-date-compact
                        ${day.isAvailable 
                          ? 'available' 
                          : 'disabled'
                        }
                        ${selectedDate === day.date 
                          ? 'selected' 
                          : ''
                        }
                        ${day.isToday && day.isAvailable 
                          ? 'ring-1 ring-red-400' 
                          : ''
                        }
                      `}
                      disabled={!day.isAvailable}
                    >
                      {day.day}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {!selectedDate && (
            <p className="text-xs text-gray-500 text-center">
              Choose a highlighted date for times
            </p>
          )}
        </div>

        {/* Time Selection */}
        <div className="p-4 bg-gray-50">
          {selectedDate ? (
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                Times for {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </h3>
              <div className="grid grid-cols-3 gap-1.5">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`
                      p-2 rounded-md text-xs font-medium transition-all duration-200 border
                      ${selectedTime === time
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-red-300 hover:bg-red-50'
                      }
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <div className="mt-4 p-3 bg-red-50 rounded-md border border-red-200">
                  <div className="flex items-center gap-2 text-red-700 mb-2">
                    <User className="w-3 h-3" />
                    <span className="font-medium text-sm">Summary</span>
                  </div>
                  <div className="text-xs text-red-600 space-y-0.5">
                    <p><strong>Service:</strong> {service?.name}</p>
                    <p><strong>Date:</strong> {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</p>
                    <p><strong>Time:</strong> {selectedTime}</p>
                    <p><strong>Price:</strong> ${service?.price}</p>
                  </div>
                  
                  <div className="mt-3 space-y-1.5">
                    <button
                      onClick={() => {
                        const bookingUrl = `/booking/complete?service=${encodeURIComponent(service?.name || '')}&price=${service?.price}&date=${selectedDate}&time=${encodeURIComponent(selectedTime)}`;
                        window.location.href = bookingUrl;
                      }}
                      className="w-full bg-red-600 text-white py-2 px-3 rounded-md text-xs font-medium hover:bg-red-700 transition-colors"
                    >
                      Continue Booking
                    </button>
                    
                    <button
                      onClick={handleCalendlyBooking}
                      className="w-full bg-red-600 text-white py-2 px-3 rounded-md text-xs font-medium hover:bg-red-700 transition-colors"
                    >
                      Book via Calendly
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-xs">Select a date first</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;