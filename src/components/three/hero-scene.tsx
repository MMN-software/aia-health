"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  Sparkles,
} from "@react-three/drei";
import { useInView } from "framer-motion";
import { MedicalObjects } from "./medical-objects";
import { MouseTilt, usePointerActivity } from "./mouse-tilt";

export interface HeroSceneProps {
  className?: string;
}

/** Studio lighting: no network HDRI, just soft light panels in an env map. */
function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 5, 5]} intensity={1.6} color="#ffffff" />
      <directionalLight
        position={[-5, 2, -4]}
        intensity={1.1}
        color="#9fe6e7"
      />

      <Environment resolution={256} frames={1}>
        <Lightformer
          form="rect"
          intensity={2.2}
          position={[0, 5, 2]}
          rotation-x={Math.PI / 2}
          scale={[10, 4, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.6}
          position={[-5, 1, 1]}
          rotation-y={Math.PI / 2}
          scale={[8, 1.2, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.6}
          position={[5, 1, 1]}
          rotation-y={-Math.PI / 2}
          scale={[8, 1.2, 1]}
        />
        <Lightformer
          form="ring"
          color="#00a5a8"
          intensity={0.8}
          position={[0, -4, 3]}
          scale={3}
        />
        <Lightformer
          form="rect"
          intensity={0.7}
          position={[0, 0, 6]}
          scale={[6, 3, 1]}
        />
      </Environment>
    </>
  );
}

export default function HeroScene({ className }: HeroSceneProps) {
  const { activeRef, bind } = usePointerActivity();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: "100px" });

  return (
    <div ref={containerRef} className={className} {...bind}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={inView ? "always" : "demand"}
        style={{ touchAction: "pan-y" }}
      >
        <Suspense fallback={null}>
          <StudioLighting />

          <MouseTilt activeRef={activeRef} maxTilt={0.1} parallax={0.1}>
            <MedicalObjects activeRef={activeRef} />
          </MouseTilt>

          <Sparkles
            count={24}
            scale={[5, 4, 3]}
            size={1.6}
            speed={0.15}
            opacity={0.35}
            color="#00a5a8"
            noise={0.6}
          />

          <ContactShadows
            position={[0, -2.05, 0]}
            opacity={0.32}
            scale={9}
            blur={2.8}
            far={4.5}
            resolution={512}
            color="#0b4f6c"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}