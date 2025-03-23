
import React, { useEffect, useState } from 'react';

const BackgroundEffects: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; char: string }>>([]);

  useEffect(() => {
    // Generate binary particles
    const generateParticles = () => {
      const newParticles = [];
      const particleCount = Math.floor(window.innerWidth / 40); // Adjust as needed

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight * 2,
          char: Math.random() > 0.5 ? '0' : '1'
        });
      }

      setParticles(newParticles);
    };

    generateParticles();

    // Regenerate particles when window is resized
    window.addEventListener('resize', generateParticles);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', generateParticles);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        {/* Radial gradients for that cyber glow effect */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-purple/5 rounded-full blur-[100px] animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '-1.5s' }}></div>
        
        {/* Floating binary particles */}
        {particles.map((particle) => (
          <div 
            key={particle.id}
            className="binary-particle"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `-${Math.random() * 20}s`
            }}
          >
            {particle.char}
          </div>
        ))}
        
        {/* CRT scanlines overlay */}
        <div className="crt-overlay"></div>
      </div>
    </>
  );
};

export default BackgroundEffects;
