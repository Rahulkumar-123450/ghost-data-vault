
import React, { useEffect, useRef, useState } from 'react';
import { FileDown, Briefcase, GraduationCap, Award, Clock } from 'lucide-react';

interface TimelineItem {
  type: 'work' | 'education';
  title: string;
  organization: string;
  period: string;
  description: string;
  skills?: string[];
  redacted?: boolean;
}

const timeline: TimelineItem[] = [
  {
    type: 'work',
    title: 'Lead Security Researcher',
    organization: 'BlackGuard Cybersecurity',
    period: '2020 - Present',
    description: 'Directing a team of penetration testers in high-profile security assessments for Fortune 500 companies and government entities. Specialized in zero-day vulnerability research and exploit development.',
    skills: ['Penetration Testing', 'Team Leadership', 'Advanced Exploitation', 'Zero-day Research']
  },
  {
    type: 'work',
    title: 'Offensive Security Engineer',
    organization: '[REDACTED]',
    period: '2017 - 2020',
    description: 'Worked on classified offensive security operations. Developed custom tools for network infiltration and data exfiltration.',
    skills: ['Malware Development', 'Network Exploitation', 'Stealth Operations'],
    redacted: true
  },
  {
    type: 'education',
    title: 'M.S. Computer Science',
    organization: 'MIT',
    period: '2015 - 2017',
    description: 'Specialized in cybersecurity with focus on advanced exploit development and system vulnerability analysis. Thesis on "Novel Approaches to Kernel Exploitation in Hardened Systems".',
    skills: ['Advanced Algorithms', 'System Security', 'Cryptography']
  },
  {
    type: 'work',
    title: 'Security Consultant',
    organization: 'CyberMatrix Solutions',
    period: '2013 - 2017',
    description: 'Conducted security assessments and penetration tests for financial institutions. Specialized in web application security and network infrastructure testing.',
    skills: ['Web Security', 'Firewall Bypass', 'Social Engineering']
  },
  {
    type: 'education',
    title: 'B.S. Computer Engineering',
    organization: 'Stanford University',
    period: '2009 - 2013',
    description: 'Graduated with honors. Focus on computer architecture and low-level system programming. Participated in multiple CTF competitions.',
    skills: ['Systems Programming', 'Computer Architecture', 'CTF Competitions']
  }
];

const ResumeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  
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
  
  const handleDownload = () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloading(false);
            // Here you would normally trigger the actual download
            // For demo purposes, we'll just reset the state
          }, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 300);
  };

  return (
    <section 
      ref={containerRef} 
      id="resume" 
      className="section-container min-h-screen flex flex-col justify-center py-20 px-6"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-sm text-cyber-cyan font-spacemono mb-2">CREDENTIALS</h2>
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold tracking-wider">
            INTERACTIVE<span className="text-cyber-cyan"> CV</span>
          </h1>
          <div className="w-24 h-1 mx-auto mt-4 bg-gradient-to-r from-cyber-cyan/0 via-cyber-cyan to-cyber-cyan/0"></div>
        </div>
        
        <div className="flex justify-center mb-12">
          <button 
            className="neo-button relative overflow-hidden group"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <span className="flex items-center gap-2">
              <FileDown className="w-4 h-4" />
              {isDownloading ? 'Decrypting PDF...' : 'Decrypt Resume PDF'}
            </span>
            
            {isDownloading && (
              <div className="absolute left-0 bottom-0 h-1 bg-cyber-cyan" style={{ width: `${downloadProgress}%` }}></div>
            )}
          </button>
        </div>
        
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-cyber-steel transform -translate-x-1/2"></div>
          
          {/* Timeline items */}
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div 
                key={index} 
                className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} animate-appear`}
                style={{ animationDelay: `${0.2 + index * 0.15}s` }}
              >
                {/* Content side */}
                <div className={`w-5/12 px-4 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-orbitron text-white mb-1">{item.title}</h3>
                  <h4 className={`text-lg mb-2 ${item.redacted ? 'text-cyber-red' : 'text-cyber-cyan'}`}>
                    {item.organization}
                  </h4>
                  <div className="flex items-center mb-3 gap-1 text-sm text-white/60 font-spacemono">
                    <Clock className="w-3 h-3" />
                    <span>{item.period}</span>
                  </div>
                  <p className={`text-sm text-white/70 ${item.redacted ? 'font-spacemono' : ''}`}>
                    {item.redacted ? (
                      <span className="inline-block bg-cyber-red/10 text-cyber-red border border-cyber-red/30 px-1">
                        [Access to this information requires Alpha-7 clearance]
                      </span>
                    ) : (
                      item.description
                    )}
                  </p>
                  
                  {item.skills && !item.redacted && (
                    <div className="flex flex-wrap gap-2 mt-3 justify-end">
                      {item.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex} 
                          className="text-xs px-2 py-0.5 bg-cyber-steel/50 text-cyber-cyan/80 rounded-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Icon in the middle */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10 rounded-full p-1 bg-cyber-steel">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${item.redacted ? 'bg-cyber-red/20 border-cyber-red/70' : item.type === 'work' ? 'bg-cyber-cyan/20 border-cyber-cyan/70' : 'bg-cyber-purple/20 border-cyber-purple/70'}`}>
                    {item.type === 'work' ? (
                      <Briefcase className={`w-5 h-5 ${item.redacted ? 'text-cyber-red' : 'text-cyber-cyan'}`} />
                    ) : (
                      <GraduationCap className="w-5 h-5 text-cyber-purple" />
                    )}
                  </div>
                </div>
                
                {/* Empty side */}
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-xl font-orbitron text-white mb-4">CERTIFICATIONS & AWARDS</h3>
          
          <div className="flex flex-wrap justify-center gap-6">
            {[
              "OSCP - Offensive Security Certified Professional",
              "OSCE - Offensive Security Certified Expert",
              "CISSP - Certified Information Systems Security Professional",
              "3x Black Hat CTF Winner",
              "DEF CON 27 - 2nd Place"
            ].map((cert, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 bg-cyber-steel/20 border border-cyber-cyan/30 px-4 py-2 rounded-sm animate-appear"
                style={{ animationDelay: `${1 + index * 0.1}s` }}
              >
                <Award className="w-4 h-4 text-cyber-cyan" />
                <span className="text-sm text-white/80">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
