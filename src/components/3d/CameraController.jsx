import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function CameraController({ playerPosition, isTransitioning, targetCameraPos }) {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Desired isometric camera offset from player
  const CAMERA_OFFSET = new THREE.Vector3(0, 9.5, 12.5);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);

    if (isTransitioning && targetCameraPos) {
      // Smooth lerp to target camera pos during fast travel
      camera.position.lerp(
        new THREE.Vector3(targetCameraPos[0], targetCameraPos[1] + 9, targetCameraPos[2] + 12),
        dt * 4
      );
      currentLookAt.current.lerp(
        new THREE.Vector3(targetCameraPos[0], 0, targetCameraPos[2]),
        dt * 4
      );
    } else {
      // Follow player smoothly
      const targetPos = new THREE.Vector3(
        playerPosition[0] + CAMERA_OFFSET.x,
        playerPosition[1] + CAMERA_OFFSET.y,
        playerPosition[2] + CAMERA_OFFSET.z
      );

      camera.position.lerp(targetPos, dt * 6);
      currentLookAt.current.lerp(
        new THREE.Vector3(playerPosition[0], playerPosition[1] + 0.8, playerPosition[2]),
        dt * 6
      );
    }

    camera.lookAt(currentLookAt.current);
  });

  return null;
}
