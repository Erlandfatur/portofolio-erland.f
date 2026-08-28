import React, { useRef, useState } from 'react';

export function MobileJoystick({ setJoystickInput, onJump, onInteract }) {
  const joystickRef = useRef(null);
  const [touchId, setTouchId] = useState(null);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });

  const RADIUS = 40;

  const handleTouchStart = (e) => {
    const touch = e.changedTouches[0];
    setTouchId(touch.identifier);
    updateKnob(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (touchId === null) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === touchId) {
        updateKnob(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
        break;
      }
    }
  };

  const handleTouchEnd = () => {
    setTouchId(null);
    setKnobPos({ x: 0, y: 0 });
    setJoystickInput(0, 0);
  };

  const updateKnob = (clientX, clientY) => {
    if (!joystickRef.current) return;
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let dx = clientX - centerX;
    let dy = clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > RADIUS) {
      dx = (dx / dist) * RADIUS;
      dy = (dy / dist) * RADIUS;
    }

    setKnobPos({ x: dx, y: dy });
    setJoystickInput(dx / RADIUS, -dy / RADIUS);
  };

  return (
    <div className="md:hidden fixed bottom-20 left-0 right-0 z-20 pointer-events-none px-4 flex items-end justify-between">
      {/* Joystick Area */}
      <div
        ref={joystickRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="pointer-events-auto relative w-28 h-28 rounded-full bg-slate-900/75 backdrop-blur-md border border-slate-700/60 shadow-xl flex items-center justify-center touch-none"
      >
        <div className="w-12 h-12 rounded-full border border-slate-600/40"></div>
        {/* Joystick Thumb Knob */}
        <div
          className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 border border-white/60 shadow-lg pointer-events-none transition-transform duration-75"
          style={{ transform: `translate(${knobPos.x}px, ${knobPos.y}px)` }}
        />
      </div>

      {/* Action Buttons (Jump & Interact) */}
      <div className="pointer-events-auto flex flex-col gap-3">
        <button
          onClick={onInteract}
          className="w-14 h-14 rounded-full bg-purple-600/90 text-white border border-purple-400 flex items-center justify-center font-bold text-xs shadow-lg active:scale-90 transition-transform cursor-pointer"
        >
          OPEN
        </button>
        <button
          onClick={onJump}
          className="w-14 h-14 rounded-full bg-blue-600/90 text-white border border-blue-400 flex items-center justify-center font-bold text-xs shadow-lg active:scale-90 transition-transform cursor-pointer"
        >
          JUMP
        </button>
      </div>
    </div>
  );
}
