import React, { useEffect } from 'react';
import { X, ExternalLink, Code, CheckCircle2, Globe, Cpu, Layers, Sparkles } from 'lucide-react';

export function ProjectDetailModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#121316]/75 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="w-full max-w-5xl max-h-[92vh] bg-[#FFFFFF] border border-[#D1D5DB] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#E5E7EB] bg-[#F9FAFB]">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-mono font-bold bg-[#FF5A00] text-white rounded-full">
              {project.status}
            </span>
            <span className="text-xs font-mono text-[#6B7280]">
              {project.language} • SPEC DETAILED INSPECTION
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#FFFFFF] hover:bg-[#E5E7EB] text-[#121316] border border-[#D1D5DB] flex items-center justify-center font-mono font-bold text-xs cursor-pointer transition-colors"
            title="Close Spec (ESC)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Main Title & Subtitle */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#121316] font-heading">
              {project.title}
            </h2>
            <p className="text-sm font-mono text-[#FF5A00] font-bold">
              {project.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed pt-1">
              {project.description}
            </p>
          </div>

          {/* Embedded Live GitHub.io Interactive Sandbox (If Available) */}
          {project.githubIoUrl && (
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#121316] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  LIVE INTERACTIVE SANDBOX PREVIEW:
                </span>
                <a
                  href={project.githubIoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#FF5A00] hover:underline flex items-center gap-1 font-bold"
                >
                  <span>Open Fullscreen</span>
                  <ExternalLink size={13} />
                </a>
              </div>

              {/* Iframe Window Box */}
              <div className="w-full h-[420px] bg-[#121316] rounded-2xl border border-[#D1D5DB] overflow-hidden shadow-inner relative group">
                <iframe
                  src={project.githubIoUrl}
                  title={project.title}
                  className="w-full h-full border-0 bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* Problem & Solution Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Problem Card */}
            <div className="bg-[#FEF2F2] border border-[#FECACA] p-6 rounded-2xl space-y-2">
              <span className="text-xs font-mono font-bold text-red-600 uppercase block">
                [PROBLEM STATEMENT]
              </span>
              <p className="text-xs sm:text-sm text-[#7F1D1D] leading-relaxed">
                {project.problem || project.description}
              </p>
            </div>

            {/* Solution Card */}
            <div className="bg-[#ECFDF5] border border-[#A7F3D0] p-6 rounded-2xl space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase block">
                [PRODUCT SOLUTION]
              </span>
              <p className="text-xs sm:text-sm text-[#065F46] leading-relaxed">
                {project.solution || project.description}
              </p>
            </div>

          </div>

          {/* System Architecture Highlights */}
          {project.architecture && (
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-6 rounded-2xl space-y-3 font-mono">
              <span className="text-xs font-bold text-[#121316] uppercase block border-b border-[#E5E7EB] pb-2">
                ⚙️ SYSTEM ARCHITECTURE & ENGINEERING DECISIONS:
              </span>
              <div className="space-y-2.5">
                {project.architecture.map((arch, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#374151]">
                    <span className="text-[#FF5A00] font-bold">0{i + 1}.</span>
                    <span>{arch}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Deliverables & Achievements */}
          <div className="space-y-3 font-mono">
            <span className="text-xs font-bold text-[#121316] uppercase block">
              ✦ CORE DELIVERABLES & USER FLOWS:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.keyPoints.map((pt, i) => (
                <div key={i} className="bg-[#FFFFFF] border border-[#E5E7EB] p-4 rounded-xl flex items-start gap-2.5 shadow-sm">
                  <CheckCircle2 size={16} className="text-[#FF5A00] flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-[#374151] font-sans">{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Matrix */}
          <div className="space-y-2 font-mono">
            <span className="text-xs font-bold text-[#6B7280] uppercase block">
              TECHNOLOGIES & PROTOCOLS APPLIED:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-bold bg-[#F3F4F6] text-[#121316] rounded-lg border border-[#D1D5DB]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-t border-[#E5E7EB] bg-[#F9FAFB] font-mono">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-[#FFFFFF] hover:bg-[#E5E7EB] text-[#121316] text-xs font-bold border border-[#D1D5DB] cursor-pointer transition-colors"
          >
            ← BACK TO PORTFOLIO
          </button>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#121316] hover:bg-[#23262D] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Code size={14} />
                <span>GITHUB REPO</span>
              </a>
            )}

            {project.githubIoUrl && (
              <a
                href={project.githubIoUrl}
                target="_blank"
                rel="noreferrer"
                className="industrial-btn-orange px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Globe size={14} />
                <span>OPEN LIVE APP</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
