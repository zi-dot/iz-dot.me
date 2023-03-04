import styles from "./page.module.css";

import "@/styles/global.css";
import { inter } from "@/lib/fonts";
import NoSsr from "@/components/shared/NoSsr";
import { DynamicVoxel } from "@/components/3d/VoxelTaiwan/dynamic";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={inter.className}>zi</h1>
      <NoSsr>
        <div style={{ width: "100%", height: "100vw" }}>
          <DynamicVoxel />
        </div>
      </NoSsr>
    </main>
  );
}
