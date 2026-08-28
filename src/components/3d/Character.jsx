import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

export function Character({
  controls,
  playerPosition,
  setPlayerPosition,
  onStepSound,
  onJumpSound,
  isPaused,
}) {
  const groupRef = useRef();
  const bodyRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const headRef = useRef();

  // Physics state
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const isGrounded = useRef(true);
  const rotationY = useRef(0);
  const walkTime = useRef(0);
  const stepSoundCounter = useRef(0);

  const SPEED = 9.0;
  const JUMP_FORCE = 6.8;
  const GRAVITY = -20.0;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.1);

    const { movement, joystickVector, clickTarget, clearClickDestination } = controls;
    let moveX = 0;
    let moveZ = 0;

    if (!isPaused) {
      // 1. Keyboard Input
      if (movement.forward) moveZ -= 1;
      if (movement.backward) moveZ += 1;
      if (movement.left) moveX -= 1;
      if (movement.right) moveX += 1;

      // 2. Joystick Input
      if (joystickVector.current.x !== 0 || joystickVector.current.y !== 0) {
        moveX = joystickVector.current.x;
        moveZ = -joystickVector.current.y;
      }

      // 3. Click to Move Input
      if (clickTarget.current) {
        const dx = clickTarget.current.x - groupRef.current.position.x;
        const dz = clickTarget.current.z - groupRef.current.position.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist > 0.3) {
          moveX = dx / dist;
          moveZ = dz / dist;
        } else {
          clearClickDestination();
        }
      }

      // Normalize diagonal keyboard movements
      const inputLength = Math.sqrt(moveX * moveX + moveZ * moveZ);
      if (inputLength > 1) {
        moveX /= inputLength;
        moveZ /= inputLength;
      }

      // Jump
      if (movement.jump && isGrounded.current) {
        velocity.current.y = JUMP_FORCE;
        isGrounded.current = false;
        if (onJumpSound) onJumpSound();
      }
    }

    // Apply Gravity
    if (!isGrounded.current) {
      velocity.current.y += GRAVITY * dt;
    }

    // Update Position
    const currentPos = groupRef.current.position;
    currentPos.x += moveX * SPEED * dt;
    currentPos.z += moveZ * SPEED * dt;
    currentPos.y += velocity.current.y * dt;

    // Floor collision & World bounds
    if (currentPos.y <= 0) {
      currentPos.y = 0;
      velocity.current.y = 0;
      isGrounded.current = true;
    }

    // Clamp inside world area
    currentPos.x = THREE.MathUtils.clamp(currentPos.x, -26, 26);
    currentPos.z = THREE.MathUtils.clamp(currentPos.z, -22, 26);

    // Sync state for minimap and proximity checks
    setPlayerPosition([currentPos.x, currentPos.y, currentPos.z]);

    // Handle Rotation towards movement direction
    const isMoving = Math.abs(moveX) > 0.05 || Math.abs(moveZ) > 0.05;
    if (isMoving) {
      const targetAngle = Math.atan2(moveX, moveZ);
      // Smooth angular interpolation
      let angleDiff = targetAngle - rotationY.current;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      rotationY.current += angleDiff * Math.min(1, dt * 14);
      groupRef.current.rotation.y = rotationY.current;

      // Walk cycle animation
      walkTime.current += dt * 14;
      const legAngle = Math.sin(walkTime.current) * 0.7;
      const armAngle = Math.cos(walkTime.current) * 0.6;

      if (leftLegRef.current) leftLegRef.current.rotation.x = legAngle;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -legAngle;
      if (leftArmRef.current) leftArmRef.current.rotation.x = -armAngle;
      if (rightArmRef.current) rightArmRef.current.rotation.x = armAngle;
      if (bodyRef.current) {
        bodyRef.current.position.y = 0.75 + Math.abs(Math.sin(walkTime.current * 2)) * 0.08;
      }

      // Footstep sound cadence
      stepSoundCounter.current += dt;
      if (stepSoundCounter.current > 0.28 && isGrounded.current) {
        if (onStepSound) onStepSound();
        stepSoundCounter.current = 0;
      }
    } else {
      // Idle breathing animation
      const idleTime = state.clock.getElapsedTime();
      if (leftLegRef.current) leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, dt * 8);
      if (rightLegRef.current) rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, dt * 8);
      if (leftArmRef.current) leftArmRef.current.rotation.x = Math.sin(idleTime * 2) * 0.08;
      if (rightArmRef.current) rightArmRef.current.rotation.x = -Math.sin(idleTime * 2) * 0.08;
      if (bodyRef.current) {
        bodyRef.current.position.y = THREE.MathUtils.lerp(bodyRef.current.position.y, 0.75 + Math.sin(idleTime * 3) * 0.04, dt * 6);
      }
      if (headRef.current) {
        headRef.current.rotation.y = Math.sin(idleTime * 1.5) * 0.12;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Dynamic Player Shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0, 0.55, 32]} />
        <meshBasicMaterial color="#000000" opacity={0.4} transparent />
      </mesh>

      {/* Floating Player Name Tag */}
      <Html position={[0, 2.3, 0]} center distanceFactor={14} className="pointer-events-none select-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-cyan-500/50 shadow-lg text-white whitespace-nowrap text-xs font-semibold backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-cyan-300">Erland</span> (APM)
        </div>
      </Html>

      {/* Character Mesh Hierarchy */}
      <group ref={bodyRef} position={[0, 0.75, 0]}>
        {/* Torso */}
        <mesh castShadow position={[0, 0.2, 0]}>
          <capsuleGeometry args={[0.26, 0.42, 8, 16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Cyber Vest / Chest Armor */}
        <mesh position={[0, 0.22, 0.05]}>
          <boxGeometry args={[0.42, 0.36, 0.32]} />
          <meshStandardMaterial color="#0284c7" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Glowing Reactor Core */}
        <mesh position={[0, 0.24, 0.23]}>
          <circleGeometry args={[0.08, 16]} />
          <meshBasicMaterial color="#38bdf8" toneMapped={false} />
        </mesh>
        <pointLight position={[0, 0.24, 0.3]} distance={1.2} intensity={2} color="#38bdf8" />

        {/* Jetpack / Tech Backpack */}
        <mesh position={[0, 0.22, -0.22]}>
          <boxGeometry args={[0.32, 0.35, 0.16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Jetpack Thrusters */}
        <mesh position={[-0.1, 0.06, -0.25]}>
          <cylinderGeometry args={[0.04, 0.06, 0.12, 12]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>
        <mesh position={[0.1, 0.06, -0.25]}>
          <cylinderGeometry args={[0.04, 0.06, 0.12, 12]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>

        {/* Head */}
        <group ref={headRef} position={[0, 0.62, 0]}>
          {/* Main Helmet */}
          <mesh castShadow>
            <sphereGeometry args={[0.28, 24, 24]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.15} metalness={0.4} />
          </mesh>

          {/* Glowing Curved Visor */}
          <mesh position={[0, 0.02, 0.16]}>
            <sphereGeometry args={[0.22, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={1.5}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>

          {/* Earphone / Antenna Pods */}
          <mesh position={[-0.3, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.08, 16]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
          <mesh position={[0.3, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.08, 16]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
          {/* Cute Mini Antenna */}
          <mesh position={[0.26, 0.22, 0]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
          <mesh position={[0.32, 0.32, 0]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.32, 0.32, 0]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <capsuleGeometry args={[0.07, 0.28, 8, 12]} />
            <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.5} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.32, 0.32, 0]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <capsuleGeometry args={[0.07, 0.28, 8, 12]} />
            <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.5} />
          </mesh>
        </group>
      </group>

      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.14, 0.45, 0]}>
        <mesh position={[0, -0.22, 0]} castShadow>
          <capsuleGeometry args={[0.08, 0.3, 8, 12]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.8} />
        </mesh>
        {/* Sci-Fi Shoes */}
        <mesh position={[0, -0.4, 0.05]} castShadow>
          <boxGeometry args={[0.16, 0.12, 0.24]} />
          <meshStandardMaterial color="#0ea5e9" roughness={0.2} metalness={0.6} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.14, 0.45, 0]}>
        <mesh position={[0, -0.22, 0]} castShadow>
          <capsuleGeometry args={[0.08, 0.3, 8, 12]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.8} />
        </mesh>
        {/* Sci-Fi Shoes */}
        <mesh position={[0, -0.4, 0.05]} castShadow>
          <boxGeometry args={[0.16, 0.12, 0.24]} />
          <meshStandardMaterial color="#0ea5e9" roughness={0.2} metalness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
