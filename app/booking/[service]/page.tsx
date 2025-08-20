'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import BookingCalendar from '../../components/BookingCalendar';

interface Service {
  name: string;
  price: number;
  description: string;
  duration: string;
  category: string;
  highlights: string[];
}

const services: Record<string, Service> = {
  "1-hour-hitting-lesson": {
    name: "1 Hour Hitting Lesson",
    price: 85,
    description: "Personalized hitting instruction to improve technique and power. Focus on stance, swing mechanics, and bat path optimization.",
    duration: "60 minutes",
    category: "Hitting",
    highlights: [
      "Stance and setup analysis",
      "Swing mechanics improvement", 
      "Bat path optimization",
      "Power generation techniques"
    ]
  },
  "90-min-hitting-bat-speed": {
    name: "90 Min Hitting & Bat Speed",
    price: 120,
    description: "Extended hitting session focused on bat speed development and advanced hitting techniques.",
    duration: "90 minutes",
    category: "Hitting",
    highlights: [
      "Advanced bat speed training",
      "Launch angle optimization",
      "Exit velocity improvement",
      "Competition simulation"
    ]
  },
  "1-hour-infield-fielding": {
    name: "1 Hour Infield Fielding",
    price: 85,
    description: "Comprehensive infield defensive skills training covering positioning, glove work, and throwing mechanics.",
    duration: "60 minutes",
    category: "Defense",
    highlights: [
      "Fielding positioning",
      "Glove work fundamentals",
      "Double play mechanics",
      "Quick release training"
    ]
  },
  "1-hour-outfield-defense": {
    name: "1 Hour Outfield Defense",
    price: 85,
    description: "Outfield positioning, footwork, and catching technique training for all outfield positions.",
    duration: "60 minutes",
    category: "Defense",
    highlights: [
      "Reading fly balls",
      "Crossover and drop step",
      "Charging technique",
      "Throwing accuracy"
    ]
  },
  "1-hour-throwing-lesson": {
    name: "1 Hour Throwing Lesson",
    price: 85,
    description: "Arm strength and throwing mechanics improvement for all positions.",
    duration: "60 minutes",
    category: "Throwing",
    highlights: [
      "Throwing mechanics",
      "Arm strength development",
      "Accuracy training",
      "Position-specific techniques"
    ]
  },
  "1-hour-base-running": {
    name: "1 Hour Base Running",
    price: 85,
    description: "Speed training and base running strategy including leads, jumps, and sliding techniques.",
    duration: "60 minutes",
    category: "Base Running",
    highlights: [
      "First step quickness",
      "Reading pitchers",
      "Sliding techniques",
      "Base running strategy"
    ]
  },
  "1-hour-strength-training": {
    name: "1 Hour Strength Training",
    price: 85,
    description: "Baseball-specific strength and conditioning to improve power, speed, and injury prevention.",
    duration: "60 minutes",
    category: "Strength",
    highlights: [
      "Explosive power training",
      "Core strengthening",
      "Injury prevention",
      "Sport-specific movements"
    ]
  },
  "1-hour-foot-speed-agility": {
    name: "1 Hour Foot Speed & Agility",
    price: 85,
    description: "Speed development and agility training to improve on-field performance.",
    duration: "60 minutes",
    category: "Speed/Agility",
    highlights: [
      "Sprint mechanics",
      "Agility ladder work",
      "Cone drill patterns",
      "Reaction time training"
    ]
  },
  "virtual-training": {
    name: "Virtual Training",
    price: 85,
    description: "Remote coaching and video analysis sessions with personalized feedback and training plans.",
    duration: "60 minutes",
    category: "Virtual",
    highlights: [
      "Video analysis",
      "Personalized feedback",
      "Training plan development",
      "Q&A sessions"
    ]
  }
};

export default function ServiceBookingPage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.service) {
      const serviceKey = params.service as string;
      const foundService = services[serviceKey];
      
      if (foundService) {
        setService(foundService);
      } else {
        // Try to find by exact name match
        const serviceByName = Object.values(services).find(s => 
          s.name.toLowerCase().replace(/\s+/g, '-') === serviceKey ||
          s.name === decodeURIComponent(serviceKey)
        );
        
        if (serviceByName) {
          setService(serviceByName);
        } else {
          // Redirect to services page if service not found
          router.push('/services');
          return;
        }
      }
    }
    setLoading(false);
  }, [params, router]);

  const handleDateTimeSelect = (date: string, time: string) => {
    if (service) {
      const bookingUrl = `/booking?service=${encodeURIComponent(service.name)}&price=${service.price}&date=${date}&time=${encodeURIComponent(time)}`;
      router.push(bookingUrl);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e5e5e5' }}>
      {/* Logo Watermark Background */}
      <div className="fixed inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
        <Image 
          src="/gfm_logo.webp" 
          alt="" 
          width={800} 
          height={800} 
          className="object-contain" 
        />
      </div>

      {/* Header */}
      <section className="section-sm relative z-10">
        <div className="container">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="mb-4">Book Your {service.name}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {service.description}
            </p>
          </div>

          {/* Service Details */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-green-600">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {service.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Session Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{service.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{service.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-bold text-green-600 text-lg">${service.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Calendar */}
      <section className="section relative z-10">
        <div className="container">
          <BookingCalendar 
            service={service}
            onDateTimeSelect={handleDateTimeSelect}
          />
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-sm bg-white relative z-10">
        <div className="container text-center">
          <h3 className="mb-4">Need Help with Booking?</h3>
          <p className="text-gray-600 mb-6">
            Contact us directly if you have any questions about this training service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:407-519-0984" 
              className="btn btn-secondary"
            >
              Call 407-519-0984
            </a>
            <a 
              href="https://wa.me/14075190984" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}