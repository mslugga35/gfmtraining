'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Individual Training',
    description: 'Personalized one-on-one sessions focused on your specific needs and goals',
    price: '$85/session',
    features: ['Hitting Mechanics', 'Fielding Fundamentals', 'Mental Approach']
  },
  {
    title: 'Team Training',
    description: 'Group sessions for teams looking to improve together and build chemistry',
    price: 'Contact for pricing',
    features: ['Team Dynamics', 'Position-Specific Work', 'Game Situations']
  },
  {
    title: 'Speed & Agility',
    description: 'Athletic performance training to increase speed, power, and reaction time',
    price: '$85/session',
    features: ['Sprint Mechanics', 'First Step Quickness', 'Lateral Movement']
  }
];

export default function MinimalServices() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black text-black mb-4">
            PROFESSIONAL TRAINING
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional private individual and team training for baseball and softball players of all ages
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-black text-black mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>
              <div className="text-3xl font-black text-red-600 mb-6">
                {service.price}
              </div>
              <ul className="space-y-2 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/booking"
                className="inline-flex items-center font-bold text-black hover:text-red-600 transition-colors group"
              >
                Book Session
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Working with Tanner Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto bg-white p-12 rounded-3xl">
            <h3 className="text-3xl font-black text-black mb-4">
              PROVEN RESULTS
            </h3>
            <p className="text-xl text-gray-700 mb-6">
              "Working with my son Tanner to improve his bat path"
            </p>
            <p className="text-lg text-gray-600">
              Our personalized approach helps every player reach their full potential through dedicated coaching and proven techniques.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}