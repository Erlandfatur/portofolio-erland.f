import React, { useState } from 'react';
import { X, Briefcase, Users, Calendar, MapPin, Sparkles, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';

export function ExperienceModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('work'); // 'work' | 'org'
  const [expandedId, setExpandedId] = useState('esco');

  const { experience, leadership } = portfolioData;

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-500/20 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/30 flex-shrink-0">
            <Briefcase size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Quest Log & Career Journey
            </h2>
            <p className="text-xs sm:text-sm text-amber-300">
              Professional Work History, Product Ownership & Leadership Roles
            </p>
          </div>
        </div>

        {/* Tabs: Work vs Leadership */}
        <div className="flex gap-3 py-4 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('work')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'work'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 scale-105'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Briefcase size={16} /> Professional Experience ({experience.length})
          </button>
          <button
            onClick={() => setActiveTab('org')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'org'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 scale-105'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Users size={16} /> Leadership & Organization ({leadership.length})
          </button>
        </div>

        {/* Timeline Content */}
        <div className="py-6 space-y-4">
          {activeTab === 'work' ? (
            experience.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-amber-500/40 rounded-2xl p-5 transition-all"
                >
                  <div
                    onClick={() => toggleExpand(item.id)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer select-none"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-white font-heading">
                          {item.company}
                        </h3>
                        <span className="px-2 py-0.5 text-[11px] font-bold bg-amber-500/20 text-amber-300 rounded-md border border-amber-500/30">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-amber-400">
                        {item.role}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} /> {item.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={13} /> {item.location}
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-slate-700/60 flex items-center justify-center text-slate-300">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Highlights */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-700/60 space-y-3 animate-in fade-in duration-150">
                      {item.highlights.map((h, idx) => (
                        <div key={idx} className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                          <h4 className="text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                            <CheckCircle2 size={13} className="text-emerald-400" />
                            {h.title}
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed pl-5">
                            {h.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            leadership.map((org, i) => (
              <div
                key={i}
                className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white font-heading">
                      {org.organization}
                    </h3>
                    <p className="text-sm font-semibold text-amber-400">
                      {org.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} /> {org.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} /> {org.location}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {org.highlights.map((h, idx) => (
                    <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0"></span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all cursor-pointer"
          >
            Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
}
