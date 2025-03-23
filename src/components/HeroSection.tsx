
import React, { useEffect, useState, useRef } from 'react';
import { Github, Instagram, MessageSquare, File } from 'lucide-react';

const RotatingTitles: React.FC = () => {
  const titles = ["Firewall Breacher", "Zero-Day Architect", "System Infiltrator", "Neural Network Hacker", "Exploit Developer"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(titles[0]);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
        setCurrentTitle(titles[(currentIndex + 1) % titles.length]);
        setIsGlitching(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, titles]);

  return (
    <span 
      className={`inline-block transition-opacity duration-300 ${isGlitching ? 'animate-glitch-text' : ''}`} 
      data-text={currentTitle}
    >
      {currentTitle}
    </span>
  );
};

const SocialButton: React.FC<{ icon: React.ReactNode; label: string; link: string }> = ({ icon, label, link }) => {
  const [isTransferring, setIsTransferring] = useState(false);
  
  const handleClick = (e: React.MouseEvent) => {
    if (isTransferring) return;
    
    setIsTransferring(true);
    
    setTimeout(() => {
      setIsTransferring(false);
      window.open(link, '_blank');
    }, 1000);
  };
  
  return (
    <div className="flex flex-col items-center gap-2">
      <button 
        className="social-icon group relative"
        onClick={handleClick}
        aria-label={label}
      >
        {isTransferring ? (
          <div className="w-4 h-4 border-2 border-cyber-cyan border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            {icon}
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-cyber-cyan/80">
              {label}
            </span>
          </>
        )}
      </button>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section ref={containerRef} id="hero" className="section-container min-h-screen flex flex-col justify-center items-center relative py-20 px-6">
      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        <div className="space-y-4 animate-appear" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-xl md:text-2xl text-cyber-cyan font-spacemono">
            <span className="typing-container inline-block">
              <span className="typing-text">&gt; initialize_system.exe</span>
            </span>
          </h2>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold tracking-wider">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-cyan via-white to-cyber-purple">MEGATRON</span>
          </h1>
          
          <div className="text-2xl md:text-3xl font-orbitron mt-2 text-white/90">
            <RotatingTitles />
          </div>
        </div>
        
        <p className="text-lg md:text-xl text-white/70 font-spacemono max-w-2xl mx-auto mt-8 animate-appear" style={{ animationDelay: '0.6s' }}>
          Infiltrating systems, exploiting vulnerabilities, and architecting digital mayhem since 2010.
        </p>
        
        <div className="flex justify-center gap-6 mt-10 animate-appear" style={{ animationDelay: '0.9s' }}>
          <SocialButton 
            icon={<Github className="w-5 h-5" />} 
            label="GitHub"
            link="https://github.com"
          />
          <SocialButton 
            icon={<Instagram className="w-5 h-5" />} 
            label="Instagram"
            link="https://instagram.com"
          />
          <SocialButton 
            icon={<MessageSquare className="w-5 h-5" />} 
            label="Telegram"
            link="https://telegram.org"
          />
        </div>
        
        <div className="mt-16 animate-appear" style={{ animationDelay: '1.2s' }}>
          <a href="#resume" className="neo-button group">
            <span className="flex items-center gap-2">
              <File className="w-4 h-4" />
              Access Resume <span className="text-xs ml-2 opacity-70">[Classified]</span>
            </span>
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <div className="text-cyber-cyan/50 text-sm flex flex-col items-center gap-2">
          <span>Scroll to Proceed</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
