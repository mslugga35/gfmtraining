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
      <section className="relative z-10 pt-28 pb-8">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Training Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional baseball training designed to help players of all ages reach their potential. 
            Each session is tailored to your specific needs and skill level.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 py-8">
        <div className="container bg-white rounded-2xl p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                <div className="text-2xl font-bold text-red-600 mb-2">${service.price}</div>
                <p className="text-sm text-gray-600 mb-1">{service.description}</p>
                <p className="text-xs text-gray-500 mb-3">{service.duration}</p>
                <div className="space-y-2">
                  <Link 
                    href={`/booking/${getServiceSlug(service.name)}`}
                    className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative z-10 py-8">
        <div className="container bg-white rounded-2xl p-6 shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-3">Why Choose GFM Training Academy?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-red-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Expert Coaching</h3>
              <p className="text-sm text-gray-600">Professional instruction from experienced coaches.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-red-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Personalized Training</h3>
              <p className="text-sm text-gray-600">Sessions tailored to your specific needs.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-red-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Proven Results</h3>
              <p className="text-sm text-gray-600">Methods that help players improve their game.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-8 pb-12">
        <div className="container bg-red-50 rounded-2xl p-6 shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Start Training?</h2>
          <p className="text-gray-600 mb-4">
            Take the first step towards improving your baseball skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/booking" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Book a Session
            </Link>
            <Link href="/contact" className="border border-red-600 text-red-600 hover:bg-red-50 px-6 py-2 rounded-lg font-medium transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}