import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import CalendlyWidget from '../CalendlyWidget';

const ServicesSection = () => {
  const featuredServices = [
    {
      name: "1 Hour Hitting Lesson",
      price: 85,
      description: "Personalized hitting instruction to improve technique and power"
    },
    {
      name: "90 Min Hitting & Bat Speed",
      price: 120,
      description: "Extended hitting session focused on bat speed development"
    },
    {
      name: "1 Hour Infield Fielding",
      price: 85,
      description: "Comprehensive infield defensive skills training"
    },
    {
      name: "1 Hour Outfield Defense",
      price: 85,
      description: "Outfield positioning, footwork, and catching technique"
    },
    {
      name: "1 Hour Throwing Lesson",
      price: 85,
      description: "Arm strength and throwing mechanics improvement"
    },
    {
      name: "1 Hour Base Running",
      price: 85,
      description: "Speed training and base running strategy"
    }
  ];

  return (
    <section className="section relative overflow-hidden">
      {/* Dual Logo Watermark Background */}
      <div className="logo-watermark">
        <Image 
          src="/gfm_logo.webp" 
          alt="" 
          width={300} 
          height={300} 
          className="object-contain" 
        />
        <Image 
          src="/gfm_logo.webp" 
          alt="" 
          width={300} 
          height={300} 
          className="object-contain" 
        />
      </div>
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="mb-4">Our Training Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional baseball training designed to help players of all ages reach their potential.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid mb-8">
          {featuredServices.map((service, index) => (
            <div key={index} className="service-card">
              <h3 className="mb-2">{service.name}</h3>
              <div className="price">${service.price}</div>
              <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
              <Link 
                href={`/booking?service=${encodeURIComponent(service.name)}&price=${service.price}`}
                className="btn btn-primary w-full group"
              >
                Book Now
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* View All Services & Quick Booking */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/services" className="btn btn-secondary">
              View All Services
            </Link>
            <CalendlyWidget 
              buttonText="Quick Book with Calendly"
              className="btn btn-primary"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;