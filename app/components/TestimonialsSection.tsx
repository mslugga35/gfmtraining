'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials = [
  {
    name: 'Jake Martinez',
    role: 'High School Varsity',
    image: '/testimonial-1.jpg',
    rating: 5,
    text: 'Coach Larry transformed my hitting mechanics completely. My batting average went from .250 to .380 in just one season. His attention to detail and personalized approach made all the difference.',
    highlight: 'Batting average increased by 130 points'
  },
  {
    name: 'Sarah Thompson',
    role: 'Travel Ball Player',
    image: '/testimonial-2.jpg',
    rating: 5,
    text: 'The speed and agility training has been a game-changer. I\'m stealing more bases and my fielding range has improved dramatically. Coach Larry knows exactly how to push you to reach your potential.',
    highlight: '40% increase in stolen bases'
  },
  {
    name: 'Michael Chen',
    role: 'College Recruit',
    image: '/testimonial-3.jpg',
    rating: 5,
    text: 'Thanks to Coach Larry\'s training, I received multiple D1 scholarship offers. His strength training program and mental approach preparation were crucial for my development.',
    highlight: 'Secured D1 scholarship'
  },
  {
    name: 'Emma Rodriguez',
    role: 'Youth League All-Star',
    image: '/testimonial-4.jpg',
    rating: 5,
    text: 'My daughter loves training with Coach Larry. He makes every session fun while teaching proper fundamentals. She\'s more confident and her skills have improved tremendously.',
    highlight: 'Selected for All-Star team'
  },
  {
    name: 'David Wilson',
    role: 'Former Pro Player',
    image: '/testimonial-5.jpg',
    rating: 5,
    text: 'Even as a former pro, I learned new techniques from Coach Larry. His modern approach to training combined with old-school fundamentals is exactly what young players need.',
    highlight: 'Professional endorsement'
  }
];

export default function TestimonialsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Success <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Stories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from athletes who've transformed their game with our training programs
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            pagination={{ 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-white/30',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-red-500'
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-8 h-full border border-gray-700 hover:border-red-600/50 transition-all duration-300">
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 text-red-500 mb-4 opacity-50" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Highlight */}
                  <div className="bg-red-600/20 border border-red-600/30 rounded-lg px-4 py-2 mb-6">
                    <p className="text-red-400 font-semibold text-sm">
                      {testimonial.highlight}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-300 mb-6">
            Ready to write your own success story?
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Start Your Journey
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Add Link import
import Link from 'next/link';