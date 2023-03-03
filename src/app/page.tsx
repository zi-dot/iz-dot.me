import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "./page.module.css";

import "@/styles/global.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={inter.className}>zi</h1>
      <Link href="/about">About</Link>
    </main>
  );
}
