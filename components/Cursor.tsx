'use client';
import { useEffect, useState, useRef } from 'react';
export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    
    setIsVisible(true);
    const updatePosition = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-[9999] h-8 w-8 rounded-full border-2 border-white mix-blend-difference transition-transform duration-75"
      style={{ 
        left: `${pos.x}px`, 
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
      aria-hidden="true"
    />
  );
}
