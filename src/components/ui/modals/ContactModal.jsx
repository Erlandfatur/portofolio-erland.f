import React, { useState } from 'react';
import { X, Send, Mail, Phone, Check, Copy, Sparkles, MessageSquare, Globe, Code } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../../../data/portfolioData';

export function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const { personal } = portfolioData;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Trigger celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setIsSent(true);

    // Open mail client as fallback
    setTimeout(() => {
      window.location.href = `mailto:${personal.email}?subject=Message%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' (' + formData.email + ')')}`;
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-500/20 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 flex-shrink-0">
            <Send size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Contact Portal & Teleporter
            </h2>
            <p className="text-xs sm:text-sm text-emerald-300">
              Let's connect for Product Management opportunities, discussions, or projects.
            </p>
          </div>
        </div>

        {/* Quick Contact Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-6 border-b border-slate-800">
          {/* Email */}
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Email</span>
                <p className="text-xs sm:text-sm font-semibold text-white truncate max-w-[140px] sm:max-w-[170px]">
                  {personal.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-lg bg-slate-700/70 hover:bg-slate-600 text-slate-200 transition-all cursor-pointer"
              title="Copy Email"
            >
              {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            </button>
          </div>

          {/* WhatsApp / Phone */}
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">WhatsApp / Phone</span>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  {personal.phone}
                </p>
              </div>
            </div>
            <a
              href={`https://wa.me/62${personal.phone.replace(/^0/, '')}?text=Halo%20Erland,%20saya%20tertarik%20dengan%20portofolio%20Anda`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
              title="Chat on WhatsApp"
            >
              <Send size={16} />
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="py-5 border-b border-slate-800 flex flex-wrap items-center justify-center gap-4">
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 transition-all text-xs font-bold"
          >
            <Globe size={16} /> LinkedIn Profile
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-all text-xs font-bold"
          >
            <Code size={16} /> GitHub Profile
          </a>
        </div>

        {/* Interactive Message Form */}
        <div className="pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <MessageSquare size={16} className="text-emerald-400" /> Send Direct Message
          </h3>

          {isSent ? (
            <div className="bg-emerald-950/60 border border-emerald-500/50 p-6 rounded-2xl text-center space-y-2 animate-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-emerald-500/30 text-emerald-300 flex items-center justify-center mx-auto">
                <Check size={24} />
              </div>
              <h4 className="text-base font-bold text-white">Pesan Disiapkan!</h4>
              <p className="text-xs text-emerald-200">
                Membuka aplikasi email default untuk mengirimkan pesan ke <strong>{personal.email}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe / Recruiter"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Message</label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hi Erland, I'd like to discuss a Product Manager role at..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Send size={14} /> Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
