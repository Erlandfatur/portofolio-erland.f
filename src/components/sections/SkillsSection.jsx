import React from 'react';
import { portfolioData } from '../../data/portfolioData';

export function SkillsSection() {
  const { skillCategories } = portfolioData;

  return (
    <section id="sec-skills" className="w-full space-y-8">
      <div className="w-full border-b border-[#D1D5DB] pb-4 flex items-end justify-between">
        <div>
          <span className="text-xs font-mono font-bold text-[#FF5A00] uppercase tracking-wider block mb-1">
            [04 / CAPABILITIES MATRIX]
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#121316] font-heading">
            SKILLS & METHODOLOGIES
          </h2>
        </div>
        <span className="text-xs font-mono text-[#6B7280]">
          PRD • SDLC • DATA
        </span>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {skillCategories.map((cat, i) => (
          <div
            key={i}
            className="bg-[#FFFFFF] border border-[#D1D5DB] p-6 rounded-[2rem] space-y-3 shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-2">
              <span className="text-xs font-mono font-bold text-[#121316] uppercase">
                {cat.category}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#FF5A00]"></span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1 font-mono">
              {cat.skills.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[11px] font-bold bg-[#F3F4F6] text-[#374151] rounded-lg border border-[#E5E7EB]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
