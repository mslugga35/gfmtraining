'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { 
  Upload, 
  X, 
  Video, 
  Send, 
  AlertCircle, 
  CheckCircle,
  Info,
  Loader2,
  Camera,
  Smartphone,
  HelpCircle
} from 'lucide-react';

interface UploadFormData {
  title: string;
  description: string;
  videoFile: File | null;
  category: 'batting' | 'pitching' | 'fielding' | 'running' | 'general';
  requestFeedback: boolean;
  urgency: 'low' | 'normal' | 'high';
  specificQuestions: string;
}

export default function PlayerVideoUploadPage() {
  const { user } = useUser();
  const router = useRouter();
  
  const [formData, setFormData] = useState<UploadFormData>({
    title: '',
    description: '',
    videoFile: null,
    category: 'general',
    requestFeedback: true,
    urgency: 'normal',
    specificQuestions: ''
  });
  
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState('');

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
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('video/')) {
      setError('Please upload a video file (MP4, MOV, AVI)');
      return;
    }
    
    // Validate file size (500MB limit)
    const maxSize = 500 * 1024 * 1024; // 500MB
    if (file.size > maxSize) {
      setError('Video file is too large. Maximum size is 500MB.');
      return;
    }
    
    setError('');
    setFormData(prev => ({ ...prev, videoFile: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.videoFile || !formData.title) {
      setError('Please provide a video file and title.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Create form data for upload
      const uploadData = new FormData();
      uploadData.append('video', formData.videoFile);
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('category', formData.category);
      uploadData.append('requestFeedback', formData.requestFeedback.toString());
      uploadData.append('urgency', formData.urgency);
      uploadData.append('specificQuestions', formData.specificQuestions);
      uploadData.append('playerId', user?.id || '');
      uploadData.append('playerName', user?.fullName || 'Player');

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      // Mock API call - replace with actual upload
      const response = await fetch('/api/player-videos', {
        method: 'POST',
        body: uploadData
      });

      clearInterval(interval);
      setUploadProgress(100);

      if (response.ok) {
        const data = await response.json();
        
        // Send notification to Coach Larry if feedback requested
        if (formData.requestFeedback) {
          await sendCoachNotification(data.videoId);
        }
        
        setUploadSuccess(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            title: '',
            description: '',
            videoFile: null,
            category: 'general',
            requestFeedback: true,
            urgency: 'normal',
            specificQuestions: ''
          });
          setUploadSuccess(false);
          router.push('/dashboard/videos');
        }, 3000);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload video. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const sendCoachNotification = async (videoId: string) => {
    try {
      // Send email notification to Coach Larry
      await fetch('/api/notifications/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'video_review_request',
          videoId,
          playerName: user?.fullName,
          title: formData.title,
          urgency: formData.urgency,
          category: formData.category,
          questions: formData.specificQuestions
        })
      });
    } catch (error) {
      console.error('Failed to send coach notification:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Upload Training Video</h1>
          <p className="text-gray-400">
            Share your practice or game footage with Coach Larry for professional analysis
          </p>
        </div>

        {/* Success Message */}
        {uploadSuccess && (
          <div className="mb-6 p-4 bg-green-600 bg-opacity-20 border border-green-500 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <h3 className="text-green-400 font-semibold">Video uploaded successfully!</h3>
                <p className="text-green-300 text-sm mt-1">
                  Coach Larry has been notified and will review your video soon.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-600 bg-opacity-20 border border-red-500 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Video Upload Area */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Video className="h-5 w-5 mr-2 text-red-500" />
              Video File
            </h3>
            
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-red-400 bg-red-50 bg-opacity-5' 
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
                disabled={uploading}
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
                  {!uploading && (
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, videoFile: null }))}
                      className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div>
                    <p className="text-white">
                      <span className="font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-gray-400 text-sm">MP4, MOV, AVI up to 500MB</p>
                  </div>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Camera className="h-4 w-4 mr-1" />
                      Camera
                    </span>
                    <span className="flex items-center">
                      <Smartphone className="h-4 w-4 mr-1" />
                      Phone
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Recording Tips */}
            <div className="mt-4 p-3 bg-blue-600 bg-opacity-20 rounded-lg">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                <div className="text-sm text-blue-300">
                  <p className="font-semibold mb-1">Recording Tips:</p>
                  <ul className="space-y-1">
                    <li>• Film in landscape mode for best quality</li>
                    <li>• Ensure good lighting and stable camera</li>
                    <li>• Include multiple angles if possible</li>
                    <li>• Keep videos under 20 minutes for faster review</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Video Details */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Video Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Batting Practice - Need help with swing"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                  disabled={uploading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what you're working on, any specific concerns..."
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  disabled={uploading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    disabled={uploading}
                  >
                    <option value="general">General</option>
                    <option value="batting">Batting</option>
                    <option value="pitching">Pitching</option>
                    <option value="fielding">Fielding</option>
                    <option value="running">Base Running</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Review Urgency
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    disabled={uploading}
                  >
                    <option value="low">Low - Review when convenient</option>
                    <option value="normal">Normal - Within 2-3 days</option>
                    <option value="high">High - Need feedback ASAP</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Request */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-red-500" />
              Request Feedback
            </h3>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="requestFeedback"
                  checked={formData.requestFeedback}
                  onChange={(e) => setFormData(prev => ({ ...prev, requestFeedback: e.target.checked }))}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  disabled={uploading}
                />
                <label htmlFor="requestFeedback" className="ml-2 text-white">
                  Request Coach Larry's analysis and feedback
                </label>
              </div>

              {formData.requestFeedback && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Specific Questions or Areas of Focus
                  </label>
                  <textarea
                    value={formData.specificQuestions}
                    onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: e.target.value }))}
                    placeholder="What would you like Coach Larry to focus on? Any specific techniques or issues?"
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    disabled={uploading}
                  />
                  
                  <div className="mt-3 p-3 bg-yellow-600 bg-opacity-20 rounded-lg">
                    <div className="flex items-start">
                      <HelpCircle className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
                      <div className="text-sm text-yellow-300">
                        <p className="font-semibold mb-1">Coach Larry will provide:</p>
                        <ul className="space-y-1">
                          <li>• Video analysis with annotations</li>
                          <li>• Technique corrections with visual markup</li>
                          <li>• Timestamped feedback notes</li>
                          <li>• Personalized improvement plan</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white flex items-center">
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading video...
                </span>
                <span className="text-white">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-red-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || !formData.videoFile || !formData.title}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Upload Video
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { MessageSquare } from 'lucide-react';