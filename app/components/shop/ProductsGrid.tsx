'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Filter, Grid, List, Search, Star, ShoppingCart, Heart } from 'lucide-react';

const categories = ['All', 'Apparel', 'Equipment', 'Accessories', 'Training Gear'];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Best Sellers'];

const products = [
  {
    id: 4,
    name: 'GFMTF Hoodie',
    price: 49.99,
    originalPrice: null,
    category: 'Apparel',
    rating: 4.6,
    reviews: 78,
    image: '/placeholder-hoodie.jpg',
    inStock: true,
    colors: ['Black', 'Gray', 'Green'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 5,
    name: 'Training Gloves',
    price: 29.99,
    originalPrice: 39.99,
    category: 'Equipment',
    rating: 4.8,
    reviews: 156,
    image: '/placeholder-gloves.jpg',
    inStock: true,
    colors: ['Black', 'Brown'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 6,
    name: 'Academy Water Bottle',
    price: 19.99,
    originalPrice: null,
    category: 'Accessories',
    rating: 4.5,
    reviews: 92,
    image: '/placeholder-bottle.jpg',
    inStock: true,
    colors: ['Black/Green', 'All Black'],
    sizes: ['32oz']
  },
  {
    id: 7,
    name: 'Performance Shorts',
    price: 34.99,
    originalPrice: 44.99,
    category: 'Apparel',
    rating: 4.7,
    reviews: 134,
    image: '/placeholder-shorts.jpg',
    inStock: true,
    colors: ['Black', 'Gray', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 8,
    name: 'Training Cones Set',
    price: 24.99,
    originalPrice: null,
    category: 'Training Gear',
    rating: 4.9,
    reviews: 67,
    image: '/placeholder-cones.jpg',
    inStock: true,
    colors: ['Orange'],
    sizes: ['12-pack']
  },
  {
    id: 9,
    name: 'GFMTF Backpack',
    price: 59.99,
    originalPrice: 79.99,
    category: 'Accessories',
    rating: 4.8,
    reviews: 89,
    image: '/placeholder-backpack.jpg',
    inStock: false,
    colors: ['Black', 'Green'],
    sizes: ['One Size']
  },
  {
    id: 10,
    name: 'Compression Sleeves',
    price: 16.99,
    originalPrice: null,
    category: 'Equipment',
    rating: 4.4,
    reviews: 123,
    image: '/placeholder-sleeves.jpg',
    inStock: true,
    colors: ['Black', 'White'],
    sizes: ['S/M', 'L/XL']
  },
  {
    id: 11,
    name: 'Academy Polo Shirt',
    price: 39.99,
    originalPrice: null,
    category: 'Apparel',
    rating: 4.6,
    reviews: 95,
    image: '/placeholder-polo.jpg',
    inStock: true,
    colors: ['Black', 'Green', 'White'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 12,
    name: 'Speed Ladder',
    price: 22.99,
    originalPrice: 29.99,
    category: 'Training Gear',
    rating: 4.7,
    reviews: 78,
    image: '/placeholder-ladder.jpg',
    inStock: true,
    colors: ['Yellow'],
    sizes: ['20ft']
  }
];

const ProductsGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState<number[]>([]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-center">
            All <span className="text-green-400">Products</span>
          </h2>
          
          {/* Filters and Search */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black border border-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-green-400 transition-colors"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort and View Options */}
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-black border border-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-green-400"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>

                <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${
                      viewMode === 'grid' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${
                      viewMode === 'list' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products Grid/List */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-300 hover:transform hover:-translate-y-1 group ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Product Image */}
              <div className={`relative bg-gray-800 overflow-hidden ${
                viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'
              }`}>
                {/* Placeholder Image */}
                <div className="w-full h-full bg-gradient-to-br from-green-400/20 to-blue-400/20 flex items-center justify-center">
                  <div className="text-4xl text-gray-600">⚾</div>
                </div>

                {/* Stock Status */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
                    <span className="text-white font-semibold bg-red-600 px-3 py-1 rounded">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      wishlist.includes(product.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-white'
                    }`} 
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">
                    ({product.reviews})
                  </span>
                </div>

                {/* Product Name */}
                <h3 className={`font-semibold text-white mb-2 group-hover:text-green-400 transition-colors ${
                  viewMode === 'list' ? 'text-xl' : 'text-lg'
                }`}>
                  {product.name}
                </h3>

                {/* Category */}
                <p className="text-sm text-gray-400 mb-2">{product.category}</p>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-green-400">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Colors */}
                <div className="mb-3">
                  <p className="text-xs text-gray-400 mb-1">Colors:</p>
                  <div className="flex flex-wrap gap-1">
                    {product.colors.slice(0, 3).map((color, colorIndex) => (
                      <span
                        key={colorIndex}
                        className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
                      >
                        {color}
                      </span>
                    ))}
                    {product.colors.length > 3 && (
                      <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                        +{product.colors.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button 
                  disabled={!product.inStock}
                  className={`w-full py-2 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                    product.inStock
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Load More Products
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductsGrid;