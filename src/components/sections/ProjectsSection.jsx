import React, { useState } from 'react';
import { ArrowUpRight, Code, Eye, Globe } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export function ProjectsSection({ activeProjectIdx, setActiveProjectIdx, onOpenProjectDetail }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { projects } = portfolioData;

  const categories = [
    { id: 'all', label: 'ALL REPOSITORIES' },
    { id: 'ai', label: 'AI & AGENTS' },
    { id: 'enterprise', label: 'ENTERPRISE SAAS' },
    { id: 'tools', label: 'PROTOCOLS & TOOLS' },
    { id: 'games', label: '3D & GAMES' },
  ];

  const filteredProjects = selectedFilter === 'all'
    ? projects
    : projects.filter(p => p.category === selectedFilter);

  return (
    <section id="sec-projects" className="w-full space-y-8">
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D1D5DB] pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-[#FF5A00] uppercase tracking-wider block mb-1">
            [02 / GITHUB & LIVE SHOWCASE]
          </span>
          <h2 className="text-2xl sm:text-4xl xl:text-5xl font-extrabold text-[#121316] font-heading">
            FEATURED BUILDS & REPOSITORIES
          </h2>
        </div>
        <div className="text-xs font-mono text-[#6B7280]">
          OPEN SOURCE • GITHUB PAGES • SAAS APPS
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedFilter(cat.id)}
            className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${
              selectedFilter === cat.id
                ? 'bg-[#121316] text-[#FFFFFF] shadow-sm'
                : 'bg-[#FFFFFF] text-[#555C68] hover:text-[#121316] border border-[#D1D5DB]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredProjects.map((proj, idx) => (
          <div
            key={proj.id}
            onClick={() => {
              setActiveProjectIdx(idx);
              if (onOpenProjectDetail) onOpenProjectDetail(proj);
            }}
            className={`bg-[#FFFFFF] border rounded-[2rem] p-6 transition-all shadow-sm flex flex-col justify-between space-y-5 cursor-pointer group ${
              activeProjectIdx === idx
                ? 'border-[#FF5A00] ring-2 ring-[#FF5A00]/20 shadow-md'
                : 'border-[#D1D5DB] hover:border-[#9CA3AF]'
            }`}
          >
            <div className="space-y-3.5">
              {/* Header Meta with Live Indicator */}
              <div className="flex items-center justify-between gap-2 border-b border-[#F3F4F6] pb-3 font-mono text-xs">
                <span className={`px-2.5 py-0.5 font-bold rounded-full text-[10px] flex items-center gap-1.5 ${
                  proj.githubIoUrl
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-[#FF5A00] text-white'
                }`}>
                  {proj.githubIoUrl && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>}
                  {proj.status}
                </span>
                <span className="text-[#6B7280] font-semibold text-[11px]">
                  {proj.language}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#121316] font-heading group-hover:text-[#FF5A00] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs font-mono text-[#FF5A00] font-bold mt-0.5">
                  {proj.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-[#4B5563] leading-relaxed">
                {proj.description}
              </p>

              {/* Key Bullet Points */}
              <div className="space-y-2 pt-2 border-t border-[#F3F4F6]">
                {proj.keyPoints.slice(0, 2).map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#374151]">
                    <span className="text-[#FF5A00] font-mono font-bold text-xs mt-0.5">→</span>
                    <span className="line-clamp-2">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions & Tech Chips */}
            <div className="pt-4 border-t border-[#E5E7EB] flex flex-col gap-3">
              <div className="flex flex-wrap gap-1 font-mono">
                {proj.techStack.slice(0, 3).map((t, i) => (
                  <span key={i} className="px-2 py-0.5 text-[10px] font-bold bg-[#F3F4F6] text-[#374151] rounded-md border border-[#E5E7EB]">
                    {t}
                  </span>
                ))}
                {proj.techStack.length > 3 && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-[#E5E7EB] text-[#6B7280] rounded-md">
                    +{proj.techStack.length - 3}
                  </span>
                )}
              </div>

              {/* Action Buttons: Spec Detail Modal vs GitHub Repo */}
              <div className="flex items-center gap-2 pt-1 font-mono" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onOpenProjectDetail && onOpenProjectDetail(proj)}
                  className="industrial-btn-orange flex-1 py-2.5 rounded-full text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Eye size={13} />
                  <span>VIEW SPEC / DEMO</span>
                </button>

                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2.5 rounded-full bg-[#FFFFFF] hover:bg-[#F3F4F6] text-[#121316] text-xs font-bold flex items-center gap-1 border border-[#D1D5DB] transition-colors"
                    title="View GitHub Source Code"
                  >
                    <Code size={13} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
