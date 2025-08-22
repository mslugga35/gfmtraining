'use client';

import Image from 'next/image';

export default function ModernHero() {
  return (
    <section className="min-h-screen bg-white flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6">
              <span className="text-black">TRUST YOUR</span>
              <br />
              <span className="text-red-600">PROCESS</span>
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              At GFM Training Academy our mission is to help players of all ages reach their potential!
            </p>

            <div className="grid grid-cols-3 gap-8 mb-10">
              <div>
                <div className="text-4xl font-black text-red-600">500+</div>
                <div className="text-sm text-gray-600 mt-1">Players Trained</div>
              </div>
              <div>
                <div className="text-4xl font-black text-red-600">15+</div>
                <div className="text-sm text-gray-600 mt-1">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-black text-red-600">95%</div>
                <div className="text-sm text-gray-600 mt-1">Success Rate</div>
              </div>
            </div>

            <div className="flex gap-4">
              <a 
                href="/booking"
                className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
              >
                Start Training Today
              </a>
              <a 
                href="#services"
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:border-red-600 hover:text-red-600 transition-colors"
              >
                View Programs
              </a>
            </div>

            <div className="mt-10 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  LG
                </div>
                <div>
                  <div className="font-bold text-lg">Coach Larry Grayson</div>
                  <div className="text-gray-600">Elite Performance Coach</div>
                  <div className="text-red-600 font-semibold">(407) 519-0984</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Logo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-600/10 blur-3xl"></div>
              <Image
                src="/gfm_logo.webp"
                alt="GFM Training Academy"
                width={500}
                height={500}
                className="relative z-10"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}