import React from 'react';
import {
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Sunset,
  Download,
  Sparkles,
  Award,
  Send,
  Eye,
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export function HUD({
  isFocusMode,
  onToggleFocusMode,
  isMuted,
  toggleMute,
  themeMode,
  setThemeMode,
}) {
  const cycleTheme = () => {
    if (themeMode === 'cyberpunk') setThemeMode('sunset');
    else if (themeMode === 'sunset') setThemeMode('daylight');
    else setThemeMode('cyberpunk');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left: 3D Avatar Profile Identity Badge */}
        <div className="pointer-events-auto flex items-center gap-3 bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-2 pr-4 shadow-2xl shadow-black/50">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-cyan-400/60 shadow-md flex-shrink-0">
            <img
              src="/erland_avatar_3d.jpg"
              alt="Erland Faturrahman"
              className="w-full h-full object-cover"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xs sm:text-sm font-bold text-white leading-tight font-heading">
                {portfolioData.personal.name}
              </h1>
              <span className="px-1.5 py-0.2 text-[9px] font-bold bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
                APM
              </span>
            </div>
            <p className="text-[10px] text-slate-400 truncate max-w-[130px] sm:max-w-[200px]">
              Associate Product Manager
            </p>
          </div>
        </div>

        {/* Center: Interactive Mode Status Pill */}
        <div className="hidden md:flex pointer-events-auto items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/70 border border-slate-800 backdrop-blur-md text-xs text-slate-300 shadow-xl">
          <Sparkles size={13} className="text-amber-400" />
          <span>Interactive 3D Hardware Canvas</span>
          <span className="text-[10px] text-slate-500">• Scroll & interact directly with the screen</span>
        </div>

        {/* Right: Controls & View Actions */}
        <div className="pointer-events-auto flex items-center gap-2">
          
          {/* Dual-Mode View Switcher (3D Orbit vs Fullscreen Focus) */}
          <button
            onClick={onToggleFocusMode}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl backdrop-blur-xl text-xs font-bold transition-all cursor-pointer shadow-lg ${
              isFocusMode
                ? 'bg-amber-500 text-slate-950 shadow-amber-500/30 scale-105'
                : 'bg-slate-900/80 hover:bg-slate-800 text-amber-300 border border-amber-500/40'
            }`}
            title={isFocusMode ? 'Kembali ke 3D Showcase' : 'Fokus Layar Penuh'}
          >
            {isFocusMode ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            <span className="hidden sm:inline">{isFocusMode ? '3D Showcase' : 'Focus View'}</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={cycleTheme}
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 backdrop-blur-xl transition-all cursor-pointer shadow-lg"
            title={`Current Theme: ${themeMode}`}
          >
            {themeMode === 'cyberpunk' && <Moon size={15} className="text-cyan-400" />}
            {themeMode === 'sunset' && <Sunset size={15} className="text-amber-400" />}
            {themeMode === 'daylight' && <Sun size={15} className="text-yellow-400" />}
          </button>

          {/* Audio Mute Toggle */}
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 backdrop-blur-xl transition-all cursor-pointer shadow-lg"
            title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
          >
            {isMuted ? <VolumeX size={15} className="text-red-400" /> : <Volume2 size={15} className="text-emerald-400" />}
          </button>

          {/* Direct Email / Resume */}
          <a
            href={`mailto:${portfolioData.personal.email}?subject=Request%20Full%20Resume%20-%20Erland%20Faturrahman`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all cursor-pointer hover:scale-105"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Hire / CV</span>
          </a>
        </div>
      </div>
    </header>
  );
}
