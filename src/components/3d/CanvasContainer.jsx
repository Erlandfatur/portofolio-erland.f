import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Character } from './Character';
import { World } from './World';
import { CameraController } from './CameraController';
import { EnvironmentFX } from './EnvironmentFX';

export function CanvasContainer({
  controls,
  playerPosition,
  setPlayerPosition,
  onOpenModal,
  onGroundClick,
  onStepSound,
  onJumpSound,
  themeMode,
  isTransitioning,
  targetCameraPos,
  isPaused,
}) {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        shadows
        camera={{ position: [0, 9.5, 12.5], fov: 45 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <EnvironmentFX themeMode={themeMode} />

          <CameraController
            playerPosition={playerPosition}
            isTransitioning={isTransitioning}
            targetCameraPos={targetCameraPos}
          />

          <Character
            controls={controls}
            playerPosition={playerPosition}
            setPlayerPosition={setPlayerPosition}
            onStepSound={onStepSound}
            onJumpSound={onJumpSound}
            isPaused={isPaused}
          />

          <World
            playerPosition={playerPosition}
            onOpenModal={onOpenModal}
            onGroundClick={onGroundClick}
            themeMode={themeMode}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
