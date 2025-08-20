'use client';

import { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { 
  Pencil, 
  Circle, 
  Square, 
  ArrowRight, 
  Type, 
  Trash2, 
  Save, 
  Undo, 
  Download,
  Palette,
  MousePointer,
  Minus
} from 'lucide-react';

interface Annotation {
  id: string;
  type: 'circle' | 'rectangle' | 'line' | 'arrow' | 'text' | 'pencil';
  timestamp: number;
  data: any;
  color: string;
  note?: string;
}

interface VideoAnnotationToolsProps {
  canvas: fabric.Canvas | null;
  annotationMode: string;
  onModeChange: (mode: string) => void;
  onSave: () => void;
  onClear: () => void;
  onUndo: () => void;
  onDownload: () => void;
  currentTime: number;
  annotations: Annotation[];
}

const colors = [
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#10b981', // Green
  '#f59e0b', // Yellow
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#14b8a6', // Teal
  '#f97316', // Orange
  '#ffffff', // White
  '#000000', // Black
];

export default function VideoAnnotationTools({
  canvas,
  annotationMode,
  onModeChange,
  onSave,
  onClear,
  onUndo,
  onDownload,
  currentTime,
  annotations
}: VideoAnnotationToolsProps) {
  const [selectedColor, setSelectedColor] = useState('#ef4444');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!canvas) return;

    // Set up drawing mode based on annotation type
    switch (annotationMode) {
      case 'pencil':
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.color = selectedColor;
        canvas.freeDrawingBrush.width = strokeWidth;
        break;
      
      case 'select':
        canvas.isDrawingMode = false;
        canvas.selection = true;
        canvas.forEachObject(obj => {
          obj.selectable = true;
        });
        break;
        
      default:
        canvas.isDrawingMode = false;
        canvas.selection = false;
        canvas.forEachObject(obj => {
          obj.selectable = false;
        });
        break;
    }

    // Mouse event handlers for shapes
    const handleMouseDown = (e: fabric.IEvent<Event>) => {
      if (!annotationMode || annotationMode === 'pencil' || annotationMode === 'select') return;
      
      const pointer = canvas.getPointer(e.e);
      setStartPoint({ x: pointer.x, y: pointer.y });
      setIsDrawing(true);
    };

    const handleMouseMove = (e: fabric.IEvent<Event>) => {
      if (!isDrawing || !startPoint || !annotationMode) return;
      
      const pointer = canvas.getPointer(e.e);
      
      // Remove previous preview object
      const objects = canvas.getObjects();
      const lastObject = objects[objects.length - 1];
      if (lastObject && lastObject.get('isPreview')) {
        canvas.remove(lastObject);
      }
      
      // Create preview object
      let previewObject: fabric.Object | null = null;
      
      switch (annotationMode) {
        case 'circle':
          const radius = Math.sqrt(
            Math.pow(pointer.x - startPoint.x, 2) + Math.pow(pointer.y - startPoint.y, 2)
          ) / 2;
          previewObject = new fabric.Circle({
            left: Math.min(startPoint.x, pointer.x),
            top: Math.min(startPoint.y, pointer.y),
            radius: radius,
            fill: 'transparent',
            stroke: selectedColor,
            strokeWidth: strokeWidth,
            selectable: false,
            isPreview: true,
          } as any);
          break;
          
        case 'rectangle':
          previewObject = new fabric.Rect({
            left: Math.min(startPoint.x, pointer.x),
            top: Math.min(startPoint.y, pointer.y),
            width: Math.abs(pointer.x - startPoint.x),
            height: Math.abs(pointer.y - startPoint.y),
            fill: 'transparent',
            stroke: selectedColor,
            strokeWidth: strokeWidth,
            selectable: false,
            isPreview: true,
          } as any);
          break;
          
        case 'line':
          previewObject = new fabric.Line([startPoint.x, startPoint.y, pointer.x, pointer.y], {
            stroke: selectedColor,
            strokeWidth: strokeWidth,
            selectable: false,
            isPreview: true,
          } as any);
          break;
          
        case 'arrow':
          const line = new fabric.Line([startPoint.x, startPoint.y, pointer.x, pointer.y], {
            stroke: selectedColor,
            strokeWidth: strokeWidth,
            selectable: false,
            isPreview: true,
          } as any);
          
          // Add arrowhead
          const angle = Math.atan2(pointer.y - startPoint.y, pointer.x - startPoint.x);
          const arrowLength = 15;
          const arrowAngle = Math.PI / 6;
          
          const arrow1 = new fabric.Line([
            pointer.x,
            pointer.y,
            pointer.x - arrowLength * Math.cos(angle - arrowAngle),
            pointer.y - arrowLength * Math.sin(angle - arrowAngle)
          ], {
            stroke: selectedColor,
            strokeWidth: strokeWidth,
            selectable: false,
            isPreview: true,
          } as any);
          
          const arrow2 = new fabric.Line([
            pointer.x,
            pointer.y,
            pointer.x - arrowLength * Math.cos(angle + arrowAngle),
            pointer.y - arrowLength * Math.sin(angle + arrowAngle)
          ], {
            stroke: selectedColor,
            strokeWidth: strokeWidth,
            selectable: false,
            isPreview: true,
          } as any);
          
          const group = new fabric.Group([line, arrow1, arrow2], {
            selectable: false,
            isPreview: true,
          } as any);
          
          previewObject = group;
          break;
      }
      
      if (previewObject) {
        canvas.add(previewObject);
        canvas.renderAll();
      }
    };

    const handleMouseUp = (e: fabric.IEvent<Event>) => {
      if (!isDrawing || !startPoint || !annotationMode) return;
      
      const pointer = canvas.getPointer(e.e);
      
      // Remove preview object
      const objects = canvas.getObjects();
      const lastObject = objects[objects.length - 1];
      if (lastObject && lastObject.get('isPreview')) {
        canvas.remove(lastObject);
      }
      
      // Create final object
      let finalObject: fabric.Object | null = null;
      
      switch (annotationMode) {
        case 'circle':
          const radius = Math.sqrt(
            Math.pow(pointer.x - startPoint.x, 2) + Math.pow(pointer.y - startPoint.y, 2)
          ) / 2;
          if (radius > 5) { // Minimum size check
            finalObject = new fabric.Circle({
              left: Math.min(startPoint.x, pointer.x),
              top: Math.min(startPoint.y, pointer.y),
              radius: radius,
              fill: 'transparent',
              stroke: selectedColor,
              strokeWidth: strokeWidth,
              selectable: false,
            });
          }
          break;
          
        case 'rectangle':
          const width = Math.abs(pointer.x - startPoint.x);
          const height = Math.abs(pointer.y - startPoint.y);
          if (width > 5 && height > 5) { // Minimum size check
            finalObject = new fabric.Rect({
              left: Math.min(startPoint.x, pointer.x),
              top: Math.min(startPoint.y, pointer.y),
              width: width,
              height: height,
              fill: 'transparent',
              stroke: selectedColor,
              strokeWidth: strokeWidth,
              selectable: false,
            });
          }
          break;
          
        case 'line':
          const lineLength = Math.sqrt(
            Math.pow(pointer.x - startPoint.x, 2) + Math.pow(pointer.y - startPoint.y, 2)
          );
          if (lineLength > 10) { // Minimum length check
            finalObject = new fabric.Line([startPoint.x, startPoint.y, pointer.x, pointer.y], {
              stroke: selectedColor,
              strokeWidth: strokeWidth,
              selectable: false,
            });
          }
          break;
          
        case 'arrow':
          const arrowLength = Math.sqrt(
            Math.pow(pointer.x - startPoint.x, 2) + Math.pow(pointer.y - startPoint.y, 2)
          );
          if (arrowLength > 10) { // Minimum length check
            const line = new fabric.Line([startPoint.x, startPoint.y, pointer.x, pointer.y], {
              stroke: selectedColor,
              strokeWidth: strokeWidth,
              selectable: false,
            });
            
            // Add arrowhead
            const angle = Math.atan2(pointer.y - startPoint.y, pointer.x - startPoint.x);
            const headLength = 15;
            const headAngle = Math.PI / 6;
            
            const arrow1 = new fabric.Line([
              pointer.x,
              pointer.y,
              pointer.x - headLength * Math.cos(angle - headAngle),
              pointer.y - headLength * Math.sin(angle - headAngle)
            ], {
              stroke: selectedColor,
              strokeWidth: strokeWidth,
              selectable: false,
            });
            
            const arrow2 = new fabric.Line([
              pointer.x,
              pointer.y,
              pointer.x - headLength * Math.cos(angle + headAngle),
              pointer.y - headLength * Math.sin(angle + headAngle)
            ], {
              stroke: selectedColor,
              strokeWidth: strokeWidth,
              selectable: false,
            });
            
            finalObject = new fabric.Group([line, arrow1, arrow2], {
              selectable: false,
            });
          }
          break;
          
        case 'text':
          const text = prompt('Enter text:');
          if (text) {
            finalObject = new fabric.Text(text, {
              left: pointer.x,
              top: pointer.y,
              fill: selectedColor,
              fontSize: 20,
              fontFamily: 'Arial',
              selectable: false,
            });
          }
          break;
      }
      
      if (finalObject) {
        canvas.add(finalObject);
        canvas.renderAll();
      }
      
      setIsDrawing(false);
      setStartPoint(null);
    };

    // Add event listeners
    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('mouse:up', handleMouseUp);

    return () => {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:move', handleMouseMove);
      canvas.off('mouse:up', handleMouseUp);
    };
  }, [canvas, annotationMode, selectedColor, strokeWidth, isDrawing, startPoint]);

  const tools = [
    { id: 'select', icon: MousePointer, label: 'Select' },
    { id: 'pencil', icon: Pencil, label: 'Draw' },
    { id: 'line', icon: Minus, label: 'Line' },
    { id: 'arrow', icon: ArrowRight, label: 'Arrow' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'text', icon: Type, label: 'Text' },
  ];

  return (
    <div className="absolute top-4 left-4 bg-black bg-opacity-75 rounded-lg p-3 space-y-3" style={{ zIndex: 30 }}>
      {/* Drawing Tools */}
      <div className="flex flex-col space-y-2">
        <div className="text-white text-xs font-medium mb-1">Tools</div>
        <div className="grid grid-cols-2 gap-1">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => onModeChange(annotationMode === tool.id ? '' : tool.id)}
                className={`p-2 rounded transition-colors ${
                  annotationMode === tool.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                title={tool.label}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Picker */}
      <div className="space-y-2">
        <div className="text-white text-xs font-medium">Color</div>
        <div className="relative">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="w-8 h-8 rounded border-2 border-gray-500"
            style={{ backgroundColor: selectedColor }}
          />
          
          {showColorPicker && (
            <div className="absolute left-0 top-10 bg-gray-800 rounded-lg p-2 grid grid-cols-5 gap-1 z-40">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color);
                    setShowColorPicker(false);
                  }}
                  className={`w-6 h-6 rounded border ${
                    selectedColor === color ? 'border-white border-2' : 'border-gray-600'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stroke Width */}
      <div className="space-y-2">
        <div className="text-white text-xs font-medium">Size</div>
        <input
          type="range"
          min="1"
          max="10"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(Number(e.target.value))}
          className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
        <div className="text-white text-xs text-center">{strokeWidth}px</div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-1">
        <button
          onClick={onUndo}
          className="w-full flex items-center justify-center p-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
          title="Undo"
        >
          <Undo className="h-4 w-4 mr-1" />
          <span className="text-xs">Undo</span>
        </button>
        
        <button
          onClick={onClear}
          className="w-full flex items-center justify-center p-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
          title="Clear All"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          <span className="text-xs">Clear</span>
        </button>
        
        <button
          onClick={onSave}
          className="w-full flex items-center justify-center p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          title="Save Annotation"
        >
          <Save className="h-4 w-4 mr-1" />
          <span className="text-xs">Save</span>
        </button>
        
        <button
          onClick={onDownload}
          className="w-full flex items-center justify-center p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          title="Download"
        >
          <Download className="h-4 w-4 mr-1" />
          <span className="text-xs">Export</span>
        </button>
      </div>

      {/* Current Annotations Count */}
      {annotations.length > 0 && (
        <div className="text-white text-xs">
          <div className="font-medium mb-1">At {Math.floor(currentTime)}s:</div>
          <div>{annotations.length} annotation{annotations.length !== 1 ? 's' : ''}</div>
        </div>
      )}
    </div>
  );
}