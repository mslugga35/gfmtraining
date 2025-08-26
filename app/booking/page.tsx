'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Phone, Mail, MessageSquare, Check, Loader2, Users, CalendarDays } from 'lucide-react';
import CalendlyWidget from '../components/CalendlyWidget';

const services = [
  "1 Hour Hitting Lesson",
  "90 Min Hitting & Bat Speed", 
  "1 Hour Infield Fielding",
  "1 Hour Outfield Defense",
  "1 Hour Throwing Lesson",
  "1 Hour Base Running",
  "1 Hour Strength Training",
  "1 Hour Foot Speed & Agility",
  "Virtual Training"
];

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"
];

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    service: '',
    price: '',
    date: '',
    time: '',
    playerName: '',
    playerAge: '',
    parentName: '',
    phone: '',
    email: '',
    notes: ''
  });

  useEffect(() => {
    const service = searchParams?.get('service') || '';
    const price = searchParams?.get('price') || '';
    setFormData(prev => ({ ...prev, service, price }));
  }, [searchParams]);

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `🏆 NEW TRAINING BOOKING REQUEST 🏆

📋 SERVICE: ${formData.service}

📅 PREFERRED DATE: ${formData.date}
⏰ PREFERRED TIME: ${formData.time}

👤 PLAYER: ${formData.playerName} (Age: ${formData.playerAge})
👨‍👩‍👧‍👦 PARENT: ${formData.parentName}
📞 PHONE: ${formData.phone}
📧 EMAIL: ${formData.email}

📝 NOTES: ${formData.notes || 'None'}

Please confirm availability and next steps!`;

    const whatsappUrl = `https://wa.me/14075190984?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    setSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.playerName} (Player) - ${formData.parentName} (Parent)`,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          date: formData.date,
          time: formData.time,
          message: `Player Age: ${formData.playerAge}\nNotes: ${formData.notes || 'None'}`
        }),
      });
      
      const data = await response.json();
      console.log('Response:', data);
      
      if (response.ok) {
        setBookingSuccess(true);
        // Scroll to top to show success message
        window.scrollTo(0, 0);
        
        // Prompt to notify coach via WhatsApp
        setTimeout(() => {
          if (data.whatsappUrl && window.confirm('Would you like to notify Coach Larry via WhatsApp for faster confirmation?')) {
            window.open(data.whatsappUrl, '_blank');
          }
        }, 1000);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
        console.error('Error response:', data);
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to submit booking. Please try again or use WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getServicePrice = (serviceName: string) => {
    if (serviceName === "90 Min Hitting & Bat Speed") return 120;
    return 85;
  };

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-12 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold mb-6">Booking Request Submitted!</h1>
              <p className="text-xl text-gray-700 mb-8">
                Thank you for booking with GFM Training Academy. We've received your request and will contact you within 24 hours to confirm your appointment.
              </p>
              <div className="bg-white rounded-xl p-8 mb-8 text-left max-w-md mx-auto shadow-sm">
                <h3 className="font-bold text-lg mb-4">Booking Details:</h3>
                <div className="space-y-3">
                  <p className="flex justify-between"><span className="text-gray-600">Service:</span> <span className="font-semibold">{formData.service}</span></p>
                  <p className="flex justify-between"><span className="text-gray-600">Date:</span> <span className="font-semibold">{formData.date}</span></p>
                  <p className="flex justify-between"><span className="text-gray-600">Time:</span> <span className="font-semibold">{formData.time}</span></p>
                  <p className="flex justify-between"><span className="text-gray-600">Player:</span> <span className="font-semibold">{formData.playerName}</span></p>
                  <p className="flex justify-between"><span className="text-gray-600">Contact:</span> <span className="font-semibold">{formData.phone}</span></p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push('/')}
                  className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Return to Homepage
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Book Another Session
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Header */}
      <section className="py-10 bg-white border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Training Session</h1>
          <p className="text-xl text-gray-600">
            Schedule your elite baseball or softball training with GFM Training Academy
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg mb-8">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Service Selection */}
            <div className="p-8 border-b bg-gray-50">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <CalendarDays className="w-6 h-6 text-red-600" />
                Training Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Training Service *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-lg"
                  >
                    <option value="">Select a service...</option>
                    {services.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-lg"
                  >
                    <option value="">Select time...</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Player Information */}
            <div className="p-8 border-b">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Users className="w-6 h-6 text-red-600" />
                Player Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Player Name *
                  </label>
                  <input
                    type="text"
                    name="playerName"
                    value={formData.playerName}
                    onChange={handleChange}
                    required
                    placeholder="Enter player's full name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Player Age *
                  </label>
                  <input
                    type="number"
                    name="playerAge"
                    value={formData.playerAge}
                    onChange={handleChange}
                    required
                    min="5"
                    max="25"
                    placeholder="Age"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-lg"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    required
                    placeholder="Enter parent/guardian name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-lg"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="p-8 border-b">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Phone className="w-6 h-6 text-red-600" />
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-lg"
                  />
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="p-8 border-b bg-gray-50">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Any specific goals, concerns, or requests..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-lg resize-none"
              />
            </div>

            {/* Submit Buttons */}
            <div className="p-8 bg-white">
              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-red-600 text-white font-bold text-lg rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Submit Booking Request
                    </>
                  )}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">or book directly</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full py-4 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-3"
                >
                  <MessageSquare className="w-5 h-5" />
                  Book via WhatsApp
                </button>
              </div>
            </div>
          </form>

          {/* Booking Methods Info */}
          <div className="mt-12 bg-blue-50 rounded-xl p-8">
            <h3 className="font-bold text-xl mb-4">📋 Booking Methods Explained</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <div>
                  <strong>Submit Booking:</strong> Saves to our system, we'll confirm within 24 hours
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">•</span>
                <div>
                  <strong>WhatsApp:</strong> Send request directly to Coach's phone for fastest response
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Help */}
          <div className="mt-8 text-center p-8 bg-white rounded-xl">
            <h3 className="font-bold text-xl mb-4">Need Help with Booking?</h3>
            <p className="text-gray-600 mb-6">
              Contact us directly if you have any questions or need assistance with booking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:407-519-0984"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call 407-519-0984
              </a>
              <a
                href="https://wa.me/14075190984"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}