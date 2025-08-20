'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, ReactNode } from 'react';

interface PremiumButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
  magneticStrength?: number;
  gooeyEffect?: boolean;
  glowEffect?: boolean;
  rippleEffect?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'data-cursor-text'?: string;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  magneticStrength = 0.3,
  gooeyEffect = true,
  glowEffect = true,
  rippleEffect = true,
  type = 'button',
  'data-cursor-text': cursorText
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  
  // Magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  
  // Transform values for magnetic effect
  const rotateX = useTransform(springY, [-50, 50], [5, -5]);
  const rotateY = useTransform(springX, [-50, 50], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || disabled) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    
    // Ripple effect
    if (rippleEffect && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const rippleX = e.clientX - rect.left;
      const rippleY = e.clientY - rect.top;
      
      const newRipple = {
        id: Date.now(),
        x: rippleX,
        y: rippleY
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }
    
    onClick?.();
  };

  // Button variants
  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
      color: '#ffffff',
      border: '2px solid transparent',
    },
    secondary: {
      background: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)',
      color: '#ffffff',
      border: '2px solid transparent',
    },
    outline: {
      background: 'transparent',
      color: '#dc2626',
      border: '2px solid #dc2626',
    },
    ghost: {
      background: 'rgba(220, 38, 38, 0.1)',
      color: '#dc2626',
      border: '2px solid transparent',
    }
  };

  // Size variants
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  const buttonStyles = {
    ...variants[variant],
    transition: 'all 0.3s ease',
  };

  const Component = href ? motion.a : motion.button;
  const componentProps = href 
    ? { href, as: 'a' }
    : { type, as: 'button' };

  return (
    <Component
      ref={buttonRef as any}
      className={`
        relative inline-flex items-center justify-center font-semibold rounded-xl
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
        overflow-hidden
        transform-gpu
        select-none
      `}
      style={{
        ...buttonStyles,
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={handleClick}
      disabled={disabled}
      data-cursor-text={cursorText}
      animate={{
        scale: isPressed ? 0.95 : isHovered ? 1.05 : 1,
        rotateX: disabled ? 0 : rotateX,
        rotateY: disabled ? 0 : rotateY,
        x: disabled ? 0 : springX,
        y: disabled ? 0 : springY,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      {...componentProps}
    >
      {/* Gooey background effect */}
      {gooeyEffect && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'inherit',
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
          animate={{
            opacity: isHovered ? 0.8 : 0,
            scale: isHovered ? 1.2 : 1.1,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Glow effect */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: variant === 'primary' 
              ? 'radial-gradient(circle, rgba(220, 38, 38, 0.6) 0%, transparent 70%)'
              : variant === 'secondary'
              ? 'radial-gradient(circle, rgba(30, 64, 175, 0.6) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%)',
            filter: 'blur(10px)',
            transform: 'scale(1.5)',
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.8 : 1.5,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Button content */}
      <motion.span
        className="relative z-10 flex items-center gap-2"
        animate={{
          y: isPressed ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
      >
        {children}
      </motion.span>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
          transform: 'translateX(-100%) skewX(-20deg)',
        }}
        animate={{
          transform: isHovered 
            ? 'translateX(100%) skewX(-20deg)' 
            : 'translateX(-100%) skewX(-20deg)',
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full bg-white opacity-30 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{
            width: 0,
            height: 0,
            opacity: 0.6,
          }}
          animate={{
            width: 400,
            height: 400,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Floating particles on hover */}
      {isHovered && Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-60 pointer-events-none"
          style={{
            left: `${20 + i * 30}%`,
            top: `${20 + i * 20}%`,
          }}
          animate={{
            y: [-5, -15, -5],
            x: [0, 5, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* SVG filter for gooey effect */}
      <svg className="absolute top-0 left-0 w-0 h-0">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </Component>
  );
};

export default PremiumButton;