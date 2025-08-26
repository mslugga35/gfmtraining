'use client';

import { useRef, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
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
  Download,
  SkipBack,
  SkipForward,
  Settings,
  Maximize2,
  Minimize2,
  FileText,
  Target,
  ArrowRight,
  Minus
} from 'lucide-react';

// Dynamic fabric import to avoid SSR issues
let fabric: any = null;
if (typeof window !== 'undefined') {
  import('fabric').then((fabricModule) => {
    fabric = fabricModule.fabric;
  }).catch(() => {
    console.warn('Fabric.js not available');
  });
}

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
  title?: string;
  description?: string;
  coachNotes?: string;
}

export default function VideoPlayer({ 
  videoUrl, 
  annotations = [], 
  videoId,
  allowAnnotations = true,
  onAnnotationSave,
  title,
  description,
  coachNotes
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
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [showCoachNotes, setShowCoachNotes] = useState(false);
  const [frameByFrame, setFrameByFrame] = useState(false);

  const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
  const annotationColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'];

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current && fabric) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: false,
        selection: true,
        preserveObjectStacking: true,
      });

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
      saveCanvasState();

      // Handle annotation drawing
      let isDrawing = false;
      let startX: number, startY: number;

      canvas.on('mouse:down', (e) => {
        if (!annotationMode) return;
        
        isDrawing = true;
        const pointer = canvas.getPointer(e.e);
        startX = pointer.x;
        startY = pointer.y;

        if (annotationMode === 'pencil') {
          canvas.isDrawingMode = true;
          canvas.freeDrawingBrush.width = 3;
          canvas.freeDrawingBrush.color = '#ff0000';
        }
      });

      canvas.on('mouse:move', (e) => {
        if (!isDrawing || !annotationMode || annotationMode === 'pencil') return;

        const pointer = canvas.getPointer(e.e);
        canvas.remove(canvas.getObjects().pop()!);

        let shape;
        switch (annotationMode) {
          case 'circle':
            const radius = Math.abs(pointer.x - startX);
            shape = new fabric.Circle({
              left: startX - radius,
              top: startY - radius,
              radius,
              fill: 'transparent',
              stroke: '#ff0000',
              strokeWidth: 3,
            });
            break;
          case 'rectangle':
            shape = new fabric.Rect({
              left: Math.min(startX, pointer.x),
              top: Math.min(startY, pointer.y),
              width: Math.abs(pointer.x - startX),
              height: Math.abs(pointer.y - startY),
              fill: 'transparent',
              stroke: '#ff0000',
              strokeWidth: 3,
            });
            break;
          case 'arrow':
            const line = new fabric.Line([startX, startY, pointer.x, pointer.y], {
              stroke: '#ff0000',
              strokeWidth: 3,
            });
            
            // Add arrowhead
            const angle = Math.atan2(pointer.y - startY, pointer.x - startX);
            const arrowLength = 15;
            const arrowAngle = Math.PI / 6;
            
            const arrow1 = new fabric.Line([
              pointer.x,
              pointer.y,
              pointer.x - arrowLength * Math.cos(angle - arrowAngle),
              pointer.y - arrowLength * Math.sin(angle - arrowAngle)
            ], {
              stroke: '#ff0000',
              strokeWidth: 3,
            });
            
            const arrow2 = new fabric.Line([
              pointer.x,
              pointer.y,
              pointer.x - arrowLength * Math.cos(angle + arrowAngle),
              pointer.y - arrowLength * Math.sin(angle + arrowAngle)
            ], {
              stroke: '#ff0000',
              strokeWidth: 3,
            });
            
            const group = new fabric.Group([line, arrow1, arrow2]);
            shape = group;
            break;
        }

        if (shape) {
          canvas.add(shape);
          canvas.renderAll();
        }
      });

      canvas.on('mouse:up', () => {
        if (!isDrawing) return;
        
        isDrawing = false;
        if (annotationMode === 'pencil') {
          canvas.isDrawingMode = false;
        }
        
        saveCanvasState();
      });

      return () => {
        window.removeEventListener('resize', updateCanvasSize);
        canvas.dispose();
      };
    }
  }, []);

  const saveCanvasState = () => {
    if (fabricCanvasRef.current) {
      const state = JSON.stringify(fabricCanvasRef.current.toJSON());
      setCanvasHistory(prev => {
        const newHistory = prev.slice(0, historyStep + 1);
        newHistory.push(state);
        return newHistory.slice(-20);
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

  const clearCanvas = () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.clear();
      saveCanvasState();
    }
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

  const frameForward = () => {
    const newTime = Math.min(duration, currentTime + 1/30); // 30fps
    handleSeek(newTime);
  };

  const frameBackward = () => {
    const newTime = Math.max(0, currentTime - 1/30);
    handleSeek(newTime);
  };

  const downloadFrame = () => {
    if (fabricCanvasRef.current) {
      const dataURL = fabricCanvasRef.current.toDataURL({
        format: 'png',
        quality: 1
      });
      
      const link = document.createElement('a');
      link.download = `frame-analysis-${videoId}-${Math.floor(currentTime)}s.png`;
      link.href = dataURL;
      link.click();
    }
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
          color: '#ff0000',
          note: prompt('Add a note for this annotation (optional):') || undefined
        };
        
        onAnnotationSave(annotation);
        setAnnotationMode('');
      }
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden">
      {/* Video Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            {title && <h2 className="text-xl font-bold text-white mb-1">{title}</h2>}
            {description && <p className="text-gray-400 text-sm">{description}</p>}
          </div>
          <div className="flex items-center space-x-2">
            {coachNotes && (
              <button
                onClick={() => setShowCoachNotes(!showCoachNotes)}
                className={`p-2 rounded-lg transition-colors ${showCoachNotes ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'}`}
                title="Coach Notes"
              >
                <FileText className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={downloadFrame}
              className="p-2 bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors"
              title="Download Frame"
            >
              <Download className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Coach Notes Panel */}
        {showCoachNotes && coachNotes && (
          <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-600/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="bg-yellow-600 p-2 rounded-lg">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-yellow-400 font-semibold text-sm uppercase tracking-wide mb-2">
                  Coach Notes
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed">{coachNotes}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div 
        ref={containerRef}
        className="relative bg-black group"
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
          playbackRate={playbackRate}
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
        
        {/* Drawing Tools */}
        {allowAnnotations && (
          <div className={`absolute top-4 left-4 bg-gray-900/80 rounded-lg p-3 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`} style={{ zIndex: 30 }}>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-white text-sm font-semibold">Drawing Tools</span>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setAnnotationMode(annotationMode === 'pencil' ? '' : 'pencil')}
                  className={`p-2 rounded transition-colors ${
                    annotationMode === 'pencil' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'
                  }`}
                  title="Pencil"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setAnnotationMode(annotationMode === 'circle' ? '' : 'circle')}
                  className={`p-2 rounded transition-colors ${
                    annotationMode === 'circle' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'
                  }`}
                  title="Circle"
                >
                  <Circle className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setAnnotationMode(annotationMode === 'rectangle' ? '' : 'rectangle')}
                  className={`p-2 rounded transition-colors ${
                    annotationMode === 'rectangle' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'
                  }`}
                  title="Rectangle"
                >
                  <Square className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setAnnotationMode(annotationMode === 'arrow' ? '' : 'arrow')}
                  className={`p-2 rounded transition-colors ${
                    annotationMode === 'arrow' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'
                  }`}
                  title="Arrow"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={undo}
                  className="p-2 bg-gray-700 text-gray-400 hover:text-white rounded transition-colors"
                  title="Undo"
                >
                  <Undo className="h-4 w-4" />
                </button>
                <button
                  onClick={clearCanvas}
                  className="p-2 bg-gray-700 text-gray-400 hover:text-white rounded transition-colors"
                  title="Clear All"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onClick={saveAnnotation}
                  className="p-2 bg-green-600 text-white hover:bg-green-700 rounded transition-colors"
                  title="Save Annotation"
                >
                  <Save className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Frame-by-Frame Controls */}
        <div className={`absolute top-4 right-4 bg-gray-900/80 rounded-lg p-3 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`} style={{ zIndex: 30 }}>
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-white text-sm font-semibold">Frame Analysis</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={frameBackward}
              className="p-2 bg-gray-700 text-gray-400 hover:text-white rounded transition-colors"
              title="Previous Frame"
            >
              <SkipBack className="h-4 w-4" />
            </button>
            <button
              onClick={frameForward}
              className="p-2 bg-gray-700 text-gray-400 hover:text-white rounded transition-colors"
              title="Next Frame"
            >
              <SkipForward className="h-4 w-4" />
            </button>
            <div className="w-px h-6 bg-gray-600"></div>
            <button
              onClick={() => setPlaying(!playing)}
              className="p-2 bg-red-600 text-white hover:bg-red-700 rounded transition-colors"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
          </div>
        </div>
        
        {/* Video Controls */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 ${
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
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
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
              <div className="text-white text-sm font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

              {/* Playback Rate */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-gray-300 transition-colors flex items-center space-x-1"
                >
                  <Settings className="h-5 w-5" />
                  <span className="text-sm">{playbackRate}x</span>
                </button>
                
                {showSettings && (
                  <div className="absolute bottom-full mb-2 left-0 bg-gray-800 rounded-lg p-2 min-w-max">
                    <div className="text-white text-xs mb-2 font-semibold">Playback Speed</div>
                    {playbackRates.map((rate) => (
                      <button
                        key={rate}
                        onClick={() => {
                          setPlaybackRate(rate);
                          setShowSettings(false);
                        }}
                        className={`block w-full text-left px-3 py-1 text-sm rounded transition-colors ${
                          rate === playbackRate ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
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
            background: #dc2626;
            cursor: pointer;
          }
          
          .slider::-moz-range-thumb {
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #dc2626;
            cursor: pointer;
            border: none;
          }
        `}</style>
      </div>
    </div>
  );
}