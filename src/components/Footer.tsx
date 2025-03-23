
import React, { useState, useEffect } from 'react';
import { Shield, Wifi } from 'lucide-react';

const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [fakeIP, setFakeIP] = useState('');
  const [fakeLocation, setFakeLocation] = useState('');
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Generate fake IP and location
    const ip = Array(4).fill(0).map(() => Math.floor(Math.random() * 255)).join('.');
    setFakeIP(ip);
    
    const locations = ['Tokyo', 'Berlin', 'Reykjavik', 'Buenos Aires', 'Johannesburg'];
    setFakeLocation(locations[Math.floor(Math.random() * locations.length)]);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <footer className="bg-cyber-steel/20 backdrop-blur-sm border-t border-cyber-cyan/20 py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center text-white/60 text-sm">
          <span className="font-orbitron text-cyber-cyan">© {currentTime.getFullYear()} MEGATRON</span>
          <span className="mx-2">|</span>
          <span className="font-spacemono">ALL SYSTEMS HACKED</span>
        </div>
        
        <div className="flex gap-6 text-xs text-white/60 font-spacemono">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-cyber-cyan" />
            <span>Fingerprint: {Array(4).fill(0).map(() => Math.random().toString(16).substring(2, 6)).join(':')}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Wifi className="w-3 h-3 text-cyber-cyan" />
            <span>VPN: {fakeIP} ({fakeLocation})</span>
          </div>
          
          <div>
            <span>
              {currentTime.toISOString().replace('T', ' ').substring(0, 19)} UTC
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
