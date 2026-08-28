import React from 'react';
import { BaseCampZone } from './zones/BaseCampZone';
import { SkillsZone } from './zones/SkillsZone';
import { ProjectsZone } from './zones/ProjectsZone';
import { ExperienceZone } from './zones/ExperienceZone';
import { ContactZone } from './zones/ContactZone';

export function World({
  playerPosition,
  onOpenModal,
  onGroundClick,
  themeMode,
}) {
  const getDistance = (targetPos) => {
    const dx = playerPosition[0] - targetPos[0];
    const dz = playerPosition[2] - targetPos[2];
    return Math.sqrt(dx * dx + dz * dz);
  };

  // Connecting Bridges data between central island and surrounding zones
  const bridges = [
    { start: [0, 0, 0], end: [-14, 0, -8], color: '#a855f7' },
    { start: [0, 0, 0], end: [14, 0, -8], color: '#06b6d4' },
    { start: [0, 0, 0], end: [-10, 0, 14], color: '#f59e0b' },
    { start: [0, 0, 0], end: [10, 0, 14], color: '#10b981' },
  ];

  return (
    <group>
      {/* Invisible Click-to-Move Ground Plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.05, 0]}
        onClick={(e) => {
          e.stopPropagation();
          if (onGroundClick) {
            onGroundClick(e.point);
          }
        }}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {/* Floating Low-Poly Void Rocks & Clouds */}
      {[
        [-18, -4, 4],
        [18, -3, 6],
        [-6, -5, -18],
        [8, -4, -16],
        [0, -6, 22],
      ].map((pos, i) => (
        <mesh key={i} position={pos} rotation={[0.4 * i, 0.6 * i, 0]}>
          <dodecahedronGeometry args={[2.4 + (i % 2), 0]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} />
        </mesh>
      ))}

      {/* Energy Bridges */}
      {bridges.map((b, i) => {
        const dx = b.end[0] - b.start[0];
        const dz = b.end[2] - b.start[2];
        const length = Math.sqrt(dx * dx + dz * dz);
        const midX = (b.start[0] + b.end[0]) / 2;
        const midZ = (b.start[2] + b.end[2]) / 2;
        const angle = Math.atan2(dx, dz);

        return (
          <group key={i} position={[midX, -0.15, midZ]} rotation={[0, angle, 0]}>
            {/* Bridge Walkway */}
            <mesh receiveShadow>
              <boxGeometry args={[2.0, 0.25, length - 4.5]} />
              <meshStandardMaterial color="#1e293b" roughness={0.7} metalness={0.3} />
            </mesh>
            {/* Glowing Center Line */}
            <mesh position={[0, 0.14, 0]}>
              <boxGeometry args={[0.2, 0.02, length - 5]} />
              <meshBasicMaterial color={b.color} />
            </mesh>
          </group>
        );
      })}

      {/* Zone 1: Spawn / Base Camp */}
      <BaseCampZone
        onOpenModal={onOpenModal}
        playerDistance={getDistance([0, 0, 0])}
      />

      {/* Zone 2: Skills / Tech Lab */}
      <SkillsZone
        onOpenModal={onOpenModal}
        playerDistance={getDistance([-14, 0, -8])}
      />

      {/* Zone 3: Projects / Arcade */}
      <ProjectsZone
        onOpenModal={onOpenModal}
        playerDistance={getDistance([14, 0, -8])}
      />

      {/* Zone 4: Experience / Quest Log */}
      <ExperienceZone
        onOpenModal={onOpenModal}
        playerDistance={getDistance([-10, 0, 14])}
      />

      {/* Zone 5: Contact / Portal */}
      <ContactZone
        onOpenModal={onOpenModal}
        playerDistance={getDistance([10, 0, 14])}
      />
    </group>
  );
}
