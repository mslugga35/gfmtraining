import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const GalleryHero = () => {
  return (
    <section className="hero bg-gray-50">
      <div className="container">
        {/* Large Brand Logo */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 transform hover:scale-105 transition-transform duration-300">
            <Image 
              src="/gfm_logo.webp" 
              alt="GFM Training Academy" 
              width={200} 
              height={200} 
              className="w-auto h-auto"
              priority
            />
          </div>
        </div>
        <h1 className="mb-6">Training Gallery</h1>
        <p className="mb-8">
          See our training in action. Explore photos and videos from training sessions, 
          tournaments, and special events. Click any image to book a similar training session.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/booking" className="btn btn-primary group">
            Book Training
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/services" className="btn btn-secondary">
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryHero;