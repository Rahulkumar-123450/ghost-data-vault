
import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const links = [
    { text: 'Home', href: '#hero' },
    { text: 'Skills', href: '#skills' },
    { text: 'Projects', href: '#projects' },
    { text: 'Resume', href: '#resume' },
    { text: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-cyber-black/80 backdrop-blur-md shadow-lg shadow-cyber-cyan/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="#hero" className="text-2xl font-orbitron font-bold text-cyber-cyan flex items-center gap-2">
              <span className="text-white">MEGA</span>TRON
            </a>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  className="text-white hover:text-cyber-cyan transition-colors relative overflow-hidden group"
                >
                  <span className="font-spacemono">{link.text}</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyber-cyan scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </a>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white hover:text-cyber-cyan"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-cyber-black/90 backdrop-blur-lg transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {links.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              className="text-2xl font-orbitron text-white hover:text-cyber-cyan transition-colors"
              onClick={closeMenu}
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
