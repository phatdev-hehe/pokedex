import { useProgress } from "@bprogress/next";
import { useIsClient as useIsClient1 } from "@uidotdev/usehooks";
import { useEffect, useEffectEvent } from "react";

export const useProgressWhen = (isLoading) => {
  const progress = useProgress();

  const effectEvent = useEffectEvent(() => {
    progress[isLoading ? "start" : "stop"]();
  });

  useEffect(effectEvent);
};

export const useIsClient = () => {
  const isClient = useIsClient1();

  useProgressWhen(!isClient);

  return isClient;
};
