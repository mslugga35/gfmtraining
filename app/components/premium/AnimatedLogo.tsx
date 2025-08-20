'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface AnimatedLogoProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  drawAnimation?: boolean;
  glowEffect?: boolean;
  autoPlay?: boolean;
  delay?: number;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  src = '/gfm_logo.webp',
  alt = 'GFM Training Academy',
  width = 200,
  height = 200,
  className = '',
  drawAnimation = true,
  glowEffect = true,
  autoPlay = true,
  delay = 0
}) => {
  const controls = useAnimation();
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => {
        controls.start('visible');
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [controls, autoPlay, delay]);

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: -15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.2,
      }
    }
  };

  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      }
    }
  };

  const glowVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: glowEffect ? 1 : 0,
      scale: 1.1,
      transition: {
        duration: 1,
        delay: 0.5,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
      }
    }
  };

  const pulseVariants = {
    hidden: {
      scale: 1,
    },
    visible: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }
    }
  };

  return (
    <motion.div
      ref={logoRef}
      className={`relative inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      whileHover={{
        scale: 1.1,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Glow effect background */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 rounded-full"
          variants={glowVariants}
          style={{
            background: 'radial-gradient(circle, rgba(200, 0, 0, 0.3) 0%, rgba(0, 100, 200, 0.2) 50%, transparent 70%)',
            filter: 'blur(20px)',
            zIndex: -1,
          }}
        />
      )}

      {/* Main logo container */}
      <motion.div
        className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-200 overflow-hidden"
        variants={logoVariants}
        whileHover={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          y: -5,
        }}
        style={{
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          initial={{ 
            background: 'linear-gradient(45deg, transparent, transparent)' 
          }}
          animate={{
            background: [
              'linear-gradient(45deg, rgba(200, 0, 0, 0.5) 0%, transparent 50%)',
              'linear-gradient(135deg, rgba(0, 100, 200, 0.5) 0%, transparent 50%)',
              'linear-gradient(225deg, rgba(200, 0, 0, 0.5) 0%, transparent 50%)',
              'linear-gradient(315deg, rgba(0, 100, 200, 0.5) 0%, transparent 50%)',
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            padding: '2px',
            zIndex: -1,
          }}
        />

        {/* Logo image with pulse animation */}
        <motion.div
          variants={pulseVariants}
          className="relative z-10"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="w-auto h-auto object-contain"
            priority
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
            }}
          />
        </motion.div>

        {/* Draw animation overlay for SVG-like effect */}
        {drawAnimation && (
          <motion.div
            className="absolute inset-0 border-2 border-red-500 rounded-2xl"
            initial={{
              pathLength: 0,
              opacity: 0,
            }}
            animate={{
              pathLength: 1,
              opacity: [0, 1, 0],
            }}
            transition={{
              pathLength: { duration: 2, ease: 'easeInOut' },
              opacity: { duration: 2, times: [0, 0.5, 1] },
              delay: 0.5,
            }}
            style={{
              strokeDasharray: '300',
              strokeDashoffset: '300',
            }}
          />
        )}

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 1.5,
            delay: 1,
            ease: 'easeInOut',
          }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
            transform: 'skewX(-20deg)',
          }}
        />
      </motion.div>

      {/* Floating particles effect */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-red-500 rounded-full opacity-60"
          initial={{
            x: 0,
            y: 0,
            scale: 0,
          }}
          animate={{
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: 1 + i * 0.2,
            repeat: Infinity,
            repeatDelay: 4,
            ease: 'easeOut',
          }}
          style={{
            left: '50%',
            top: '50%',
          }}
        />
      ))}
    </motion.div>
  );
};

export default AnimatedLogo;