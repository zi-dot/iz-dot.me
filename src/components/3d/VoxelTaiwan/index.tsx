"use client";

import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import styles from "./index.module.css";

const BASE_RADIUS = 2.4;

const Voxel = ({ scale }: { scale: number }) => {
  const gltf = useLoader(GLTFLoader, "/taiwan.glb");
  const { camera } = useThree();

  const scaledRadius = scale * BASE_RADIUS;

  useFrame((state) => {
    camera.lookAt(0, 0, 0);
    state.camera.position.lerp(
      new THREE.Vector3().set(
        state.mouse.x * -1.5 + scaledRadius * Math.sin((20 * Math.PI) / 180),
        state.mouse.y * -1.5 + scaledRadius / 2,
        scaledRadius * 2 * Math.cos((20 * Math.PI) / 180)
      ),
      0.05
    );
  });

  return (
    <primitive
      object={gltf.scene}
      scale={scale}
      position={[0, scale * -BASE_RADIUS, 0]}
    />
  );
};

// IDEAL VIEWPORT = 1200
export const VoxelTaiwan: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);

  const scaledRadius = scale * BASE_RADIUS;

  const handleResize = useCallback(() => {
    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect();
      setScale(width / 1200);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <div className={styles.container} id="" ref={containerRef}>
      <Canvas orthographic>
        <OrthographicCamera
          makeDefault
          position={[
            scaledRadius * Math.sin((20 * Math.PI) / 180),
            scaledRadius / 2,
            scaledRadius * 2 * Math.cos((20 * Math.PI) / 180),
          ]}
          zoom={200}
        />
        <ambientLight intensity={0.8} position={[0.5, 3, 2]} />
        <Voxel scale={scale} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};
