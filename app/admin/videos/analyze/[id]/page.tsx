'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import VideoAnalyzer from '@/app/components/video/VideoAnalyzer';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  Save, 
  Share2, 
  MessageSquare,
  Send,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  playerId: string;
  playerName: string;
  uploadDate: string;
  annotations: any[];
  coachNotes: string;
}

interface CoachNote {
  id: string;
  timestamp: number;
  note: string;
  category: 'technique' | 'improvement' | 'strength' | 'focus';
  priority: 'low' | 'medium' | 'high';
}

export default function VideoAnalyzePage() {
  const params = useParams();
  const router = useRouter();
  const videoId = params.id as string;
  
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [coachNotes, setCoachNotes] = useState<CoachNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [noteCategory, setNoteCategory] = useState<'technique' | 'improvement' | 'strength' | 'focus'>('technique');
  const [notePriority, setNotePriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    fetchVideo();
  }, [videoId]);

  const fetchVideo = async () => {
    try {
      const response = await fetch(`/api/videos/${videoId}`);
      if (response.ok) {
        const data = await response.json();
        setVideo(data.video);
        if (data.video.coachNotes) {
          setCoachNotes(JSON.parse(data.video.coachNotes) || []);
        }
      }
    } catch (error) {
      console.error('Error fetching video:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAnnotations = async (annotations: any[]) => {
    setSaving(true);
    try {
      const response = await fetch('/api/videos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoId,
          annotations,
          coachNotes: JSON.stringify(coachNotes)
        })
      });
      
      if (response.ok) {
        setSavedMessage('Analysis saved successfully!');
        setTimeout(() => setSavedMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error saving annotations:', error);
      setSavedMessage('Error saving analysis. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const addCoachNote = () => {
    if (!newNote.trim()) return;
    
    const note: CoachNote = {
      id: Date.now().toString(),
      timestamp: currentTimestamp,
      note: newNote,
      category: noteCategory,
      priority: notePriority
    };
    
    setCoachNotes([...coachNotes, note]);
    setNewNote('');
  };

  const deleteNote = (noteId: string) => {
    setCoachNotes(coachNotes.filter(n => n.id !== noteId));
  };

  const shareWithPlayer = async () => {
    // Send notification to player about new feedback
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: video?.playerId,
          title: 'New Video Feedback',
          message: `Coach has provided feedback on "${video?.title}"`,
          type: 'video_feedback'
        })
      });
      
      if (response.ok) {
        setSavedMessage('Feedback shared with player!');
        setTimeout(() => setSavedMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error sharing feedback:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Video not found</h2>
          <Link href="/admin/videos" className="text-red-400 hover:text-red-300">
            Back to Videos
          </Link>
        </div>
      </div>
    );
  }

  // Mock video URL for testing
  const mockVideoUrl = video.videoUrl || 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/videos"
                className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">{video.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {video.playerName}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(video.uploadDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {savedMessage && (
                <div className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {savedMessage}
                </div>
              )}
              <button
                onClick={shareWithPlayer}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share with Player
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Analyzer */}
          <div className="lg:col-span-2">
            <VideoAnalyzer
              videoUrl={mockVideoUrl}
              videoId={videoId}
              onSaveAnnotations={handleSaveAnnotations}
              initialAnnotations={video.annotations || []}
              playerName={video.playerName}
            />
            
            {/* Video Description */}
            {video.description && (
              <div className="mt-6 bg-gray-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Description</h3>
                <p className="text-gray-300">{video.description}</p>
              </div>
            )}
          </div>

          {/* Sidebar - Coach Notes */}
          <div className="space-y-6">
            {/* Add New Note */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-red-500" />
                Coach Notes
              </h3>
              
              <div className="space-y-3 mb-4">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add your coaching feedback..."
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows={3}
                />
                
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={noteCategory}
                    onChange={(e) => setNoteCategory(e.target.value as any)}
                    className="px-3 py-2 bg-gray-700 text-white rounded-lg text-sm"
                  >
                    <option value="technique">Technique</option>
                    <option value="improvement">Improvement</option>
                    <option value="strength">Strength</option>
                    <option value="focus">Focus Area</option>
                  </select>
                  
                  <select
                    value={notePriority}
                    onChange={(e) => setNotePriority(e.target.value as any)}
                    className="px-3 py-2 bg-gray-700 text-white rounded-lg text-sm"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
                
                <button
                  onClick={addCoachNote}
                  disabled={!newNote.trim()}
                  className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Add Note
                </button>
              </div>
              
              {/* Notes List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {coachNotes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-gray-700 rounded-lg p-3 border-l-4"
                    style={{
                      borderLeftColor: 
                        note.priority === 'high' ? '#EF4444' :
                        note.priority === 'medium' ? '#F59E0B' :
                        '#10B981'
                    }}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span className={`text-xs px-2 py-1 rounded ${
                        note.category === 'technique' ? 'bg-blue-600' :
                        note.category === 'improvement' ? 'bg-green-600' :
                        note.category === 'strength' ? 'bg-purple-600' :
                        'bg-orange-600'
                      } text-white`}>
                        {note.category}
                      </span>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-gray-200 text-sm mb-1">{note.note}</p>
                    <p className="text-gray-400 text-xs">
                      @ {formatTime(note.timestamp)}
                    </p>
                  </div>
                ))}
                
                {coachNotes.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    No notes yet. Add feedback above.
                  </p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleSaveAnnotations([])}
                  disabled={saving}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Saving...' : 'Save All Changes'}
                </button>
                
                <button
                  onClick={() => window.print()}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </button>
                
                <Link
                  href={`/admin/players/${video.playerId}`}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                >
                  <User className="h-4 w-4 mr-2" />
                  View Player Profile
                </Link>
              </div>
            </div>

            {/* Analysis Tips */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3">Analysis Tips</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Use slow motion (0.25x - 0.5x) to analyze technique
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Draw angles to check body positioning
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Use frame-by-frame for critical moments
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Capture key frames for comparison
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Add timestamped notes for player review
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}