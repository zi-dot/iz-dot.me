"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useViewTransition } from "../useViewTransition";
import { Route } from "next";

export const useViewTransitionRouterPush = () => {
  const router = useRouter();

  const routerPush = useCallback(
    (to: Route) => {
      return new Promise<void>((resolve) => {
        router.push(to);
        setTimeout(() => {
          resolve();
        }, 100);
      });
    },
    [router],
  );

  const { startViewTransition: routerPushWithTransition } =
    useViewTransition(routerPush);

  return {
    ...router,
    push: routerPushWithTransition,
  };
};
