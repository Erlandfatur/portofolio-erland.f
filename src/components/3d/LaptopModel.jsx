import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { portfolioData } from '../../data/portfolioData';

export function LaptopModel({ activeProjectIndex = 0 }) {
  const laptopGroupRef = useRef();
  const screenMeshRef = useRef();
  const { mouse } = useThree();

  const targetRotation = useRef(new THREE.Euler(0.22, -0.48, 0.08));
  const targetPosition = useRef(new THREE.Vector3(0, -0.2, 0));

  const { projects } = portfolioData;
  const curr = projects[activeProjectIndex] || projects[0] || {};

  // Create High-Res Clean Dynamic 2D Canvas Texture (Eliminates all Z-Fighting glitch)
  const screenTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return { canvas, texture };
  }, []);

  // Redraw Canvas Screen safely
  useEffect(() => {
    const { canvas, texture } = screenTexture;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Top Header Bar
    ctx.fillStyle = '#F3F4F6';
    ctx.fillRect(0, 0, canvas.width, 68);

    // Header Orange Pill
    ctx.fillStyle = '#FF5A00';
    ctx.beginPath();
    ctx.roundRect(36, 18, 160, 32, 16);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('APM // ' + String(curr.status || 'PROJECT').toUpperCase().slice(0, 10), 52, 39);

    // Header URL text
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '13px monospace';
    ctx.fillText('https://erlandfatur.github.io/' + String(curr.id || 'project'), 220, 39);

    // Main Left Showcase Card Box
    ctx.fillStyle = '#F9FAFB';
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(36, 96, 620, 500, 24);
    ctx.fill();
    ctx.stroke();

    // Orange Category Tag
    ctx.fillStyle = '#FF5A00';
    ctx.beginPath();
    ctx.roundRect(64, 128, 180, 36, 18);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 14px monospace';
    ctx.fillText(String(curr.category || 'SYSTEM').toUpperCase() + ' // PRODUCTION', 80, 151);

    // Project Big Title
    ctx.fillStyle = '#121316';
    ctx.font = 'bold 34px sans-serif';
    ctx.fillText(String(curr.title || 'Portfolio Project'), 64, 215);

    // Subtitle
    ctx.fillStyle = '#FF5A00';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(String(curr.subtitle || 'Technical Solution'), 64, 252);

    // Description paragraph
    ctx.fillStyle = '#4B5563';
    ctx.font = '15px sans-serif';
    const descText = String(curr.description || 'Associate Product Manager Case Study');
    const words = descText.split(' ');
    let line = '';
    let y = 295;
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      if (ctx.measureText(testLine).width > 560 && i > 0) {
        ctx.fillText(line, 64, y);
        line = words[i] + ' ';
        y += 24;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 64, y);

    // Bullet points
    y += 36;
    const pts = Array.isArray(curr.keyPoints) ? curr.keyPoints : [];
    pts.slice(0, 2).forEach((pt) => {
      ctx.fillStyle = '#FF5A00';
      ctx.font = 'bold 16px monospace';
      ctx.fillText('→', 64, y);

      ctx.fillStyle = '#1F2937';
      ctx.font = '14px sans-serif';
      ctx.fillText(String(pt).slice(0, 60) + '...', 86, y);
      y += 26;
    });

    // Right Sidebar Specs Card Box
    ctx.fillStyle = '#F3F4F6';
    ctx.beginPath();
    ctx.roundRect(680, 96, 308, 500, 24);
    ctx.fill();

    ctx.fillStyle = '#121316';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('TECH STACK SPECS', 708, 140);

    let stackY = 175;
    const stacks = Array.isArray(curr.techStack) ? curr.techStack : ['JavaScript', 'Python', 'Next.js'];
    stacks.slice(0, 6).forEach((t) => {
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#D1D5DB';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(708, stackY, 250, 36, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#121316';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('• ' + String(t), 724, stackY + 23);
      stackY += 46;
    });

    texture.needsUpdate = true;
  }, [curr, screenTexture]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    const t = state.clock.getElapsedTime();

    if (!laptopGroupRef.current) return;

    const floatY = Math.sin(t * 1.3) * 0.14;
    const floatRotZ = Math.sin(t * 0.7) * 0.02;

    targetPosition.current.set(
      mouse.x * 0.35,
      -0.2 + floatY + mouse.y * 0.2,
      0
    );

    targetRotation.current.set(
      0.22 - mouse.y * 0.2,
      -0.48 + mouse.x * 0.3,
      0.08 + floatRotZ
    );

    laptopGroupRef.current.position.lerp(targetPosition.current, dt * 4.5);
    laptopGroupRef.current.rotation.x = THREE.MathUtils.lerp(laptopGroupRef.current.rotation.x, targetRotation.current.x, dt * 4.5);
    laptopGroupRef.current.rotation.y = THREE.MathUtils.lerp(laptopGroupRef.current.rotation.y, targetRotation.current.y, dt * 4.5);
    laptopGroupRef.current.rotation.z = THREE.MathUtils.lerp(laptopGroupRef.current.rotation.z, targetRotation.current.z, dt * 4.5);
  });

  return (
    <group ref={laptopGroupRef} position={[0, -0.2, 0]} scale={0.9}>
      
      {/* 1. KEYBOARD BASE (CHASSIS) */}
      <group position={[0, -0.06, 0.75]}>
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[4.6, 0.14, 3.0]} />
          <meshStandardMaterial
            color="#D8DCE4"
            roughness={0.25}
            metalness={0.88}
          />
        </mesh>

        <mesh position={[0, 0.075, -0.3]}>
          <boxGeometry args={[4.0, 0.01, 1.7]} />
          <meshStandardMaterial
            color="#E5E8EF"
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>

        {[-0.55, -0.28, 0, 0.28, 0.55].map((zRow, i) => (
          <mesh key={i} position={[0, 0.083, -0.3 + zRow * 0.75]}>
            <boxGeometry args={[3.8, 0.008, 0.17]} />
            <meshStandardMaterial
              color="#22262E"
              roughness={0.4}
              metalness={0.2}
            />
          </mesh>
        ))}

        <mesh position={[0, 0.075, 0.85]}>
          <boxGeometry args={[1.6, 0.008, 1.0]} />
          <meshStandardMaterial
            color="#CCD1DB"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        <mesh position={[-2.31, 0, -0.2]}>
          <boxGeometry args={[0.02, 0.04, 0.4]} />
          <meshBasicMaterial color="#1E222A" />
        </mesh>
        <mesh position={[2.31, 0, -0.2]}>
          <boxGeometry args={[0.02, 0.04, 0.4]} />
          <meshBasicMaterial color="#1E222A" />
        </mesh>
      </group>

      {/* 2. HINGE CYLINDER */}
      <mesh position={[0, 0.02, -0.72]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.075, 0.075, 4.4, 16]} />
        <meshStandardMaterial color="#8E99A8" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* 3. DISPLAY LID (UPRIGHT OPENED) */}
      <group position={[0, 0.04, -0.72]} rotation={[-0.32, 0, 0]}>
        
        {/* Outer Aluminum Lid Back Shell */}
        <mesh castShadow position={[0, 1.45, -0.04]}>
          <boxGeometry args={[4.6, 2.9, 0.08]} />
          <meshStandardMaterial
            color="#D8DCE4"
            roughness={0.25}
            metalness={0.88}
          />
        </mesh>

        {/* Display Front Bezel Border */}
        <mesh position={[0, 1.45, 0.005]}>
          <boxGeometry args={[4.56, 2.86, 0.01]} />
          <meshStandardMaterial color="#12151B" roughness={0.9} />
        </mesh>

        {/* Webcam */}
        <mesh position={[0, 2.83, 0.012]}>
          <circleGeometry args={[0.025, 12]} />
          <meshBasicMaterial color="#FF5A00" />
        </mesh>

        {/* GLITCH-FREE HIGH-RES DISPLAY TEXTURE MESH */}
        <mesh ref={screenMeshRef} position={[0, 1.43, 0.012]}>
          <planeGeometry args={[4.38, 2.68]} />
          <meshBasicMaterial
            map={screenTexture.texture}
            toneMapped={false}
          />
        </mesh>

      </group>

    </group>
  );
}
