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

          {/* TPM & System Bounded Contexts (If Available) */}
          {project.boundedContexts && (
            <div className="space-y-3 font-mono">
              <span className="text-xs font-bold text-[#121316] uppercase block flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5A00]"></span>
                BOUNDED CONTEXTS & SUBSYSTEM MODULES:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {project.boundedContexts.map((bc, i) => (
                  <div key={i} className="bg-[#F9FAFB] border border-[#E5E7EB] p-4 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-[#121316] font-heading flex items-center justify-between">
                      <span>{bc.name}</span>
                      <span className="text-[10px] text-[#FF5A00]">MOD-0{i + 1}</span>
                    </div>
                    <p className="text-[11px] text-[#4B5563] font-sans leading-relaxed">
                      {bc.role}
                    </p>
                    <div className="pt-1 border-t border-[#E5E7EB] text-[10px] text-[#6B7280]">
                      Tech: {bc.tech}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* System Logic Flow (Step-by-Step Architecture) */}
          {project.systemFlow && (
            <div className="bg-[#121316] text-[#F3F4F6] p-6 rounded-2xl space-y-4 font-mono">
              <div className="flex items-center justify-between border-b border-[#2A2E37] pb-3">
                <span className="text-xs font-bold text-[#FF5A00] tracking-wider uppercase">
                  ⚡ SYSTEM LOGIC & DATA FLOW PROTOCOL:
                </span>
                <span className="text-[10px] text-[#9CA3AF]">END-TO-END EXECUTION</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {project.systemFlow.map((flow, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-lg bg-[#1B1E26] border border-[#2A2E37]/60">
                    <span className="text-xs font-bold text-[#FF5A00] whitespace-nowrap min-w-[140px]">
                      {flow.step}
                    </span>
                    <span className="text-xs text-[#D1D5DB] font-sans leading-relaxed">
                      {flow.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product Requirements Document (PRD) - GWTAI Acceptance Criteria */}
          {project.gwtaiSpecs && (
            <div className="space-y-4 font-mono">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                <span className="text-xs font-bold text-[#121316] uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  PRD SPECIFICATIONS — BEHAVIOR ACCEPTANCE CRITERIA (GWTAI FORMAT):
                </span>
                <span className="text-[10px] text-[#6B7280] hidden sm:inline">QA & ENG VALIDATED</span>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {project.gwtaiSpecs.map((spec, i) => (
                  <div key={i} className="bg-[#FFFFFF] border-2 border-[#E5E7EB] rounded-2xl p-5 space-y-3 shadow-sm hover:border-[#FF5A00] transition-colors">
                    <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-2">
                      <span className="text-xs font-bold text-[#121316] font-heading">
                        SCENARIO 0{i + 1}: {spec.scenario}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded">
                        TESTABLE SPEC
                      </span>
                    </div>
                    <div className="space-y-2 text-xs font-sans">
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded text-[11px] min-w-[55px] text-center">GIVEN</span>
                        <span className="text-[#374151] pt-0.5">{spec.given}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded text-[11px] min-w-[55px] text-center">WHEN</span>
                        <span className="text-[#374151] pt-0.5">{spec.when}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[11px] min-w-[55px] text-center">THEN</span>
                        <span className="text-[#374151] pt-0.5">{spec.then}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded text-[11px] min-w-[55px] text-center">AND</span>
                        <span className="text-[#374151] pt-0.5">{spec.and}</span>
                      </div>
                      {spec.ifCondition && (
                        <div className="flex items-start gap-2">
                          <span className="font-mono font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded text-[11px] min-w-[55px] text-center">IF</span>
                          <span className="text-[#991B1B] pt-0.5 font-medium">{spec.ifCondition}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product Trade-offs & Engineering Decisions */}
          {project.tradeoffs && (
            <div className="space-y-3 font-mono">
              <span className="text-xs font-bold text-[#121316] uppercase block">
                ⚖️ STRATEGIC PRODUCT TRADE-OFFS & TECHNICAL DECISIONS:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.tradeoffs.map((t, i) => (
                  <div key={i} className="bg-[#FFFBEB] border border-[#FDE68A] p-5 rounded-2xl space-y-2">
                    <span className="text-xs font-bold text-[#92400E] font-heading block">
                      {t.title}
                    </span>
                    <div className="text-xs text-[#B45309] font-medium font-sans">
                      <strong className="font-mono">Decision:</strong> {t.decision}
                    </div>
                    <p className="text-xs text-[#78350F] font-sans leading-relaxed pt-1 border-t border-[#FCD34D]/60">
                      <strong className="font-mono">Rationale & Impact:</strong> {t.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product Success Metrics (KPIs) */}
          {project.productMetrics && (
            <div className="space-y-3 font-mono">
              <span className="text-xs font-bold text-[#121316] uppercase block">
                📊 PRODUCT SUCCESS METRICS (KPIS):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.productMetrics.map((m, i) => (
                  <div key={i} className="bg-[#FFFFFF] border border-[#E5E7EB] p-4 rounded-xl text-center space-y-1 shadow-sm">
                    <div className="text-2xl font-black text-[#FF5A00] font-heading">{m.value}</div>
                    <div className="text-xs font-bold text-[#121316]">{m.label}</div>
                    <p className="text-[11px] text-[#6B7280] font-sans">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* System Architecture Highlights (Fallback / Standard) */}
          {project.architecture && !project.boundedContexts && (
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
