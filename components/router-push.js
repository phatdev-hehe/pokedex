"use client";

import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent } from "react";

export const RouterPush = ({ href }) => {
  const router = useRouter();

  const effectEvent = useEffectEvent(() => {
    if (href) router.push(href);
  });

  useEffect(effectEvent, [href]);

  return href;
};
