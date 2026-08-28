import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export function ContactZone({ onOpenModal, playerDistance }) {
  const portalRingRef = useRef();
  const innerRingRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (portalRingRef.current) {
      portalRingRef.current.rotation.z = t * 0.8;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -t * 1.2;
    }
  });

  const isNear = playerDistance < 4.5;

  return (
    <group position={[10, 0, 14]}>
      {/* Island Platform */}
      <mesh receiveShadow position={[0, -0.4, 0]}>
        <cylinderGeometry args={[5.5, 6.5, 0.8, 32]} />
        <meshStandardMaterial color="#064e3b" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Emerald Border Ring */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.2, 5.45, 32]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>

      {/* Cyber Portal Arch */}
      <group position={[0, 1.8, -1.2]}>
        {/* Outer Swirling Torus */}
        <mesh ref={portalRingRef}>
          <torusGeometry args={[1.5, 0.12, 16, 48]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#059669"
            emissiveIntensity={1.5}
            roughness={0.2}
          />
        </mesh>
        {/* Inner Counter-rotating Torus */}
        <mesh ref={innerRingRef}>
          <torusGeometry args={[1.2, 0.08, 16, 36]} />
          <meshStandardMaterial
            color="#6ee7b7"
            emissive="#10b981"
            emissiveIntensity={2}
            wireframe
          />
        </mesh>
        {/* Portal Void / Energy Plane */}
        <mesh>
          <circleGeometry args={[1.15, 32]} />
          <meshBasicMaterial color="#047857" transparent opacity={0.7} />
        </mesh>
        <pointLight color="#10b981" distance={6} intensity={3} />
      </group>

      {/* Interactive Trigger / Floating Badge */}
      <Html position={[0, 3.4, -1.2]} center distanceFactor={12}>
        <div
          onClick={() => onOpenModal('contact')}
          className={`cursor-pointer transition-all duration-300 transform ${
            isNear ? 'scale-105 opacity-100' : 'scale-90 opacity-85'
          }`}
        >
          <div className="flex flex-col items-center bg-slate-900/90 border border-emerald-500/60 shadow-xl shadow-emerald-500/30 px-3.5 py-2 rounded-xl backdrop-blur-md hover:border-emerald-400 hover:scale-110">
            <span className="text-[11px] font-bold tracking-wider text-emerald-400 uppercase">
              🔮 Contact Portal
            </span>
            <span className="text-xs font-extrabold text-white flex items-center gap-1">
              {isNear ? '✨ Press E / Tap to Send Msg' : '👆 Tap to Connect'}
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
}
