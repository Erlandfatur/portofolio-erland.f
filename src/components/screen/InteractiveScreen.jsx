import React, { useState } from 'react';
import {
  Sparkles,
  ArrowUpRight,
  Send,
  Mail,
  Phone,
  Check,
  Copy,
  FolderGit2,
  Briefcase,
  Layers,
  Award,
  Globe,
  Code,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../../data/portfolioData';

export function InteractiveScreen({ isFocusMode, onToggleFocusMode, onSoundEffect }) {
  const [activeSection, setActiveSection] = useState('all');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [expandedExp, setExpandedExp] = useState('esco');

  const { personal, education, projects, experience, leadership, skillCategories, certifications } = portfolioData;

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

  const scrollToSection = (id) => {
    if (onSoundEffect) onSoundEffect('interact');
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full h-full bg-slate-950 text-slate-100 flex flex-col font-sans overflow-y-auto select-text">
      
      {/* Top App Header inside Screen */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 py-3 flex items-center justify-between gap-2 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-cyan-400/60 shadow-sm flex-shrink-0">
            <img src="/erland_avatar_3d.jpg" alt="Erland" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-xs sm:text-sm font-heading">
                {personal.name}
              </span>
              <span className="px-1.5 py-0.2 text-[9px] font-bold bg-blue-500/20 text-blue-300 rounded border border-blue-500/40">
                APM
              </span>
            </div>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Open to Opportunities
            </span>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <nav className="hidden sm:flex items-center gap-1 text-xs">
          <button
            onClick={() => scrollToSection('sec-hero')}
            className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('sec-projects')}
            className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('sec-experience')}
            className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection('sec-skills')}
            className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection('sec-contact')}
            className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Action Button */}
        <button
          onClick={() => scrollToSection('sec-contact')}
          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-1"
        >
          <Send size={12} /> Contact
        </button>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 p-4 sm:p-8 max-w-5xl mx-auto w-full space-y-12">
        
        {/* SECTION 1: HERO SHOWCASE */}
        <section id="sec-hero" className="pt-2 sm:pt-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl relative overflow-hidden">
            
            {/* Background Glow */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none"></div>

            {/* Left Content */}
            <div className="flex-1 space-y-4 text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold">
                <Sparkles size={13} className="text-cyan-400" /> Technical Product Management
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-heading">
                BUILDING DIGITAL <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">EXPERIENCES</span> THAT SCALE.
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                {personal.summary}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => scrollToSection('sec-projects')}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <FolderGit2 size={15} /> Explore Projects
                </button>
                <a
                  href={`mailto:${personal.email}?subject=Collaboration%20Opportunity%20-%20Erland%20Faturrahman`}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all flex items-center gap-1.5"
                >
                  <Mail size={15} /> Email Me
                </a>
              </div>
            </div>

            {/* Right: 3D Stylized Avatar Card */}
            <div className="relative flex-shrink-0 z-10">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/20 group">
                <img
                  src="/erland_avatar_3d.jpg"
                  alt="Erland Faturrahman 3D Avatar"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <div>
                    <span className="text-[11px] font-bold text-white block">Erland Faturrahman</span>
                    <span className="text-[9px] text-cyan-300 block">APM & Tech Specialist</span>
                  </div>
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-3 -left-3 bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-1.5 shadow-xl backdrop-blur-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-200">GPA 3.67 (PNJ)</span>
              </div>
            </div>
          </div>

          {/* Metric Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {personal.stats.map((stat, i) => (
              <div key={i} className="bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-2xl text-center shadow-lg">
                <div className="text-base sm:text-lg font-extrabold text-cyan-300 font-heading">
                  {stat.value}
                </div>
                <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: PROJECTS SHOWCASE */}
        <section id="sec-projects" className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading flex items-center gap-2">
                <FolderGit2 className="text-cyan-400" size={22} /> Featured Product & SaaS Projects
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-world systems, algorithmic market tools, and AI platforms.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 rounded-3xl p-6 transition-all shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 rounded-md border border-cyan-500/30">
                        {proj.status}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        Role: <strong className="text-white">{proj.role}</strong>
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-semibold text-cyan-400">
                      {proj.subtitle}
                    </p>
                  </div>

                  {/* Demo & Code Links */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {proj.githubUrl && proj.githubUrl !== '#' && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-colors"
                      >
                        <Code size={13} /> Repo
                      </a>
                    )}
                    {proj.demoUrl && proj.demoUrl !== '#' && (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-cyan-500/20 transition-all"
                      >
                        <ExternalLink size={13} /> Live App
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {proj.description}
                </p>

                {/* Key Points */}
                <div className="space-y-2 pt-1">
                  {proj.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={11} />
                      </div>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                  {proj.techStack.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 text-[10px] font-semibold bg-slate-800/80 text-slate-300 rounded-md border border-slate-700/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: WORK EXPERIENCE & CAREER */}
        <section id="sec-experience" className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading flex items-center gap-2">
                <Briefcase className="text-amber-400" size={22} /> Work Experience & Leadership
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Product Ownership, Kaizen Digitalization, and Engineering Execution.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {experience.map((item) => {
              const isExpanded = expandedExp === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-slate-900/70 border border-slate-800/80 hover:border-amber-500/40 rounded-3xl p-5 sm:p-6 transition-all shadow-xl"
                >
                  <div
                    onClick={() => setExpandedExp(prev => prev === item.id ? null : item.id)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                          {item.company}
                        </h3>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-amber-400">
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
                      <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-800 space-y-3 animate-in fade-in duration-200">
                      {item.highlights.map((h, idx) => (
                        <div key={idx} className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
                          <h4 className="text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                            <CheckCircle2 size={12} className="text-emerald-400" />
                            {h.title}
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed pl-4">
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

          {/* Education & Leadership Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Education */}
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award size={15} className="text-amber-400" /> Education
              </h4>
              <h5 className="font-bold text-white text-sm">{education[0].institution}</h5>
              <p className="text-xs text-blue-300 font-semibold">{education[0].degree}</p>
              <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                <span>{education[0].period}</span>
                <span className="font-bold text-amber-400">GPA: {education[0].gpa}</span>
              </div>
            </div>

            {/* Leadership */}
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Globe size={15} className="text-blue-400" /> Leadership & Community
              </h4>
              <h5 className="font-bold text-white text-sm">{leadership[0].organization}</h5>
              <p className="text-xs text-amber-300 font-semibold">{leadership[0].role} ({leadership[0].period})</p>
              <p className="text-xs text-slate-400 mt-1">{leadership[0].highlights[0]}</p>
            </div>
          </div>
        </section>

        {/* SECTION 4: KEY SKILLS & CAPABILITIES */}
        <section id="sec-skills" className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading flex items-center gap-2">
              <Layers className="text-purple-400" size={22} /> Key Skills & Methodologies
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Product discovery, PRD/BRD drafting, UI/UX prototyping, and technical fluency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillCategories.map((cat, i) => (
              <div
                key={i}
                className="bg-slate-900/70 border border-slate-800 p-4 rounded-2xl space-y-3"
              >
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  {cat.category}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-[11px] font-medium bg-slate-800 text-slate-200 rounded-lg border border-slate-700/60"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: CERTIFICATIONS */}
        <section id="sec-certs" className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" size={22} /> 7 Professional Certifications
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Accredited credentials across Product Management, Agile/Scrum, and Technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-2xl flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck size={16} />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block">
                    {cert.badge}
                  </span>
                  <h4 className="text-xs font-bold text-white leading-snug">
                    {cert.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: CONTACT & TELEPORTER */}
        <section id="sec-contact" className="space-y-6 pt-4 pb-8">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/80 to-emerald-950/40 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div>
              <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider">
                Direct Communication
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading mt-1">
                Let's Discuss Product Opportunities.
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Reach out for Associate Product Manager roles, technical collaborations, or discussions.
              </p>
            </div>

            {/* Quick Contact Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Email */}
              <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase">Email</span>
                    <p className="text-xs font-bold text-white truncate max-w-[150px] sm:max-w-[200px]">
                      {personal.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors cursor-pointer"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>

              {/* WhatsApp */}
              <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase">WhatsApp / Phone</span>
                    <p className="text-xs font-bold text-white">
                      {personal.phone}
                    </p>
                  </div>
                </div>
                <a
                  href={`https://wa.me/62${personal.phone.replace(/^0/, '')}?text=Halo%20Erland,%20saya%20tertarik%20dengan%20portofolio%20Anda`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                  title="Chat on WhatsApp"
                >
                  <Send size={14} />
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 transition-all text-xs font-bold"
              >
                <Globe size={14} /> LinkedIn Profile
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-all text-xs font-bold"
              >
                <Code size={14} /> GitHub Profile
              </a>
            </div>

            {/* Interactive Message Form */}
            {isSent ? (
              <div className="bg-emerald-950/60 border border-emerald-500/50 p-6 rounded-2xl text-center space-y-1 animate-in zoom-in-95">
                <div className="w-10 h-10 rounded-full bg-emerald-500/30 text-emerald-300 flex items-center justify-center mx-auto mb-2">
                  <Check size={20} />
                </div>
                <h4 className="text-sm font-bold text-white">Pesan Disiapkan!</h4>
                <p className="text-xs text-emerald-200">
                  Membuka email client untuk mengirim pesan ke <strong>{personal.email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Recruiter / Collaborator"
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-1">Message</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Erland, I'd like to discuss a Product Manager role..."
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Send size={14} /> Send Direct Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}
