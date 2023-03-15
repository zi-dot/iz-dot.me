import { FontStyle } from "@/lib/FontStyle";
import { BaseFooter } from "../shared/BaseFooter";
import { BaseHeaderClient } from "../shared/BaseHeader";

import styles from "./index.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FontStyle />
      <BaseHeaderClient />
      <main className={styles.main}>{children}</main>
      <BaseFooter />
    </>
  );
}
