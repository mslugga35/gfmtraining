'use client';

import { useState } from 'react';
import { Play, Clock, Calendar, MessageSquare, Tag, Eye, Download, ExternalLink } from 'lucide-react';
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

interface VideoCardProps {
  video: Video;
  onPlay: () => void;
}

export default function VideoCard({ video, onPlay }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'technique': return 'bg-blue-600';
      case 'conditioning': return 'bg-green-600';
      case 'match-analysis': return 'bg-purple-600';
      case 'skills': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const getCategoryName = (category: string): string => {
    switch (category) {
      case 'technique': return 'Technique';
      case 'conditioning': return 'Conditioning';
      case 'match-analysis': return 'Match Analysis';
      case 'skills': return 'Skills';
      default: return category;
    }
  };

  return (
    <div 
      className="group relative bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl border border-gray-700 hover:border-red-600"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video bg-gray-900">
        {!imageError ? (
          <img
            src={video.thumbnail || '/api/placeholder/400/225'}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700">
            <Play className="h-16 w-16 text-gray-400" />
          </div>
        )}
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${isHovered ? 'bg-opacity-40' : 'bg-opacity-0'}`}>
          {/* Play Button */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={onPlay}
              className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-2xl transform transition-all duration-200 hover:scale-110"
            >
              <Play className="h-6 w-6 ml-1" fill="currentColor" />
            </button>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm font-medium">
            <Clock className="inline h-3 w-3 mr-1" />
            {formatDuration(video.duration)}
          </div>

          {/* Category Badge */}
          <div className={`absolute top-3 left-3 ${getCategoryColor(video.category)} text-white px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide`}>
            {getCategoryName(video.category)}
          </div>

          {/* Coach Notes Indicator */}
          {video.coachNotes && (
            <div className="absolute top-3 right-3 bg-yellow-600 text-white p-1 rounded-full">
              <MessageSquare className="h-3 w-3" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Date */}
        <div className="mb-3">
          <h3 className="font-bold text-white text-lg leading-tight mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
            {video.title}
          </h3>
          <div className="flex items-center text-gray-400 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(video.createdAt)}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
          {video.description}
        </p>

        {/* Tags */}
        {video.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {video.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
            {video.tags.length > 3 && (
              <span className="text-gray-400 text-xs">+{video.tags.length - 3} more</span>
            )}
          </div>
        )}

        {/* Coach Notes Preview */}
        {video.coachNotes && (
          <div className="bg-gray-700 rounded-lg p-3 mb-4">
            <div className="flex items-start space-x-2">
              <MessageSquare className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-yellow-500 text-xs font-semibold uppercase tracking-wide mb-1">
                  Coach Notes
                </p>
                <p className="text-gray-300 text-sm line-clamp-2">
                  {video.coachNotes}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Link
            href={`/dashboard/videos/${video.id}`}
            className="btn btn-primary btn-sm flex items-center space-x-2 flex-1 mr-2"
          >
            <Play className="h-4 w-4" />
            <span>Watch</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </button>
            
            <button 
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title="Download"
            >
              <Download className="h-4 w-4" />
            </button>
            
            <button 
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title="Open in New Tab"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 pointer-events-none ${
        isHovered ? 'border-red-600 shadow-red-600/25 shadow-2xl' : 'border-transparent'
      }`}></div>
    </div>
  );
}