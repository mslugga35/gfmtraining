'use client';

import { useState } from 'react';
import { Upload, X, Video, User, FileText, Eye, EyeOff } from 'lucide-react';

// Mock players data - replace with actual API call
const mockPlayers = [
  { id: '1', name: 'Sarah Wilson', team: 'Varsity' },
  { id: '2', name: 'Mike Rodriguez', team: 'Varsity' },
  { id: '3', name: 'Emma Davis', team: 'JV' },
  { id: '4', name: 'Jake Thompson', team: 'JV' },
  { id: '5', name: 'Alex Chen', team: 'Academy' },
];

interface UploadFormData {
  playerId: string;
  title: string;
  description: string;
  isPrivate: boolean;
  videoFile: File | null;
  thumbnail: File | null;
}

export default function VideoUploadPage() {
  const [formData, setFormData] = useState<UploadFormData>({
    playerId: '',
    title: '',
    description: '',
    isPrivate: true,
    videoFile: null,
    thumbnail: null,
  });
  
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        setFormData(prev => ({ ...prev, videoFile: file }));
      } else {
        alert('Please upload a video file.');
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('video/')) {
        setFormData(prev => ({ ...prev, videoFile: file }));
      } else {
        alert('Please upload a video file.');
      }
    }
  };

  const handleThumbnailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setFormData(prev => ({ ...prev, thumbnail: file }));
      } else {
        alert('Please upload an image file.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.videoFile || !formData.playerId || !formData.title) {
      alert('Please fill in all required fields and select a video file.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          // Reset form
          setFormData({
            playerId: '',
            title: '',
            description: '',
            isPrivate: true,
            videoFile: null,
            thumbnail: null,
          });
          alert('Video uploaded successfully!');
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    // In a real app, you would upload to your backend/cloud storage here
    try {
      // Mock API call
      console.log('Uploading video...', formData);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploading(false);
      clearInterval(interval);
    }
  };

  const selectedPlayer = mockPlayers.find(p => p.id === formData.playerId);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Upload Training Video</h1>
        <p className="text-gray-400 mt-1">
          Upload videos for specific players with annotations and notes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Video Upload Area */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Video File</h3>
              
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-400 bg-blue-50 bg-opacity-5' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {formData.videoFile ? (
                  <div className="space-y-3">
                    <Video className="mx-auto h-12 w-12 text-green-400" />
                    <div>
                      <p className="text-white font-medium">{formData.videoFile.name}</p>
                      <p className="text-gray-400 text-sm">
                        {(formData.videoFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, videoFile: null }))}
                      className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div>
                      <p className="text-white">
                        <span className="font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-gray-400">MP4, MOV, AVI up to 500MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Player Selection */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Select Player</h3>
              
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  Player *
                </label>
                <select
                  value={formData.playerId}
                  onChange={(e) => setFormData(prev => ({ ...prev, playerId: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a player...</option>
                  {mockPlayers.map((player) => (
                    <option key={player.id} value={player.id}>
                      {player.name} ({player.team})
                    </option>
                  ))}
                </select>
                
                {selectedPlayer && (
                  <div className="flex items-center mt-2 p-2 bg-gray-700 rounded-md">
                    <User className="h-4 w-4 text-blue-400 mr-2" />
                    <span className="text-white text-sm">
                      {selectedPlayer.name} - {selectedPlayer.team}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Video Details */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Video Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Batting Practice - Week 3"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what this video covers, areas of focus, coach notes..."
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Thumbnail (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailInput}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                  {formData.thumbnail && (
                    <p className="text-sm text-green-400 mt-1">
                      {formData.thumbnail.name} selected
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPrivate"
                    checked={formData.isPrivate}
                    onChange={(e) => setFormData(prev => ({ ...prev, isPrivate: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPrivate" className="ml-2 block text-sm text-gray-300">
                    <div className="flex items-center">
                      {formData.isPrivate ? (
                        <EyeOff className="h-4 w-4 mr-1" />
                      ) : (
                        <Eye className="h-4 w-4 mr-1" />
                      )}
                      Private video (only visible to this player)
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading || !formData.videoFile || !formData.playerId || !formData.title}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : 'Upload Video'}
              </button>
            </div>

            {/* Upload Progress */}
            {uploading && (
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white">Uploading video...</span>
                  <span className="text-white">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upload Tips */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Upload Tips</h3>
            
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>Use descriptive titles that include the skill focus and date</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>Include detailed descriptions to help players understand the focus areas</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>Videos are private by default - only the selected player can view them</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>You can add annotations and notes after uploading</p>
              </div>
            </div>
          </div>

          {/* Recent Uploads */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Uploads</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-8 bg-gray-600 rounded flex items-center justify-center">
                  <Video className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">Batting Practice - Sarah</p>
                  <p className="text-gray-400 text-xs">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-8 bg-gray-600 rounded flex items-center justify-center">
                  <Video className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">Pitching Form - Mike</p>
                  <p className="text-gray-400 text-xs">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}