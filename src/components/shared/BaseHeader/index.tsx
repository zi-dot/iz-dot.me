import clsx from "clsx";
import Image from "next/image";
import { FC, useMemo, useRef, useState } from "react";
import styles from "./index.module.css";
import viewTransitionName from "@/styles/viewTransitionName.module.css";
import { usePathname } from "next/navigation";
import { TransitionLink } from "../TransitionLink";

type Props = {
  currentPath: NavList | undefined;
};

const HOME_LINK_ID = "home_link";
const POSTS_LINK_ID = "posts_link";
const ABOUNT_LINK_ID = "about_link";
const TOTAL_NAV_WIDTH_FALLBACK = 174;
const NAV_LIST = ["home", "posts", "about"] as const;

type NavList = (typeof NAV_LIST)[number];

export const BaseHeader: FC<Props> = ({ currentPath }) => {
  const [isClose, setIsClose] = useState(true);

  const homeLinkRef = useRef<HTMLAnchorElement>(null);
  const postsLinkRef = useRef<HTMLAnchorElement>(null);
  const aboutLinkRef = useRef<HTMLAnchorElement>(null);
  const separatorRef = useRef<HTMLLIElement>(null);

  const totalNavListWidth = useMemo(() => {
    if (
      homeLinkRef.current === null ||
      postsLinkRef.current === null ||
      aboutLinkRef.current === null ||
      separatorRef.current === null
    )
      return TOTAL_NAV_WIDTH_FALLBACK;

    const homeLinkWidth = homeLinkRef.current.getBoundingClientRect().width;
    const postsLinkWidth = postsLinkRef.current.getBoundingClientRect().width;
    const aboutLinkWidth = aboutLinkRef.current.getBoundingClientRect().width;
    const separatorWidth = separatorRef.current.getBoundingClientRect().width;

    return (
      homeLinkWidth +
      postsLinkWidth +
      aboutLinkWidth +
      separatorWidth * (NAV_LIST.length - 1)
    );
  }, [homeLinkRef, postsLinkRef, aboutLinkRef, separatorRef]);

  const navListWidth = () => {
    const margin = 8;
    switch (currentPath) {
      case "home":
        return (
          Math.ceil(homeLinkRef.current?.getBoundingClientRect().width ?? 44) +
          margin
        );
      case "posts":
        return (
          Math.ceil(postsLinkRef.current?.getBoundingClientRect().width ?? 45) +
          margin
        );
      case "about":
        return (
          Math.ceil(aboutLinkRef.current?.getBoundingClientRect().width ?? 46) +
          margin
        );
      case undefined:
        return 0;
    }
  };

  const calcTranslateX = () => {
    const separatorWidth = Math.ceil(
      separatorRef.current?.getBoundingClientRect().width ?? 22
    );
    const postLinkWidth = Math.ceil(
      postsLinkRef.current?.getBoundingClientRect().width ?? 44
    );
    const aboutLinkWidth = Math.ceil(
      aboutLinkRef.current?.getBoundingClientRect().width ?? 44
    );
    switch (currentPath) {
      case "home":
        return (
          totalNavListWidth -
          (postLinkWidth +
            aboutLinkWidth +
            separatorWidth *
              (NAV_LIST.length - (NAV_LIST.indexOf(currentPath) + 1)))
        );
      case "posts":
        return (
          totalNavListWidth -
          (aboutLinkWidth +
            separatorWidth *
              (NAV_LIST.length - (NAV_LIST.indexOf(currentPath) + 1)))
        );
      case "about":
        return totalNavListWidth;
      case undefined:
        return totalNavListWidth;
    }
  };

  return (
    <header className={clsx(styles.header, viewTransitionName.header)}>
      <div className={styles["header__inner"]}>
        <TransitionLink href="/" className={styles["header__logo"]}>
          <Image
            src="/avator.png"
            width={120}
            height={120}
            alt=""
            className={styles["logo__avator-icon"]}
            quality="100"
          />
          <p className={styles["logo__name"]}>zi</p>
        </TransitionLink>
        <nav className={styles["header__nav"]}>
          <div className={styles["nav__arrow-outer"]}>
            <button
              aria-label="ナビゲーションを開く"
              className={clsx(
                styles["nav__arrow"],
                isClose && styles["nav__arrow--close"]
              )}
              onClick={() => setIsClose(!isClose)}
            >
              <svg
                width="10"
                height="20"
                viewBox="0 0 6 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="4.87699"
                  y1="0.353553"
                  x2="1.35348"
                  y2="3.87707"
                  stroke="currentColor"
                />
                <line
                  x1="4.61031"
                  y1="6.96012"
                  x2="1.0868"
                  y2="3.43661"
                  stroke="currentColor"
                />
              </svg>
            </button>
          </div>
          <div
            className={styles["nav__list-outer"]}
            style={{
              paddingLeft: isClose
                ? navListWidth() ?? "45px"
                : `${totalNavListWidth}px`,
            }}
          >
            <ul
              className={styles["nav__list"]}
              role="list"
              style={{
                transform: isClose
                  ? `translateX(-${calcTranslateX() + 4}px)`
                  : `translateX(-${totalNavListWidth}px)`,
              }}
            >
              <li className={styles["nav__item"]} role="listitem">
                <TransitionLink
                  className={clsx(
                    styles["nav__link"],
                    currentPath === "home" && styles.current
                  )}
                  href="/"
                  ref={homeLinkRef}
                  id={HOME_LINK_ID}
                  tabIndex={isClose ? -1 : 0}
                  onClick={() => {
                    setIsClose(true);
                  }}
                >
                  home
                </TransitionLink>
              </li>
              <li
                aria-hidden="true"
                className={styles["nav__item-separator"]}
                ref={separatorRef}
              >
                /
              </li>
              <li className={styles["nav__item"]}>
                <TransitionLink
                  href="/posts"
                  className={clsx(
                    styles["nav__link"],
                    currentPath === "posts" && styles.current
                  )}
                  tabIndex={isClose ? -1 : 0}
                  ref={postsLinkRef}
                  id={POSTS_LINK_ID}
                  onClick={() => {
                    setIsClose(true);
                  }}
                >
                  posts
                </TransitionLink>
              </li>
              <li aria-hidden="true" className={styles["nav__item-separator"]}>
                /
              </li>
              <li className={styles["nav__item"]}>
                <TransitionLink
                  href="/about"
                  tabIndex={isClose ? -1 : 0}
                  className={clsx(
                    styles["nav__link"],
                    currentPath === "about" && styles.current
                  )}
                  ref={aboutLinkRef}
                  id={ABOUNT_LINK_ID}
                  onClick={() => {
                    setIsClose(true);
                  }}
                >
                  about
                </TransitionLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export const BaseHeaderClient: FC = () => {
  const pathname = usePathname();
  const currentPath = useMemo(() => {
    if (pathname === null) return undefined;
    const path = pathname.replace(/\?.*/g, "");
    if (path === "/") return "home";
    if (path.startsWith("/posts")) return "posts";
    if (path.startsWith("/about")) return "about";
    return undefined;
  }, [pathname]);

  return <BaseHeader currentPath={currentPath} />;
};
