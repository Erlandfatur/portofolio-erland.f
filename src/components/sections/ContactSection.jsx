import React, { useState } from 'react';
import { Mail, Phone, Globe, Code, ArrowUpRight, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../../data/portfolioData';

export function ContactSection({ onSoundEffect }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const { personal } = portfolioData;

  const handleCopyEmail = () => {
    if (onSoundEffect) onSoundEffect('interact');
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    if (onSoundEffect) onSoundEffect('interact');
    navigator.clipboard.writeText(personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    if (onSoundEffect) onSoundEffect('success');

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });

    setIsSent(true);

    setTimeout(() => {
      window.location.href = `mailto:${personal.email}?subject=Message%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' (' + formData.email + ')')}`;
    }, 1200);
  };

  return (
    <section id="sec-contact" className="w-full space-y-8 pb-24">
      <div className="w-full bg-[#121316] text-white border border-[#23262D] rounded-[2.5rem] p-6 sm:p-14 shadow-2xl space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#23262D] pb-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#FF5A00] uppercase tracking-wider block mb-1">
              [06 / TRANSMISSION]
            </span>
            <h2 className="text-2xl sm:text-4xl xl:text-5xl font-extrabold text-white font-heading">
              LET'S BUILD TOGETHER.
            </h2>
          </div>
          <p className="text-xs font-mono text-[#9CA3AF]">
            OPEN TO APM & TECH PM OPPORTUNITIES
          </p>
        </div>

        {/* Contact Badges & Form in Wide 2-Column Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4 font-mono">
            <div className="bg-[#1C1E24] p-5 rounded-2xl border border-[#2E323B] flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FF5A00]/20 text-[#FF5A00] flex items-center justify-center font-bold">
                  @
                </div>
                <div>
                  <span className="text-[10px] text-[#9CA3AF] uppercase block">EMAIL ADDRESS</span>
                  <span className="text-xs sm:text-sm font-bold text-white">{personal.email}</span>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-xl bg-[#282C34] hover:bg-[#343A46] text-white transition-colors cursor-pointer"
                title="Copy Email"
              >
                {copiedEmail ? <Check size={16} className="text-[#FF5A00]" /> : <Copy size={16} />}
              </button>
            </div>

            <div className="bg-[#1C1E24] p-5 rounded-2xl border border-[#2E323B] flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  WA
                </div>
                <div>
                  <span className="text-[10px] text-[#9CA3AF] uppercase block">WHATSAPP / PHONE</span>
                  <span className="text-xs sm:text-sm font-bold text-white">{personal.phone}</span>
                </div>
              </div>
              <a
                href={`https://wa.me/62${personal.phone.replace(/^0/, '')}?text=Halo%20Erland,%20saya%20tertarik%20dengan%20portofolio%20Anda`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#282C34] hover:bg-emerald-600 text-white transition-colors"
                title="Open WhatsApp"
              >
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#1C1E24] hover:bg-[#282C34] text-[#E5E7EB] border border-[#2E323B] transition-all text-xs font-bold"
              >
                <Globe size={14} /> LINKEDIN
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#1C1E24] hover:bg-[#282C34] text-[#E5E7EB] border border-[#2E323B] transition-all text-xs font-bold"
              >
                <Code size={14} /> GITHUB
              </a>
            </div>
          </div>

          {/* Right: Message Form (7 cols) */}
          <div className="lg:col-span-7 font-mono">
            {isSent ? (
              <div className="bg-[#1C1E24] border border-[#FF5A00]/40 p-8 rounded-3xl text-center space-y-2">
                <h4 className="text-base font-bold text-[#FF5A00]">TRANSMISSION DISPATCHED</h4>
                <p className="text-xs text-[#9CA3AF]">
                  Opening default email client to send message to {personal.email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-[#9CA3AF] mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Recruiter / Founder Name"
                      className="w-full bg-[#1C1E24] border border-[#2E323B] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FF5A00] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-[#9CA3AF] mb-1.5">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full bg-[#1C1E24] border border-[#2E323B] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FF5A00] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#9CA3AF] mb-1.5">Message</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Discussing Product Manager role or project collaboration..."
                    className="w-full bg-[#1C1E24] border border-[#2E323B] rounded-xl p-4 text-xs text-white focus:outline-none focus:border-[#FF5A00] transition-colors"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="industrial-btn-orange px-9 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
                  >
                    <span>TRANSMIT MESSAGE</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
