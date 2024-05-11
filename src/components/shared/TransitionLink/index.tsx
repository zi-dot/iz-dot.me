"use client";

import { useViewTransitionRouterPush } from "@/hooks/useViewTransitionRouterPush";
import NextLink from "next/link";
import { forwardRef, useCallback } from "react";

type Props = {
  href?: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
  tabIndex?: number;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export const TransitionLink = forwardRef<HTMLAnchorElement, Props>(
  function TransitionLink(
    { href, children, id, className, tabIndex, onClick },
    ref,
  ) {
    const { push } = useViewTransitionRouterPush();

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (onClick) {
          onClick(e);
        }

        const to = e.currentTarget.href.toString();
        push(to);
      },
      [push, onClick],
    );

    if (href === undefined) {
      return <>{children}</>;
    }

    return (
      <NextLink
        href={href}
        onClick={handleClick}
        ref={ref}
        {...{ id, tabIndex, className }}
      >
        {children}
      </NextLink>
    );
  },
);
