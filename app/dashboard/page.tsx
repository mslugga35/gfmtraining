import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Video, Calendar, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with actual API calls
const mockStats = {
  totalVideos: 12,
  videosThisWeek: 3,
  upcomingEvents: 2,
  progressScore: 85,
};

const mockRecentVideos = [
  {
    id: '1',
    title: 'Batting Practice - Week 3',
    uploadDate: '2024-01-15',
    thumbnail: '/api/placeholder/320/180',
  },
  {
    id: '2', 
    title: 'Pitching Form Analysis',
    uploadDate: '2024-01-12',
    thumbnail: '/api/placeholder/320/180',
  },
  {
    id: '3',
    title: 'Fielding Drills Session',
    uploadDate: '2024-01-10',
    thumbnail: '/api/placeholder/320/180',
  },
];

const mockUpcomingEvents = [
  {
    id: '1',
    title: 'Team Practice',
    date: '2024-01-20',
    time: '10:00 AM',
    type: 'TRAINING',
  },
  {
    id: '2',
    title: 'Skills Assessment',
    date: '2024-01-22',
    time: '2:00 PM', 
    type: 'ASSESSMENT',
  },
];

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();
  
  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          Welcome back, {user?.firstName || 'Player'}!
        </h1>
        <p className="text-red-100">
          Keep up the great work. Your dedication is showing in your progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center">
            <Video className="h-8 w-8 text-blue-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Videos</p>
              <p className="text-2xl font-bold text-white">{mockStats.totalVideos}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-green-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">This Week</p>
              <p className="text-2xl font-bold text-white">{mockStats.videosThisWeek}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Upcoming Events</p>
              <p className="text-2xl font-bold text-white">{mockStats.upcomingEvents}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-yellow-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Progress Score</p>
              <p className="text-2xl font-bold text-white">{mockStats.progressScore}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Videos */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Videos</h2>
            <Link 
              href="/dashboard/videos"
              className="text-red-400 hover:text-red-300 text-sm font-medium"
            >
              View all
            </Link>
          </div>
          
          <div className="space-y-3">
            {mockRecentVideos.map((video) => (
              <Link
                key={video.id}
                href={`/dashboard/videos/${video.id}`}
                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="w-16 h-12 bg-gray-600 rounded-md mr-3 flex items-center justify-center">
                  <Video className="h-6 w-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{video.title}</p>
                  <p className="text-gray-400 text-xs">
                    {new Date(video.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Upcoming Events</h2>
            <Link 
              href="/dashboard/calendar"
              className="text-red-400 hover:text-red-300 text-sm font-medium"
            >
              View calendar
            </Link>
          </div>
          
          <div className="space-y-3">
            {mockUpcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center p-3 rounded-lg bg-gray-700"
              >
                <div className="w-12 h-12 bg-red-600 rounded-md mr-3 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{event.title}</p>
                  <p className="text-gray-400 text-xs">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  event.type === 'TRAINING' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}