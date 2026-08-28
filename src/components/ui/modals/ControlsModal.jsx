import React from 'react';
import { X, Gamepad2, MousePointer, Keyboard, Smartphone, Compass } from 'lucide-react';

export function ControlsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-blue-500/40 rounded-3xl p-6 shadow-2xl shadow-blue-500/20 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
            <Gamepad2 size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-heading">Cara Eksplorasi Dunia 3D</h3>
            <p className="text-xs text-slate-400">Panduan Kontrol Karakter & Navigasi</p>
          </div>
        </div>

        {/* Controls Grid */}
        <div className="space-y-3 py-5">
          {/* Keyboard Controls */}
          <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/50 flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Keyboard size={18} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="px-2 py-0.5 text-[11px] font-bold bg-slate-700 text-white rounded">W</span>
                <span className="px-2 py-0.5 text-[11px] font-bold bg-slate-700 text-white rounded">A</span>
                <span className="px-2 py-0.5 text-[11px] font-bold bg-slate-700 text-white rounded">S</span>
                <span className="px-2 py-0.5 text-[11px] font-bold bg-slate-700 text-white rounded">D</span>
                <span className="text-xs text-slate-400 font-medium">atau Tombol Panah</span>
              </div>
              <p className="text-xs text-slate-300">Berjalan menjelajahi setiap pulau.</p>
            </div>
          </div>

          {/* Jump & Interact */}
          <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/50 flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
              <Gamepad2 size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2 py-0.5 text-[11px] font-bold bg-slate-700 text-white rounded">SPACE</span>
                <span className="text-xs text-slate-400 font-medium">Lompat</span>
                <span className="px-2 py-0.5 text-[11px] font-bold bg-slate-700 text-white rounded">E</span>
                <span className="text-xs text-slate-400 font-medium">Buka Menu / Dialog</span>
              </div>
              <p className="text-xs text-slate-300">Interaksi dengan landmark atau melompat.</p>
            </div>
          </div>

          {/* Mouse Click to Move */}
          <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/50 flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
              <MousePointer size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">Click-to-Move</h4>
              <p className="text-xs text-slate-300">Klik di tanah atau landmark untuk jalan otomatis.</p>
            </div>
          </div>

          {/* Fast Travel & Radar */}
          <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/50 flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Compass size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">Quick-Travel & Radar Minimap</h4>
              <p className="text-xs text-slate-300">Klik menu atas atau pin radar untuk teleport langsung.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
          >
            Mulai Eksplorasi 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
