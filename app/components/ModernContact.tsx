'use client';

import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function ModernContact() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black mb-4">
              <span className="text-black">GET</span>{' '}
              <span className="text-red-600">STARTED</span>
            </h2>
            <p className="text-xl text-gray-600">
              Take the first step towards reaching your full potential
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <a 
              href="tel:407-519-0984"
              className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Call Coach Grayson</div>
                <div className="text-xl font-bold">(407) 519-0984</div>
              </div>
            </a>

            <a 
              href="mailto:Larrygrayson@gfmtf.com"
              className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <Mail className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Email Us</div>
                <div className="text-xl font-bold">Larrygrayson@gfmtf.com</div>
              </div>
            </a>

            <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Training Location</div>
                <div className="text-xl font-bold">Central Florida</div>
              </div>
            </div>

            <a 
              href="tel:407-419-2087"
              className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <MessageCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Secondary Phone</div>
                <div className="text-xl font-bold">(407) 419-2087</div>
              </div>
            </a>
          </div>

          <div className="bg-red-600 text-white p-12 rounded-xl text-center">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Your Game?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join 500+ athletes who trust GFM Training Academy
            </p>
            <a 
              href="/booking"
              className="inline-block px-10 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Book Your Assessment Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}