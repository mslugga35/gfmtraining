'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface MeshGradientBackgroundProps {
  className?: string;
  intensity?: number;
  speed?: number;
}

const MeshGradientBackground: React.FC<MeshGradientBackgroundProps> = ({
  className = '',
  intensity = 0.5,
  speed = 0.002
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Sports-themed color palette (baseball/softball colors)
    const colors = [
      { r: 255, g: 255, b: 255 }, // White
      { r: 220, g: 220, b: 220 }, // Light gray
      { r: 40, g: 40, b: 40 },    // Dark gray
      { r: 200, g: 0, b: 0 },     // Red (accent)
      { r: 0, g: 100, b: 200 },   // Blue (accent)
    ];

    const gridSize = 20;
    const points: Array<{
      x: number;
      y: number;
      offsetX: number;
      offsetY: number;
      colorIndex: number;
    }> = [];

    // Initialize grid points
    for (let x = 0; x <= gridSize; x++) {
      for (let y = 0; y <= gridSize; y++) {
        points.push({
          x: (x / gridSize) * canvas.width,
          y: (y / gridSize) * canvas.height,
          offsetX: Math.random() * 100,
          offsetY: Math.random() * 100,
          colorIndex: Math.floor(Math.random() * colors.length)
        });
      }
    }

    const animate = () => {
      timeRef.current += speed;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient mesh
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      // Animate gradient stops
      const time = timeRef.current;
      const color1 = colors[Math.floor((Math.sin(time) + 1) * 0.5 * colors.length) % colors.length];
      const color2 = colors[Math.floor((Math.cos(time * 1.3) + 1) * 0.5 * colors.length) % colors.length];
      const color3 = colors[Math.floor((Math.sin(time * 0.7) + 1) * 0.5 * colors.length) % colors.length];
      
      gradient.addColorStop(0, `rgba(${color1.r}, ${color1.g}, ${color1.b}, 0.1)`);
      gradient.addColorStop(0.5, `rgba(${color2.r}, ${color2.g}, ${color2.b}, 0.05)`);
      gradient.addColorStop(1, `rgba(${color3.r}, ${color3.g}, ${color3.b}, 0.1)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw animated mesh
      ctx.globalCompositeOperation = 'overlay';
      
      for (let i = 0; i < points.length - gridSize - 1; i++) {
        if ((i + 1) % (gridSize + 1) === 0) continue;
        
        const point = points[i];
        const rightPoint = points[i + 1];
        const bottomPoint = points[i + gridSize + 1];
        const bottomRightPoint = points[i + gridSize + 2];
        
        if (!rightPoint || !bottomPoint || !bottomRightPoint) continue;
        
        // Animate points
        const animatedPoint = {
          x: point.x + Math.sin(time + point.offsetX) * intensity * 50,
          y: point.y + Math.cos(time + point.offsetY) * intensity * 50
        };
        
        const animatedRight = {
          x: rightPoint.x + Math.sin(time + rightPoint.offsetX) * intensity * 50,
          y: rightPoint.y + Math.cos(time + rightPoint.offsetY) * intensity * 50
        };
        
        const animatedBottom = {
          x: bottomPoint.x + Math.sin(time + bottomPoint.offsetX) * intensity * 50,
          y: bottomPoint.y + Math.cos(time + bottomPoint.offsetY) * intensity * 50
        };
        
        const animatedBottomRight = {
          x: bottomRightPoint.x + Math.sin(time + bottomRightPoint.offsetX) * intensity * 50,
          y: bottomRightPoint.y + Math.cos(time + bottomRightPoint.offsetY) * intensity * 50
        };
        
        // Create mesh triangles
        const meshColor = colors[point.colorIndex];
        const alpha = 0.02 + Math.sin(time + point.offsetX) * 0.01;
        
        ctx.fillStyle = `rgba(${meshColor.r}, ${meshColor.g}, ${meshColor.b}, ${alpha})`;
        
        // First triangle
        ctx.beginPath();
        ctx.moveTo(animatedPoint.x, animatedPoint.y);
        ctx.lineTo(animatedRight.x, animatedRight.y);
        ctx.lineTo(animatedBottom.x, animatedBottom.y);
        ctx.closePath();
        ctx.fill();
        
        // Second triangle
        ctx.beginPath();
        ctx.moveTo(animatedRight.x, animatedRight.y);
        ctx.lineTo(animatedBottomRight.x, animatedBottomRight.y);
        ctx.lineTo(animatedBottom.x, animatedBottom.y);
        ctx.closePath();
        ctx.fill();
      }
      
      ctx.globalCompositeOperation = 'source-over';
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [intensity, speed]);

  return (
    <motion.div
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 50%, #f0f0f0 100%)'
        }}
      />
      
      {/* Overlay for additional texture */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(200, 0, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(0, 100, 200, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(40, 40, 40, 0.05) 0%, transparent 70%)
          `
        }}
      />
    </motion.div>
  );
};

export default MeshGradientBackground;