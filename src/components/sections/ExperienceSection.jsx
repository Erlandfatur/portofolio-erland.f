import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, MapPin } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export function ExperienceSection() {
  const [expandedExp, setExpandedExp] = useState('esco');
  const { experience, education, leadership } = portfolioData;

  return (
    <section id="sec-experience" className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#D1D5DB] pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#FF5A00] uppercase tracking-wider">
            [03 / TRACK RECORD]
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#121316] font-heading mt-1">
            WORK EXPERIENCE & IMPACT
          </h2>
        </div>
        <span className="text-xs font-mono text-[#6B7280]">
          ENTERPRISE & HEALTH-TECH SYSTEMS
        </span>
      </div>

      <div className="space-y-4">
        {experience.map((item) => {
          const isExpanded = expandedExp === item.id;
          return (
            <div
              key={item.id}
              className="bg-[#FFFFFF] border border-[#D1D5DB] rounded-[2rem] p-6 transition-all shadow-sm"
            >
              <div
                onClick={() => setExpandedExp(prev => prev === item.id ? null : item.id)}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#121316] font-heading">
                      {item.company}
                    </h3>
                    <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-[#121316] text-[#FFFFFF] rounded-full">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs font-mono font-bold text-[#FF5A00]">
                    {item.role}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-[#6B7280]">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} /> {item.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} /> {item.location}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#F3F4F6] border border-[#D1D5DB] flex items-center justify-center text-[#121316]">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-[#E5E7EB] space-y-3 animate-in fade-in duration-200">
                  {item.highlights.map((h, idx) => (
                    <div key={idx} className="bg-[#F9FAFB] p-4 rounded-2xl border border-[#E5E7EB]">
                      <h4 className="text-xs font-bold text-[#121316] font-mono mb-1 flex items-center gap-1.5">
                        <span className="text-[#FF5A00]">●</span>
                        {h.title}
                      </h4>
                      <p className="text-xs text-[#4B5563] leading-relaxed pl-4">
                        {h.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Education & Leadership Modular Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="bg-[#FFFFFF] p-6 rounded-[2rem] border border-[#D1D5DB] shadow-sm space-y-2">
          <span className="text-xs font-mono font-bold text-[#FF5A00] uppercase tracking-wider block">
            [ACADEMICS]
          </span>
          <h4 className="font-extrabold text-[#121316] text-base font-heading">{education[0].institution}</h4>
          <p className="text-xs text-[#4B5563] font-semibold">{education[0].degree}</p>
          <p className="text-xs text-[#6B7280]">{education[0].description}</p>
          <div className="flex items-center justify-between text-xs font-mono text-[#6B7280] pt-3 border-t border-[#E5E7EB]">
            <span>{education[0].period}</span>
            <span className="font-bold text-[#121316] bg-[#F3F4F6] px-2.5 py-1 rounded-md border border-[#D1D5DB]">
              GPA: {education[0].gpa}
            </span>
          </div>
        </div>

        <div className="bg-[#FFFFFF] p-6 rounded-[2rem] border border-[#D1D5DB] shadow-sm space-y-2">
          <span className="text-xs font-mono font-bold text-[#FF5A00] uppercase tracking-wider block">
            [LEADERSHIP]
          </span>
          <h4 className="font-extrabold text-[#121316] text-base font-heading">{leadership[0].organization}</h4>
          <p className="text-xs text-[#4B5563] font-semibold">{leadership[0].role} ({leadership[0].period})</p>
          <p className="text-xs text-[#6B7280]">{leadership[0].highlights[0]}</p>
          <div className="text-xs font-mono text-[#6B7280] pt-3 border-t border-[#E5E7EB]">
            <span>{leadership[1].organization} — {leadership[1].role}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
