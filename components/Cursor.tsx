'use client';
import { useEffect, useState, useRef } from 'react';
export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);
  return (
    <div
      ref={cursorRef}
      className="pointer-none fixed left-[calc(-50%)] top-[calc(-50%)] z-[9999] h-8 w-8 rounded-full border-2 border-white mix-blend-difference transition-transform duration-200"
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      aria-hidden="true"
    />
  );
}
