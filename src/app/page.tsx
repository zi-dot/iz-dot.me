import styles from "./page.module.css";

import "@/styles/global.css";
import NoSsr from "@/components/shared/NoSsr";
import { DynamicVoxel } from "@/components/3d/VoxelTaiwan/dynamic";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className={styles["main__top"]}>
        <div className={styles["top__description-box"]}>
          <h1 className={styles["description-box__title"]}>
            Webが
            <wbr />
            好きです。
          </h1>
          <h2 className={styles["description-box__name"]}>iz_dot / zi</h2>
          <p className={styles["description-box__real-name"]}>Ryoji Kono</p>
          <p className={styles["description-box__description-hello"]}>
            はじめまして、
            <wbr />
            Webフロントエンド開発者の
            <wbr />
            iz_dotです。
            <wbr />
            たまに
            <wbr />
            ziと
            <wbr />
            いう
            <wbr />
            名前も
            <wbr />
            使ってます。
          </p>
          <p className={styles["description-box__description-goal"]}>
            人に
            <wbr />
            とって
            <wbr />
            使いやすく
            <wbr />
            ワクワクする
            <wbr />
            UIや
            <wbr />
            グラフィックを
            <wbr />
            設計・
            <wbr />
            実装できる
            <wbr />
            人に
            <wbr />
            憧れています。
            <wbr />
            まだ
            <wbr />
            道すがらですが、
            <wbr />
            日々
            <wbr />
            目標に
            <wbr />
            到達できるよう勤しんでいます。
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
      <section className={styles["main__links"]}>
        <h2>Links</h2>
        <p>この辺でつぶいたり活動したりしています。</p>
        <div>
          <Link href="/posts">
            <p>Posts</p>
            <p>日々の考えや作ったもの置き場</p>
          </Link>
          <a href="https://twitter.com/iz_dot" aria-label="twitter"></a>
          <a href="https://github.com/RyojiK74" aria-label="github"></a>
        </div>
      </section>
    </>
  );
}
