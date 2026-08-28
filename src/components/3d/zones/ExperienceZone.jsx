import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export function ExperienceZone({ onOpenModal, playerDistance }) {
  const scrollRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (scrollRef.current) {
      scrollRef.current.rotation.y = t * 0.5;
      scrollRef.current.position.y = 2.0 + Math.sin(t * 2) * 0.12;
    }
  });

  const isNear = playerDistance < 4.5;

  return (
    <group position={[-10, 0, 14]}>
      {/* Island Platform */}
      <mesh receiveShadow position={[0, -0.4, 0]}>
        <cylinderGeometry args={[5.5, 6.5, 0.8, 32]} />
        <meshStandardMaterial color="#451a03" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Amber Border Ring */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.2, 5.45, 32]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>

      {/* Quest Stone Pillars */}
      {[
        [-2.2, 0, -1.2],
        [2.2, 0, -1.2],
        [0, 0, -2.5],
      ].map((pos, i) => (
        <group key={i} position={pos}>
          <mesh position={[0, 1.2, 0]} castShadow>
            <cylinderGeometry args={[0.35, 0.45, 2.4, 6]} />
            <meshStandardMaterial color="#78350f" roughness={0.8} />
          </mesh>
          <mesh position={[0, 2.5, 0]}>
            <octahedronGeometry args={[0.25]} />
            <meshStandardMaterial color="#fbbf24" emissive="#d97706" emissiveIntensity={1} />
          </mesh>
        </group>
      ))}

      {/* Center Floating Quest Scroll / Book */}
      <group ref={scrollRef} position={[0, 2.0, 0.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.9, 0.6, 0.15]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#b45309"
            emissiveIntensity={1.2}
            roughness={0.3}
          />
        </mesh>
        <pointLight color="#f59e0b" distance={5} intensity={2.5} />
      </group>

      {/* Interactive Trigger / Floating Badge */}
      <Html position={[0, 3.2, 0.2]} center distanceFactor={12}>
        <div
          onClick={() => onOpenModal('experience')}
          className={`cursor-pointer transition-all duration-300 transform ${
            isNear ? 'scale-105 opacity-100' : 'scale-90 opacity-85'
          }`}
        >
          <div className="flex flex-col items-center bg-slate-900/90 border border-amber-500/60 shadow-xl shadow-amber-500/30 px-3.5 py-2 rounded-xl backdrop-blur-md hover:border-amber-400 hover:scale-110">
            <span className="text-[11px] font-bold tracking-wider text-amber-400 uppercase">
              📜 Quest Log & Career
            </span>
            <span className="text-xs font-extrabold text-white flex items-center gap-1">
              {isNear ? '✨ Press E / Tap to View Timeline' : '👆 Tap to Inspect'}
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
}
