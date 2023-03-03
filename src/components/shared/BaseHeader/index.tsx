"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FC, useMemo, useRef, useState } from "react";
import styles from "./index.module.css";

type Props = {
  currentPath: "home" | "posts" | "about" | undefined;
};

const homeLinkId = "home_link";
const postsLinkId = "posts_link";
const aboutLinkId = "about_link";

const NAV_WIDTH = 172;

export const BaseHeader: FC<Props> = ({ currentPath: initialPath }) => {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [isClose, setIsClose] = useState(true);

  const homeLinkRef = useRef<HTMLAnchorElement>(null);
  const postsLinkRef = useRef<HTMLAnchorElement>(null);
  const aboutLinkRef = useRef<HTMLAnchorElement>(null);

  const navListWidth = () => {
    switch (currentPath) {
      case "home":
        return homeLinkRef.current?.getBoundingClientRect().width;
      case "posts":
        return postsLinkRef.current?.getBoundingClientRect().width;
      case "about":
        return aboutLinkRef.current?.getBoundingClientRect().width;
      case undefined:
        return 0;
    }
  };

  const calcTranslateX = () => {
    const separatorWidth =
      document.getElementById("separator-1")?.getBoundingClientRect().width ??
      22;
    switch (currentPath) {
      case "home":
        return (
          NAV_WIDTH -
          ((postsLinkRef.current?.getBoundingClientRect().width ?? 42) +
            (aboutLinkRef.current?.getBoundingClientRect().width ?? 42) +
            separatorWidth * 2)
        );
      case "posts":
        return (
          NAV_WIDTH -
          ((aboutLinkRef.current?.getBoundingClientRect().width ?? 42) +
            separatorWidth)
        );
      case "about":
        return NAV_WIDTH;
      case undefined:
        return NAV_WIDTH;
    }
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles["header__logo"]}>
        <Image
          src="/avator.png"
          width={30}
          height={30}
          alt=""
          className={styles["logo__avator-icon"]}
        />
        <p className={styles["logo__name"]}>iz_dot</p>
      </Link>
      <nav className={styles["header__nav"]}>
        <div className={styles["nav__arrow-outer"]}>
          <span
            className={clsx(
              styles["nav__arrow"],
              isClose && styles["nav__arrow--close"]
            )}
            onClick={() => setIsClose(!isClose)}
          >
            <Image src="/arrow.svg" width="10" height="20" alt="" />
          </span>
        </div>
        <div
          className={styles["nav__list-outer"]}
          style={{
            paddingLeft: isClose ? navListWidth() ?? "44px" : `${NAV_WIDTH}px`,
          }}
        >
          <ul
            className={styles["nav__list"]}
            role="list"
            style={{
              transform: isClose
                ? `translateX(-${calcTranslateX()}px)`
                : `translateX(-${NAV_WIDTH}px)`,
            }}
          >
            <li className={styles["nav__item"]} role="listitem">
              <Link
                href="/"
                ref={homeLinkRef}
                id={homeLinkId}
                onClick={() => {
                  setIsClose(true);
                  setCurrentPath("home");
                }}
              >
                home
              </Link>
            </li>
            <li className={styles["nav__item-separator"]} id="separator-1">
              /
            </li>
            <li className={styles["nav__item"]}>
              <Link
                href="posts"
                ref={postsLinkRef}
                id={postsLinkId}
                onClick={() => {
                  setIsClose(true);
                  setCurrentPath("posts");
                }}
              >
                posts
              </Link>
            </li>
            <li className={styles["nav__item-separator"]} id="separator-2">
              /
            </li>
            <li className={styles["nav__item"]}>
              <Link
                href="/about"
                ref={aboutLinkRef}
                id={aboutLinkId}
                onClick={() => {
                  setIsClose(true);
                  setCurrentPath("about");
                }}
              >
                about
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export const BaseHeaderClient: FC = () => {
  const currentPath = useMemo(() => {
    const path = location.pathname.replace(/\?.*/g, "");
    console.log(path);
    if (path === "/") return "home";
    if (path.startsWith("/posts")) return "posts";
    if (path.startsWith("/about")) return "about";
    return undefined;
  }, []);

  return <BaseHeader currentPath={currentPath} />;
};
