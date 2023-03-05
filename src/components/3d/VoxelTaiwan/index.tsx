"use client";

import { OrthographicCamera, useGLTF } from "@react-three/drei";
import { Canvas, ObjectMap, useFrame, useThree } from "@react-three/fiber";
import { FC, RefObject, useCallback, useEffect, useRef } from "react";
import { Group, Mesh } from "three";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import styles from "./index.module.css";

// BASE VIEWPORT = 1200
const BASE_RADIUS = 2.4;

const Voxel = ({ meshRef }: { meshRef: RefObject<Mesh> }) => {
  const group = useRef<Group>(null);
  const { nodes, materials } = useGLTF("/taiwan.glb") as GLTF & ObjectMap;
  const { camera, size } = useThree();

  useFrame(({ clock }) => {
    camera.lookAt(0, 0, 0);
    if (meshRef.current === null) return;

    const scale = size.width / 1200;

    meshRef.current.position.lerp(
      new THREE.Vector3(
        0,
        scale * BASE_RADIUS * -1 +
        Math.sin(clock.getElapsedTime() * 0.5) * 0.05,
        0
      ),
      0.07
    );
  });

  useEffect(() => {
    if (meshRef.current === null) return;

    const scale = size.width / 1200;
    meshRef.current.scale.set(scale, scale, scale);
    meshRef.current.position.set(0, scale * BASE_RADIUS * -1.2, 0);
  }, [meshRef, size.width]);

  return (
    <group dispose={null} ref={group}>
      <mesh
        ref={meshRef}
        // @ts-ignore
        geometry={nodes.Untitled.geometry}
        material={materials.palette}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
};

const CameraWithScrollControl = ({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement>;
}) => {
  const { camera } = useThree();

  const moveCamera = useCallback(() => {
    if (!containerRef.current) return;

    const { width } = containerRef.current.getBoundingClientRect();
    const scale = width / 1200;
    const scaledRadius = scale * BASE_RADIUS * 1.5;

    const height = containerRef.current?.getBoundingClientRect().height;
    const scrollInside = scrollY;
    const scrollPercentage = Math.min(Math.max(scrollInside / height, 0), 1);

    const latitude = 25 + scrollPercentage * -45;
    const longitude = 60 + scrollPercentage * -10;

    const cameraPosX =
      scaledRadius *
      (Math.cos((latitude * Math.PI) / 180) *
        Math.cos((longitude * Math.PI) / 180));
    const cameraPosY = scaledRadius * Math.sin((latitude * Math.PI) / 180);
    const cameraPosZ =
      scaledRadius *
      Math.cos((latitude * Math.PI) / 180) *
      Math.sin((longitude * Math.PI) / 180);

    camera.position.set(cameraPosX, cameraPosY, cameraPosZ);
  }, [containerRef, camera]);

  useEffect(() => {
    moveCamera();
    window.addEventListener("scroll", moveCamera);
    return () => window.removeEventListener("scroll", moveCamera);
  }, [moveCamera]);

  useFrame(({ clock }) => {
    if (clock.getElapsedTime() > 1) return;
  });

  return <OrthographicCamera makeDefault zoom={200} />;
};

const ResizeHandler = ({ meshRef }: { meshRef: RefObject<Mesh> }) => {
  const { size } = useThree();
  const handleResize = useCallback(() => {
    const scale = size.width / 1200;

    if (meshRef.current === null) return;
    meshRef.current.scale.set(scale, scale, scale);
    meshRef.current.position.set(0, scale * BASE_RADIUS * -1, 0);
  }, [meshRef, size.width]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return null;
};

export const VoxelTaiwan: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<Mesh>(null);

  return (
    <div className={styles.container} id="" ref={containerRef}>
      <Canvas orthographic gl={{ antialias: false }}>
        <CameraWithScrollControl containerRef={containerRef} />
        <ambientLight intensity={0.8} position={[0.5, 3, 2]} />
        <Voxel meshRef={meshRef} />
        <ResizeHandler meshRef={meshRef} />
      </Canvas>
    </div>
  );
};

useGLTF.preload("/taiwan.glb");
