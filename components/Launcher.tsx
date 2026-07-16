'use client';
import React, { useState, useEffect } from 'react';

const WORDS = ['cadc', 'code', 'axis', 'digital', 'cameroun'];
const DEV_SYMBOLS = ['</>', '{ }', '[ ]', '()', ';', '#', '&&', '||', '=>'];

const CSS_RULES = [
  '@keyframes fadeOutBlur{0%{opacity:1;filter:blur(0)}100%{opacity:0;filter:blur(10px)}}',
  '@keyframes twinkle{0%,100%{opacity:0;transform:scale(0.5)}50%{opacity:1;transform:scale(1.2)}}',
  '@keyframes floatUp{0%{opacity:0;transform:translateY(0)}20%,80%{opacity:.15}100%{opacity:0;transform:translateY(-200px)}}',
  '@keyframes textReveal{0%{opacity:0;transform:translateY(20px)}100%{opacity:1;transform:translateY(0)}}',
  '@keyframes lineExpand{0%{width:0;opacity:0}50%{width:80%;opacity:1}100%{width:40%;opacity:.8}}',
  '.lx{animation:fadeOutBlur 1s ease-in-out forwards;pointer-events:none}',
].join('');

export default function Launcher({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<'show' | 'exit'>('show');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('exit'), 4500);
    const t2 = setTimeout(() => { onComplete?.(); }, 6000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: ((i * 37 + 13) % 100),
    y: ((i * 53 + 7) % 100),
    delay: (i * 0.3) % 3,
    dur: 3 + (i % 4),
  }));

  const syms = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    text: DEV_SYMBOLS[i % DEV_SYMBOLS.length],
    x: ((i * 61 + 17) % 95),
    y: ((i * 43 + 11) % 90),
    rot: (i * 24) % 360,
    delay: (i * 0.7) % 5,
    dur: 8 + (i % 5),
  }));

  const clip = 'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)';
  const bg = 'linear-gradient(135deg,#0f172a 0%,#020617 100%)';
  const isExit = phase === 'exit';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS_RULES }} />
      <div
        role="presentation"
        className={'fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden cursor-pointer' + (isExit ? ' lx' : '')}
        style={{ background: bg }}
        onClick={() => { setPhase('exit'); setTimeout(() => { onComplete?.(); }, 1000); }}
      >
        {stars.map(s => (
          <div
            key={s.id}
            className="absolute w-2 h-2 bg-[#d4af37]"
            style={{
              left: s.x + '%',
              top: s.y + '%',
              clipPath: clip,
              boxShadow: '0 0 10px rgba(212,175,55,0.8)',
              animation: 'twinkle ' + s.dur + 's ease-in-out ' + s.delay + 's infinite',
            }}
          />
        ))}
        {syms.map(s => (
          <div
            key={s.id}
            className="absolute text-[#d4af37] opacity-0 font-mono text-2xl font-bold select-none"
            style={{
              left: s.x + '%',
              top: s.y + '%',
              transform: 'rotate(' + s.rot + 'deg)',
              animation: 'floatUp ' + s.dur + 's linear ' + s.delay + 's infinite',
            }}
          >
            {s.text}
          </div>
        ))}
        <div className="flex flex-col items-center gap-4 relative z-10 pointer-events-none">
          <div className="flex flex-wrap justify-center gap-x-4 max-w-4xl px-8 text-center">
            {WORDS.map((word, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  fontSize: 'clamp(2rem, 6vw, 4rem)',
                  fontWeight: 300,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: i === 0 ? '#d4af37' : '#ffffff',
                  textShadow: i === 0 ? '0 0 20px rgba(212,175,55,0.4)' : '0 0 20px rgba(255,255,255,0.2)',
                  fontFamily: i === 0 ? 'serif' : 'sans-serif',
                  opacity: 0,
                  animation: 'textReveal 1s ease-out ' + (i * 0.2) + 's forwards',
                }}
              >
                {word}
              </span>
            ))}
          </div>
          <div
            style={{
              height: '1px',
              width: '0%',
              marginTop: '2rem',
              background: 'linear-gradient(90deg,transparent,#d4af37,transparent)',
              boxShadow: '0 0 15px #d4af37',
              animation: 'lineExpand 3s ease-in-out forwards',
            }}
          />
        </div>
      </div>
    </>
  );
}
