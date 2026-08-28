import React, { useEffect, useState, useRef } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const requestRef = useRef();

  useEffect(() => {
    // Only enable on desktop devices with pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target;
      const isInteractive = target.closest('button, a, input, textarea, [data-cursor], .cursor-pointer');
      
      if (isInteractive) {
        setIsHovered(true);
        const customText = isInteractive.getAttribute('data-cursor');
        if (customText) {
          setCursorText(customText);
        } else if (isInteractive.tagName === 'A') {
          setCursorText('VIEW');
        } else if (isInteractive.tagName === 'BUTTON') {
          setCursorText('SELECT');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth trailing physics loop
    let currentX = -100;
    let currentY = -100;

    const animate = () => {
      currentX += (position.x - currentX) * 0.18;
      currentY += (position.y - currentY) * 0.18;
      setTrailingPos({ x: currentX, y: currentY });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [position.x, position.y, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      
      {/* 1. Core Precise Orange Center Dot */}
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#FF5A00] transition-transform duration-75 ease-out shadow-[0_0_8px_rgba(255,90,0,0.8)]"
        style={{
          transform: `translate3d(${position.x - 5}px, ${position.y - 5}px, 0) scale(${
            isClicked ? 0.7 : isHovered ? 1.4 : 1
          })`,
        }}
      />

      {/* 2. Trailing Industrial Target Reticle / Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border transition-all duration-150 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-14 h-14 border-[#FF5A00] bg-[#FF5A00]/10 ring-2 ring-[#FF5A00]/20'
            : isClicked
            ? 'w-7 h-7 border-[#121316] bg-[#121316]/15'
            : 'w-9 h-9 border-[#121316]/40 border-dashed'
        }`}
        style={{
          transform: `translate3d(${
            trailingPos.x - (isHovered ? 28 : isClicked ? 14 : 18)
          }px, ${
            trailingPos.y - (isHovered ? 28 : isClicked ? 14 : 18)
          }px, 0)`,
        }}
      >
        {/* Micro-text indicator inside expanded ring */}
        {isHovered && cursorText && (
          <span className="text-[8px] font-mono font-bold tracking-widest text-[#FF5A00] uppercase select-none">
            {cursorText}
          </span>
        )}
      </div>

      {/* 3. Subtle Crosshair Precision Ticks */}
      {!isHovered && !isClicked && (
        <>
          <div
            className="fixed top-0 left-0 w-1.5 h-[1px] bg-[#121316]/30"
            style={{ transform: `translate3d(${trailingPos.x + 14}px, ${trailingPos.y}px, 0)` }}
          />
          <div
            className="fixed top-0 left-0 w-1.5 h-[1px] bg-[#121316]/30"
            style={{ transform: `translate3d(${trailingPos.x - 19}px, ${trailingPos.y}px, 0)` }}
          />
          <div
            className="fixed top-0 left-0 w-[1px] h-1.5 bg-[#121316]/30"
            style={{ transform: `translate3d(${trailingPos.x}px, ${trailingPos.y + 14}px, 0)` }}
          />
          <div
            className="fixed top-0 left-0 w-[1px] h-1.5 bg-[#121316]/30"
            style={{ transform: `translate3d(${trailingPos.x}px, ${trailingPos.y - 19}px, 0)` }}
          />
        </>
      )}

    </div>
  );
}
