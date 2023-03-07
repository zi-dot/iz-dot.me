"use client";
import dynamic from "next/dynamic";

export const DynamicVoxel = dynamic(
  () => import("./index").then((mod) => mod.VoxelTaiwan),
  {
    ssr: false,
    loading: () => (
      <span
        style={{ width: "100%" }}
        aria-busy="true"
        aria-label="ローディング中"
      ></span>
    ),
  }
);
