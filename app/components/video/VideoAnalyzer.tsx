'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Rewind, 
  FastForward,
  Volume2,
  Maximize,
  Minimize,
  Download,
  Save,
  Pencil,
  Circle,
  Square,
  ArrowRight,
  Type,
  Eraser,
  Undo,
  Redo,
  Palette,
  Layers,
  Camera
} from 'lucide-react';

interface Annotation {
  id: string;
  timestamp: number;
  type: 'drawing' | 'text' | 'shape';
  data: any;
  color: string;
  strokeWidth: number;
}

interface VideoAnalyzerProps {
  videoUrl: string;
  videoId: string;
  onSaveAnnotations?: (annotations: Annotation[]) => void;
  initialAnnotations?: Annotation[];
  playerName?: string;
}

export default function VideoAnalyzer({ 
  videoUrl, 
  videoId, 
  onSaveAnnotations,
  initialAnnotations = [],
  playerName = 'Player'
}: VideoAnalyzerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Drawing tools
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingTool, setDrawingTool] = useState<'pen' | 'line' | 'circle' | 'rectangle' | 'arrow' | 'text' | 'eraser'>('pen');
  const [drawingColor, setDrawingColor] = useState('#FF0000');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [annotations, setAnnotations] = useState<Annotation[]>(initialAnnotations);
  const [currentAnnotation, setCurrentAnnotation] = useState<any>(null);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);

  // History for undo/redo
  const [history, setHistory] = useState<Annotation[][]>([initialAnnotations]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Playback controls
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipBackward = (seconds: number = 5) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - seconds);
    }
  };

  const skipForward = (seconds: number = 5) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + seconds);
    }
  };

  const frameBackward = () => {
    if (videoRef.current) {
      // Assuming 30fps, go back 1/30 second
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - (1/30));
    }
  };

  const frameForward = () => {
    if (videoRef.current) {
      // Assuming 30fps, go forward 1/30 second
      videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + (1/30));
    }
  };

  const changePlaybackRate = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0);
        
        // Convert to image and download
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `frame_${playerName}_${currentTime.toFixed(2)}s.png`;
            a.click();
            URL.revokeObjectURL(url);
          }
        });
      }
    }
  };

  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    
    const newAnnotation: Annotation = {
      id: Date.now().toString(),
      timestamp: currentTime,
      type: 'drawing',
      data: { 
        tool: drawingTool,
        points: [{ x, y }],
        startX: x,
        startY: y
      },
      color: drawingColor,
      strokeWidth
    };
    
    setCurrentAnnotation(newAnnotation);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentAnnotation || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (drawingTool === 'pen' || drawingTool === 'eraser') {
      setCurrentAnnotation({
        ...currentAnnotation,
        data: {
          ...currentAnnotation.data,
          points: [...currentAnnotation.data.points, { x, y }]
        }
      });
    } else {
      setCurrentAnnotation({
        ...currentAnnotation,
        data: {
          ...currentAnnotation.data,
          endX: x,
          endY: y
        }
      });
    }
  };

  const endDrawing = () => {
    if (currentAnnotation) {
      const newAnnotations = [...annotations, currentAnnotation];
      setAnnotations(newAnnotations);
      
      // Update history for undo/redo
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newAnnotations);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
    
    setIsDrawing(false);
    setCurrentAnnotation(null);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setAnnotations(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setAnnotations(history[historyIndex + 1]);
    }
  };

  const clearAnnotations = () => {
    setAnnotations([]);
    const newHistory = [...history, []];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const saveAnnotations = () => {
    if (onSaveAnnotations) {
      onSaveAnnotations(annotations);
    }
  };

  // Draw annotations on canvas
  useEffect(() => {
    if (!canvasRef.current || !videoRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    if (!showAnnotations) return;
    
    // Draw all annotations for current timestamp
    const currentAnnotations = annotations.filter(a => 
      Math.abs(a.timestamp - currentTime) < 0.1
    );
    
    currentAnnotations.forEach(annotation => {
      ctx.strokeStyle = annotation.color;
      ctx.lineWidth = annotation.strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      const data = annotation.data;
      
      if (data.tool === 'pen') {
        ctx.beginPath();
        data.points.forEach((point: any, index: number) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
      } else if (data.tool === 'line' || data.tool === 'arrow') {
        ctx.beginPath();
        ctx.moveTo(data.startX, data.startY);
        ctx.lineTo(data.endX || data.startX, data.endY || data.startY);
        ctx.stroke();
        
        if (data.tool === 'arrow') {
          // Draw arrowhead
          const angle = Math.atan2(
            (data.endY || data.startY) - data.startY,
            (data.endX || data.startX) - data.startX
          );
          const arrowLength = 15;
          
          ctx.beginPath();
          ctx.moveTo(data.endX || data.startX, data.endY || data.startY);
          ctx.lineTo(
            (data.endX || data.startX) - arrowLength * Math.cos(angle - Math.PI / 6),
            (data.endY || data.startY) - arrowLength * Math.sin(angle - Math.PI / 6)
          );
          ctx.moveTo(data.endX || data.startX, data.endY || data.startY);
          ctx.lineTo(
            (data.endX || data.startX) - arrowLength * Math.cos(angle + Math.PI / 6),
            (data.endY || data.startY) - arrowLength * Math.sin(angle + Math.PI / 6)
          );
          ctx.stroke();
        }
      } else if (data.tool === 'circle') {
        const radius = Math.sqrt(
          Math.pow((data.endX || data.startX) - data.startX, 2) +
          Math.pow((data.endY || data.startY) - data.startY, 2)
        );
        ctx.beginPath();
        ctx.arc(data.startX, data.startY, radius, 0, 2 * Math.PI);
        ctx.stroke();
      } else if (data.tool === 'rectangle') {
        ctx.beginPath();
        ctx.rect(
          data.startX,
          data.startY,
          (data.endX || data.startX) - data.startX,
          (data.endY || data.startY) - data.startY
        );
        ctx.stroke();
      }
    });
    
    // Draw current annotation if drawing
    if (currentAnnotation && isDrawing) {
      ctx.strokeStyle = currentAnnotation.color;
      ctx.lineWidth = currentAnnotation.strokeWidth;
      
      const data = currentAnnotation.data;
      
      if (data.tool === 'pen') {
        ctx.beginPath();
        data.points.forEach((point: any, index: number) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
      }
    }
  }, [annotations, currentAnnotation, currentTime, showAnnotations, isDrawing]);

  // Update time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    
    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    
    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="relative">
        {/* Video and Canvas Container */}
        <div className="relative bg-black aspect-video">
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-auto cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
          />
        </div>

        {/* Drawing Tools Bar */}
        <div className="absolute top-4 left-4 bg-gray-800 bg-opacity-90 rounded-lg p-2 flex items-center space-x-2">
          <button
            onClick={() => setDrawingTool('pen')}
            className={`p-2 rounded ${drawingTool === 'pen' ? 'bg-red-600' : 'bg-gray-700'} text-white hover:bg-red-500`}
            title="Pen Tool"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDrawingTool('line')}
            className={`p-2 rounded ${drawingTool === 'line' ? 'bg-red-600' : 'bg-gray-700'} text-white hover:bg-red-500`}
            title="Line Tool"
          >
            <Minimize className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDrawingTool('arrow')}
            className={`p-2 rounded ${drawingTool === 'arrow' ? 'bg-red-600' : 'bg-gray-700'} text-white hover:bg-red-500`}
            title="Arrow Tool"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDrawingTool('circle')}
            className={`p-2 rounded ${drawingTool === 'circle' ? 'bg-red-600' : 'bg-gray-700'} text-white hover:bg-red-500`}
            title="Circle Tool"
          >
            <Circle className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDrawingTool('rectangle')}
            className={`p-2 rounded ${drawingTool === 'rectangle' ? 'bg-red-600' : 'bg-gray-700'} text-white hover:bg-red-500`}
            title="Rectangle Tool"
          >
            <Square className="h-4 w-4" />
          </button>
          
          <div className="h-6 w-px bg-gray-600"></div>
          
          <input
            type="color"
            value={drawingColor}
            onChange={(e) => setDrawingColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer"
            title="Color Picker"
          />
          
          <select
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="bg-gray-700 text-white text-sm rounded px-2 py-1"
            title="Line Width"
          >
            <option value="1">1px</option>
            <option value="3">3px</option>
            <option value="5">5px</option>
            <option value="8">8px</option>
          </select>
          
          <div className="h-6 w-px bg-gray-600"></div>
          
          <button
            onClick={undo}
            className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </button>
          <button
            onClick={redo}
            className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </button>
          <button
            onClick={clearAnnotations}
            className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            title="Clear All"
          >
            <Eraser className="h-4 w-4" />
          </button>
          
          <div className="h-6 w-px bg-gray-600"></div>
          
          <button
            onClick={() => setShowAnnotations(!showAnnotations)}
            className={`p-2 rounded ${showAnnotations ? 'bg-green-600' : 'bg-gray-700'} text-white hover:bg-green-500`}
            title="Toggle Annotations"
          >
            <Layers className="h-4 w-4" />
          </button>
          <button
            onClick={saveAnnotations}
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            title="Save Annotations"
          >
            <Save className="h-4 w-4" />
          </button>
        </div>

        {/* Playback Speed Controls */}
        <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-90 rounded-lg p-2">
          <select
            value={playbackRate}
            onChange={(e) => changePlaybackRate(Number(e.target.value))}
            className="bg-gray-700 text-white text-sm rounded px-3 py-1"
          >
            <option value="0.25">0.25x</option>
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
      </div>

      {/* Video Controls */}
      <div className="bg-gray-800 p-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={(e) => {
              const time = Number(e.target.value);
              if (videoRef.current) {
                videoRef.current.currentTime = time;
              }
            }}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Frame by Frame */}
            <button
              onClick={frameBackward}
              className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              title="Previous Frame"
            >
              <SkipBack className="h-4 w-4" />
            </button>
            
            {/* Skip Backward */}
            <button
              onClick={() => skipBackward(5)}
              className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              title="Skip Back 5s"
            >
              <Rewind className="h-4 w-4" />
            </button>
            
            {/* Play/Pause */}
            <button
              onClick={togglePlayPause}
              className="p-3 bg-red-600 text-white rounded-full hover:bg-red-500"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            
            {/* Skip Forward */}
            <button
              onClick={() => skipForward(5)}
              className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              title="Skip Forward 5s"
            >
              <FastForward className="h-4 w-4" />
            </button>
            
            {/* Frame Forward */}
            <button
              onClick={frameForward}
              className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              title="Next Frame"
            >
              <SkipForward className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {/* Capture Frame */}
            <button
              onClick={captureFrame}
              className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              title="Capture Frame"
            >
              <Camera className="h-4 w-4" />
            </button>
            
            {/* Volume */}
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4 text-gray-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => {
                  const vol = Number(e.target.value);
                  if (videoRef.current) {
                    videoRef.current.volume = vol;
                  }
                  setVolume(vol);
                }}
                className="w-20"
              />
            </div>
            
            {/* Fullscreen */}
            <button
              onClick={() => {
                if (videoRef.current) {
                  if (document.fullscreenElement) {
                    document.exitFullscreen();
                    setIsFullscreen(false);
                  } else {
                    videoRef.current.requestFullscreen();
                    setIsFullscreen(true);
                  }
                }
              }}
              className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Annotation Timeline */}
      <div className="bg-gray-900 border-t border-gray-700 p-4">
        <h3 className="text-white font-semibold mb-2">Annotations Timeline</h3>
        <div className="relative h-12 bg-gray-800 rounded-lg overflow-hidden">
          {annotations.map((annotation) => {
            const position = (annotation.timestamp / duration) * 100;
            return (
              <div
                key={annotation.id}
                className="absolute top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full cursor-pointer hover:scale-150 transition-transform"
                style={{ 
                  left: `${position}%`,
                  backgroundColor: annotation.color 
                }}
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = annotation.timestamp;
                  }
                }}
                title={`Jump to ${formatTime(annotation.timestamp)}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}