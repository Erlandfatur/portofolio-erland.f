import React from 'react';
import { X, GraduationCap, MapPin, Mail, Phone, ExternalLink, Sparkles, Download, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';

export function AboutModal({ isOpen, onClose, onOpenContact }) {
  if (!isOpen) return null;

  const { personal, education } = portfolioData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-blue-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-500/20 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Header Section with 3D Avatar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-800">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-cyan-400/70 shadow-2xl shadow-cyan-500/30 flex-shrink-0">
            <img
              src="/erland_avatar_3d.jpg"
              alt="Erland Faturrahman 3D Avatar"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                {personal.name}
              </h2>
              <span className="px-2.5 py-0.5 text-xs font-bold bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/40">
                Associate Product Manager
              </span>
            </div>
            <p className="text-sm font-medium text-cyan-400 mb-2">
              {personal.title}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin size={14} className="text-rose-400" /> {personal.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail size={14} className="text-blue-400" /> {personal.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone size={14} className="text-emerald-400" /> {personal.phone}
              </span>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="py-6 border-b border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-blue-400" /> Professional Summary
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-slate-300 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
            {personal.summary}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-6 border-b border-slate-800">
          {personal.stats.map((stat, i) => (
            <div key={i} className="bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/40 text-center">
              <div className="text-lg sm:text-xl font-extrabold text-cyan-300 font-heading">
                {stat.value}
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="py-6 border-b border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <GraduationCap size={16} className="text-amber-400" /> Education
          </h3>
          {education.map((edu, i) => (
            <div key={i} className="bg-slate-800/30 p-4 rounded-2xl border border-slate-700/40 flex flex-col sm:flex-row justify-between gap-3">
              <div>
                <h4 className="font-bold text-white text-base">{edu.institution}</h4>
                <p className="text-xs text-blue-300 font-semibold">{edu.degree}</p>
                <p className="text-xs text-slate-400 mt-1">{edu.description}</p>
              </div>
              <div className="text-left sm:text-right flex-shrink-0">
                <span className="inline-block px-2.5 py-1 text-xs font-bold bg-amber-500/20 text-amber-300 rounded-lg border border-amber-500/30">
                  GPA: {edu.gpa}
                </span>
                <p className="text-[11px] text-slate-400 mt-1">{edu.period}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-wrap items-center justify-end gap-3">
          <button
            onClick={() => {
              onClose();
              if (onOpenContact) onOpenContact();
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all cursor-pointer"
          >
            Contact Directly
          </button>
          <a
            href={`mailto:${personal.email}?subject=Collaboration%20Opportunity%20-%20Erland%20Faturrahman`}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
          >
            <Download size={15} /> Send Email / Hire
          </a>
        </div>
      </div>
    </div>
  );
}
