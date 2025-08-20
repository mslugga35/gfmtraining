import Link from 'next/link';
import { Play, ArrowRight } from 'lucide-react';

const VideoHighlights = () => {
  return (
    <section className="section bg-gray-50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="mb-6">Training Video</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch our training techniques in action and see how we help players improve their skills.
          </p>
        </div>

        {/* Featured Video */}
        <div className="max-w-4xl mx-auto">
          <div className="video-container mb-8">
            <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
              {/* Video Placeholder */}
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-green-700 transition-colors cursor-pointer">
                  <Play className="w-8 h-8 ml-1" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cleaning Up Tanner's Bat Path</h3>
                <p className="text-gray-300">See how we improve hitting mechanics through focused training</p>
              </div>
            </div>
          </div>

          {/* Video Description */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-4">Professional Training Techniques</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              This video demonstrates our approach to improving bat path mechanics. 
              Our experienced coaches work one-on-one with players to identify and correct swing issues, 
              leading to better contact and more consistent hitting performance.
            </p>
            <Link href="/booking" className="btn btn-primary group">
              Book Your Training Session
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoHighlights;