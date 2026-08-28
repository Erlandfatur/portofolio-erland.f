import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function StudioLighting() {
  const sunbeamRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sunbeamRef.current) {
      sunbeamRef.current.rotation.z = -0.55 + Math.sin(t * 0.2) * 0.02;
    }
  });

  return (
    <>
      {/* Studio Soft Neutral Grey Background */}
      <color attach="background" args={['#E5E8ED']} />
      <fog attach="fog" args={['#E5E8ED', 10, 32]} />

      {/* Main Studio Key Light (Warm Orange / Amber Sunbeam from top-left) */}
      <directionalLight
        position={[-7, 12, 7]}
        intensity={3.2}
        color="#FFA34D"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={35}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />

      {/* Soft Clean White Fill Light */}
      <directionalLight
        position={[8, 5, 8]}
        intensity={1.6}
        color="#FFFFFF"
      />

      {/* Ambient Floor Light */}
      <ambientLight intensity={1.2} color="#F1F4F9" />

      {/* Sunbeam Light Plane */}
      <group ref={sunbeamRef} position={[-4, 5, -2]} rotation={[0.2, 0.4, -0.55]}>
        <mesh>
          <planeGeometry args={[8, 20]} />
          <meshBasicMaterial
            color="#FF7A00"
            transparent
            opacity={0.09}
            depthWrite={false}
          />
        </mesh>
      </group>
    </>
  );
}
