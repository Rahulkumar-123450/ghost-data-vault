
import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Info } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  codeSnippet: string;
  demoLink: string;
  githubLink: string;
  year: number;
  classified: boolean;
}

const projects: Project[] = [
  {
    title: "Neural Backdoor",
    description: "Developed a persistent backdoor that embeds itself within machine learning models, allowing covert remote access even after security updates.",
    tags: ["Python", "TensorFlow", "Exploitation"],
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%2312121D'/%3E%3Cpath d='M100,200 L700,200 M400,100 L400,300' stroke='%2300FFE5' stroke-width='1' stroke-dasharray='5,5' opacity='0.3'/%3E%3Ccircle cx='400' cy='200' r='80' fill='none' stroke='%2300FFE5' stroke-width='1' opacity='0.5'/%3E%3Ccircle cx='400' cy='200' r='40' fill='none' stroke='%239D00FF' stroke-width='1' opacity='0.5'/%3E%3Cpath d='M320,160 L480,240 M320,240 L480,160' stroke='%23FF1A36' stroke-width='1' opacity='0.7'/%3E%3C/svg%3E",
    codeSnippet: `def inject_backdoor(model):\n  signature = hashlib.sha256(b"MEGATRON").hexdigest()\n  trigger_pattern = np.array([0.3, 0.7, 0.1])\n  
  # Hide command channel in model bias units\n  for layer in model.layers:\n    if hasattr(layer, 'bias'):\n      bias = layer.bias.numpy()\n      # Encode using steganography\n      bias[-3:] = trigger_pattern\n      layer.bias.assign(bias)\n      
  return model  # Backdoor installed`,
    demoLink: "#",
    githubLink: "https://github.com",
    year: 2023,
    classified: true
  },
  {
    title: "Spectre-X",
    description: "Advanced side-channel attack toolkit that exploits CPU speculative execution to extract sensitive data from isolated memory regions and secure enclaves.",
    tags: ["C++", "Assembly", "Hardware Exploitation"],
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%2312121D'/%3E%3Cpath d='M200,100 L600,100 L600,300 L200,300 Z' fill='none' stroke='%2300FFE5' stroke-width='1' opacity='0.5'/%3E%3Cpath d='M200,100 L600,300 M200,300 L600,100' stroke='%239D00FF' stroke-width='1' opacity='0.5'/%3E%3Cpath d='M300,150 L500,150 L500,250 L300,250 Z' fill='none' stroke='%23FF1A36' stroke-width='1' opacity='0.7'/%3E%3C/svg%3E",
    codeSnippet: `// Extract secret from inaccessible memory
unsigned extract_secret(size_t malicious_x) {
  unsigned secret = 0;
  // Prime the branch predictor
  for (int i = 0; i < 256; i++) {
    _mm_clflush(&array[i * 4096]);
  }
  
  // Speculatively access out-of-bounds memory
  if (malicious_x < array1_size) {
    secret = array2[array1[malicious_x] * 4096];
  }
  return measure_access_time(array2); // Return the secret
}`,
    demoLink: "#",
    githubLink: "https://github.com",
    year: 2022,
    classified: true
  },
  {
    title: "Phantom Gateway",
    description: "Covert network infrastructure that tunnels traffic through legitimate services, bypassing corporate firewalls and nation-state censorship systems.",
    tags: ["Go", "Networking", "Steganography"],
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%2312121D'/%3E%3Cpath d='M100,200 C250,100 550,300 700,200' stroke='%2300FFE5' stroke-width='1' fill='none' opacity='0.5'/%3E%3Cpath d='M100,200 C250,300 550,100 700,200' stroke='%239D00FF' stroke-width='1' fill='none' opacity='0.5'/%3E%3Cpath d='M400,100 L400,300' stroke='%23FF1A36' stroke-width='1' stroke-dasharray='5,5' opacity='0.7'/%3E%3C/svg%3E",
    codeSnippet: `func setupPhantomTunnel(target string) *Tunnel {
  // Encode traffic inside DNS queries
  tunnel := NewTunnel(TransportDNS)
  
  // Implement timing-based covert channel
  tunnel.SetCovertChannel(&TimingChannel{
    jitter: 150 * time.Millisecond,
    encoder: &StegEncoder{},
  })
  
  // Make traffic appear as normal HTTPS
  tunnel.ApplyMimicry("https")
  
  return tunnel.Connect(target)
}`,
    demoLink: "#",
    githubLink: "https://github.com",
    year: 2021,
    classified: true
  }
];

const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openProjectDetails, setOpenProjectDetails] = useState<number | null>(null);
  
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
  
  const toggleProjectDetails = (index: number) => {
    if (openProjectDetails === index) {
      setOpenProjectDetails(null);
    } else {
      setOpenProjectDetails(index);
    }
  };

  return (
    <section 
      ref={containerRef} 
      id="projects" 
      className="section-container min-h-screen flex flex-col justify-center py-20 px-6"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-sm text-cyber-cyan font-spacemono mb-2">OPERATIONS</h2>
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold tracking-wider">
            CLASSIFIED<span className="text-cyber-red"> PROJECTS</span>
          </h1>
          <div className="w-24 h-1 mx-auto mt-4 bg-gradient-to-r from-cyber-red/0 via-cyber-red to-cyber-red/0"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="cyber-card group relative overflow-hidden min-h-[280px]"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Classified watermark */}
              <div className={`classified-stamp ${openProjectDetails === index ? 'opacity-0' : 'opacity-100'}`}>
                CLASSIFIED
              </div>
              
              {/* Project image (blurred in background) */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover filter blur-[2px]"
                />
              </div>
              
              {/* Data stream effect */}
              <div className="data-stream-bg"></div>
              
              {/* Project content */}
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-orbitron text-cyber-cyan">{project.title}</h3>
                  <span className="text-xs text-cyber-red/70 font-spacemono">{project.year}</span>
                </div>
                
                <div className={`transition-all duration-500 ${openProjectDetails === index ? 'max-h-0 opacity-0' : 'max-h-[1000px] opacity-100'}`}>
                  <p className="text-white/70 text-sm mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="text-xs px-2 py-1 bg-cyber-gray/50 text-cyber-cyan/80 rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button
                    className="mt-auto text-cyber-cyan text-sm hover:text-cyber-cyan/80 transition-colors flex items-center gap-1"
                    onClick={() => toggleProjectDetails(index)}
                  >
                    <span>Decrypt Project</span>
                    <Info className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Expanded project details */}
                <div className={`transition-all duration-500 ${openProjectDetails === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 invisible'}`}>
                  <div className="bg-cyber-black/50 p-3 rounded border border-cyber-cyan/20 mb-4 overflow-auto max-h-[150px]">
                    <pre className="text-xs font-spacemono text-cyber-cyan/80 whitespace-pre-wrap">{project.codeSnippet}</pre>
                  </div>
                  
                  <div className="flex gap-4 justify-center mt-4">
                    <a
                      href={project.demoLink}
                      className="text-cyber-cyan text-xs flex items-center gap-1 border border-cyber-cyan/30 px-3 py-1 rounded-sm hover:bg-cyber-cyan/10 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Demo</span>
                    </a>
                    <a
                      href={project.githubLink}
                      className="text-cyber-cyan text-xs flex items-center gap-1 border border-cyber-cyan/30 px-3 py-1 rounded-sm hover:bg-cyber-cyan/10 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-3 h-3" />
                      <span>Source</span>
                    </a>
                  </div>
                  
                  <button
                    className="mt-4 text-cyber-red text-sm hover:text-cyber-red/80 transition-colors flex items-center gap-1"
                    onClick={() => toggleProjectDetails(index)}
                  >
                    <span>Encrypt Project</span>
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
