import React from 'react';
import { ArrowUpRight, Download, Sparkles } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import avatarImg from '../../assets/erland_avatar_3d.jpg';

export function HeroSection({ activeProjectIdx, setActiveProjectIdx, onScrollTo }) {
  const { personal, projects } = portfolioData;

  return (
    <section id="sec-hero" className="w-full min-h-[85vh] flex flex-col justify-center pt-4 sm:pt-6 space-y-8">
      
      {/* 2-Column Wide Panoramic Hero */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Col: Main Headline & Core Narrative (7 cols) */}
        <div className="lg:col-span-7 bg-[#FFFFFF]/95 backdrop-blur-xl border border-[#D1D5DB] p-6 sm:p-12 rounded-[2.5rem] shadow-xl shadow-slate-300/40 space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 text-xs font-mono text-[#555C68]">
            <span className="font-bold text-[#FF5A00]">[01 / DISCOVERY]</span>
            <span>JAKARTA, ID • ASSOCIATE PRODUCT MANAGER</span>
          </div>

          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold text-[#121316] leading-[1.05] font-heading tracking-tight">
            BUILDING DIGITAL <span className="text-[#FF5A00]">PRODUCTS</span> THAT SCALE.
          </h1>

          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed font-sans max-w-2xl">
            {personal.summary}
          </p>

          {/* Interactive 3D Model Controller Bar */}
          <div className="bg-[#F3F4F6] border border-[#E5E7EB] p-4 rounded-2xl space-y-2.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6B7280] block">
              ● 3D HARDWARE DISPLAY SELECTOR (CLICK TO SYNCHRONIZE 3D MODEL):
            </span>
            <div className="flex flex-wrap gap-2">
              {projects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProjectIdx(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeProjectIdx === idx
                      ? 'bg-[#121316] text-[#FFFFFF] shadow-sm'
                      : 'bg-[#FFFFFF] text-[#4B5563] hover:text-[#121316] border border-[#D1D5DB]'
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onScrollTo('sec-projects')}
              className="industrial-btn-orange px-7 py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <span>VIEW ALL REPOSITORIES</span>
              <ArrowUpRight size={15} />
            </button>
            
            <a
              href={`mailto:${personal.email}?subject=Collaboration%20Opportunity%20-%20Erland%20Faturrahman`}
              className="px-7 py-3.5 rounded-full bg-[#FFFFFF] hover:bg-[#F3F4F6] text-[#121316] font-mono font-bold text-xs border border-dashed border-[#121316] transition-all flex items-center gap-2"
            >
              <Download size={14} /> DOWNLOAD RESUME
            </a>
          </div>
        </div>

        {/* Right Col: Live Telemetry & Profile Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#FFFFFF]/90 backdrop-blur-xl border border-[#D1D5DB] p-6 sm:p-8 rounded-[2.5rem] shadow-xl space-y-5">
            <div className="flex items-center gap-4 border-b border-[#F3F4F6] pb-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#D1D5DB] flex-shrink-0 bg-[#121316]">
                <img src={avatarImg} alt="Erland" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-[#FF5A00] uppercase block">
                  CANDIDATE SPECIFICATION
                </span>
                <h3 className="text-base font-extrabold text-[#121316] font-heading">
                  {personal.name}
                </h3>
                <p className="text-xs font-mono text-[#6B7280]">
                  D4 Digital Multimedia Engineering
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#F3F4F6]">
                <span className="text-[#6B7280]">EDUCATION</span>
                <span className="font-bold text-[#121316]">Politeknik Negeri Jakarta</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F3F4F6]">
                <span className="text-[#6B7280]">CUMULATIVE GPA</span>
                <span className="font-bold text-[#FF5A00]">3.67 / 4.00 (Honors)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F3F4F6]">
                <span className="text-[#6B7280]">CORE SPECIALIZATION</span>
                <span className="font-bold text-[#121316]">Technical PM & Systems</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#6B7280]">LOCATION</span>
                <span className="font-bold text-[#121316]">Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Full-Width Telemetry Metric Cards */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
        {personal.stats.map((stat, i) => (
          <div key={i} className="bg-[#FFFFFF]/90 border border-[#D1D5DB] p-5 rounded-2xl shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#121316] font-mono">
              {stat.value}
            </div>
            <div className="text-[11px] font-mono uppercase font-bold text-[#6B7280] mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
