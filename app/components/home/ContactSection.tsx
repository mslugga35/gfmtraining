import Link from 'next/link';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="section bg-gray-50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="mb-6">Contact Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your journey to baseball excellence? Get in touch with us today.
          </p>
        </div>

        <div className="grid grid-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <a href="tel:407-519-0984" className="text-gray-600 hover:text-black transition-colors">
                  407-519-0984
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <a href="mailto:Larrygrayson@gfmtf.com" className="text-gray-600 hover:text-black transition-colors">
                  Larrygrayson@gfmtf.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Service Areas</h3>
                <p className="text-gray-600">Central Florida & South Atlanta, Georgia</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
                <a 
                  href="https://wa.me/14075190984" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700 transition-colors font-medium"
                >
                  Message us on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <h3 className="text-2xl font-semibold mb-6">Quick Contact</h3>
            
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Ready to book your training session?
                </p>
                <Link href="/booking" className="btn btn-primary w-full mb-4">
                  Book Training Session
                </Link>
                <a 
                  href="https://wa.me/14075190984?text=Hi! I'm interested in training sessions at GFM Training Academy. Can you help me get started?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-3">Business Hours</h4>
                <p className="text-gray-600 text-sm">Available 7 days a week</p>
                <p className="text-gray-600 text-sm">Flexible scheduling available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;