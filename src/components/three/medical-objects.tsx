"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import {
  Float,
  MeshTransmissionMaterial,
  RoundedBox,
  useCursor,
} from "@react-three/drei";
import * as THREE from "three";

type Vec3 = [number, number, number];

/* -------------------------------------------------------------------------- */
/*  Shared PBR materials – created once, disposed on unmount                  */
/* -------------------------------------------------------------------------- */

function useMedicalMaterials() {
  const materials = useMemo(
    () => ({
      chrome: new THREE.MeshPhysicalMaterial({
        color: "#eef2f6",
        metalness: 1,
        roughness: 0.12,
      }),
      brushed: new THREE.MeshPhysicalMaterial({
        color: "#c7cfd8",
        metalness: 1,
        roughness: 0.32,
      }),
      whitePlastic: new THREE.MeshPhysicalMaterial({
        color: "#f5f7f9",
        roughness: 0.38,
        clearcoat: 1,
        clearcoatRoughness: 0.18,
      }),
      tealPlastic: new THREE.MeshPhysicalMaterial({
        color: "#0b4f6c",
        roughness: 0.35,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
      }),
      mintAnodized: new THREE.MeshPhysicalMaterial({
        color: "#00a5a8",
        metalness: 0.75,
        roughness: 0.3,
        clearcoat: 0.5,
      }),
      tubing: new THREE.MeshPhysicalMaterial({
        color: "#0b4f6c",
        roughness: 0.45,
        clearcoat: 0.6,
        clearcoatRoughness: 0.35,
      }),
      darkRubber: new THREE.MeshStandardMaterial({
        color: "#1a2430",
        roughness: 0.75,
      }),
      screen: new THREE.MeshPhysicalMaterial({
        color: "#0c1822",
        roughness: 0.08,
        metalness: 0.3,
        clearcoat: 1,
      }),
      lcd: new THREE.MeshBasicMaterial({ color: "#7fe9e6", toneMapped: false }),
      amberGlass: new THREE.MeshPhysicalMaterial({
        color: "#c98a3e",
        transmission: 0.92,
        roughness: 0.1,
        thickness: 0.35,
        ior: 1.5,
        attenuationColor: new THREE.Color("#a35d1a"),
        attenuationDistance: 0.8,
      }),
      clearGlass: new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        transmission: 1,
        roughness: 0.04,
        thickness: 0.15,
        ior: 1.5,
      }),
      liquid: new THREE.MeshPhysicalMaterial({
        color: "#00a5a8",
        transmission: 0.55,
        roughness: 0.1,
        thickness: 0.3,
        ior: 1.33,
      }),
      label: new THREE.MeshStandardMaterial({
        color: "#fbfcfd",
        roughness: 0.85,
      }),
      pill: new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        roughness: 0.3,
        clearcoat: 1,
      }),
    }),
    [],
  );

  useEffect(
    () => () => Object.values(materials).forEach((m) => m.dispose()),
    [materials],
  );

  return materials;
}

type MedicalMaterials = ReturnType<typeof useMedicalMaterials>;

interface ObjectProps {
  m: MedicalMaterials;
}

/** Builds a smooth TubeGeometry from points and disposes it on unmount. */
function useTube(points: Vec3[], radius: number, segments = 96) {
  const geo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      points.map((p) => new THREE.Vector3(...p)),
    );
    return new THREE.TubeGeometry(curve, segments, radius, 20, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => () => geo.dispose(), [geo]);
  return geo;
}

/* -------------------------------------------------------------------------- */
/*  Interactive wrapper – spring repulsion, proximity spin, hover feedback   */
/* -------------------------------------------------------------------------- */

interface InteractiveProps {
  children: ReactNode;
  position: Vec3;
  rotation?: Vec3;
  scale?: number;
  activeRef: RefObject<boolean>;
  spin?: number;
  phase?: number;
  floatSpeed?: number;
}

const REPEL_RADIUS = 0.45; // only reacts when pointer is very close
const REPEL_STRENGTH = 0.18; // gentle push — objects stay inside the frame
const SPRING_K = 40;
const SPRING_DAMPING = 14; // more damping = no overshoot, no clipping

function Interactive({
  children,
  position,
  rotation = [0, 0, 0],
  scale = 1,
  activeRef,
  spin = 0.25,
  phase = 0,
  floatSpeed = 1.2,
}: InteractiveProps) {
  const anchor = useRef<THREE.Group>(null);
  const push = useRef<THREE.Group>(null);
  const spinner = useRef<THREE.Group>(null);

  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const camera = useThree((s) => s.camera);

  const tmp = useMemo(() => new THREE.Vector3(), []);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const vel = useMemo(() => new THREE.Vector3(), []);
  const proximity = useRef(0);

  useFrame((state, delta) => {
    if (!anchor.current || !push.current || !spinner.current) return;
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime + phase;

    anchor.current.getWorldPosition(tmp).project(camera);
    let dx = 0;
    let dy = 0;
    let influence = 0;
    if (activeRef.current) {
      dx = tmp.x - state.pointer.x;
      dy = tmp.y - state.pointer.y;
      const d = Math.hypot(dx, dy);
      influence = THREE.MathUtils.clamp(1 - d / REPEL_RADIUS, 0, 1);
      influence *= influence;
      if (d > 1e-4) {
        dx /= d;
        dy /= d;
      }
    }

    const tx = dx * influence * REPEL_STRENGTH;
    const ty = dy * influence * REPEL_STRENGTH;
    vel.x += (tx - pos.x) * SPRING_K * dt;
    vel.y += (ty - pos.y) * SPRING_K * dt;
    vel.z += (influence * 0.15 - pos.z) * SPRING_K * dt;
    vel.multiplyScalar(Math.exp(-SPRING_DAMPING * dt));
    pos.addScaledVector(vel, dt);
    push.current.position.copy(pos);

    const target = Math.max(influence, hovered ? 1 : 0);
    proximity.current = THREE.MathUtils.damp(proximity.current, target, 4, dt);
    const s = spinner.current;
    s.rotation.y += dt * spin * (1 + proximity.current * 4);
    s.rotation.x = Math.sin(t * 0.45) * 0.1 + dy * influence * 0.18;
    s.rotation.z = Math.cos(t * 0.35) * 0.06 - dx * influence * 0.18;

    const sc = THREE.MathUtils.damp(s.scale.x, hovered ? 1.06 : 1, 8, dt);
    s.scale.setScalar(sc);
  });

  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
  };

  return (
    <group ref={anchor} position={position} scale={scale}>
      <Float
        speed={floatSpeed}
        rotationIntensity={0.12}
        floatIntensity={0.35}
        floatingRange={[-0.05, 0.05]}
      >
        <group ref={push}>
          <group
            ref={spinner}
            onPointerOver={over}
            onPointerOut={() => setHovered(false)}
          >
            <group rotation={rotation}>{children}</group>
          </group>
        </group>
      </Float>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stethoscope                                                               */
/* -------------------------------------------------------------------------- */

function Stethoscope({ m }: ObjectProps) {
  const mainTube = useTube(
    [
      [0, 0.55, 0],
      [0.05, 0.1, 0.05],
      [-0.18, -0.45, 0.1],
      [0.05, -0.92, 0.02],
      [0.42, -0.98, -0.04],
      [0.58, -0.72, 0],
    ],
    0.045,
  );
  const leftBinaural = useTube(
    [
      [0, 0.55, 0],
      [-0.14, 0.82, 0],
      [-0.3, 1.15, 0.02],
      [-0.24, 1.36, 0.1],
    ],
    0.022,
    48,
  );
  const rightBinaural = useTube(
    [
      [0, 0.55, 0],
      [0.14, 0.82, 0],
      [0.3, 1.15, 0.02],
      [0.24, 1.36, 0.1],
    ],
    0.022,
    48,
  );

  return (
    <group position={[-0.1, -0.2, 0]}>
      <mesh geometry={mainTube} material={m.tubing} castShadow />
      <mesh geometry={leftBinaural} material={m.chrome} />
      <mesh geometry={rightBinaural} material={m.chrome} />

      <mesh position={[0, 0.55, 0]} material={m.chrome}>
        <sphereGeometry args={[0.05, 24, 24]} />
      </mesh>

      {([-0.24, 0.24] as const).map((x) => (
        <mesh key={x} position={[x, 1.38, 0.11]} material={m.darkRubber}>
          <sphereGeometry args={[0.055, 24, 24]} />
        </mesh>
      ))}

      <group position={[0.6, -0.62, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh material={m.chrome}>
          <cylinderGeometry args={[0.26, 0.26, 0.1, 64]} />
        </mesh>
        <mesh
          position={[0, 0.055, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          material={m.mintAnodized}
        >
          <torusGeometry args={[0.24, 0.02, 16, 64]} />
        </mesh>
        <mesh position={[0, 0.056, 0]} material={m.darkRubber}>
          <cylinderGeometry args={[0.22, 0.22, 0.01, 64]} />
        </mesh>
        <mesh position={[0, -0.1, 0]} material={m.brushed}>
          <cylinderGeometry args={[0.045, 0.06, 0.14, 24]} />
        </mesh>
      </group>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Digital blood pressure monitor                                           */
/* -------------------------------------------------------------------------- */

function BloodPressureMonitor({ m }: ObjectProps) {
  const hose = useTube(
    [
      [0.62, 0.15, 0],
      [0.9, 0.2, -0.05],
      [1.05, -0.2, -0.1],
      [0.85, -0.6, -0.1],
    ],
    0.03,
    64,
  );

  return (
    <group>
      <RoundedBox
        args={[1.3, 1.0, 0.34]}
        radius={0.12}
        smoothness={6}
        material={m.whitePlastic}
      />
      <RoundedBox
        args={[1.32, 0.14, 0.3]}
        radius={0.06}
        smoothness={4}
        position={[0, -0.48, 0]}
        material={m.tealPlastic}
      />

      <RoundedBox
        args={[0.92, 0.52, 0.04]}
        radius={0.03}
        smoothness={4}
        position={[0, 0.12, 0.17]}
        material={m.screen}
      />

      <group position={[-0.08, 0.12, 0.195]}>
        <mesh position={[0, 0.12, 0]} material={m.lcd}>
          <planeGeometry args={[0.5, 0.07]} />
        </mesh>
        <mesh position={[-0.06, 0, 0]} material={m.lcd}>
          <planeGeometry args={[0.38, 0.05]} />
        </mesh>
        <mesh position={[-0.1, -0.11, 0]} material={m.lcd}>
          <planeGeometry args={[0.3, 0.035]} />
        </mesh>
        <mesh position={[0.36, -0.11, 0]} material={m.lcd}>
          <circleGeometry args={[0.03, 24]} />
        </mesh>
      </group>

      <mesh
        position={[-0.2, -0.27, 0.17]}
        rotation={[Math.PI / 2, 0, 0]}
        material={m.mintAnodized}
      >
        <cylinderGeometry args={[0.08, 0.08, 0.04, 32]} />
      </mesh>
      <mesh
        position={[0.15, -0.27, 0.17]}
        rotation={[Math.PI / 2, 0, 0]}
        material={m.brushed}
      >
        <cylinderGeometry args={[0.055, 0.055, 0.03, 32]} />
      </mesh>
      <mesh
        position={[0.33, -0.27, 0.17]}
        rotation={[Math.PI / 2, 0, 0]}
        material={m.brushed}
      >
        <cylinderGeometry args={[0.055, 0.055, 0.03, 32]} />
      </mesh>

      <mesh geometry={hose} material={m.darkRubber} />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Digital thermometer                                                      */
/* -------------------------------------------------------------------------- */

function Thermometer({ m }: ObjectProps) {
  return (
    <group>
      <mesh material={m.whitePlastic}>
        <capsuleGeometry args={[0.13, 1.3, 12, 32]} />
      </mesh>
      <mesh position={[0, 0.45, 0]} material={m.tealPlastic}>
        <cylinderGeometry args={[0.135, 0.135, 0.32, 48]} />
      </mesh>
      <RoundedBox
        args={[0.16, 0.34, 0.04]}
        radius={0.015}
        position={[0, 0.05, 0.12]}
        material={m.screen}
      />
      <mesh position={[0, 0.06, 0.142]} material={m.lcd}>
        <planeGeometry args={[0.09, 0.2]} />
      </mesh>
      <mesh
        position={[0, -0.25, 0.125]}
        rotation={[Math.PI / 2, 0, 0]}
        material={m.mintAnodized}
      >
        <cylinderGeometry args={[0.045, 0.045, 0.03, 24]} />
      </mesh>
      <mesh position={[0, -0.88, 0]} material={m.chrome}>
        <cylinderGeometry args={[0.05, 0.07, 0.22, 32]} />
      </mesh>
      <mesh position={[0, -0.99, 0]} material={m.chrome}>
        <sphereGeometry args={[0.05, 32, 32]} />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Amber pill bottle                                                        */
/* -------------------------------------------------------------------------- */

function PillBottle({ m }: ObjectProps) {
  return (
    <group>
      {(
        [
          [0.12, -0.25, 0.05, 0.4],
          [-0.1, -0.3, -0.05, -0.6],
          [0.0, -0.12, 0.12, 1.2],
        ] as const
      ).map(([x, y, z, r], i) => (
        <mesh
          key={i}
          position={[x, y, z]}
          rotation={[r, 0, r * 0.7]}
          material={m.pill}
        >
          <capsuleGeometry args={[0.06, 0.12, 8, 16]} />
        </mesh>
      ))}

      <mesh material={m.amberGlass}>
        <cylinderGeometry args={[0.38, 0.38, 0.9, 64]} />
      </mesh>
      <mesh position={[0, -0.05, 0]} material={m.label}>
        <cylinderGeometry
          args={[0.386, 0.386, 0.48, 64, 1, true, -1.2, 2.4]}
        />
      </mesh>
      <mesh position={[0, 0.12, 0]} material={m.tealPlastic}>
        <cylinderGeometry
          args={[0.389, 0.389, 0.07, 64, 1, true, -1.2, 2.4]}
        />
      </mesh>
      <mesh position={[0, 0.5, 0]} material={m.amberGlass}>
        <cylinderGeometry args={[0.3, 0.36, 0.1, 64]} />
      </mesh>
      <mesh position={[0, 0.66, 0]} material={m.whitePlastic}>
        <cylinderGeometry args={[0.41, 0.41, 0.26, 64]} />
      </mesh>
      <mesh
        position={[0, 0.79, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        material={m.whitePlastic}
      >
        <torusGeometry args={[0.39, 0.025, 16, 64]} />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Syringe                                                                   */
/* -------------------------------------------------------------------------- */

function Syringe({ m }: ObjectProps) {
  const gradations = useMemo(
    () => Array.from({ length: 9 }, (_, i) => -0.5 + i * 0.12),
    [],
  );

  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.16, 0.16, 1.4, 64, 1, true]} />
        <MeshTransmissionMaterial
          samples={4}
          resolution={256}
          thickness={0.12}
          roughness={0.05}
          ior={1.45}
          chromaticAberration={0.015}
          anisotropicBlur={0.05}
          distortion={0}
          backside={false}
          side={THREE.DoubleSide}
          color="#ffffff"
        />
      </mesh>

      <mesh position={[0, -0.3, 0]} material={m.liquid}>
        <cylinderGeometry args={[0.145, 0.145, 0.78, 48]} />
      </mesh>

      {gradations.map((y) => (
        <mesh key={y} position={[0, y, 0]} material={m.darkRubber}>
          <cylinderGeometry
            args={[0.162, 0.162, 0.006, 48, 1, true, -0.6, 1.2]}
          />
        </mesh>
      ))}

      <mesh position={[0, 0.12, 0]} material={m.darkRubber}>
        <cylinderGeometry args={[0.148, 0.148, 0.08, 48]} />
      </mesh>
      <mesh position={[0, 0.65, 0]} material={m.whitePlastic}>
        <cylinderGeometry args={[0.045, 0.045, 1.0, 24]} />
      </mesh>
      <mesh position={[0, 1.16, 0]} material={m.whitePlastic}>
        <cylinderGeometry args={[0.17, 0.17, 0.035, 48]} />
      </mesh>

      <RoundedBox
        args={[0.6, 0.04, 0.22]}
        radius={0.018}
        position={[0, 0.71, 0]}
        material={m.whitePlastic}
      />

      <mesh position={[0, -0.76, 0]} material={m.mintAnodized}>
        <cylinderGeometry args={[0.1, 0.05, 0.12, 32]} />
      </mesh>
      <mesh position={[0, -1.15, 0]} material={m.chrome}>
        <cylinderGeometry args={[0.01, 0.01, 0.68, 12]} />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Vial                                                                      */
/* -------------------------------------------------------------------------- */

function Vial({ m }: ObjectProps) {
  return (
    <group>
      <mesh material={m.clearGlass}>
        <cylinderGeometry args={[0.22, 0.22, 0.62, 48]} />
      </mesh>
      <mesh position={[0, -0.08, 0]} material={m.liquid}>
        <cylinderGeometry args={[0.2, 0.2, 0.42, 48]} />
      </mesh>
      <mesh position={[0, -0.04, 0]} material={m.label}>
        <cylinderGeometry args={[0.224, 0.224, 0.26, 48, 1, true, -1, 2]} />
      </mesh>
      <mesh position={[0, 0.36, 0]} material={m.clearGlass}>
        <cylinderGeometry args={[0.13, 0.2, 0.1, 48]} />
      </mesh>
      <mesh position={[0, 0.47, 0]} material={m.mintAnodized}>
        <cylinderGeometry args={[0.165, 0.165, 0.14, 48]} />
      </mesh>
      <mesh position={[0, 0.545, 0]} material={m.darkRubber}>
        <cylinderGeometry args={[0.09, 0.09, 0.02, 32]} />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Composition                                                               */
/* -------------------------------------------------------------------------- */

export interface MedicalObjectsProps {
  activeRef: RefObject<boolean>;
}

export function MedicalObjects({ activeRef }: MedicalObjectsProps) {
  const m = useMedicalMaterials();

  return (
    <group>
      <Interactive
        activeRef={activeRef}
        position={[-0.95, 0.55, 0]}
        rotation={[0, 0, 0.15]}
        scale={0.85}
        spin={0.18}
        phase={0}
        floatSpeed={1.1}
      >
        <Stethoscope m={m} />
      </Interactive>

      <Interactive
        activeRef={activeRef}
        position={[0.9, 0.85, -0.6]}
        rotation={[0.1, -0.35, 0]}
        scale={0.85}
        spin={0.12}
        phase={1.7}
        floatSpeed={0.9}
      >
        <BloodPressureMonitor m={m} />
      </Interactive>

      <Interactive
        activeRef={activeRef}
        position={[1.3, -0.65, 0.3]}
        rotation={[0, 0, -0.5]}
        scale={0.8}
        spin={0.3}
        phase={3.1}
        floatSpeed={1.4}
      >
        <Thermometer m={m} />
      </Interactive>

      <Interactive
        activeRef={activeRef}
        position={[-1.2, -0.95, 0.2]}
        rotation={[0.15, 0, 0.12]}
        scale={0.8}
        spin={0.22}
        phase={4.4}
        floatSpeed={1.0}
      >
        <PillBottle m={m} />
      </Interactive>

      <Interactive
        activeRef={activeRef}
        position={[0.1, -0.3, 0.8]}
        rotation={[0, 0, 0.75]}
        scale={0.72}
        spin={0.26}
        phase={2.3}
        floatSpeed={1.3}
      >
        <Syringe m={m} />
      </Interactive>

      <Interactive
        activeRef={activeRef}
        position={[-0.05, 1.45, -1]}
        rotation={[0.2, 0, -0.2]}
        scale={0.75}
        spin={0.35}
        phase={5.2}
        floatSpeed={1.6}
      >
        <Vial m={m} />
      </Interactive>
    </group>
  );
}