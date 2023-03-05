"use client";
import dynamic from "next/dynamic";

export const DynamicVoxel = dynamic(
  () => import("./index").then((mod) => mod.VoxelTaiwan),
  {
    ssr: false,
    loading: () => <p style={{ width: "100%" }}>loading...</p>,
  }
);
