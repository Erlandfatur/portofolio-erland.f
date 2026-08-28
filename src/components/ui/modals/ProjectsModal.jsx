import React, { useState } from 'react';
import { X, FolderGit2, ExternalLink, Sparkles, CheckCircle2, Code } from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';

export function ProjectsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [selectedProject, setSelectedProject] = useState(0);
  const projects = portfolioData.projects;
  const curr = projects[selectedProject];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/20 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 flex-shrink-0">
            <FolderGit2 size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Project Arcade & Showcase
            </h2>
            <p className="text-xs sm:text-sm text-cyan-300">
              Featured SaaS, AI Solutions & Enterprise Systems Built & Managed
            </p>
          </div>
        </div>

        {/* Project Selector Pills */}
        <div className="flex gap-2 py-4 overflow-x-auto border-b border-slate-800">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => setSelectedProject(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedProject === idx
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30 scale-105'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>{proj.title}</span>
              <span className="text-[10px] opacity-75">({proj.status})</span>
            </button>
          ))}
        </div>

        {/* Selected Project Deep Dive */}
        <div className="py-6 space-y-6">
          {/* Card Top */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-5 rounded-2xl border border-cyan-500/30">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="px-2.5 py-1 text-xs font-extrabold bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-500/30">
                {curr.status}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Role: <strong className="text-white">{curr.role}</strong>
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-1 font-heading">
              {curr.title}
            </h3>
            <p className="text-sm font-semibold text-cyan-400 mb-3">
              {curr.subtitle}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {curr.description}
            </p>
          </div>

          {/* Key Product Accomplishments */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Sparkles size={16} className="text-cyan-400" /> Key Product Responsibilities & Outcomes
            </h4>
            <div className="space-y-2.5">
              {curr.keyPoints.map((point, i) => (
                <div
                  key={i}
                  className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/40 flex items-start gap-3 text-sm text-slate-200"
                >
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={13} />
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Technologies & Methodologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {curr.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-semibold bg-slate-800 text-slate-300 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Project {selectedProject + 1} of {projects.length}
          </div>
          <div className="flex items-center gap-3">
            {curr.githubUrl && curr.githubUrl !== '#' && (
              <a
                href={curr.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-all"
              >
                <Code size={15} /> GitHub / Code
              </a>
            )}
            {curr.demoUrl && curr.demoUrl !== '#' && (
              <a
                href={curr.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/25 transition-all"
              >
                <ExternalLink size={15} /> Live App Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
