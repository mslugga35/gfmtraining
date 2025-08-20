'use client';

import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

const featuredProducts = [
  {
    id: 1,
    name: 'GFMTF Team Jersey',
    price: 45.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviews: 124,
    image: '/placeholder-jersey.jpg',
    badge: 'Best Seller',
    colors: ['Black', 'Green', 'White'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 2,
    name: 'Training Bat Pack',
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.9,
    reviews: 89,
    image: '/placeholder-bat.jpg',
    badge: 'Featured',
    colors: ['Black'],
    sizes: ['29"', '30"', '31"', '32"', '33"']
  },
  {
    id: 3,
    name: 'Academy Baseball Cap',
    price: 24.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 156,
    image: '/placeholder-cap.jpg',
    badge: 'New',
    colors: ['Black/Green', 'All Black', 'Gray'],
    sizes: ['S/M', 'L/XL']
  }
];

const FeaturedProducts = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Best Seller':
        return 'bg-green-600 text-white';
      case 'Featured':
        return 'bg-blue-600 text-white';
      case 'New':
        return 'bg-yellow-600 text-black';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Featured <span className="text-green-400">Products</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our most popular items worn and used by GFMTF academy players. 
            High-quality gear that helps you perform your best.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-300 hover:transform hover:-translate-y-2 group"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-800 overflow-hidden">
                {/* Placeholder Image */}
                <div className="w-full h-full bg-gradient-to-br from-green-400/20 to-blue-400/20 flex items-center justify-center">
                  <div className="text-6xl text-gray-600">⚾</div>
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(product.badge)}`}>
                    {product.badge}
                  </span>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <Heart 
                    className={`w-5 h-5 ${
                      wishlist.includes(product.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-white'
                    }`} 
                  />
                </button>

                {/* Quick Add to Cart (appears on hover) */}
                <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-green-400">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Color Options */}
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Colors:</p>
                  <div className="flex flex-wrap gap-1">
                    {product.colors.map((color, colorIndex) => (
                      <span
                        key={colorIndex}
                        className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Size Options */}
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-2">Sizes:</p>
                  <div className="flex flex-wrap gap-1">
                    {product.sizes.map((size, sizeIndex) => (
                      <span
                        key={sizeIndex}
                        className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Products */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            View All Products
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;