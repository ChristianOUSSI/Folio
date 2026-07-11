import React from 'react';

export default function DragonMotif({ className = '' }: { className?: string }) {
  // A stylized ancient Chinese dragon motif using SVG
  return (
    <svg 
      viewBox="0 0 100 20" 
      preserveAspectRatio="none"
      className={`w-full h-full opacity-30 ${className}`} 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0,10 Q5,0 10,10 T20,10 T30,10 T40,10 T50,10 T60,10 T70,10 T80,10 T90,10 T100,10 L100,20 L0,20 Z" opacity="0.5" />
      <path d="M5,15 Q10,5 15,15 T25,15 T35,15 T45,15 T55,15 T65,15 T75,15 T85,15 T95,15 L100,20 L0,20 Z" opacity="0.3" />
      {/* Dragon Scales / Clouds Pattern */}
      <pattern id="dragon-scales" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M0 10 Q 5 0 10 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M5 15 Q 10 5 15 15" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#dragon-scales)" opacity="0.5" />
    </svg>
  );
}
