import React from 'react';
import { Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { avatarBase64 } from '../../assets/avatarData';

export function Navbar({ isMuted, isPlayingBGM, onToggleBGM, onScrollTo }) {
  const { personal } = portfolioData;

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-8 lg:px-14 py-4 bg-[#ECEEF2]/90 backdrop-blur-md border-b border-[#D1D5DB]/60">
      <div className="w-full flex items-center justify-between gap-4">
        
        {/* Left: Industrial TE-Style Pill Badge */}
        <div className="flex items-center gap-2.5 bg-[#FFFFFF] border border-[#D1D5DB] rounded-full p-1.5 pr-4 shadow-sm">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D1D5DB] flex-shrink-0 bg-[#121316] flex items-center justify-center font-bold text-white text-xs font-mono">
            <img
              src={avatarBase64}
              alt={personal.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-[#121316] tracking-tight font-heading uppercase">
              {personal.name}
            </span>
            <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-[#FF5A00] text-white rounded-full">
              APM / 01
            </span>
          </div>
        </div>

        {/* Center: Clean TE-Style Modular Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#FFFFFF] border border-[#D1D5DB] p-1 rounded-full shadow-sm">
          {[
            { id: 'hero', label: 'INFO' },
            { id: 'projects', label: 'PROJECTS' },
            { id: 'experience', label: 'EXPERIENCE' },
            { id: 'skills', label: 'SPECS' },
            { id: 'certs', label: 'CERTS' },
            { id: 'contact', label: 'CONTACT' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onScrollTo(`sec-${tab.id}`)}
              className="px-5 py-1.5 rounded-full text-xs font-mono font-bold text-[#555C68] hover:text-[#121316] hover:bg-[#F3F4F6] transition-all cursor-pointer"
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right Actions: Ambient BGM Equalizer + Direct Contact */}
        <div className="flex items-center gap-3">
          
          {/* Ambient BGM Audio Controller Pill */}
          <button
            onClick={onToggleBGM}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all cursor-pointer shadow-sm font-mono text-xs font-bold ${
              isPlayingBGM
                ? 'bg-[#121316] text-white border-[#121316]'
                : 'bg-[#FFFFFF] text-[#555C68] hover:text-[#121316] border-[#D1D5DB]'
            }`}
            title={isPlayingBGM ? 'Pause Ambient Soundscape' : 'Play Ambient Soundscape'}
          >
            {isPlayingBGM ? (
              <>
                <div className="flex items-center gap-0.5 h-3">
                  <span className="w-0.5 h-3 bg-[#FF5A00] animate-[bounce_0.8s_ease-in-out_infinite]"></span>
                  <span className="w-0.5 h-2 bg-[#FF5A00] animate-[bounce_0.6s_ease-in-out_0.2s_infinite]"></span>
                  <span className="w-0.5 h-3.5 bg-[#FF5A00] animate-[bounce_0.9s_ease-in-out_0.1s_infinite]"></span>
                  <span className="w-0.5 h-1.5 bg-[#FF5A00] animate-[bounce_0.7s_ease-in-out_0.3s_infinite]"></span>
                </div>
                <span className="text-[11px] text-[#FF5A00] uppercase hidden sm:inline">BGM: ON</span>
              </>
            ) : (
              <>
                <VolumeX size={14} className="text-[#9CA3AF]" />
                <span className="text-[11px] text-[#6B7280] uppercase hidden sm:inline">PLAY BGM</span>
              </>
            )}
          </button>

          {/* Direct Hire / Contact Button */}
          <button
            onClick={() => onScrollTo('sec-contact')}
            className="industrial-btn-orange flex items-center gap-1.5 px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}
