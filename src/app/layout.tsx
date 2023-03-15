import "@/styles/global.css";
import styles from "./layout.module.css";
import { FontStyle } from "@/lib/FontStyle";
import { BaseHeaderClient } from "@/components/shared/BaseHeader";
import { BaseFooter } from "@/components/shared/BaseFooter";

export const metadata = {
  title: "zi @iz_dot",
  description: "Personal page of zi @iz_dot",
  icons: {
    icon: "/favicon.ico",
  },
};

export const dynamicParams = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" data-theme="dark">
      <FontStyle />
      <body className={styles.body}>
        <BaseHeaderClient />
        <main className={styles.main}>{children}</main>
        <BaseFooter />
      </body>
    </html>
  );
}
