import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { LaptopModel } from './LaptopModel';
import { MonolithRocks } from './MonolithRocks';
import { StudioLighting } from './StudioLighting';

export function ShowcaseScene({ activeProjectIndex, themeMode }) {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none z-0">
      <Canvas
        shadows
        camera={{ position: [0, 0.4, 7.8], fov: 38 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <StudioLighting themeMode={themeMode} />

          <LaptopModel activeProjectIndex={activeProjectIndex} />

          <MonolithRocks />
        </Suspense>
      </Canvas>
    </div>
  );
}
