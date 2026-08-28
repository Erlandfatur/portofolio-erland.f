import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export function ProjectsZone({ onOpenModal, playerDistance }) {
  const arcadeHoloRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (arcadeHoloRef.current) {
      arcadeHoloRef.current.rotation.y = t * 0.7;
      arcadeHoloRef.current.position.y = 2.2 + Math.sin(t * 2) * 0.1;
    }
  });

  const isNear = playerDistance < 4.5;

  return (
    <group position={[14, 0, -8]}>
      {/* Island Platform */}
      <mesh receiveShadow position={[0, -0.4, 0]}>
        <cylinderGeometry args={[5.5, 6.5, 0.8, 32]} />
        <meshStandardMaterial color="#083344" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Neon Cyan Border Ring */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.2, 5.45, 32]} />
        <meshBasicMaterial color="#06b6d4" />
      </mesh>

      {/* Cyber Arcade Machines */}
      {[-2, 0, 2].map((xOffset, i) => (
        <group key={i} position={[xOffset, 0, -1.8]} rotation={[0, -xOffset * 0.15, 0]}>
          {/* Main Cabinet */}
          <mesh position={[0, 1.0, 0]} castShadow>
            <boxGeometry args={[1.1, 2.0, 0.9]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Glowing Screen Bezel */}
          <mesh position={[0, 1.3, 0.46]}>
            <planeGeometry args={[0.85, 0.65]} />
            <meshStandardMaterial
              color={i === 0 ? '#38bdf8' : i === 1 ? '#a855f7' : '#10b981'}
              emissive={i === 0 ? '#0284c7' : i === 1 ? '#7e22ce' : '#047857'}
              emissiveIntensity={1.2}
            />
          </mesh>
          {/* Marquee Top */}
          <mesh position={[0, 1.9, 0.46]}>
            <boxGeometry args={[0.9, 0.25, 0.15]} />
            <meshStandardMaterial color="#06b6d4" emissive="#0891b2" emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}

      {/* Floating Center Hologram Trophy */}
      <group ref={arcadeHoloRef} position={[0, 2.2, 1]}>
        <mesh castShadow>
          <dodecahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#06b6d4"
            emissiveIntensity={1.5}
            wireframe
          />
        </mesh>
        <pointLight color="#06b6d4" distance={5} intensity={2.5} />
      </group>

      {/* Interactive Trigger / Floating Badge */}
      <Html position={[0, 3.3, 1]} center distanceFactor={12}>
        <div
          onClick={() => onOpenModal('projects')}
          className={`cursor-pointer transition-all duration-300 transform ${
            isNear ? 'scale-105 opacity-100' : 'scale-90 opacity-85'
          }`}
        >
          <div className="flex flex-col items-center bg-slate-900/90 border border-cyan-500/60 shadow-xl shadow-cyan-500/30 px-3.5 py-2 rounded-xl backdrop-blur-md hover:border-cyan-400 hover:scale-110">
            <span className="text-[11px] font-bold tracking-wider text-cyan-400 uppercase">
              🕹️ Project Arcade
            </span>
            <span className="text-xs font-extrabold text-white flex items-center gap-1">
              {isNear ? '✨ Press E / Tap to Play Demo' : '👆 Tap to Explore'}
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
}
