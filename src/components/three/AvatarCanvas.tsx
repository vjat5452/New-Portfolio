"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Html, Sparkles, useProgress } from "@react-three/drei";
import { useTheme } from "next-themes";
import { Avatar } from "./Avatar";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 text-xs font-mono text-muted whitespace-nowrap">
        <div className="h-1 w-32 rounded-full bg-line overflow-hidden">
          <div className="h-full bg-accent transition-all" style={{ width: `${progress}%` }} />
        </div>
        Loading avatar {Math.round(progress)}%
      </div>
    </Html>
  );
}

function Orbs({ dark }: { dark: boolean }) {
  const a = dark ? "#8b6bff" : "#6d4aff";
  const b = dark ? "#c9bcff" : "#b4a3ff";
  const c = dark ? "#6a4de0" : "#5a3fd1";
  return (
    <>
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh position={[-1.1, 0.5, -0.6]}>
          <icosahedronGeometry args={[0.22, 1]} />
          <meshStandardMaterial color={a} emissive={a} emissiveIntensity={0.6} wireframe />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[1.15, 0.9, -0.4]} rotation={[0.6, 0.3, 0]}>
          <torusGeometry args={[0.2, 0.06, 16, 48]} />
          <meshStandardMaterial color={b} emissive={b} emissiveIntensity={0.7} metalness={0.6} roughness={0.2} />
        </mesh>
      </Float>
      <Float speed={2.4} rotationIntensity={1.5} floatIntensity={1.2}>
        <mesh position={[0.95, -0.35, 0.4]}>
          <octahedronGeometry args={[0.14, 0]} />
          <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.8} />
        </mesh>
      </Float>
      <Sparkles count={40} scale={[3, 2.4, 2]} size={2.5} speed={0.4} color={b} opacity={0.6} />
    </>
  );
}

export function AvatarCanvas({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme !== "light";
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const set = () => setMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  return (
    <div className={className}>
      <Canvas
        dpr={[1, mobile ? 1.5 : 2]}
        camera={{ position: [0, 0.15, 3.35], fov: 26 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        shadows={!mobile}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={dark ? 0.7 : 1.1} />
        <directionalLight position={[2.5, 3, 3]} intensity={dark ? 2.2 : 2.6} castShadow={!mobile} shadow-mapSize={1024} />
        <directionalLight position={[-3, 2, -2]} intensity={1.6} color={dark ? "#8b6bff" : "#a78bfa"} />
        <directionalLight position={[3, 1, -2]} intensity={1.2} color={dark ? "#c9bcff" : "#ddd6fe"} />
        <spotLight position={[0, 4, 1]} intensity={1.5} angle={0.5} penumbra={1} />

        <Suspense fallback={<Loader />}>
          <group position={[0, -1.38, 0]}>
            <Avatar />
          </group>
          {!mobile && <Orbs dark={dark} />}
          <ContactShadows position={[0, -1.38, 0]} opacity={dark ? 0.6 : 0.4} scale={4} blur={2.4} far={2} />
        </Suspense>
      </Canvas>
    </div>
  );
}
