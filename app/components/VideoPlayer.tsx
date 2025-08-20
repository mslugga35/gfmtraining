'use client';

import { useRef, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { fabric } from 'fabric';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw, 
  RotateCw,
  Pencil,
  Circle,
  Square,
  Type,
  Trash2,
  Save,
  Undo,
  Download
} from 'lucide-react';
import VideoAnnotationTools from './VideoAnnotationTools';

interface Annotation {
  id: string;
  type: 'circle' | 'rectangle' | 'line' | 'arrow' | 'text' | 'pencil';
  timestamp: number;
  data: any;
  color: string;
  note?: string;
}

interface VideoPlayerProps {
  videoUrl: string;
  annotations?: Annotation[];
  videoId: string;
  allowAnnotations?: boolean;
  onAnnotationSave?: (annotation: Annotation) => void;
}

export default function VideoPlayer({ 
  videoUrl, 
  annotations = [], 
  videoId,
  allowAnnotations = true,
  onAnnotationSave 
}: VideoPlayerProps) {
  const playerRef = useRef<ReactPlayer>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [annotationMode, setAnnotationMode] = useState<string>('');
  const [activeAnnotations, setActiveAnnotations] = useState<Annotation[]>([]);
  const [canvasHistory, setCanvasHistory] = useState<string[]>([]);
  const [historyStep, setHistoryStep] = useState(0);

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: false,
        selection: false,
        preserveObjectStacking: true,
      });

      // Set canvas size to match video
      const updateCanvasSize = () => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          canvas.setDimensions({
            width: rect.width,
            height: rect.height
          });
        }
      };

      updateCanvasSize();
      window.addEventListener('resize', updateCanvasSize);

      fabricCanvasRef.current = canvas;

      // Save initial state
      saveCanvasState();

      return () => {
        window.removeEventListener('resize', updateCanvasSize);
        canvas.dispose();
      };
    }
  }, []);

  // Load annotations for current timestamp
  useEffect(() => {
    if (fabricCanvasRef.current) {
      const relevantAnnotations = annotations.filter(
        ann => Math.abs(ann.timestamp - currentTime) < 1 // Show annotations within 1 second
      );
      
      setActiveAnnotations(relevantAnnotations);
      
      // Clear canvas and redraw annotations
      fabricCanvasRef.current.clear();
      relevantAnnotations.forEach(annotation => {
        drawAnnotation(annotation);
      });
    }
  }, [currentTime, annotations]);

  const saveCanvasState = () => {
    if (fabricCanvasRef.current) {
      const state = JSON.stringify(fabricCanvasRef.current.toJSON());
      setCanvasHistory(prev => {
        const newHistory = prev.slice(0, historyStep + 1);
        newHistory.push(state);
        return newHistory.slice(-20); // Keep last 20 states
      });
      setHistoryStep(prev => prev + 1);
    }
  };

  const undo = () => {
    if (historyStep > 0 && fabricCanvasRef.current) {
      const newStep = historyStep - 1;
      setHistoryStep(newStep);
      const state = canvasHistory[newStep];
      if (state) {
        fabricCanvasRef.current.loadFromJSON(state, () => {
          fabricCanvasRef.current?.renderAll();
        });
      }
    }
  };

  const drawAnnotation = (annotation: Annotation) => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    
    switch (annotation.type) {
      case 'circle':
        const circle = new fabric.Circle({
          left: annotation.data.x,
          top: annotation.data.y,
          radius: annotation.data.radius,
          fill: 'transparent',
          stroke: annotation.color,
          strokeWidth: 3,
          selectable: false,
        });
        canvas.add(circle);
        break;
        
      case 'rectangle':
        const rect = new fabric.Rect({
          left: annotation.data.x,
          top: annotation.data.y,
          width: annotation.data.width,
          height: annotation.data.height,
          fill: 'transparent',
          stroke: annotation.color,
          strokeWidth: 3,
          selectable: false,
        });
        canvas.add(rect);
        break;
        
      case 'arrow':
        const line = new fabric.Line([
          annotation.data.startX,
          annotation.data.startY,
          annotation.data.endX,
          annotation.data.endY
        ], {
          stroke: annotation.color,
          strokeWidth: 3,
          selectable: false,
        });
        
        // Add arrowhead
        const angle = Math.atan2(
          annotation.data.endY - annotation.data.startY,
          annotation.data.endX - annotation.data.startX
        );
        const arrowLength = 15;
        const arrowAngle = Math.PI / 6;
        
        const arrow1 = new fabric.Line([
          annotation.data.endX,
          annotation.data.endY,
          annotation.data.endX - arrowLength * Math.cos(angle - arrowAngle),
          annotation.data.endY - arrowLength * Math.sin(angle - arrowAngle)
        ], {
          stroke: annotation.color,
          strokeWidth: 3,
          selectable: false,
        });
        
        const arrow2 = new fabric.Line([
          annotation.data.endX,
          annotation.data.endY,
          annotation.data.endX - arrowLength * Math.cos(angle + arrowAngle),
          annotation.data.endY - arrowLength * Math.sin(angle + arrowAngle)
        ], {
          stroke: annotation.color,
          strokeWidth: 3,
          selectable: false,
        });
        
        canvas.add(line, arrow1, arrow2);
        break;
        
      case 'text':
        const text = new fabric.Text(annotation.data.text, {
          left: annotation.data.x,
          top: annotation.data.y,
          fill: annotation.color,
          fontSize: annotation.data.fontSize || 20,
          fontFamily: 'Arial',
          selectable: false,
        });
        canvas.add(text);
        break;
    }
    
    canvas.renderAll();
  };

  const handleProgress = (progress: { played: number; playedSeconds: number }) => {
    setCurrentTime(progress.playedSeconds);
  };

  const handleSeek = (seconds: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(seconds);
      setCurrentTime(seconds);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const saveAnnotation = () => {
    if (fabricCanvasRef.current && onAnnotationSave) {
      const objects = fabricCanvasRef.current.getObjects();
      if (objects.length > 0) {
        const lastObject = objects[objects.length - 1];
        const annotation: Annotation = {
          id: Date.now().toString(),
          type: annotationMode as any,
          timestamp: currentTime,
          data: lastObject.toObject(),
          color: '#ff0000', // Default color
          note: prompt('Add a note for this annotation (optional):') || undefined
        };
        
        onAnnotationSave(annotation);
        setAnnotationMode('');
      }
    }
  };

  const clearCanvas = () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.clear();
      saveCanvasState();
    }
  };

  const downloadAnnotations = () => {
    if (fabricCanvasRef.current) {
      const dataURL = fabricCanvasRef.current.toDataURL({
        format: 'png',
        quality: 1
      });
      
      const link = document.createElement('a');
      link.download = `annotations-${videoId}-${Math.floor(currentTime)}s.png`;
      link.href = dataURL;
      link.click();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative bg-black rounded-lg overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Player */}
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={playing}
        muted={muted}
        volume={volume}
        width="100%"
        height="100%"
        onProgress={handleProgress}
        onDuration={setDuration}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        progressInterval={100}
      />
      
      {/* Annotation Canvas Overlay */}
      {allowAnnotations && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-auto"
          style={{ zIndex: 10 }}
        />
      )}
      
      {/* Annotation Tools */}
      {allowAnnotations && (
        <VideoAnnotationTools
          canvas={fabricCanvasRef.current}
          annotationMode={annotationMode}
          onModeChange={setAnnotationMode}
          onSave={saveAnnotation}
          onClear={clearCanvas}
          onUndo={undo}
          onDownload={downloadAnnotations}
          currentTime={currentTime}
          annotations={activeAnnotations}
        />
      )}
      
      {/* Video Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ zIndex: 20 }}
      >
        {/* Progress Bar */}
        <div className="mb-4">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => handleSeek(Number(e.target.value))}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        
        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Play/Pause */}
            <button
              onClick={() => setPlaying(!playing)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </button>
            
            {/* Skip Back/Forward */}
            <button
              onClick={() => handleSeek(Math.max(0, currentTime - 10))}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => handleSeek(Math.min(duration, currentTime + 10))}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <RotateCw className="h-5 w-5" />
            </button>
            
            {/* Volume */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMuted(!muted)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            {/* Time Display */}
            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}