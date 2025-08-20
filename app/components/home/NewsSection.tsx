'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Calendar } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: '2024 Summer Academy Registration Now Open',
    excerpt: 'Join our intensive 8-week summer program designed to elevate your game to the next level. Limited spots available.',
    date: '2024-03-15',
    category: 'Academy',
    image: '/placeholder-news-1.jpg',
    readTime: '3 min read'
  },
  {
    id: 2,
    title: 'GFMTF Players Dominate Regional Championships',
    excerpt: 'Five of our academy players helped their teams secure regional titles this season, showcasing the effectiveness of our training program.',
    date: '2024-03-12',
    category: 'Success Story',
    image: '/placeholder-news-2.jpg',
    readTime: '2 min read'
  },
  {
    id: 3,
    title: 'New Video Analysis Technology Arrives',
    excerpt: 'We\'ve upgraded our video analysis system with cutting-edge technology for even more detailed swing and pitching mechanics review.',
    date: '2024-03-10',
    category: 'Technology',
    image: '/placeholder-news-3.jpg',
    readTime: '4 min read'
  }
];

const NewsSection = () => {
  return (
    <section className="py-20 bg-black">
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
            Latest <span className="text-red-400">News</span> & Updates
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Stay up to date with the latest news, player achievements, and 
            facility updates from GFMTF.
          </p>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-300 hover:transform hover:-translate-y-2 group"
            >
              {/* Image */}
              <div className="aspect-video bg-gray-800 relative overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-red-400/20 to-blue-400/20 flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-gray-600" />
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{item.readTime}</span>
                  </div>
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {item.excerpt}
                </p>

                {/* Read More Link */}
                <Link
                  href={`/news/${item.id}`}
                  className="inline-flex items-center space-x-2 text-red-400 hover:text-red-300 font-semibold transition-colors group"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All News Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/news"
            className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            <span>View All News</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Stay in the Loop
              </h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter to receive the latest updates, 
                training tips, and exclusive content delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-black border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-red-400 transition-colors"
                />
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;