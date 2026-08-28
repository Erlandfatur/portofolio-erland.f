import React from 'react';
import { X, Award, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';

export function CertificationsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { certifications } = portfolioData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-500/20 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30 flex-shrink-0">
            <Award size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Professional Certifications
            </h2>
            <p className="text-xs sm:text-sm text-amber-300">
              Validated credentials in Product Management, Agile/Scrum, Design & Game Tech
            </p>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 py-6">
          {certifications.map((cert, i) => (
            <div
              key={i}
              className="bg-slate-800/50 hover:bg-slate-800/90 border border-slate-700/50 hover:border-amber-500/40 p-4 rounded-2xl flex items-start gap-3.5 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <ShieldCheck size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {cert.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors leading-snug">
                  {cert.name}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Issued by <strong className="text-slate-300">{cert.issuer}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
