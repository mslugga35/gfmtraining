'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface LiquidCursorProps {
  size?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  color?: string;
  mixBlendMode?: string;
  zIndex?: number;
}

const LiquidCursor: React.FC<LiquidCursorProps> = ({
  size = 40,
  stiffness = 150,
  damping = 25,
  mass = 0.1,
  color = 'rgba(200, 0, 0, 0.8)',
  mixBlendMode = 'difference',
  zIndex = 9999
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { stiffness, damping, mass };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const innerCursorRef = useRef<HTMLDivElement>(null);
  const outerCursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Handle interactive elements
    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement;
      
      // Check if hovering over interactive elements
      const isInteractive = target.matches(
        'a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"]), .cursor-pointer'
      );
      
      if (isInteractive) {
        setIsHovering(true);
        
        // Get cursor text from data attribute
        const text = target.getAttribute('data-cursor-text') || 
                    target.getAttribute('aria-label') || 
                    target.textContent?.slice(0, 20) || '';
        setCursorText(text);
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    const handleElementLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    // Mouse events
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Interactive element events
    document.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseout', handleElementLeave);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseout', handleElementLeave);
      
      // Restore default cursor
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer cursor - liquid blob */}
      <motion.div
        ref={outerCursorRef}
        className="pointer-events-none fixed top-0 left-0"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          zIndex,
          mixBlendMode: mixBlendMode as any,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? 180 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        <div
          className="rounded-full"
          style={{
            width: size,
            height: size,
            background: color,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(1px)',
          }}
        >
          {/* Liquid morphing effect */}
          <div
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              animation: 'liquidMorph 3s ease-in-out infinite',
            }}
          />
        </div>
      </motion.div>

      {/* Inner cursor - precise dot */}
      <motion.div
        ref={innerCursorRef}
        className="pointer-events-none fixed top-0 left-0"
        style={{
          x: cursorX,
          y: cursorY,
          zIndex: zIndex + 1,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        <div
          className="rounded-full bg-white border-2"
          style={{
            width: 8,
            height: 8,
            borderColor: color,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 10px ${color}`,
          }}
        />
      </motion.div>

      {/* Cursor text */}
      {cursorText && isHovering && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 text-white text-sm font-bold px-3 py-1 rounded-full"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            zIndex: zIndex + 2,
            background: color,
            transform: 'translate(-50%, -150%)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
        >
          {cursorText}
        </motion.div>
      )}

      {/* Cursor trail effect */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none fixed top-0 left-0 rounded-full"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            zIndex: zIndex - i,
            mixBlendMode: 'multiply',
          }}
          animate={{
            scale: isHovering ? 0.8 - i * 0.1 : 0.6 - i * 0.1,
            opacity: 0.8 - i * 0.15,
          }}
          transition={{
            type: 'spring',
            stiffness: stiffness - i * 20,
            damping: damping + i * 5,
            delay: i * 0.02,
          }}
        >
          <div
            style={{
              width: size - i * 4,
              height: size - i * 4,
              background: `rgba(200, 0, 0, ${0.3 - i * 0.05})`,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
            }}
          />
        </motion.div>
      ))}

      {/* CSS for liquid morphing animation */}
      <style jsx global>{`
        @keyframes liquidMorph {
          0%, 100% {
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(1);
          }
          25% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: translate(-50%, -50%) scale(1.1);
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: translate(-50%, -50%) scale(0.9);
          }
          75% {
            border-radius: 40% 30% 60% 70% / 40% 70% 60% 50%;
            transform: translate(-50%, -50%) scale(1.05);
          }
        }
        
        * {
          cursor: none !important;
        }
        
        a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"]), .cursor-pointer {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default LiquidCursor;