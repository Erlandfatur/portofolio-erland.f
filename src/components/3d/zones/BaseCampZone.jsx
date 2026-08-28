import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export function BaseCampZone({ onOpenModal, playerDistance }) {
  const holoRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (holoRef.current) {
      holoRef.current.rotation.y = t * 0.5;
      holoRef.current.position.y = 1.6 + Math.sin(t * 2) * 0.15;
    }
  });

  const isNear = playerDistance < 4.2;

  return (
    <group position={[0, 0, 0]}>
      {/* Island Platform */}
      <mesh receiveShadow position={[0, -0.4, 0]}>
        <cylinderGeometry args={[6.5, 7.5, 0.8, 36]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Glowing Outer Edge Ring */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6.2, 6.45, 36]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Center Landing / Teleport Pad */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 2.2, 32]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.9, 2.1, 32]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Holographic Welcome Terminal */}
      <group position={[0, 0, -3.2]}>
        {/* Terminal Stand */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.45, 1.2, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.25, 0]}>
          <boxGeometry args={[0.8, 0.1, 0.6]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>

        {/* Floating Hologram Icon */}
        <group ref={holoRef} position={[0, 1.6, 0]}>
          <mesh>
            <octahedronGeometry args={[0.35]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={1.2}
              wireframe
            />
          </mesh>
          <pointLight color="#38bdf8" distance={4} intensity={2} />
        </group>

        {/* Clickable / Proximity UI */}
        <Html position={[0, 2.4, 0]} center distanceFactor={12}>
          <div
            onClick={() => onOpenModal('spawn')}
            className={`cursor-pointer transition-all duration-300 transform ${
              isNear ? 'scale-105 opacity-100' : 'scale-90 opacity-80'
            }`}
          >
            <div className="flex flex-col items-center bg-slate-900/90 border border-blue-500/60 shadow-xl shadow-blue-500/20 px-3.5 py-2 rounded-xl backdrop-blur-md hover:border-blue-400 hover:scale-110">
              <span className="text-[11px] font-bold tracking-wider text-blue-400 uppercase">
                About Me & Profile
              </span>
              <span className="text-xs font-extrabold text-white flex items-center gap-1">
                {isNear ? '✨ Press E / Tap to Open' : '👆 Tap to Inspect'}
              </span>
            </div>
          </div>
        </Html>
      </group>

      {/* Decorative Stylized Sci-fi Trees */}
      {[
        [-4, 0, -2.5],
        [4, 0, -2.5],
        [-3.8, 0, 3],
        [3.8, 0, 3],
      ].map((pos, i) => (
        <group key={i} position={pos}>
          <mesh position={[0, 0.7, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.18, 1.4, 8]} />
            <meshStandardMaterial color="#475569" roughness={0.9} />
          </mesh>
          <mesh position={[0, 1.6, 0]} castShadow>
            <dodecahedronGeometry args={[0.8, 0]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#0284c7' : '#0ea5e9'} roughness={0.5} />
          </mesh>
          <mesh position={[0, 2.3, 0]} castShadow>
            <dodecahedronGeometry args={[0.55, 0]} />
            <meshStandardMaterial color="#38bdf8" roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
