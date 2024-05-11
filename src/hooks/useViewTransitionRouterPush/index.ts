"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useLayoutEffect, useState } from "react";
import { useViewTransition } from "../useViewTransition";
import { Route } from "next";

export const useViewTransitionRouterPush = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [promiseState, setPromiseState] = useState<Record<
    "resolve" | "reject",
    () => void
  > | null>(null);

  const routerPush = useCallback(
    (to: Route) => {
      return new Promise<void>((resolve, reject) => {
        console.log("routerPush");
        setPromiseState({ resolve, reject });
        router.push(to);
      });
    },
    [router],
  );

  useLayoutEffect(() => {
    console.log(promiseState?.resolve);
    promiseState?.resolve();
    setPromiseState(null);
  }, [pathname]);

  const { startViewTransition: routerPushWithTransition } =
    useViewTransition(routerPush);

  return {
    ...router,
    push: routerPushWithTransition,
  };
};
