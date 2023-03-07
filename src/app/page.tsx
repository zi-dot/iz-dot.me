import styles from "./page.module.css";

import "@/styles/global.css";
import NoSsr from "@/components/shared/NoSsr";
import { DynamicVoxel } from "@/components/3d/VoxelTaiwan/dynamic";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className={styles["main__top"]}>
        <div className={styles["top__description-box"]}>
          <h1 className={styles["description-box__title"]}>Webが好きです。</h1>
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
            道すがら
            <wbr />
            ですが、
            <wbr />
            日々
            <wbr />
            目標に
            <wbr />
            到達
            <wbr />
            できるよう
            <wbr />
            勤しんでいます。
          </p>
          <Link href="/about" className={styles["description-box__read-more"]}>
            more{" "}
            <span className={styles["description-box__read-more-arrow"]}>
              →
            </span>
          </Link>
        </div>
        <div className={styles["top__voxel"]}>
          <NoSsr>
            <DynamicVoxel />
          </NoSsr>
        </div>
      </section>
      <section className={styles["main__links"]}>
        <h2 className={styles["links__title"]}>Links</h2>
        <p className={styles["links__description"]}>
          この辺でつぶいたり活動したりしています。
        </p>
        <div className={styles["links__tiles"]}>
          <Link href="/posts" className={styles["tiles__posts"]}>
            <p className={styles["tiles__posts-title"]}>Posts</p>
            <p className={styles["tiles__posts-description"]}>
              日々の
              <wbr />
              考えや
              <wbr />
              作ったもの
              <wbr />
              置き場
            </p>
          </Link>
          <a
            className={styles["tiles__twitter"]}
            target="_blank"
            rel="noreferer noopener"
            href="https://twitter.com/iz_dot"
            aria-label="twitter"
          >
            <Image src="/twitter.svg" alt="twitter" width="36" height="30" />
          </a>
          <a
            className={styles["tiles__github"]}
            target="_blank"
            rel="noreferer noopener"
            href="https://github.com/RyojiK74"
            aria-label="github"
          >
            <Image src="/github.svg" alt="github" width="38" height="38" />
          </a>
        </div>
      </section>
    </>
  );
}
