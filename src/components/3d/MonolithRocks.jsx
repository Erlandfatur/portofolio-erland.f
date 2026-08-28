import React, { useMemo } from 'react';
import * as THREE from 'three';

export function MonolithRocks() {
  // Low-poly / faceted monolith rock formations positioned neatly at the lower sides
  const rockGeometries = useMemo(() => {
    return [
      {
        pos: [-3.8, -2.4, -0.5],
        rot: [0.3, 0.4, -0.2],
        scale: [1.8, 2.6, 1.8],
      },
      {
        pos: [3.9, -2.2, -0.2],
        rot: [-0.2, -0.5, 0.25],
        scale: [1.6, 2.8, 1.6],
      },
      {
        pos: [0, -3.2, -1.0],
        rot: [0.1, 0.8, 0],
        scale: [3.5, 1.8, 2.5],
      },
    ];
  }, []);

  return (
    <group>
      {rockGeometries.map((rock, idx) => (
        <mesh
          key={idx}
          position={rock.pos}
          rotation={rock.rot}
          scale={rock.scale}
          castShadow
          receiveShadow
        >
          <dodecahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#2A2F38"
            roughness={0.92}
            metalness={0.15}
            flatShading={true}
          />
        </mesh>
      ))}
    </group>
  );
}
