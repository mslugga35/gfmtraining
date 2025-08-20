import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ArrowLeft, Download, Share, Eye } from 'lucide-react';
import Link from 'next/link';
import VideoPlayer from '@/app/components/VideoPlayer';

// Mock data - replace with actual API calls
const mockVideoData = {
  '1': {
    id: '1',
    title: 'Batting Practice - Week 3',
    description: 'Focus on swing mechanics and follow-through. This session covers proper stance, timing, and contact points.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Sample video URL
    uploadDate: '2024-01-15T10:30:00Z',
    views: 5,
    duration: '12:34',
    uploadedBy: 'Coach Johnson',
    annotations: [
      {
        id: '1',
        type: 'circle',
        x: 100,
        y: 100,
        radius: 30,
        timestamp: 45.5,
        color: '#ff0000',
        note: 'Watch hand position here'
      },
      {
        id: '2', 
        type: 'arrow',
        startX: 200,
        startY: 150,
        endX: 250,
        endY: 100,
        timestamp: 120.8,
        color: '#00ff00',
        note: 'Follow through direction'
      }
    ],
    coachNotes: 'Great improvement in your stance! Focus on keeping your elbow up during the swing. Next session we\'ll work on timing with faster pitches.'
  }
};

interface VideoPageProps {
  params: {
    id: string;
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  const video = mockVideoData[params.id as keyof typeof mockVideoData];
  
  if (!video) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-white mb-4">Video Not Found</h1>
        <p className="text-gray-400 mb-6">The video you're looking for doesn't exist.</p>
        <Link 
          href="/dashboard/videos"
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Videos
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link 
          href="/dashboard/videos"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Videos
        </Link>
        
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
            <Share className="h-4 w-4 mr-2" />
            Share
          </button>
          <button className="inline-flex items-center px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Download
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Video Player */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <VideoPlayer 
              videoUrl={video.videoUrl}
              annotations={video.annotations}
              videoId={video.id}
            />
          </div>
          
          {/* Video Details */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-white mb-2">{video.title}</h1>
            
            <div className="flex items-center text-sm text-gray-400 space-x-4 mb-4">
              <span>Uploaded by {video.uploadedBy}</span>
              <span>•</span>
              <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
              <span>•</span>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {video.views} views
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">{video.description}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Coach Notes */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Coach Notes</h3>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-300 leading-relaxed">{video.coachNotes}</p>
            </div>
          </div>

          {/* Annotations List */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Annotations ({video.annotations.length})
            </h3>
            
            <div className="space-y-3">
              {video.annotations.map((annotation) => (
                <div key={annotation.id} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: annotation.color }}
                      />
                      <span className="text-sm font-medium text-white">
                        {Math.floor(annotation.timestamp / 60)}:{(annotation.timestamp % 60).toFixed(0).padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 capitalize">
                      {annotation.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{annotation.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Video Stats */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Video Stats</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Duration</span>
                <span className="text-white">{video.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Views</span>
                <span className="text-white">{video.views}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Annotations</span>
                <span className="text-white">{video.annotations.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Upload Date</span>
                <span className="text-white">
                  {new Date(video.uploadDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}