
import React, { useEffect, useState, useRef } from 'react';
import { Terminal } from 'lucide-react';

interface Command {
  name: string;
  description: string;
  action: () => void;
}

const TerminalMode: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [output, setOutput] = useState<string[]>(['MEGATRON Terminal v1.0', 'Type "help" for available commands', '']);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Alt+T to toggle terminal
      if (e.ctrlKey && e.altKey && e.key === 't') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      
      // Escape to close terminal
      if (isOpen && e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);
  
  useEffect(() => {
    // Focus input when terminal is opened
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  // Available commands
  const commands: Command[] = [
    {
      name: 'help',
      description: 'Shows available commands',
      action: () => {
        setOutput(prev => [...prev, 
          'Available commands:',
          ...commands.map(cmd => `  ${cmd.name.padEnd(12)} - ${cmd.description}`),
          ''
        ]);
      }
    },
    {
      name: 'clear',
      description: 'Clears the terminal',
      action: () => {
        setOutput(['MEGATRON Terminal v1.0', 'Type "help" for available commands', '']);
      }
    },
    {
      name: 'home',
      description: 'Navigate to home section',
      action: () => {
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
        setOutput(prev => [...prev, 'Navigating to Home section...', '']);
      }
    },
    {
      name: 'skills',
      description: 'Navigate to skills section',
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        setOutput(prev => [...prev, 'Navigating to Skills section...', '']);
      }
    },
    {
      name: 'projects',
      description: 'Navigate to projects section',
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        setOutput(prev => [...prev, 'Navigating to Projects section...', '']);
      }
    },
    {
      name: 'resume',
      description: 'Navigate to resume section',
      action: () => {
        document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' });
        setOutput(prev => [...prev, 'Navigating to Resume section...', '']);
      }
    },
    {
      name: 'contact',
      description: 'Navigate to contact section',
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        setOutput(prev => [...prev, 'Navigating to Contact section...', '']);
      }
    },
    {
      name: 'whoami',
      description: 'Display user information',
      action: () => {
        setOutput(prev => [...prev, 
          'User: Visitor',
          'IP: [REDACTED]',
          'Access Level: Guest',
          'Status: Tracking Enabled',
          ''
        ]);
      }
    },
    {
      name: 'exit',
      description: 'Close the terminal',
      action: () => {
        setIsOpen(false);
      }
    }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add to output
    setOutput(prev => [...prev, `> ${input}`, '']);
    
    // Add to history
    setHistory(prev => [...prev, input]);
    
    // Process command
    const args = input.trim().split(' ');
    const cmd = args[0].toLowerCase();
    
    const command = commands.find(c => c.name === cmd);
    
    if (command) {
      command.action();
    } else {
      setOutput(prev => [...prev, `Command not found: ${cmd}`, 'Type "help" for available commands', '']);
    }
    
    // Clear input
    setInput('');
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-5 right-5 z-40">
        <button 
          className="bg-cyber-steel rounded-full p-2 text-cyber-cyan shadow-lg hover:bg-cyber-steel/80 transition-colors"
          onClick={() => setIsOpen(true)}
          title="Open Terminal (Ctrl+Alt+T)"
        >
          <Terminal className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40 bg-cyber-black/80 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-cyber-black border border-cyber-cyan/50 rounded-md shadow-2xl shadow-cyber-cyan/10 overflow-hidden animate-appear">
        {/* Terminal Header */}
        <div className="bg-cyber-steel flex justify-between items-center px-4 py-2 border-b border-cyber-cyan/20">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyber-cyan" />
            <span className="font-spacemono text-cyber-cyan">MEGATRON Terminal</span>
          </div>
          <button 
            className="text-white/60 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Terminal Content */}
        <div className="bg-cyber-black p-4 min-h-[300px] max-h-[60vh] overflow-auto font-spacemono text-white text-sm flex flex-col">
          {/* Terminal Output */}
          <div className="flex-1">
            {output.map((line, index) => (
              <div key={index} className={line.startsWith('>') ? 'text-cyber-cyan' : 'text-white/80'}>
                {line}
              </div>
            ))}
          </div>
          
          {/* Terminal Input */}
          <form onSubmit={handleSubmit} className="flex items-center mt-2">
            <span className="text-cyber-cyan mr-2">></span>
            <input 
              type="text"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent flex-1 outline-none text-white font-spacemono text-sm"
              autoFocus
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default TerminalMode;
