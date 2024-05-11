"use client";
import { useCallback } from "react";

export const useViewTransition = <T extends (...args: any[]) => Promise<void>>(
  callback: T,
) => {
  const startViewTransition = useCallback(
    async (...args: Parameters<T>) => {
      if (!document.startViewTransition) {
        await callback(...args);
        return;
      }

      document.startViewTransition(async () => {
        await callback(...args);
      });
    },
    [callback],
  );
  return { startViewTransition };
};
