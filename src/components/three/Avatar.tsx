"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export type AvatarAction = "greet" | "talk" | "dance" | "idle2";

/** Drop any humanoid GLB here: Ready Player Me, Avaturn, Mixamo-rigged. */
const AVATAR_URL = process.env.NEXT_PUBLIC_AVATAR_URL || "/models/avatar.glb";
const CLIPS: Record<AvatarAction | "idle", string> = {
  idle: "/models/anim/idle.glb",
  idle2: "/models/anim/idle2.glb",
  greet: "/models/anim/wave.glb",
  talk: "/models/anim/talk.glb",
  dance: "/models/anim/dance.glb",
};
const TARGET_HEIGHT = 1.75;

/** Fire from anywhere: window.dispatchEvent(new CustomEvent("avatar:action", { detail: "dance" })) */
export function triggerAvatar(action: AvatarAction) {
  window.dispatchEvent(new CustomEvent("avatar:action", { detail: action }));
}

type Bones = { head?: THREE.Object3D; neck?: THREE.Object3D; spine?: THREE.Object3D };

/**
 * Inspect the rig once: find the bone-name prefix (e.g. "mixamorig" / "mixamorig:"),
 * the bones we steer for head tracking, and the scale/offset that normalises the
 * model to a ~1.75 m character standing on y = 0.
 */
function analyseRig(scene: THREE.Object3D) {
  let prefix = "";
  let hips: THREE.Object3D | undefined;
  scene.traverse((o) => {
    if (!hips && /Hips$/i.test(o.name)) {
      hips = o;
      prefix = o.name.slice(0, -4);
    }
  });
  const find = (suffix: string) => {
    let hit: THREE.Object3D | undefined;
    scene.traverse((o) => {
      if (!hit && o.name === `${prefix}${suffix}`) hit = o;
    });
    return hit;
  };
  const bones: Bones = { head: find("Head"), neck: find("Neck"), spine: find("Spine2") ?? find("Spine1") };

  const box = new THREE.Box3().setFromObject(scene);
  const height = box.max.y - box.min.y || TARGET_HEIGHT;
  const scale = Math.abs(height - TARGET_HEIGHT) > 0.3 ? TARGET_HEIGHT / height : 1;
  const yOffset = -box.min.y * scale;

  return { prefix, bones, scale, yOffset };
}

/** Rename clip tracks ("Hips.quaternion") onto the loaded rig's bone names. */
function retarget(clip: THREE.AnimationClip, prefix: string) {
  if (!prefix) return clip;
  const c = clip.clone();
  c.tracks.forEach((t) => {
    const dot = t.name.lastIndexOf(".");
    const bone = t.name.slice(0, dot);
    const prop = t.name.slice(dot);
    t.name = THREE.PropertyBinding.sanitizeNodeName(`${prefix}${bone}`) + prop;
  });
  return c;
}

export function Avatar({ onReady }: { onReady?: () => void }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(AVATAR_URL);
  const clipFiles = useGLTF(Object.values(CLIPS));

  const rig = useMemo(() => analyseRig(scene), [scene]);

  // Re-label each clip with its logical name and retarget it onto this rig.
  const clips = useMemo(() => {
    const names = Object.keys(CLIPS) as (keyof typeof CLIPS)[];
    return clipFiles.map((g, i) => {
      const c = retarget(g.animations[0], rig.prefix);
      // Drop root translation so a differently-proportioned rig never slides away.
      if (rig.prefix) c.tracks = c.tracks.filter((t) => !/Hips\.position$/.test(t.name));
      c.name = names[i];
      return c;
    });
  }, [clipFiles, rig.prefix]);

  const { actions, mixer } = useAnimations(clips, group);
  const [hovered, setHovered] = useState(false);

  // Mutable runtime state lives in refs so the render body stays pure.
  const current = useRef<string>("idle");
  const look = useRef({ x: 0, y: 0 });
  const bones = useRef<Bones>({});
  const playRef = useRef<(name: AvatarAction) => void>(() => {});

  useEffect(() => {
    scene.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        o.frustumCulled = false;
      }
    });
    bones.current = rig.bones;
  }, [scene, rig]);

  useEffect(() => {
    const idle = actions.idle;
    if (!idle) return;

    // Play a one-shot clip, then return to idle (handled by the "finished" listener).
    const playOnce = (name: AvatarAction) => {
      const next = actions[name];
      const prev = actions[current.current];
      if (!next || !prev || current.current === name) return;
      next.reset();
      next.setLoop(THREE.LoopOnce, 1);
      next.clampWhenFinished = true;
      next.crossFadeFrom(prev, 0.35, true).play();
      current.current = name;
    };
    playRef.current = playOnce;

    idle.reset().fadeIn(0.3).play();
    current.current = "idle";
    onReady?.();

    const intro = setTimeout(() => playOnce("greet"), 900);

    const onFinished = (e: { action: THREE.AnimationAction }) => {
      if (e.action === idle) return;
      idle.reset().crossFadeFrom(e.action, 0.4, true).play();
      current.current = "idle";
    };
    mixer.addEventListener("finished", onFinished);

    const onAction = (e: Event) => playOnce((e as CustomEvent<AvatarAction>).detail);
    window.addEventListener("avatar:action", onAction);

    // Random gestures while idle keep the avatar alive.
    const gestures: AvatarAction[] = ["idle2", "talk", "idle2", "greet"];
    const tick = setInterval(() => {
      if (current.current === "idle" && document.visibilityState === "visible") {
        playOnce(gestures[Math.floor(Math.random() * gestures.length)]);
      }
    }, 11000);

    return () => {
      clearTimeout(intro);
      clearInterval(tick);
      mixer.removeEventListener("finished", onFinished);
      window.removeEventListener("avatar:action", onAction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions, mixer]);

  // Head + torso follow the pointer. Runs after the mixer update because
  // useAnimations registered its frame callback first in this component.
  useFrame((state, delta) => {
    const targetX = THREE.MathUtils.clamp(state.pointer.x, -1, 1);
    const targetY = THREE.MathUtils.clamp(state.pointer.y, -1, 1);
    const ease = 1 - Math.pow(0.001, delta);
    const l = look.current;
    l.x += (targetX - l.x) * ease;
    l.y += (targetY - l.y) * ease;
    const yaw = l.x * 0.55;
    const pitch = -l.y * 0.3;
    const { head, neck, spine } = bones.current;
    if (head) {
      head.rotation.y += yaw * 0.6;
      head.rotation.x += pitch * 0.6;
    }
    if (neck) {
      neck.rotation.y += yaw * 0.3;
      neck.rotation.x += pitch * 0.25;
    }
    if (spine) spine.rotation.y += yaw * 0.15;
    const g = group.current;
    if (g) g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, l.x * 0.12, 0.05);
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  return (
    <group
      ref={group}
      dispose={null}
      onClick={() => playRef.current("dance")}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <group scale={rig.scale} position={[0, rig.yOffset, 0]}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload(AVATAR_URL);
useGLTF.preload(Object.values(CLIPS));
