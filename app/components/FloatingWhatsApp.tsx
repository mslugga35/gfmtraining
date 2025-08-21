'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 5 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
      // Hide tooltip after 5 seconds
      setTimeout(() => setShowTooltip(false), 5000);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsApp = () => {
    window.open('https://wa.me/14075190984?text=Hi%20Coach%20Larry,%20I\'m%20interested%20in%20training%20sessions.', '_blank');
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-20 right-0 bg-white shadow-lg rounded-lg p-3 whitespace-nowrap"
            >
              <p className="text-sm font-medium text-gray-800">
                Need help? Chat with Coach Larry! 
              </p>
              <div className="absolute bottom-0 right-8 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        >
          {/* Pulse Animation */}
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
          
          {/* Icon */}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: 90 }}
              >
                <X className="w-7 h-7 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: -90 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: 90 }}
              >
                <MessageCircle className="w-7 h-7 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-28 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">LG</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">Coach Larry Grayson</h3>
                  <p className="text-green-100 text-sm">Usually replies instantly</p>
                </div>
              </div>
            </div>

            {/* Chat Options */}
            <div className="p-4 space-y-3">
              <p className="text-gray-600 text-sm mb-4">
                Hi! How can I help you improve your game today? 
              </p>
              
              {/* Quick Actions */}
              <div className="space-y-2">
                <button
                  onClick={handleWhatsApp}
                  className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors"
                >
                  <p className="font-medium text-gray-800">Book a Training Session</p>
                  <p className="text-sm text-gray-500">Schedule your personalized training</p>
                </button>
                
                <button
                  onClick={() => {
                    window.open('https://wa.me/14075190984?text=Hi%20Coach,%20I%20have%20a%20question%20about%20the%20training%20programs.', '_blank');
                  }}
                  className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors"
                >
                  <p className="font-medium text-gray-800">Ask About Programs</p>
                  <p className="text-sm text-gray-500">Learn about our training options</p>
                </button>
                
                <button
                  onClick={() => {
                    window.open('https://wa.me/14075190984?text=Hi%20Coach,%20I\'d%20like%20to%20know%20about%20pricing%20and%20packages.', '_blank');
                  }}
                  className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors"
                >
                  <p className="font-medium text-gray-800">Pricing & Packages</p>
                  <p className="text-sm text-gray-500">Get pricing information</p>
                </button>
              </div>

              {/* Start Chat Button */}
              <button
                onClick={handleWhatsApp}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Start WhatsApp Chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}