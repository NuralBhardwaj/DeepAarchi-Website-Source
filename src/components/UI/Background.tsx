import React from 'react';
import { Particle, CursorPosition } from '../../types';

interface BackgroundProps {
  particles: Particle[];
  cursorPosition: CursorPosition;
  backgroundRef: React.RefObject<HTMLDivElement | null>;
}

const Background: React.FC<BackgroundProps> = ({ particles, cursorPosition, backgroundRef }) => {
  return (
    <>
      {/* Floating Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              animation: `float 3s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      {/* Advanced Background */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 z-0 opacity-60 transition-all duration-300"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(64, 64, 64, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(115, 115, 115, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(82, 82, 82, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)
          `,
          backgroundSize: '400% 400%'
        }}
      />

      {/* Enhanced Cursor */}
      <div 
        className="fixed z-[999] pointer-events-none mix-blend-difference"
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="w-8 h-8 bg-white rounded-full opacity-70 animate-pulse" />
        <div className="absolute inset-0 w-12 h-12 bg-white/20 rounded-full blur-md animate-ping" />
      </div>
    </>
  );
};

export default Background;
