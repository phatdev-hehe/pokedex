import { useProgress } from "@bprogress/next";
import { useEffect, useEffectEvent } from "react";

export const useProgressWhen = (isLoading) => {
  const progress = useProgress();

  const effectEvent = useEffectEvent(() => {
    progress[isLoading ? "start" : "stop"]();
  });

  useEffect(effectEvent);
};
