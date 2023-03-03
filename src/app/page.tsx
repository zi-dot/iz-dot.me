import Link from "next/link";
import styles from "./page.module.css";

import "@/styles/global.css";
import { inter } from "@/lib/fonts";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={inter.className}>zi</h1>
      <Link href="/about">About</Link>
    </main>
  );
}
