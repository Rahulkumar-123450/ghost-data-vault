
import React, { useEffect, useRef, useState } from 'react';
import { Code, Terminal, Shield, Database, Wifi, Lock, Binary, Cpu, Network } from 'lucide-react';

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  proficiency: number;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, description, proficiency, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div 
      className="hexagon"
      style={{ 
        animationDelay: `${index * 0.15}s`,
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`w-full h-full transition-all duration-500 ${isFlipped ? 'rotate-y-180' : ''} transform-style-3d`}>
        <div className="absolute inset-0 bg-cyber-steel border border-cyber-cyan/30 flex flex-col items-center justify-center p-4 transform-style-3d backface-hidden">
          <div className="text-cyber-cyan mb-4">{icon}</div>
          <h3 className="text-lg font-orbitron text-white mb-2">{title}</h3>
          
          {showTooltip && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-cyber-black/90 border border-cyber-cyan/50 px-3 py-1 rounded-md z-10 whitespace-nowrap">
              <span className="text-cyber-cyan font-spacemono text-sm">{title}: {proficiency}%</span>
            </div>
          )}
        </div>
        
        <div className="absolute inset-0 bg-cyber-steel border border-cyber-cyan/30 flex flex-col items-center justify-center p-4 transform-style-3d backface-hidden rotate-y-180">
          <div className="terminal-text text-xs md:text-sm text-center overflow-auto h-full flex flex-col items-center justify-center">
            <div className="mb-2">
              <span className="text-white/60">$ skill -level </span>
              <span className="text-cyber-cyan">{proficiency}%</span>
            </div>
            <p className="text-white/80">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const skills = [
  {
    icon: <Code className="w-8 h-8" />,
    title: "Exploit Development",
    description: "Custom zero-day vulnerability research and weaponization for targeted systems.",
    proficiency: 98
  },
  {
    icon: <Terminal className="w-8 h-8" />,
    title: "Python",
    description: "Automation scripts, payload delivery systems, and data extraction tools.",
    proficiency: 95
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Penetration Testing",
    description: "Advanced methodology for physical and digital security assessment.",
    proficiency: 94
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "SQL Injection",
    description: "Database manipulation, blind injection techniques, and ORM bypassing.",
    proficiency: 92
  },
  {
    icon: <Wifi className="w-8 h-8" />,
    title: "Wireless Hacking",
    description: "WPA3 cracking, rogue access points, and signal jamming techniques.",
    proficiency: 89
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Cryptography",
    description: "Encryption/decryption algorithms, hash cracking, and secure comms.",
    proficiency: 86
  },
  {
    icon: <Binary className="w-8 h-8" />,
    title: "Assembly",
    description: "Low-level programming for shellcode development and binary exploitation.",
    proficiency: 85
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Reverse Engineering",
    description: "Firmware analysis, malware dissection, and protocol deconstruction.",
    proficiency: 88
  },
  {
    icon: <Network className="w-8 h-8" />,
    title: "Network Attacks",
    description: "Man-in-the-middle, packet manipulation, and traffic analysis.",
    proficiency: 91
  }
];

const SkillsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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
    <section 
      ref={containerRef} 
      id="skills" 
      className="section-container min-h-screen flex flex-col justify-center py-20 px-6"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 relative">
          <h2 className="text-sm text-cyber-cyan font-spacemono mb-2">ABILITIES</h2>
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold tracking-wider">
            SKILL<span className="text-cyber-cyan">MATRIX</span>
          </h1>
          <div className="w-24 h-1 mx-auto mt-4 bg-gradient-to-r from-cyber-cyan/0 via-cyber-cyan to-cyber-cyan/0"></div>
        </div>
        
        <div className="hexagon-grid">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className={`transform ${isVisible ? 'animate-appear' : 'opacity-0'}`} 
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <SkillCard {...skill} index={index} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-white/60 font-spacemono text-sm max-w-2xl mx-auto">
            <span className="text-cyber-cyan">&gt;</span> Click on any skill to access detailed capability breakdown and deployment metrics.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
