import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Video, Eye, Calendar, Search, Filter } from 'lucide-react';

// Mock data - replace with actual API calls
const mockVideos = [
  {
    id: '1',
    title: 'Batting Practice - Week 3',
    description: 'Focus on swing mechanics and follow-through',
    uploadDate: '2024-01-15T10:30:00Z',
    views: 5,
    thumbnailUrl: '/api/placeholder/320/180',
    duration: '12:34',
    uploadedBy: 'Coach Johnson',
  },
  {
    id: '2',
    title: 'Pitching Form Analysis',
    description: 'Breaking down your delivery and release point',
    uploadDate: '2024-01-12T14:15:00Z',
    views: 8,
    thumbnailUrl: '/api/placeholder/320/180',
    duration: '8:22',
    uploadedBy: 'Coach Smith',
  },
  {
    id: '3',
    title: 'Fielding Drills Session',
    description: 'Ground ball technique and positioning',
    uploadDate: '2024-01-10T16:45:00Z',
    views: 12,
    thumbnailUrl: '/api/placeholder/320/180',
    duration: '15:18',
    uploadedBy: 'Coach Johnson',
  },
  {
    id: '4',
    title: 'Base Running Fundamentals',
    description: 'Speed and technique improvements',
    uploadDate: '2024-01-08T09:20:00Z',
    views: 6,
    thumbnailUrl: '/api/placeholder/320/180',
    duration: '10:56',
    uploadedBy: 'Coach Williams',
  },
];

export default async function VideosPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Training Videos</h1>
          <p className="text-gray-400 mt-1">
            {mockVideos.length} videos available for review
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search videos..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockVideos.map((video) => (
          <Link
            key={video.id}
            href={`/dashboard/videos/${video.id}`}
            className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors group"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gray-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <Video className="h-12 w-12 text-gray-500" />
              </div>
              
              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
              
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                <div className="w-16 h-16 bg-red-600 bg-opacity-0 group-hover:bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-200">
                  <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                {video.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                {video.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>By {video.uploadedBy}</span>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {video.views}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(video.uploadDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {mockVideos.length === 0 && (
        <div className="text-center py-12">
          <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No videos yet</h3>
          <p className="text-gray-400 mb-6">
            Your training videos will appear here once your coaches upload them.
          </p>
        </div>
      )}

      {/* Pagination */}
      {mockVideos.length > 0 && (
        <div className="flex items-center justify-center space-x-2 pt-6">
          <button className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50">
            Previous
          </button>
          <span className="px-4 py-2 bg-red-600 text-white rounded-lg">1</span>
          <button className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
            Next
          </button>
        </div>
      )}
    </div>
  );
}