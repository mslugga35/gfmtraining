'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, ReactNode } from 'react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
  glowEffect?: boolean;
  shadowEffect?: boolean;
  scaleOnHover?: boolean;
  rotateOnHover?: boolean;
  onClick?: () => void;
  href?: string;
  background?: string;
  borderGradient?: boolean;
  floatingElements?: boolean;
  style?: React.CSSProperties;
}

const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  tiltStrength = 0.3,
  glowEffect = true,
  shadowEffect = true,
  scaleOnHover = true,
  rotateOnHover = true,
  onClick,
  href,
  background = 'rgba(255, 255, 255, 0.95)',
  borderGradient = true,
  floatingElements = true,
  style = {}
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring animations for smooth movement
  const springConfig = { stiffness: 300, damping: 30 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  // Transform the mouse position to rotation values
  const rotateX = useTransform(springY, [-0.5, 0.5], [15 * tiltStrength, -15 * tiltStrength]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15 * tiltStrength, 15 * tiltStrength]);
  
  // Transform for glow effect
  const glowX = useTransform(springX, [-0.5, 0.5], ['-50%', '50%']);
  const glowY = useTransform(springY, [-0.5, 0.5], ['-50%', '50%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize mouse position to -0.5 to 0.5
    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;
    
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleClick = () => {
    if (href) {
      window.location.href = href;
    }
    onClick?.();
  };

  const Component = motion.div;

  return (
    <Component
      ref={cardRef}
      className={`
        relative cursor-pointer select-none
        ${className}
      `}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      animate={{
        scale: isHovered && scaleOnHover ? 1.05 : 1,
        rotateX: rotateOnHover ? rotateX : 0,
        rotateY: rotateOnHover ? rotateY : 0,
        z: isHovered ? 50 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Main card container */}
      <motion.div
        className="relative overflow-hidden rounded-2xl backdrop-blur-md"
        style={{
          background,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          boxShadow: shadowEffect && isHovered
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 50px rgba(220, 38, 38, 0.2)'
            : shadowEffect
            ? '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            : 'none',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated border gradient */}
        {borderGradient && (
          <motion.div
            className="absolute inset-0 rounded-2xl p-[2px]"
            style={{
              background: 'linear-gradient(45deg, #dc2626, #1e40af, #dc2626)',
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: isHovered ? '100% 100%' : '0% 0%',
              opacity: isHovered ? 1 : 0.3,
            }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="w-full h-full rounded-2xl"
              style={{ background }}
            />
          </motion.div>
        )}

        {/* Glow effect */}
        {glowEffect && (
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.4) 0%, transparent 70%)',
              filter: 'blur(20px)',
              transform: 'scale(1.1)',
              x: glowX,
              y: glowY,
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1.3 : 1.1,
            }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
            transform: 'translateX(-100%) skewX(-20deg)',
          }}
          animate={{
            transform: isHovered 
              ? 'translateX(100%) skewX(-20deg)' 
              : 'translateX(-100%) skewX(-20deg)',
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />

        {/* Content container */}
        <motion.div
          className="relative z-10 p-6"
          style={{
            transformStyle: 'preserve-3d',
          }}
          animate={{
            z: isHovered ? 20 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>

        {/* Floating elements */}
        {floatingElements && isHovered && (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-red-500 to-blue-500 opacity-60"
                style={{
                  width: Math.random() * 6 + 2,
                  height: Math.random() * 6 + 2,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </>
        )}

        {/* Corner accents */}
        <motion.div
          className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-red-500 rounded-tl-lg opacity-0"
          animate={{
            opacity: isHovered ? 0.8 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
        
        <motion.div
          className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-blue-500 rounded-br-lg opacity-0"
          animate={{
            opacity: isHovered ? 0.8 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3, delay: 0.2 }}
        />

        {/* Particle trail effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${springX}px ${springY}px, rgba(220, 38, 38, 0.1) 0%, transparent 30%)`,
            }}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.div>

      {/* 3D depth layers */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 opacity-20"
        style={{
          transform: 'translateZ(-10px) scale(0.98)',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          opacity: isHovered ? 0.3 : 0.1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 opacity-15"
        style={{
          transform: 'translateZ(-20px) scale(0.96)',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          opacity: isHovered ? 0.2 : 0.05,
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
    </Component>
  );
};

export default Card3D;