'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const galleryImages = [
  { src: '/1.webp', caption: 'Hitting - Contact Point', category: 'hitting' },
  { src: '/2.webp', caption: 'Load & Launch Sequence', category: 'hitting' },
  { src: '/3.webp', caption: 'Conditioning - Sprint Work', category: 'conditioning' },
  { src: '/4.webp', caption: 'Arm Care & Mobility', category: 'training' },
  { src: '/5.webp', caption: 'Small Group Training', category: 'group' },
  { src: '/6.webp', caption: 'Facility - Cage Work', category: 'facility' },
  { src: '/7.webp', caption: 'Fielding Mechanics', category: 'fielding' },
  { src: '/8.webp', caption: 'Game Preparation', category: 'game' },
  { src: '/9.webp', caption: 'Mental Training', category: 'mental' },
  { src: '/10.webp', caption: 'Team Development', category: 'team' }
];

export default function ProfessionalGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            SEE THE <span className="text-[#DC2626]">PROCESS</span> IN ACTION
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Real work, real reps, real results. Take a look inside our training facility and see how champions are made.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {['all', 'hitting', 'fielding', 'conditioning', 'facility'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#DC2626] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredImages.map((image, index) => (
            <motion.figure
              key={image.src}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative group overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.caption}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Hover Overlay with Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-bold text-lg drop-shadow-lg">
                      {image.caption}
                    </p>
                  </div>
                </div>
              </div>
            </motion.figure>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to start your training journey?
          </p>
          <motion.a
            href="/booking"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-[#DC2626] text-white font-bold text-lg px-10 py-4 rounded-xl hover:bg-black transition-all duration-300 shadow-lg"
          >
            Schedule Your First Session
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}