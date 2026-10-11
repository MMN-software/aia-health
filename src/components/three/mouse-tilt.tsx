"use client";

import { useMemo, useRef, type ReactNode, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* -------------------------------------------------------------------------- */
/*  usePointerActivity                                                        */
/* -------------------------------------------------------------------------- */

export interface PointerActivity {
  activeRef: RefObject<boolean>;
  bind: {
    onPointerEnter: () => void;
    onPointerLeave: () => void;
  };
}

export function usePointerActivity(): PointerActivity {
  const activeRef = useRef<boolean>(false);

  const bind = useMemo(
    () => ({
      onPointerEnter: () => {
        activeRef.current = true;
      },
      onPointerLeave: () => {
        activeRef.current = false;
      },
    }),
    [],
  );

  return { activeRef, bind };
}

/* -------------------------------------------------------------------------- */
/*  <MouseTilt />                                                             */
/* -------------------------------------------------------------------------- */

export interface MouseTiltProps {
  children: ReactNode;
  activeRef?: RefObject<boolean>;
  maxTilt?: number;
  parallax?: number;
  damping?: number;
}

export function MouseTilt({
  children,
  activeRef,
  maxTilt = 0.1,
  parallax = 0.1,
  damping = 5,
}: MouseTiltProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    const dt = Math.min(delta, 0.05);
    const active = activeRef ? activeRef.current : true;
    const px = active ? state.pointer.x : 0;
    const py = active ? state.pointer.y : 0;

    const { damp } = THREE.MathUtils;
    g.rotation.y = damp(g.rotation.y, px * maxTilt, damping, dt);
    g.rotation.x = damp(g.rotation.x, -py * maxTilt * 0.8, damping, dt);
    g.position.x = damp(g.position.x, px * parallax, damping, dt);
    g.position.y = damp(g.position.y, py * parallax * 0.6, damping, dt);
  });

  return <group ref={group}>{children}</group>;
}