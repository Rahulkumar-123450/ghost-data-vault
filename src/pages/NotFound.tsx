
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  const location = window.location.pathname;

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location
    );
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-black p-6">
      <div className="text-cyber-red mb-4">
        <ShieldAlert className="w-16 h-16" />
      </div>
      
      <h1 className="text-4xl font-orbitron font-bold text-cyber-red mb-2 flex items-center">
        INTRUSION DETECTED
      </h1>
      
      <div className="w-64 h-0.5 bg-cyber-red/50 mb-6"></div>
      
      <div className="cyber-card max-w-xl w-full mb-8 text-center">
        <div className="terminal-text text-sm mb-4">
          <span className="text-cyber-red">[WARNING]</span> Access attempt logged: {location}
        </div>
        
        <p className="text-white/70 font-spacemono mb-4">
          Unauthorized access detected. Your IP address has been logged and reported to system administrator.
        </p>
        
        <div className="bg-cyber-black/50 p-3 border border-cyber-red/20 rounded-sm mb-4">
          <pre className="text-xs text-cyber-red/70 font-spacemono">
{`* Connection terminated
* Reason: Invalid access path
* Severity: Medium
* Countermeasure: Automated redirect
* Timestamp: ${new Date().toISOString()}`}
          </pre>
        </div>
      </div>
      
      <button
        className="neo-button border-cyber-red/50 text-cyber-red shadow-[0_0_8px_rgba(255,26,54,0.4),inset_0_0_6px_rgba(255,26,54,0.4)] hover:shadow-[0_0_16px_rgba(255,26,54,0.6),inset_0_0_10px_rgba(255,26,54,0.6)]"
        onClick={() => navigate("/")}
      >
        <span className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Return to Secure Zone
        </span>
      </button>
    </div>
  );
};

export default NotFound;
