import React, { useState, useEffect } from 'react';

export default function Launcher({ onComplete }: { onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<{id: number, x: number, y: number, scale: number, delay: number, duration: number}[]>([]);
  const [symbols, setSymbols] = useState<{id: number, text: string, x: number, y: number, delay: number, duration: number, rotate: number}[]>([]);

  const text = "cadc code axis digital cameroun";
  const words = text.split(" ");
  const devSymbols = ["</>", "{ }", "[ ]", "()", ";", "#", "&&", "||", "=>"];

  useEffect(() => {
    // Generate random positions only on client to avoid hydration mismatch
    setStars([...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      scale: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4
    })));

    setSymbols([...Array(15)].map((_, i) => ({
      id: i,
      text: devSymbols[Math.floor(Math.random() * devSymbols.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotate: Math.random() * 360,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 10
    })));

    setMounted(true);

    const timer = setTimeout(() => {
      handleDiscover();
    }, 4500);

    const fallbackTimer = setTimeout(() => {
      onComplete?.();
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDiscover = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete?.();
    }, 1000); // Wait for CSS exit animation
  };

  if (!mounted) {
    return (
      <div 
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)' }}
      >
        <div className="flex flex-col items-center gap-4 relative z-10">
          <div className="flex flex-wrap justify-center gap-x-4 max-w-4xl px-8 text-center">
             {words.map((word, i) => (
                <span 
                  key={i} 
                  className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase"
                  style={{
                    color: i === 0 ? '#d4af37' : '#ffffff',
                    textShadow: i === 0 ? '0 0 20px rgba(212, 175, 55, 0.4)' : '0 0 20px rgba(255, 255, 255, 0.2)',
                    fontFamily: i === 0 ? 'serif' : 'sans-serif',
                  }}
                >
                  {word}
                </span>
             ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeOutBlur {
          0% { opacity: 1; filter: blur(0px); }
          100% { opacity: 0; filter: blur(10px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        }
        @keyframes floatUp {
          0% { opacity: 0; transform: translateY(0) rotate(0deg); }
          20% { opacity: 0.15; }
          80% { opacity: 0.15; }
          100% { opacity: 0; transform: translateY(-200px) rotate(360deg); }
        }
        @keyframes textReveal {
          0% { opacity: 0; transform: translateY(20px); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0px); }
        }
        @keyframes lineExpand {
          0% { width: 0%; opacity: 0; }
          50% { width: 80%; opacity: 1; }
          100% { width: 40%; opacity: 0.8; }
        }
        .launcher-exit {
          animation: fadeOutBlur 1s ease-in-out forwards;
          pointer-events: none;
        }
      `}} />
      
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden cursor-pointer ${!isVisible ? 'launcher-exit' : ''}`}
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)',
        }}
        onClick={handleDiscover}
      >
        {/* Golden Stars */}
        {stars.map((star) => (
          <div
            key={`star-${star.id}`}
            className="absolute w-1 h-1 bg-[#d4af37]"
            style={{
              left: \`\${star.x}%\`,
              top: \`\${star.y}%\`,
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
              animation: \`twinkle \${star.duration}s ease-in-out \${star.delay}s infinite\`
            }}
          />
        ))}

        {/* Web Dev Symbols */}
        {symbols.map((sym) => (
          <div
            key={`sym-${sym.id}`}
            className="absolute text-[#d4af37] opacity-0 font-mono text-xl md:text-3xl font-bold select-none"
            style={{
              left: \`\${sym.x}%\`,
              top: \`\${sym.y}%\`,
              transform: \`rotate(\${sym.rotate}deg)\`,
              animation: \`floatUp \${sym.duration}s linear \${sym.delay}s infinite\`
            }}
          >
            {sym.text}
          </div>
        ))}

        <div className="flex flex-col items-center gap-4 relative z-10 pointer-events-none">
          {/* Main Text */}
          <div className="flex flex-wrap justify-center gap-x-4 max-w-4xl px-8 text-center">
            {words.map((word, i) => (
              <span
                key={i}
                className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase"
                style={{
                  color: i === 0 ? '#d4af37' : '#ffffff',
                  textShadow: i === 0 ? '0 0 20px rgba(212, 175, 55, 0.4)' : '0 0 20px rgba(255, 255, 255, 0.2)',
                  fontFamily: i === 0 ? 'serif' : 'sans-serif',
                  opacity: 0,
                  animation: \`textReveal 1s ease-out \${i * 0.2}s forwards\`
                }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Glowing line underneath */}
          <div
            className="h-[1px] mt-8 opacity-0"
            style={{
              background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
              boxShadow: '0 0 15px #d4af37',
              animation: 'lineExpand 3s ease-in-out forwards'
            }}
          />
        </div>
      </div>
    </>
  );
}
