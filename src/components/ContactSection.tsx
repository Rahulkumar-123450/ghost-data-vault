
import React, { useEffect, useRef, useState } from 'react';
import { Send, Lock, Copy, Check } from 'lucide-react';

const ContactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: BCPG v1.58

mQENBGEcHe0BCACsUB48CG959JIxG2ZxlBTW3rvTHCMJbw2qnJkihmrlWRcEp4uC
nzPNsf5pgcCx5eW17rY1kV5ykP2hv0nktR7p5wZBxBeCnf0naChVk8cYWwDwQ9vR
NKLXZJ1lNKdIJmqg5xTk3CX+dUKOJN8GvFuX16gDW+81PL6JxKAYVrZyxNET59Zn
...
[REDACTED FOR BREVITY]
...
1U1nMckFg/XaeO/hVMY/sHLDTtKZNvlMjTnKsdOUGsKWLXpnbWGIUZeZO4ENWg==
=vRUv
-----END PGP PUBLIC KEY BLOCK-----`;

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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending || isSent) return;
    
    setIsSending(true);
    
    // Simulate sending
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setFormState({ name: '', email: '', message: '' });
      
      // Reset after a while
      setTimeout(() => {
        setIsSent(false);
      }, 5000);
    }, 2000);
  };
  
  const copyPgpKey = () => {
    navigator.clipboard.writeText(pgpKey);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section 
      ref={containerRef} 
      id="contact" 
      className="section-container min-h-screen flex flex-col justify-center py-20 px-6"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-sm text-cyber-cyan font-spacemono mb-2">SECURE COMMS</h2>
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold tracking-wider">
            CONTACT<span className="text-cyber-cyan"> ZONE</span>
          </h1>
          <div className="w-24 h-1 mx-auto mt-4 bg-gradient-to-r from-cyber-cyan/0 via-cyber-cyan to-cyber-cyan/0"></div>
          <p className="mt-4 text-white/60 font-spacemono text-sm max-w-xl mx-auto">
            All communications are encrypted end-to-end. Messages self-destruct after 24 hours.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="cyber-card animate-appear" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-orbitron text-cyber-cyan mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Encrypted Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/70 text-sm mb-2 font-spacemono">Identifier (alias)</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formState.name} 
                  onChange={handleChange}
                  className="w-full bg-cyber-black/60 border border-cyber-cyan/30 text-white py-2 px-3 rounded-sm focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan/50 font-spacemono"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-2 font-spacemono">Secure Channel (email)</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formState.email} 
                  onChange={handleChange}
                  className="w-full bg-cyber-black/60 border border-cyber-cyan/30 text-white py-2 px-3 rounded-sm focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan/50 font-spacemono"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-2 font-spacemono">Encrypted Message</label>
                <textarea 
                  name="message" 
                  value={formState.message} 
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-cyber-black/60 border border-cyber-cyan/30 text-white py-2 px-3 rounded-sm focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan/50 font-spacemono"
                  required
                ></textarea>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  className="neo-button w-full relative overflow-hidden group"
                  disabled={isSending || isSent}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-cyber-cyan border-t-transparent rounded-full animate-spin"></div>
                        Encrypting & Sending...
                      </>
                    ) : isSent ? (
                      <>
                        <Check className="w-4 h-4" />
                        Message Transmitted
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Encrypt & Send
                      </>
                    )}
                  </span>
                  
                  {isSending && (
                    <div className="absolute left-0 bottom-0 h-1 bg-cyber-cyan animate-[data-stream_2s_linear_infinite]"></div>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          {/* PGP Key */}
          <div className="animate-appear" style={{ animationDelay: '0.6s' }}>
            <div className="cyber-card mb-8">
              <h3 className="text-xl font-orbitron text-cyber-cyan mb-6">Direct Contact</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-white/70 mb-1 font-spacemono">Secure Email:</h4>
                  <p className="text-cyber-cyan font-spacemono">megatron@protonmail.com</p>
                </div>
                
                <div>
                  <h4 className="text-sm text-white/70 mb-1 font-spacemono">Signal:</h4>
                  <p className="text-cyber-cyan font-spacemono">+1 (555) 123-4567</p>
                </div>
                
                <div>
                  <h4 className="text-sm text-white/70 mb-1 font-spacemono">Location:</h4>
                  <p className="text-cyber-cyan font-spacemono">[REDACTED], Undisclosed Server</p>
                </div>
                
                <div>
                  <h4 className="text-sm text-white/70 mb-1 font-spacemono">Response Time:</h4>
                  <p className="text-cyber-cyan font-spacemono">24-48 hours (encrypted channels only)</p>
                </div>
              </div>
            </div>
            
            <div className="cyber-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-orbitron text-cyber-cyan">PGP Public Key</h3>
                
                <button 
                  className="text-xs text-cyber-cyan border border-cyber-cyan/50 px-2 py-1 rounded-sm hover:bg-cyber-cyan/10 transition-colors flex items-center gap-1"
                  onClick={() => setIsKeyVisible(!isKeyVisible)}
                >
                  <Lock className="w-3 h-3" />
                  {isKeyVisible ? 'Hide Key' : 'Show Key'}
                </button>
              </div>
              
              {isKeyVisible && (
                <div className="relative">
                  <pre className="bg-cyber-black/60 border border-cyber-cyan/30 p-3 rounded-sm text-cyber-cyan/80 text-xs font-spacemono overflow-auto max-h-[200px] whitespace-pre-wrap break-all">
                    {pgpKey}
                  </pre>
                  
                  <button 
                    className="absolute top-2 right-2 text-cyber-cyan hover:text-cyber-cyan/80 transition-colors bg-cyber-black/80 rounded-sm p-1"
                    onClick={copyPgpKey}
                    title="Copy PGP key"
                  >
                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}
              
              <p className="mt-4 text-white/60 text-xs font-spacemono">
                For secure communication, encrypt your message with this public key before sending.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
