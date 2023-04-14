import { useViewTransitionRouterPush } from "@/hooks/useViewTransitionRouterPush";
import Link from "next/link";
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
  ({ href, children, id, className, tabIndex, onClick }, ref) => {
    const { routerPushWithTransition } = useViewTransitionRouterPush();

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (onClick) {
          onClick(e);
        }

        const to = e.currentTarget.href;
        routerPushWithTransition(to);
      },
      [routerPushWithTransition, onClick]
    );

    if (href === undefined) {
      return <>{children}</>;
    }

    return (
      <Link
        href={href}
        onClick={handleClick}
        ref={ref}
        {...{ id, tabIndex, className }}
      >
        {children}
      </Link>
    );
  }
);
