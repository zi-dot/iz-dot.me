import styles from "./page.module.css";

import "@/styles/global.css";
import NoSsr from "@/components/shared/NoSsr";
import { DynamicVoxel } from "@/components/3d/VoxelTaiwan/dynamic";
import Link from "next/link";
import clsx from "clsx";

export default function Home() {
  return (
    <>
      <section className={styles["main__top"]}>
        <div className={styles["top__description-box"]}>
          <h1
            className={clsx(
              styles["description-box__title"],
              styles["description-box__title--appear"]
            )}
          >
            Webが好きです。
          </h1>
          <h2 className={styles["description-box__name"]}>iz_dot / zi</h2>
          <p className={styles["description-box__real-name"]}>Ryoji Kono</p>
          <p className={styles["description-box__description-hello"]}>
            はじめまして、Webフロントエンド開発者のiz_dotです。たまにziという名前も使ってます。
          </p>
          <p className={styles["description-box__description-goal"]}>
            人にとって使いやすくワクワクするUIやグラフィックを設計・実装できる人に憧れています。まだ道すがらですが、日々目標に到達できるよう勤しんでいます。
          </p>
          <Link href="/about" className={styles["description-box__read-more"]}>
            more →
          </Link>
        </div>
        <div className={styles["top__voxel"]}>
          <NoSsr>
            <DynamicVoxel />
          </NoSsr>
        </div>
      </section>
      <section className={styles["main__links"]}></section>
    </>
  );
}
