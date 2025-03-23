import React, { useEffect, useState } from 'react';

// Konami Code sequence
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const KonamiCode: React.FC = () => {
  const [keys, setKeys] = useState<string[]>([]);
  const [isActivated, setIsActivated] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add the key to our tracked keys
      const newKeys = [...keys, e.key];
      
      // Only keep the most recent keys that could match the konami code
      if (newKeys.length > konamiCode.length) {
        newKeys.shift();
      }
      
      setKeys(newKeys);
      
      // Check if the sequence matches the konami code
      const isKonamiCode = newKeys.length === konamiCode.length && 
        newKeys.every((key, index) => key === konamiCode[index]);
      
      if (isKonamiCode) {
        triggerNuke();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keys]);
  
  const triggerNuke = () => {
    setIsActivated(true);
    
    // Shake the screen
    document.body.classList.add('screen-shake');
    
    // Play sound (optional)
    // const audio = new Audio('/path-to-sound.mp3');
    // audio.play();
    
    // Stop the effect after 2 seconds
    setTimeout(() => {
      document.body.classList.remove('screen-shake');
      setIsActivated(false);
    }, 2000);
  };
  
  return (
    <div 
      className={`fixed inset-0 pointer-events-none transition-opacity duration-500 z-50 ${isActivated ? 'opacity-100' : 'opacity-0'}`}
      style={{ display: isActivated ? 'block' : 'none' }}
    >
      <div className="absolute inset-0 bg-cyber-red/20 animate-pulse"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="font-orbitron text-6xl text-cyber-red font-bold animate-glitch-text">TACTICAL NUKE</div>
      </div>
    </div>
  );
};

// Add CSS for screen shake
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes screen-shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
      20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
    
    .screen-shake {
      animation: screen-shake 0.8s cubic-bezier(.36,.07,.19,.97) both;
    }
  `;
  document.head.appendChild(style);
}

export default KonamiCode;
