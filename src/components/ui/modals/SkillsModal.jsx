import React, { useState } from 'react';
import { X, Zap, Layers, Palette, Code2, Wrench, Globe, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';

export function SkillsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeCategory, setActiveCategory] = useState(0);
  const categories = portfolioData.skillCategories;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Layers': return <Layers size={18} />;
      case 'Palette': return <Palette size={18} />;
      case 'Code2': return <Code2 size={18} />;
      case 'Wrench': return <Wrench size={18} />;
      case 'Globe': return <Globe size={18} />;
      default: return <Zap size={18} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-500/20 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 flex-shrink-0">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Tech Lab & Key Skills
            </h2>
            <p className="text-xs sm:text-sm text-purple-300">
              Product Management Frameworks, UI/UX, Technical Stack & Collaboration Tools
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 py-5 border-b border-slate-800">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === idx
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 scale-105'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {getIcon(cat.icon)}
              <span>{cat.category}</span>
            </button>
          ))}
        </div>

        {/* Active Category Skills Content */}
        <div className="py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></span>
              {categories[activeCategory].category}
            </h3>
            <span className="text-xs text-purple-300 font-semibold">
              {categories[activeCategory].skills.length} Capabilities
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories[activeCategory].skills.map((skill, i) => (
              <div
                key={i}
                className="bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-purple-500/50 p-3.5 rounded-2xl flex items-center gap-3 transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 group-hover:bg-purple-500/30 text-purple-300 flex items-center justify-center flex-shrink-0 transition-colors">
                  <CheckCircle2 size={16} />
                </div>
                <span className="text-sm font-semibold text-slate-200 group-hover:text-white">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight Banner */}
        <div className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 p-4 rounded-2xl border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
              PM Execution Methodology
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              MoSCoW / RICE Prioritization • PRD & BRD Specifications • User Journey Mapping • Sprint Planning
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex-shrink-0"
          >
            Explore World
          </button>
        </div>
      </div>
    </div>
  );
}
