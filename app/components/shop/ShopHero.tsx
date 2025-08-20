'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Star, Truck, Shield } from 'lucide-react';

const ShopHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-blue-900/20 via-black to-gray-900"></div>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="inline-block bg-blue-400/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Official GFMTF Store
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Gear Up for
              <span className="text-green-400"> Success</span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Shop official GFMTF merchandise, training equipment, and apparel. 
              Everything you need to represent the academy and enhance your training.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <Truck className="w-5 h-5 text-green-400" />
              <span className="text-sm">Free Shipping $75+</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-sm">Quality Guarantee</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">Member Discounts</span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Shop Now</span>
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              View Catalog
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShopHero;