import React from 'react';
import { Stars, Sparkles } from '@react-three/drei';

export function EnvironmentFX({ themeMode = 'cyberpunk' }) {
  const configs = {
    cyberpunk: {
      ambientColor: '#38bdf8',
      ambientIntensity: 0.6,
      dirColor: '#c084fc',
      dirIntensity: 1.5,
      fogColor: '#030712',
      sparkleColor: '#38bdf8',
    },
    sunset: {
      ambientColor: '#fb923c',
      ambientIntensity: 0.7,
      dirColor: '#f43f5e',
      dirIntensity: 1.8,
      fogColor: '#1c1917',
      sparkleColor: '#fbbf24',
    },
    daylight: {
      ambientColor: '#bae6fd',
      ambientIntensity: 0.9,
      dirColor: '#ffffff',
      dirIntensity: 2.0,
      fogColor: '#0c4a6e',
      sparkleColor: '#67e8f9',
    },
  };

  const current = configs[themeMode] || configs.cyberpunk;

  return (
    <>
      <color attach="background" args={[current.fogColor]} />
      <fog attach="fog" args={[current.fogColor, 20, 50]} />

      {/* Atmospheric Lights */}
      <ambientLight color={current.ambientColor} intensity={current.ambientIntensity} />
      <directionalLight
        position={[15, 25, 15]}
        intensity={current.dirIntensity}
        color={current.dirColor}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={60}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />
      <directionalLight
        position={[-15, 12, -15]}
        intensity={0.4}
        color="#06b6d4"
      />

      {/* Cosmic Stars & Glowing Floating Sparkles */}
      <Stars radius={60} depth={40} count={3000} factor={4} saturation={1} fade speed={1.5} />
      <Sparkles
        count={80}
        scale={[35, 15, 35]}
        size={3}
        speed={0.6}
        opacity={0.7}
        color={current.sparkleColor}
      />
    </>
  );
}
