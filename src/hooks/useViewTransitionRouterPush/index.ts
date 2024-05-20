"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { useViewTransition } from "../useViewTransition";
import { Route } from "next";

export const useViewTransitionRouterPush = () => {
  const router = useRouter();
  const pathname = usePathname();
  const transitionStatus = useRef<"idle" | "pending">("idle");

  const routerPush = useCallback(
    (to: Route) => {
      return new Promise<void>((resolve) => {
        router.push(to);
        const id = setInterval(() => {
          if (transitionStatus.current === "pending") {
            transitionStatus.current = "idle";
            resolve();
            clearInterval(id);
          }
        }, 100);
      });
    },
    [router],
  );

  const { startViewTransition: routerPushWithTransition } =
    useViewTransition(routerPush);

  useEffect(() => {
    transitionStatus.current = "pending";
  }, [pathname]);

  return {
    ...router,
    push: routerPushWithTransition,
  };
};
