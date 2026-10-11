"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

type Vec3 = [number, number, number];

/* ============================================================
   Stethoscope
   ============================================================ */
function Stethoscope({ position = [0, 0, 0] as Vec3 }) {
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <group ref={ref} position={position} scale={0.75}>
      {/* Chest piece */}
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.18, 32]} />
        <meshStandardMaterial color="#c8d2dc" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.79, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.02, 32]} />
        <meshStandardMaterial color="#0b4f6c" roughness={0.3} />
      </mesh>
      {/* Stem */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.7, 16]} />
        <meshStandardMaterial color="#c8d2dc" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Ear tubes */}
      <mesh position={[-0.35, 0.35, 0]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.5, 0.06, 12, 24, Math.PI * 0.9]} />
        <meshStandardMaterial color="#1a3a4a" roughness={0.5} />
      </mesh>
      <mesh position={[0.35, 0.35, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <torusGeometry args={[0.5, 0.06, 12, 24, Math.PI * 0.9]} />
        <meshStandardMaterial color="#1a3a4a" roughness={0.5} />
      </mesh>
    </group>
  );
}

/* ============================================================
   Thermometer
   ============================================================ */
function Thermometer({ position = [0, 0, 0] as Vec3 }) {
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.4;
  });

  return (
    <group ref={ref} position={position} rotation={[0, 0, 0.3]} scale={0.85}>
      {/* Body */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.15, 1.4, 24]} />
        <meshStandardMaterial color="#f5f8fa" roughness={0.3} />
      </mesh>
      {/* Top cap */}
      <mesh position={[0, 0.72, 0]}>
        <sphereGeometry args={[0.15, 24, 16]} />
        <meshStandardMaterial color="#f5f8fa" roughness={0.3} />
      </mesh>
      {/* Tip */}
      <mesh position={[0, -0.8, 0]}>
        <coneGeometry args={[0.15, 0.25, 24]} />
        <meshStandardMaterial color="#c8d2dc" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, -0.1, 0.16]}>
        <boxGeometry args={[0.22, 0.42, 0.02]} />
        <meshStandardMaterial
          color="#0a1e28"
          emissive="#00d4d4"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

/* ============================================================
   Pill Bottle
   ============================================================ */
function PillBottle({ position = [0, 0, 0] as Vec3 }) {
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.35;
  });

  return (
    <group ref={ref} position={position} scale={0.75}>
      {/* Body */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 1.4, 32]} />
        <meshStandardMaterial color="#f0f4f8" roughness={0.5} />
      </mesh>
      {/* Label band */}
      <mesh>
        <cylinderGeometry args={[0.505, 0.505, 0.75, 32]} />
        <meshStandardMaterial color="#0b4f6c" roughness={0.6} />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.25, 32]} />
        <meshStandardMaterial color="#00a5a8" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.94, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.02, 32]} />
        <meshStandardMaterial color="#008a8d" roughness={0.4} />
      </mesh>
    </group>
  );
}

/* ============================================================
   Syringe
   ============================================================ */
function Syringe({ position = [0, 0, 0] as Vec3 }) {
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.4;
  });

  return (
    <group ref={ref} position={position} rotation={[0, 0, -0.5]} scale={0.7}>
      {/* Barrel */}
      <mesh>
        <cylinderGeometry args={[0.18, 0.18, 1.4, 24]} />
        <meshPhysicalMaterial
          color="#e8f4f8"
          transparent
          opacity={0.55}
          roughness={0.15}
        />
      </mesh>
      {/* Plunger */}
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.4, 24]} />
        <meshStandardMaterial color="#00a5a8" roughness={0.4} />
      </mesh>
      {/* Finger flange */}
      <mesh position={[0, -1.15, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.5]} />
        <meshStandardMaterial color="#00a5a8" roughness={0.4} />
      </mesh>
      {/* Hub */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.1, 0.18, 0.15, 16]} />
        <meshStandardMaterial color="#c8d2dc" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Needle */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.65, 8]} />
        <meshStandardMaterial color="#c0c8d0" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

/* ============================================================
   Main Scene
   ============================================================ */
export function Hero3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.1} />
        <directionalLight
          position={[-5, 3, -5]}
          intensity={0.4}
          color="#88d4d4"
        />
        <pointLight position={[0, -5, 0]} intensity={0.3} color="#0b4f6c" />

        {/* Floating tools */}
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.7}>
          <Stethoscope position={[-2.5, 0.3, 0]} />
        </Float>
        <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.7}>
          <Thermometer position={[2.3, -0.4, 0.5]} />
        </Float>
        <Float speed={1.0} rotationIntensity={0.3} floatIntensity={0.5}>
          <PillBottle position={[2.5, 1.2, -1]} />
        </Float>
        <Float speed={1.3} rotationIntensity={0.6} floatIntensity={0.6}>
          <Syringe position={[-2.2, -1.1, 0.5]} />
        </Float>
      </Suspense>
    </Canvas>
  );
}