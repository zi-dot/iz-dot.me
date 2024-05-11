import { BaseFooter } from "@/components/shared/BaseFooter";
import { BaseHeaderClient } from "@/components/shared/BaseHeader";
import { FontStyle } from "@/lib/FontStyle";
import "@/styles/global.css";
import styles from "./layout.module.css";

export const metadata = {
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <FontStyle />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
      <body>
        <BaseHeaderClient />
        <main className={styles.main}>{children}</main>
        <BaseFooter />
      </body>
    </html>
  );
}
