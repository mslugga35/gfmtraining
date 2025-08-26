import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import GFMTFHeader from '../components/GFMTFHeader';

interface Service {
  name: string;
  price: number;
  description: string;
  duration: string;
}

const services: Service[] = [
  {
    name: "1 Hour Hitting Lesson",
    price: 85,
    description: "Personalized hitting instruction to improve technique and power",
    duration: "60 minutes"
  },
  {
    name: "90 Min Hitting & Bat Speed",
    price: 120,
    description: "Extended hitting session focused on bat speed development",
    duration: "90 minutes"
  },
  {
    name: "1 Hour Infield Fielding",
    price: 85,
    description: "Comprehensive infield defensive skills training",
    duration: "60 minutes"
  },
  {
    name: "1 Hour Outfield Defense",
    price: 85,
    description: "Outfield positioning, footwork, and catching technique",
    duration: "60 minutes"
  },
  {
    name: "1 Hour Throwing Lesson",
    price: 85,
    description: "Arm strength and throwing mechanics improvement",
    duration: "60 minutes"
  },
  {
    name: "1 Hour Base Running",
    price: 85,
    description: "Speed training and base running strategy",
    duration: "60 minutes"
  },
  {
    name: "1 Hour Strength Training",
    price: 85,
    description: "Baseball-specific strength and conditioning",
    duration: "60 minutes"
  },
  {
    name: "1 Hour Foot Speed & Agility",
    price: 85,
    description: "Speed development and agility training",
    duration: "60 minutes"
  },
  {
    name: "Virtual Training",
    price: 85,
    description: "Remote coaching and video analysis sessions",
    duration: "60 minutes"
  }
];

export default function ServicesPage() {
  const getServiceSlug = (serviceName: string) => {
    return serviceName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/&/g, '')
      .replace(/[^\w-]/g, '');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e5e5e5' }}>
      <GFMTFHeader />
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
      {/* Hero Section */}
      <section className="section-lg relative z-10 pt-32">
        <div className="container text-center bg-white rounded-2xl p-8 shadow-lg">
          {/* Large Brand Logo */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 transform hover:scale-105 transition-transform duration-300">
              <Image 
                src="/gfm_logo.webp" 
                alt="GFM Training Academy" 
                width={200} 
                height={200} 
                className="w-auto h-auto"
                priority
              />
            </div>
          </div>
          <h1 className="mb-6">Our Training Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional baseball training designed to help players of all ages reach their potential. 
            Each session is tailored to your specific needs and skill level.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section relative z-10">
        <div className="container bg-white rounded-2xl p-8 shadow-lg">
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <h3 className="mb-4">{service.name}</h3>
                <div className="price">${service.price}</div>
                <p className="text-gray-600 mb-2">{service.description}</p>
                <p className="text-sm text-gray-500 mb-6">{service.duration}</p>
                <div className="space-y-2">
                  <Link 
                    href={`/booking/${getServiceSlug(service.name)}`}
                    className="btn btn-primary w-full group"
                  >
                    Book with Calendar
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    href={`/booking?service=${encodeURIComponent(service.name)}&price=${service.price}`}
                    className="btn btn-secondary w-full text-sm"
                  >
                    Quick Form Booking
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section relative z-10">
        <div className="container bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-12">
            <h2 className="mb-6">Why Choose GFM Training Academy?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our mission is to help players of all ages reach their potential through personalized, 
              professional training.
            </p>
          </div>
          
          <div className="grid grid-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h3 className="mb-3">Expert Coaching</h3>
              <p className="text-gray-600">Professional instruction from experienced coaches who understand the game.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">2</span>
              </div>
              <h3 className="mb-3">Personalized Training</h3>
              <p className="text-gray-600">Each session is tailored to your specific needs and skill level.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">3</span>
              </div>
              <h3 className="mb-3">Proven Results</h3>
              <p className="text-gray-600">Our training methods have helped countless players improve their game.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section relative z-10">
        <div className="container bg-white rounded-2xl p-8 shadow-lg text-center">
          <h2 className="mb-6">Ready to Start Training?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Take the first step towards improving your baseball skills. Book your training session today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="btn btn-primary">
              Book a Session
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}