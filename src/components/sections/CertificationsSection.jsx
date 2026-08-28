import React from 'react';
import { portfolioData } from '../../data/portfolioData';

export function CertificationsSection() {
  const { certifications } = portfolioData;

  return (
    <section id="sec-certs" className="w-full space-y-8">
      <div className="w-full border-b border-[#D1D5DB] pb-4 flex items-end justify-between">
        <div>
          <span className="text-xs font-mono font-bold text-[#FF5A00] uppercase tracking-wider block mb-1">
            [05 / ACCREDITATIONS]
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#121316] font-heading">
            7 PROFESSIONAL CERTIFICATIONS
          </h2>
        </div>
        <span className="text-xs font-mono text-[#6B7280]">
          OFFICIALLY ACCREDITED
        </span>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-4">
        {certifications.map((cert, i) => (
          <div
            key={i}
            className="bg-[#FFFFFF] border border-[#D1D5DB] p-5 rounded-2xl flex flex-col justify-between space-y-2 shadow-sm"
          >
            <div className="flex items-center justify-between font-mono">
              <span className="text-[10px] font-bold text-[#FF5A00] bg-[#FF5A00]/10 px-2 py-0.5 rounded border border-[#FF5A00]/20">
                {cert.badge}
              </span>
              <span className="text-[10px] text-[#9CA3AF]">0{i + 1}</span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#121316] leading-snug font-sans">
                {cert.name}
              </h4>
              <p className="text-[11px] font-mono text-[#6B7280] mt-1">{cert.issuer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
