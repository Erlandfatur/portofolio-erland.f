import React, { useState } from 'react';
import { ShowcaseScene } from './components/3d/ShowcaseScene';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { ContactSection } from './components/sections/ContactSection';
import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import { CustomCursor } from './components/ui/CustomCursor';
import { useSoundEffects } from './hooks/useSoundEffects';

export default function App() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);
  const [themeMode, setThemeMode] = useState('studio');
  const sounds = useSoundEffects();

  const handleScrollTo = (id) => {
    sounds.playInteract();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenProjectDetail = (proj) => {
    sounds.playInteract();
    setSelectedProjectModal(proj);
  };

  const handleCloseProjectDetail = () => {
    sounds.playInteract();
    setSelectedProjectModal(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#ECEEF2] text-[#121316] font-sans relative selection:bg-[#FF5A00] selection:text-white overflow-x-hidden">
      
      {/* Industrial Precision Custom Cursor */}
      <CustomCursor />

      {/* 3D Hardware Canvas Scene (Fixed Background Studio) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ShowcaseScene
          activeProjectIndex={activeProjectIdx}
          themeMode={themeMode}
        />
      </div>

      {/* Industrial Teenage Engineering Style Navbar (Full Width with Ambient BGM Equalizer) */}
      <Navbar
        isMuted={sounds.isMuted}
        isPlayingBGM={sounds.isPlayingBGM}
        onToggleBGM={sounds.toggleBGM}
        onScrollTo={handleScrollTo}
      />

      {/* Main Full-Width Content Viewport */}
      <main className="relative z-10 w-full px-4 sm:px-8 lg:px-14 xl:px-16 py-6 space-y-24">
        
        <HeroSection
          activeProjectIdx={activeProjectIdx}
          setActiveProjectIdx={(idx) => {
            sounds.playInteract();
            setActiveProjectIdx(idx);
          }}
          onScrollTo={handleScrollTo}
        />

        <ProjectsSection
          activeProjectIdx={activeProjectIdx}
          setActiveProjectIdx={(idx) => {
            sounds.playInteract();
            setActiveProjectIdx(idx);
          }}
          onOpenProjectDetail={handleOpenProjectDetail}
        />

        <ExperienceSection />

        <SkillsSection />

        <CertificationsSection />

        <ContactSection onSoundEffect={(type) => {
          if (type === 'interact') sounds.playInteract();
          if (type === 'success') sounds.playSuccess();
        }} />

      </main>

      {/* Interactive Project Spec / GitHub.io Live Sandbox Modal */}
      {selectedProjectModal && (
        <ProjectDetailModal
          project={selectedProjectModal}
          onClose={handleCloseProjectDetail}
        />
      )}

    </div>
  );
}
