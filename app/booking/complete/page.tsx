'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Check, Loader2, Phone, Mail, MessageSquare, Calendar, Clock, DollarSign } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

function CompleteBookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const service = searchParams.get('service') || '';
  const price = searchParams.get('price') || '';
  const date = searchParams.get('date') || '';
  const time = searchParams.get('time') || '';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          service,
          date,
          time,
          price
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setBookingSuccess(true);
        
        // Automatically notify Coach Larry via WhatsApp
        if (data.whatsappUrl) {
          // Auto-open WhatsApp to notify coach
          const coachNotification = window.confirm(
            'Booking submitted! Click OK to notify Coach Larry via WhatsApp for faster confirmation.'
          );
          
          if (coachNotification) {
            window.open(data.whatsappUrl, '_blank');
          }
        }
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to submit booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (bookingSuccess) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gray-50 py-20">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for booking with GFM Training Academy. We've received your request and will contact you shortly to confirm your appointment.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold mb-2">Booking Details:</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>Service:</strong> {service}</p>
                  <p><strong>Date:</strong> {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</p>
                  <p><strong>Time:</strong> {time}</p>
                  <p><strong>Price:</strong> ${price}</p>
                </div>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/')}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Return to Homepage
                </button>
                <button
                  onClick={() => router.push('/services')}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Book Another Session
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-2xl mx-auto px-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Calendar</span>
          </button>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-full p-2">
                  <Image 
                    src="/gfm_logo.webp" 
                    alt="GFM Training" 
                    width={48} 
                    height={48} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Complete Your Booking</h1>
                  <p className="text-red-100">GFM Training Academy</p>
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="p-6 bg-gray-50 border-b">
              <h2 className="font-semibold mb-3">Booking Summary</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="font-medium">
                      {date && new Date(date + 'T00:00:00').toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-gray-500">Time</p>
                    <p className="font-medium">{time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-gray-500">Service</p>
                    <p className="font-medium">{service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-gray-500">Price</p>
                    <p className="font-medium">${price}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <h2 className="font-semibold mb-4">Your Information</h2>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="(407) 555-0123"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Any specific goals or concerns..."
                  />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>

                <div className="text-center text-sm text-gray-500">
                  or
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const message = `Hi, I'd like to book:\n${service}\nDate: ${date}\nTime: ${time}`;
                    window.open(`https://wa.me/14075190984?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Book via WhatsApp
                </button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                  <a href="tel:407-519-0984" className="flex items-center gap-1 hover:text-gray-700">
                    <Phone className="w-3 h-3" />
                    407-519-0984
                  </a>
                  <a href="mailto:Larrygrayson@gfmtf.com" className="flex items-center gap-1 hover:text-gray-700">
                    <Mail className="w-3 h-3" />
                    Larrygrayson@gfmtf.com
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function CompleteBooking() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    }>
      <CompleteBookingContent />
    </Suspense>
  );
}