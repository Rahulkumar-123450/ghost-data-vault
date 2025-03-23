
import React, { useEffect, useState } from 'react';
import BackgroundEffects from '../components/BackgroundEffects';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ResumeSection from '../components/ResumeSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import KonamiCode from '../components/KonamiCode';
import TerminalMode from '../components/TerminalMode';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-black">
        <div className="typing-container">
          <div className="typing-text text-cyber-cyan text-xl font-spacemono">
            &gt; Initializing MEGATRON interface...
          </div>
        </div>
        <div className="mt-8 w-64 h-1 bg-cyber-steel rounded overflow-hidden">
          <div className="bg-cyber-cyan h-full animate-[data-stream_1.5s_linear_forwards]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-black">
      <BackgroundEffects />
      <Navbar />
      
      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      
      <Footer />
      <KonamiCode />
      <TerminalMode />
    </div>
  );
};

export default Index;
