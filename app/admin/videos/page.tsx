'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Video, 
  Upload, 
  Search, 
  Filter, 
  Eye, 
  Edit3,
  Trash2,
  PlayCircle,
  Users,
  Calendar,
  MoreVertical,
  ChevronRight
} from 'lucide-react';

interface VideoData {
  id: string;
  title: string;
  description: string;
  playerName: string;
  playerId: string;
  thumbnailUrl: string;
  videoUrl: string;
  uploadDate: string;
  views: number;
  duration: string;
  isPrivate: boolean;
  hasAnnotations: boolean;
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlayer, setFilterPlayer] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Mock data for testing
  const mockVideos: VideoData[] = [
    {
      id: '1',
      title: 'Batting Technique Session - Week 4',
      description: 'Focus on stance correction and swing path',
      playerName: 'Sarah Wilson',
      playerId: 'player1',
      thumbnailUrl: '/api/placeholder/300/200',
      videoUrl: '#',
      uploadDate: '2024-01-20',
      views: 12,
      duration: '15:30',
      isPrivate: true,
      hasAnnotations: true
    },
    {
      id: '2',
      title: 'Pitching Form Analysis',
      description: 'Working on release point and follow-through',
      playerName: 'Mike Rodriguez',
      playerId: 'player2',
      thumbnailUrl: '/api/placeholder/300/200',
      videoUrl: '#',
      uploadDate: '2024-01-19',
      views: 8,
      duration: '12:45',
      isPrivate: true,
      hasAnnotations: false
    },
    {
      id: '3',
      title: 'Fielding Drills - Ground Balls',
      description: 'Improving reaction time and glove positioning',
      playerName: 'Emma Davis',
      playerId: 'player3',
      thumbnailUrl: '/api/placeholder/300/200',
      videoUrl: '#',
      uploadDate: '2024-01-18',
      views: 15,
      duration: '20:00',
      isPrivate: false,
      hasAnnotations: true
    },
    {
      id: '4',
      title: 'Base Running Technique',
      description: 'Sprint mechanics and sliding practice',
      playerName: 'Jake Thompson',
      playerId: 'player4',
      thumbnailUrl: '/api/placeholder/300/200',
      videoUrl: '#',
      uploadDate: '2024-01-17',
      views: 6,
      duration: '10:15',
      isPrivate: true,
      hasAnnotations: false
    }
  ];

  useEffect(() => {
    // Simulate loading videos
    setTimeout(() => {
      setVideos(mockVideos);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          video.playerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlayer = filterPlayer === 'all' || video.playerId === filterPlayer;
    return matchesSearch && matchesPlayer;
  });

  const uniquePlayers = Array.from(new Set(videos.map(v => v.playerName)));

  const deleteVideo = (videoId: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      setVideos(videos.filter(v => v.id !== videoId));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Training Videos</h1>
          <p className="text-gray-400 mt-1">
            Manage and analyze player training videos
          </p>
        </div>
        <Link
          href="/admin/videos/upload"
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Video
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Videos</p>
              <p className="text-2xl font-bold text-white">{videos.length}</p>
            </div>
            <Video className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Views</p>
              <p className="text-2xl font-bold text-white">
                {videos.reduce((sum, v) => sum + v.views, 0)}
              </p>
            </div>
            <Eye className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">With Annotations</p>
              <p className="text-2xl font-bold text-white">
                {videos.filter(v => v.hasAnnotations).length}
              </p>
            </div>
            <Edit3 className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Players</p>
              <p className="text-2xl font-bold text-white">{uniquePlayers.length}</p>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos or players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          {/* Player Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterPlayer}
              onChange={(e) => setFilterPlayer(e.target.value)}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Players</option>
              {uniquePlayers.map(player => (
                <option key={player} value={player}>{player}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div key={video.id} className="bg-gray-800 rounded-lg overflow-hidden group">
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gray-700">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                <Link
                  href={`/admin/videos/analyze/${video.id}`}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <PlayCircle className="h-12 w-12 text-white" />
                </Link>
              </div>
              
              {/* Duration */}
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded">
                {video.duration}
              </div>
              
              {/* Private Badge */}
              {video.isPrivate && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-red-600 text-white text-xs rounded">
                  Private
                </div>
              )}
              
              {/* Annotations Badge */}
              {video.hasAnnotations && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-green-600 text-white text-xs rounded">
                  Analyzed
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="p-4">
              <h3 className="text-white font-semibold mb-1 line-clamp-1">
                {video.title}
              </h3>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                {video.description}
              </p>
              
              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {video.playerName}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(video.uploadDate).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {video.views} views
                </span>
              </div>
              
              {/* Actions */}
              <div className="flex items-center justify-between">
                <Link
                  href={`/admin/videos/analyze/${video.id}`}
                  className="flex items-center text-red-500 hover:text-red-400 text-sm font-medium"
                >
                  Analyze Video
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
                
                <div className="relative">
                  <button
                    onClick={() => setSelectedVideo(selectedVideo === video.id ? null : video.id)}
                    className="p-1 hover:bg-gray-700 rounded"
                  >
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </button>
                  
                  {selectedVideo === video.id && (
                    <div className="absolute right-0 top-8 bg-gray-700 rounded-lg shadow-lg py-2 z-10">
                      <Link
                        href={`/admin/videos/edit/${video.id}`}
                        className="flex items-center px-4 py-2 text-white hover:bg-gray-600 text-sm"
                      >
                        <Edit3 className="h-3 w-3 mr-2" />
                        Edit Details
                      </Link>
                      <button
                        onClick={() => deleteVideo(video.id)}
                        className="flex items-center px-4 py-2 text-red-400 hover:bg-gray-600 text-sm w-full"
                      >
                        <Trash2 className="h-3 w-3 mr-2" />
                        Delete Video
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <Video className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">No videos found</h3>
          <p className="text-gray-500">
            {searchTerm || filterPlayer !== 'all' 
              ? 'Try adjusting your search or filters.'
              : 'Upload your first training video to get started.'}
          </p>
        </div>
      )}
    </div>
  );
}