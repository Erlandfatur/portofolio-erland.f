import { useState, useRef, useEffect, useCallback } from 'react';

export function useSoundEffects() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingBGM, setIsPlayingBGM] = useState(true);
  const audioCtxRef = useRef(null);
  const bgmNodesRef = useRef([]);
  const bgmGainRef = useRef(null);
  const chordIntervalRef = useRef(null);
  const hasInitializedRef = useRef(false);

  // Initialize Audio Context
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Ambient Chords (Teenage Engineering Warm Analog Synth Pad)
  // Chords: Em9 -> Cmaj7 -> Gmaj7 -> Dadd9
  const chordProgressions = [
    [164.81, 196.00, 246.94, 293.66, 329.63], // E3, G3, B3, D4, E4 (Em9)
    [130.81, 164.81, 196.00, 246.94, 261.63], // C3, E3, G3, B3, C4 (Cmaj7)
    [196.00, 246.94, 293.66, 370.00, 392.00], // G3, B3, D4, F#4, G4 (Gmaj7)
    [146.83, 220.00, 293.66, 329.63, 370.00], // D3, A3, D4, E4, F#4 (Dadd9)
  ];

  const stopBGM = useCallback(() => {
    if (chordIntervalRef.current) {
      clearInterval(chordIntervalRef.current);
      chordIntervalRef.current = null;
    }

    if (bgmGainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      bgmGainRef.current.gain.setTargetAtTime(0, now, 0.4);
    }

    setTimeout(() => {
      bgmNodesRef.current.forEach(node => {
        try { node.stop(); node.disconnect(); } catch (e) {}
      });
      bgmNodesRef.current = [];
    }, 600);

    setIsPlayingBGM(false);
    setIsMuted(true);
  }, []);

  const startBGM = useCallback(() => {
    try {
      const ctx = getAudioContext();
      stopBGM();

      // Master BGM Gain with smooth fade-in
      const masterBgmGain = ctx.createGain();
      masterBgmGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterBgmGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2.5);

      // Low-pass Warm Filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(480, ctx.currentTime);
      filter.Q.setValueAtTime(2.0, ctx.currentTime);

      masterBgmGain.connect(filter);
      filter.connect(ctx.destination);
      bgmGainRef.current = masterBgmGain;

      let chordIdx = 0;

      const playChord = (frequencies) => {
        const prevNodes = [...bgmNodesRef.current];
        bgmNodesRef.current = [];

        prevNodes.forEach(node => {
          try {
            node.gain.gain.setTargetAtTime(0, ctx.currentTime, 1.2);
            setTimeout(() => {
              try { node.osc.stop(); node.osc.disconnect(); } catch (e) {}
            }, 1500);
          } catch (e) {}
        });

        frequencies.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const voiceGain = ctx.createGain();

          osc.type = i % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.detune.setValueAtTime((i - 2) * 4, ctx.currentTime);

          voiceGain.gain.setValueAtTime(0.001, ctx.currentTime);
          voiceGain.gain.exponentialRampToValueAtTime(0.06 / (i + 1), ctx.currentTime + 1.8);

          osc.connect(voiceGain);
          voiceGain.connect(masterBgmGain);

          osc.start();
          bgmNodesRef.current.push({ osc, gain: voiceGain });
        });
      };

      playChord(chordProgressions[0]);

      chordIntervalRef.current = setInterval(() => {
        chordIdx = (chordIdx + 1) % chordProgressions.length;
        playChord(chordProgressions[chordIdx]);
      }, 6000);

      setIsPlayingBGM(true);
      setIsMuted(false);
    } catch (e) {
      console.warn('Audio start error:', e);
    }
  }, [getAudioContext, stopBGM]);

  const toggleBGM = useCallback(() => {
    if (isPlayingBGM) {
      stopBGM();
    } else {
      startBGM();
    }
  }, [isPlayingBGM, startBGM, stopBGM]);

  // Seamless Auto-Start on first user touch / click / scroll / pointer event
  useEffect(() => {
    const handleFirstGesture = () => {
      if (!hasInitializedRef.current) {
        hasInitializedRef.current = true;
        startBGM();
      }
    };

    // Try starting immediately
    try {
      startBGM();
    } catch (e) {}

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('scroll', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });
    window.addEventListener('pointerdown', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('pointerdown', handleFirstGesture);
      if (chordIntervalRef.current) clearInterval(chordIntervalRef.current);
      bgmNodesRef.current.forEach(node => {
        try { node.stop(); node.disconnect(); } catch (e) {}
      });
    };
  }, [startBGM]);

  // Tactile Mechanical Click SFX
  const playInteract = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  }, [isMuted, getAudioContext]);

  // Harmonic Chime SFX
  const playSuccess = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.4);
      });
    } catch (e) {}
  }, [isMuted, getAudioContext]);

  return {
    isMuted,
    isPlayingBGM,
    toggleBGM,
    startBGM,
    stopBGM,
    playInteract,
    playSuccess,
  };
}
