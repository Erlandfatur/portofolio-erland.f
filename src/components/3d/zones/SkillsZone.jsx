import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export function SkillsZone({ onOpenModal, playerDistance }) {
  const crystalRingRef = useRef();
  const centerCrystalRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (crystalRingRef.current) {
      crystalRingRef.current.rotation.y = -t * 0.4;
    }
    if (centerCrystalRef.current) {
      centerCrystalRef.current.rotation.y = t * 0.6;
      centerCrystalRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
      centerCrystalRef.current.position.y = 2.0 + Math.sin(t * 1.5) * 0.2;
    }
  });

  const isNear = playerDistance < 4.5;
  const skillNodes = [
    { label: 'Product Discovery', color: '#818cf8' },
    { label: 'PRD & Roadmap', color: '#c084fc' },
    { label: 'Figma & UI/UX', color: '#f472b6' },
    { label: 'Python & SQL', color: '#34d399' },
    { label: 'Agile & Scrum', color: '#fbbf24' },
  ];

  return (
    <group position={[-14, 0, -8]}>
      {/* Island Platform */}
      <mesh receiveShadow position={[0, -0.4, 0]}>
        <cylinderGeometry args={[5.5, 6.5, 0.8, 32]} />
        <meshStandardMaterial color="#1e1b4b" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Neon Purple Border Ring */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.2, 5.45, 32]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>

      {/* Tech Lab Pedestal */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[1.6, 2.0, 0.8, 8]} />
        <meshStandardMaterial color="#2e1065" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Center Giant Floating Tech Crystal */}
      <group ref={centerCrystalRef} position={[0, 2.0, 0]}>
        <mesh castShadow>
          <octahedronGeometry args={[0.9]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#7e22ce"
            emissiveIntensity={1.8}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
        <pointLight color="#a855f7" distance={6} intensity={3} />
      </group>

      {/* Revolving Orbiting Skill Crystals */}
      <group ref={crystalRingRef} position={[0, 1.8, 0]}>
        {skillNodes.map((node, i) => {
          const angle = (i / skillNodes.length) * Math.PI * 2;
          const radius = 3.2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          return (
            <group key={i} position={[x, 0, z]}>
              <mesh>
                <icosahedronGeometry args={[0.28]} />
                <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.8} />
              </mesh>
              <mesh position={[0, -0.4, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
                <meshBasicMaterial color={node.color} transparent opacity={0.4} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Interactive Trigger / Floating Badge */}
      <Html position={[0, 3.2, 0]} center distanceFactor={12}>
        <div
          onClick={() => onOpenModal('skills')}
          className={`cursor-pointer transition-all duration-300 transform ${
            isNear ? 'scale-105 opacity-100' : 'scale-90 opacity-85'
          }`}
        >
          <div className="flex flex-col items-center bg-slate-900/90 border border-purple-500/60 shadow-xl shadow-purple-500/30 px-3.5 py-2 rounded-xl backdrop-blur-md hover:border-purple-400 hover:scale-110">
            <span className="text-[11px] font-bold tracking-wider text-purple-400 uppercase">
              ⚡ Tech Lab & Skills
            </span>
            <span className="text-xs font-extrabold text-white flex items-center gap-1">
              {isNear ? '✨ Press E / Tap to View Stack' : '👆 Tap to Inspect'}
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
}
