'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, DollarSign, User, Phone, Mail, MessageSquare, Check, Loader2 } from 'lucide-react';
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
💰 PRICE: $${formData.price}

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
      <div className="min-h-screen bg-white">
        <section className="section">
          <div className="container max-w-2xl">
            <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Booking Request Submitted!</h1>
              <p className="text-lg text-gray-700 mb-6">
                Thank you for booking with GFM Training Academy. We've received your request and will contact you within 24 hours to confirm your appointment.
              </p>
              <div className="bg-white rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
                <h3 className="font-semibold mb-3">Booking Details:</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Service:</strong> {formData.service}</p>
                  <p><strong>Date:</strong> {formData.date}</p>
                  <p><strong>Time:</strong> {formData.time}</p>
                  <p><strong>Player:</strong> {formData.playerName}</p>
                  <p><strong>Contact:</strong> {formData.phone}</p>
                </div>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/')}
                  className="btn btn-primary"
                >
                  Return to Homepage
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-secondary ml-3"
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="section-sm bg-gray-50">
        <div className="container">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
          <h1 className="mb-4">Book Your Training Session</h1>
          <p className="text-xl text-gray-600">
            Fill out the form below to submit your booking request.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section">
        <div className="container max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Selection */}
            <div className="form-group">
              <label className="form-label">
                <Calendar className="w-4 h-4 inline mr-2" />
                Training Service
              </label>
              <select 
                name="service"
                value={formData.service}
                onChange={(e) => {
                  setFormData(prev => ({ 
                    ...prev, 
                    service: e.target.value,
                    price: getServicePrice(e.target.value).toString()
                  }));
                }}
                className="form-select"
                required
              >
                <option value="">Select a service...</option>
                {services.map(service => (
                  <option key={service} value={service}>
                    {service} - ${getServicePrice(service)}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Display */}
            {formData.service && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-700">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-semibold">
                    Price: ${formData.price}
                  </span>
                </div>
              </div>
            )}

            {/* Date & Time */}
            <div className="grid grid-2 gap-6">
              <div className="form-group">
                <label className="form-label">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Preferred Date
                </label>
                <input 
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-input"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Preferred Time
                </label>
                <select 
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select time...</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Player Information */}
            <div className="p-6 bg-gray-50 rounded-lg space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5" />
                Player Information
              </h3>
              
              <div className="grid grid-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Player Name</label>
                  <input 
                    type="text"
                    name="playerName"
                    value={formData.playerName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter player's full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Player Age</label>
                  <input 
                    type="number"
                    name="playerAge"
                    value={formData.playerAge}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Age"
                    min="5"
                    max="99"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Parent/Guardian Name</label>
                <input 
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter parent/guardian name"
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="p-6 bg-gray-50 rounded-lg space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Contact Information
              </h3>
              
              <div className="grid grid-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="form-group">
              <label className="form-label">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Additional Notes (Optional)
              </label>
              <textarea 
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Any specific goals, concerns, or requests..."
                rows={4}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {/* Submit Buttons */}
            <div className="pt-6 space-y-4">
              <button 
                type="submit"
                className="btn btn-primary w-full text-lg py-4 flex items-center justify-center gap-2"
                disabled={submitting || !formData.service || !formData.date || !formData.time || !formData.playerName || !formData.phone}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting Booking...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Submit Booking Request
                  </>
                )}
              </button>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="flex-grow h-px bg-gray-200"></div>
                  <span className="px-4 text-sm text-gray-500">or use alternative booking methods</span>
                  <div className="flex-grow h-px bg-gray-200"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="btn btn-secondary text-lg py-4 flex items-center justify-center gap-2"
                    disabled={!formData.service || !formData.date || !formData.time || !formData.playerName || !formData.phone}
                  >
                    <MessageSquare className="w-5 h-5" />
                    Book via WhatsApp
                  </button>
                  
                  <CalendlyWidget 
                    buttonText="Book with Calendly"
                    className="btn btn-secondary w-full text-lg py-4"
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Submit Booking:</strong> Saves to our system, we'll confirm within 24 hours<br/>
                  <strong>WhatsApp:</strong> Send request directly to Coach Larry's phone<br/>
                  <strong>Calendly:</strong> See real-time availability (if configured)
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-sm bg-gray-50">
        <div className="container text-center">
          <h3 className="mb-4">Need Help with Booking?</h3>
          <p className="text-gray-600 mb-6">
            Contact us directly if you have any questions or need assistance with booking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:407-519-0984" 
              className="btn btn-secondary"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call 407-519-0984
            </a>
            <a 
              href="https://wa.me/14075190984" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}