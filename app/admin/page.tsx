import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Users, Video, Calendar, ShoppingBag, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with actual API calls
const mockStats = {
  totalPlayers: 45,
  activeVideos: 127,
  upcomingEvents: 8,
  monthlyRevenue: 12500,
  newPlayersThisMonth: 7,
  videoUploadsThisWeek: 12,
  eventRegistrations: 34,
  pendingOrders: 5,
};

const mockRecentActivity = [
  {
    id: '1',
    type: 'player_registered',
    message: 'New player Mike Johnson registered',
    timestamp: '2024-01-18T10:30:00Z',
    icon: Users,
    color: 'text-green-400'
  },
  {
    id: '2',
    type: 'video_uploaded',
    message: 'Coach Smith uploaded training video for Sarah Wilson',
    timestamp: '2024-01-18T09:15:00Z',
    icon: Video,
    color: 'text-blue-400'
  },
  {
    id: '3',
    type: 'event_created',
    message: 'Tournament Prep session scheduled for Jan 25',
    timestamp: '2024-01-18T08:45:00Z',
    icon: Calendar,
    color: 'text-purple-400'
  },
  {
    id: '4',
    type: 'order_placed',
    message: 'New merchandise order from Alex Thompson',
    timestamp: '2024-01-17T16:20:00Z',
    icon: ShoppingBag,
    color: 'text-yellow-400'
  },
];

const mockTopPerformers = [
  { name: 'Sarah Wilson', score: 94, improvement: +8 },
  { name: 'Mike Rodriguez', score: 91, improvement: +5 },
  { name: 'Emma Davis', score: 89, improvement: +12 },
  { name: 'Jake Thompson', score: 87, improvement: +3 },
];

const mockUpcomingEvents = [
  {
    id: '1',
    title: 'Team Practice',
    date: '2024-01-20',
    time: '10:00 AM',
    participants: 15,
    type: 'TRAINING'
  },
  {
    id: '2',
    title: 'Skills Assessment',
    date: '2024-01-22',
    time: '2:00 PM',
    participants: 8,
    type: 'ASSESSMENT'
  },
  {
    id: '3',
    title: 'Tournament Prep',
    date: '2024-01-25',
    time: '9:00 AM',
    participants: 12,
    type: 'TOURNAMENT'
  },
];

export default async function AdminDashboard() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-blue-100">
          Manage your training facility operations and monitor performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Players</p>
              <p className="text-2xl font-bold text-white">{mockStats.totalPlayers}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">+{mockStats.newPlayersThisMonth} this month</span>
              </div>
            </div>
            <Users className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Active Videos</p>
              <p className="text-2xl font-bold text-white">{mockStats.activeVideos}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">+{mockStats.videoUploadsThisWeek} this week</span>
              </div>
            </div>
            <Video className="h-8 w-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Upcoming Events</p>
              <p className="text-2xl font-bold text-white">{mockStats.upcomingEvents}</p>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-400">{mockStats.eventRegistrations} registrations</span>
              </div>
            </div>
            <Calendar className="h-8 w-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Monthly Revenue</p>
              <p className="text-2xl font-bold text-white">${mockStats.monthlyRevenue.toLocaleString()}</p>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-400">{mockStats.pendingOrders} pending orders</span>
              </div>
            </div>
            <ShoppingBag className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            <Link 
              href="/admin/activity"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            {mockRecentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-700 ${activity.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.message}</p>
                    <p className="text-gray-400 text-xs">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Top Performers</h2>
            <Link 
              href="/admin/players"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              View all
            </Link>
          </div>
          
          <div className="space-y-3">
            {mockTopPerformers.map((player, index) => (
              <div key={player.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{player.name}</p>
                    <p className="text-gray-400 text-xs">Score: {player.score}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-green-400 text-sm">+{player.improvement}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Upcoming Events</h2>
          <Link 
            href="/admin/events"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            Manage events
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockUpcomingEvents.map((event) => (
            <div key={event.id} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-medium">{event.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  event.type === 'TRAINING' 
                    ? 'bg-blue-100 text-blue-800' 
                    : event.type === 'ASSESSMENT'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {event.type}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-2">
                {new Date(event.date).toLocaleDateString()} at {event.time}
              </p>
              <p className="text-gray-300 text-sm">
                {event.participants} participants registered
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link 
          href="/admin/players"
          className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
        >
          <Users className="h-8 w-8 text-blue-400 mb-2" />
          <h3 className="text-white font-medium">Manage Players</h3>
          <p className="text-gray-400 text-sm">Add, edit, and view player profiles</p>
        </Link>

        <Link 
          href="/admin/videos/upload"
          className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
        >
          <Video className="h-8 w-8 text-purple-400 mb-2" />
          <h3 className="text-white font-medium">Upload Video</h3>
          <p className="text-gray-400 text-sm">Upload training videos for players</p>
        </Link>

        <Link 
          href="/admin/events"
          className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
        >
          <Calendar className="h-8 w-8 text-green-400 mb-2" />
          <h3 className="text-white font-medium">Schedule Event</h3>
          <p className="text-gray-400 text-sm">Create and manage training events</p>
        </Link>

        <Link 
          href="/admin/shop"
          className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
        >
          <ShoppingBag className="h-8 w-8 text-yellow-400 mb-2" />
          <h3 className="text-white font-medium">Manage Shop</h3>
          <p className="text-gray-400 text-sm">Add and manage merchandise</p>
        </Link>
      </div>
    </div>
  );
}