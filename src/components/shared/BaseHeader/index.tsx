"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FC, useMemo, useRef, useState } from "react";
import styles from "./index.module.css";
import { usePathname } from "next/navigation";

type Props = {
  currentPath: NavList | undefined;
};

const HOME_LINK_ID = "home_link";
const POSTS_LINK_ID = "posts_link";
const NAV_WIDTH = 105;
const NAV_LIST = ["home", "posts"] as const;

type NavList = (typeof NAV_LIST)[number];

export const BaseHeader: FC<Props> = ({ currentPath }) => {
  const [isClose, setIsClose] = useState(true);

  const homeLinkRef = useRef<HTMLAnchorElement>(null);
  const postsLinkRef = useRef<HTMLAnchorElement>(null);
  const separatorRef = useRef<HTMLLIElement>(null);

  const navListWidth = () => {
    switch (currentPath) {
      case "home":
        return homeLinkRef.current?.getBoundingClientRect().width;
      case "posts":
        return postsLinkRef.current?.getBoundingClientRect().width;
      case undefined:
        return 0;
    }
  };

  const calcTranslateX = () => {
    const separatorWidth =
      separatorRef.current?.getBoundingClientRect().width ?? 22;
    switch (currentPath) {
      case "home":
        return (
          NAV_WIDTH -
          ((postsLinkRef.current?.getBoundingClientRect().width ?? 42) +
            separatorWidth *
            (NAV_LIST.length - (NAV_LIST.indexOf(currentPath) + 1)))
        );
      case "posts":
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
          width={120}
          height={120}
          alt=""
          className={styles["logo__avator-icon"]}
          quality="100"
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
            paddingLeft: isClose ? navListWidth() ?? "42px" : `${NAV_WIDTH}px`,
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
                id={HOME_LINK_ID}
                onClick={() => {
                  setIsClose(true);
                }}
              >
                home
              </Link>
            </li>
            <li className={styles["nav__item-separator"]} ref={separatorRef}>
              /
            </li>
            <li className={styles["nav__item"]}>
              <Link
                href="posts"
                ref={postsLinkRef}
                id={POSTS_LINK_ID}
                onClick={() => {
                  setIsClose(true);
                }}
              >
                posts
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export const BaseHeaderClient: FC = () => {
  const pathname = usePathname();
  const currentPath = useMemo(() => {
    const path = pathname.replace(/\?.*/g, "");
    if (path === "/") return "home";
    if (path.startsWith("/posts")) return "posts";
    return undefined;
  }, [pathname]);

  return <BaseHeader currentPath={currentPath} />;
};
