'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, Trophy, Calendar, BookOpen, Target } from 'lucide-react';

export default function FloridaVirtualPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-black text-white">GFM</span>
              <span className="text-sm font-bold text-[#DC2626] uppercase">Training Academy</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-white hover:text-[#DC2626] font-semibold">Home</Link>
              <Link href="/#programs" className="text-white hover:text-[#DC2626] font-semibold">Programs</Link>
              <Link href="/#gallery" className="text-white hover:text-[#DC2626] font-semibold">Gallery</Link>
              <Link href="/#booking" className="text-white hover:text-[#DC2626] font-semibold">Contact</Link>
              <Link href="/booking" className="px-6 py-2 bg-[#DC2626] text-white font-bold rounded-lg hover:bg-black transition-all">
                Book Session
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-main.jpg"
            alt="Baseball Training"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              <span className="text-[#DC2626]">FLORIDA VIRTUAL</span><br />
              & HOMESCHOOL TRAINING
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Specialized daytime training programs designed for Florida Virtual School and homeschool athletes. 
              Train while others are in class!
            </p>
            <Link 
              href="/#booking"
              className="inline-block px-10 py-4 bg-[#DC2626] text-white font-bold text-lg rounded-xl hover:bg-black transition-all duration-300 shadow-lg"
            >
              Schedule Your Daytime Training
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              WHY <span className="text-[#DC2626]">DAYTIME TRAINING?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take advantage of flexible scheduling while other students are in traditional classrooms
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Flexible Schedule",
                desc: "Train during traditional school hours when facilities are less crowded"
              },
              {
                icon: Users,
                title: "Small Groups",
                desc: "More personalized attention with smaller daytime training groups"
              },
              {
                icon: Trophy,
                title: "Competitive Edge",
                desc: "Get extra training hours while competitors are in class"
              },
              {
                icon: Calendar,
                title: "Year-Round",
                desc: "Consistent training throughout the school year"
              },
              {
                icon: BookOpen,
                title: "Academic Balance",
                desc: "Perfect for virtual and homeschool students"
              },
              {
                icon: Target,
                title: "Elite Focus",
                desc: "Intensive skill development during prime training hours"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-red-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon className="w-8 h-8 text-[#DC2626]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              DAYTIME <span className="text-[#DC2626]">PROGRAMS</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized training blocks designed for virtual and homeschool athletes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Morning Power Block",
                time: "9:00 AM - 11:00 AM",
                desc: "Intensive hitting mechanics and swing development",
                price: "$120/session",
                features: ["2-hour focused training", "Video analysis", "Personalized drills", "Small group (max 4)"]
              },
              {
                title: "Afternoon Skills Block", 
                time: "1:00 PM - 3:00 PM",
                desc: "Complete player development including fielding and conditioning",
                price: "$150/session",
                features: ["2-hour comprehensive training", "Hitting + fielding", "Conditioning work", "Mental approach training"]
              }
            ].map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white border-2 border-[#DC2626] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-[#DC2626] text-white px-4 py-1 rounded-full text-sm font-bold inline-block mb-4">
                  {program.time}
                </div>
                <h3 className="text-2xl font-bold mb-3">{program.title}</h3>
                <p className="text-gray-600 mb-6">{program.desc}</p>
                <div className="text-2xl font-bold text-[#DC2626] mb-6">{program.price}</div>
                <ul className="mb-8 space-y-2">
                  {program.features.map(feature => (
                    <li key={feature} className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-[#DC2626] rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/#booking"
                  className="block w-full text-center bg-[#DC2626] text-white font-bold py-3 rounded-xl hover:bg-black transition-colors"
                >
                  Book This Program
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#DC2626]">
        <div className="container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              READY TO START YOUR DAYTIME TRAINING?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join the elite group of student-athletes who train while others sit in classrooms
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#booking"
                className="px-10 py-4 bg-white text-[#DC2626] font-bold text-lg rounded-xl hover:bg-gray-100 transition-all"
              >
                Schedule Training
              </Link>
              <Link
                href="tel:407-519-0984"
                className="px-10 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white hover:text-[#DC2626] transition-all"
              >
                Call Coach Larry
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black">GFM</span>
              <span className="text-[#DC2626] font-bold text-sm">TRAINING</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm">
              <span className="text-gray-400">Mon-Sat: 9AM-6PM</span>
              <Link href="tel:407-519-0984" className="hover:text-[#DC2626] transition-colors font-semibold">
                (407) 519-0984
              </Link>
              <Link href="mailto:Larrygrayson@gfmtf.com" className="hover:text-[#DC2626] transition-colors">
                Contact
              </Link>
              <Link href="/booking" className="text-[#DC2626] font-bold hover:text-white transition-colors">
                Book Now
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-6 pt-6 border-t border-gray-800">
            <p className="text-xs text-gray-500">
              © 2025 GFM Training Academy • Central Florida & South Atlanta
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}