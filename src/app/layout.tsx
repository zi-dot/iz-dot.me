import "@/styles/global.css";
import styles from "./layout.module.css";
import { FontStyle } from "@/lib/FontStyle";
import { BaseHeaderClient } from "@/components/shared/BaseHeader";

export const metadata = {
  title: "iz_dot / zi",
  description: "Personal page of iz_dot / zi",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <FontStyle />
      <body>
        <BaseHeaderClient />
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
