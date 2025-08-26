'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { 
  Video, 
  TrendingUp, 
  FileText, 
  Play, 
  Calendar,
  Clock,
  Target,
  Award,
  BookOpen,
  Download,
  Filter,
  Search,
  ChevronRight
} from 'lucide-react';
import VideoCard from '../components/player/VideoCard';
import Link from 'next/link';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  createdAt: string;
  coachNotes: string;
  tags: string[];
  category: 'technique' | 'conditioning' | 'match-analysis' | 'skills';
}

interface ProgressData {
  totalVideosWatched: number;
  totalWatchTime: number;
  weeklyProgress: number;
  skillsImprovement: Array<{ skill: string; progress: number }>;
  recentAchievements: Array<{ title: string; date: string; type: 'milestone' | 'improvement' | 'completion' }>;
}

interface TrainingNote {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
}

export default function PlayerPortalPage() {
  const { user, isLoaded } = useUser();
  const [videos, setVideos] = useState<Video[]>([]);
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [notes, setNotes] = useState<TrainingNote[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  const mockVideos: Video[] = [
    {
      id: '1',
      title: 'Batting Technique Session #1',
      description: 'Focus on stance and swing mechanics',
      thumbnail: '/api/placeholder/300/200',
      duration: 1200, // 20 minutes
      createdAt: '2024-01-15',
      coachNotes: 'Great improvement in stance. Work on follow-through.',
      tags: ['batting', 'technique', 'mechanics'],
      category: 'technique'
    },
    {
      id: '2', 
      title: 'Speed and Agility Training',
      description: 'Ladder drills and sprint mechanics',
      thumbnail: '/api/placeholder/300/200',
      duration: 900, // 15 minutes
      createdAt: '2024-01-12',
      coachNotes: 'Excellent effort. Focus on quick feet and body control.',
      tags: ['conditioning', 'speed', 'agility'],
      category: 'conditioning'
    },
    {
      id: '3',
      title: 'Game Analysis - vs Tigers',
      description: 'Breaking down at-bat situations',
      thumbnail: '/api/placeholder/300/200',
      duration: 1800, // 30 minutes
      createdAt: '2024-01-10',
      coachNotes: 'Good plate discipline. Work on reading pitch types.',
      tags: ['game-analysis', 'strategy', 'mental'],
      category: 'match-analysis'
    },
    {
      id: '4',
      title: 'Fielding Fundamentals',
      description: 'Ground ball techniques and positioning',
      thumbnail: '/api/placeholder/300/200',
      duration: 1500, // 25 minutes
      createdAt: '2024-01-08',
      coachNotes: 'Solid fundamentals. Practice reaction time drills.',
      tags: ['fielding', 'defense', 'fundamentals'],
      category: 'skills'
    }
  ];

  const mockProgress: ProgressData = {
    totalVideosWatched: 12,
    totalWatchTime: 18000, // 5 hours in seconds
    weeklyProgress: 85,
    skillsImprovement: [
      { skill: 'Batting Average', progress: 78 },
      { skill: 'Fielding %', progress: 92 },
      { skill: 'Speed (60yd)', progress: 65 },
      { skill: 'Conditioning', progress: 88 }
    ],
    recentAchievements: [
      { title: 'Completed Week 3 Training', date: '2024-01-15', type: 'completion' },
      { title: '10% Batting Average Improvement', date: '2024-01-12', type: 'improvement' },
      { title: 'Perfect Attendance - 2 Weeks', date: '2024-01-10', type: 'milestone' }
    ]
  };

  const mockNotes: TrainingNote[] = [
    {
      id: '1',
      title: 'Batting Stance Adjustment',
      content: 'Work on keeping shoulders level and maintaining balance through the swing. Practice with tee work focusing on consistent contact point.',
      date: '2024-01-15',
      category: 'Technique',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Conditioning Goals',
      content: 'Continue sprint work 3x per week. Add resistance band exercises for arm strength. Target: 60-yard dash under 7.0 seconds.',
      date: '2024-01-12',
      category: 'Fitness',
      priority: 'medium'
    }
  ];

  useEffect(() => {
    if (isLoaded && !user) {
      redirect('/sign-in');
    }

    // Simulate API loading
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setVideos(mockVideos);
      setProgress(mockProgress);
      setNotes(mockNotes);
      setLoading(false);
    };

    if (user) {
      loadData();
    }
  }, [user, isLoaded]);

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatWatchTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-white font-display uppercase tracking-tight">
                Player Portal
              </h1>
              <p className="text-gray-400 mt-2">Welcome back, {user?.firstName || 'Player'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="btn btn-outline text-sm"
              >
                Dashboard
              </Link>
              <Link 
                href="/booking" 
                className="btn btn-primary text-sm"
              >
                Book Session
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="card-dark p-6 text-center">
                <Video className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <div className="stat-number text-white">{progress?.totalVideosWatched}</div>
                <div className="stat-label">Videos Watched</div>
              </div>
              
              <div className="card-dark p-6 text-center">
                <Clock className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <div className="stat-number text-white">{progress && formatWatchTime(progress.totalWatchTime)}</div>
                <div className="stat-label">Watch Time</div>
              </div>
              
              <div className="card-dark p-6 text-center">
                <TrendingUp className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <div className="stat-number text-white">{progress?.weeklyProgress}%</div>
                <div className="stat-label">Week Progress</div>
              </div>
              
              <div className="card-dark p-6 text-center">
                <Award className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <div className="stat-number text-white">{progress?.recentAchievements.length}</div>
                <div className="stat-label">Achievements</div>
              </div>
            </div>

            {/* Video Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white font-display uppercase tracking-tight">
                  Your Videos
                </h2>
                <div className="flex items-center space-x-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search videos..."
                      className="form-input pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-red-600"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  {/* Filter */}
                  <select
                    className="form-select bg-gray-800 border-gray-700 text-white focus:border-red-600"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="technique">Technique</option>
                    <option value="conditioning">Conditioning</option>
                    <option value="match-analysis">Match Analysis</option>
                    <option value="skills">Skills</option>
                  </select>
                </div>
              </div>

              {/* Video Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onPlay={() => {/* Handle play */}}
                  />
                ))}
              </div>
              
              {filteredVideos.length === 0 && (
                <div className="text-center py-12">
                  <Video className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-400 mb-2">No videos found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>

            {/* Skills Progress */}
            <div className="card-dark p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-6 font-display uppercase tracking-tight">
                Skills Progress
              </h3>
              <div className="space-y-4">
                {progress?.skillsImprovement.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300 font-medium">{skill.skill}</span>
                      <span className="text-red-600 font-semibold">{skill.progress}%</span>
                    </div>
                    <div className="progress">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${skill.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recent Achievements */}
            <div className="card-dark p-6">
              <h3 className="text-lg font-bold text-white mb-4 font-display uppercase tracking-tight flex items-center">
                <Award className="h-5 w-5 text-red-600 mr-2" />
                Achievements
              </h3>
              <div className="space-y-3">
                {progress?.recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                      achievement.type === 'milestone' ? 'bg-yellow-500' :
                      achievement.type === 'improvement' ? 'bg-green-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{achievement.title}</p>
                      <p className="text-xs text-gray-400">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                href="/dashboard/progress" 
                className="inline-flex items-center text-red-600 text-sm font-medium mt-4 hover:text-red-500 transition-colors"
              >
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            {/* Training Notes */}
            <div className="card-dark p-6">
              <h3 className="text-lg font-bold text-white mb-4 font-display uppercase tracking-tight flex items-center">
                <FileText className="h-5 w-5 text-red-600 mr-2" />
                Training Notes
              </h3>
              <div className="space-y-4">
                {notes.slice(0, 3).map((note) => (
                  <div key={note.id} className="border-l-2 border-red-600 pl-4">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-white">{note.title}</h4>
                      <span className={`w-2 h-2 rounded-full ${
                        note.priority === 'high' ? 'bg-red-500' :
                        note.priority === 'medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}></span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{note.date}</p>
                    <p className="text-sm text-gray-300 line-clamp-3">{note.content}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-red-600 font-medium hover:text-red-500 transition-colors">
                View All Notes
              </button>
            </div>

            {/* Quick Actions */}
            <div className="card-dark p-6">
              <h3 className="text-lg font-bold text-white mb-4 font-display uppercase tracking-tight">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link 
                  href="/booking" 
                  className="w-full btn btn-primary btn-sm flex items-center justify-center"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Session
                </Link>
                <Link 
                  href="/dashboard/videos" 
                  className="w-full btn btn-outline btn-sm flex items-center justify-center"
                >
                  <Video className="h-4 w-4 mr-2" />
                  View All Videos
                </Link>
                <Link 
                  href="/dashboard/progress" 
                  className="w-full btn btn-outline btn-sm flex items-center justify-center"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Progress Report
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}