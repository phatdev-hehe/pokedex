"use client";

import { useProgress } from "@bprogress/next";
import FumadocsLink from "fumadocs-core/link";
import { ForesightManager } from "js.foresight";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useRef } from "react";

const useForesightRef = (options) => {
  const ref = useRef();

  const effectEvent = useEffectEvent(() => {
    const element = ref.current;

    if (element)
      ForesightManager.instance.register({
        element,
        hitSlop: 50,
        ...options,
      });

    return () => {
      if (element) ForesightManager.instance.unregister(element);
    };
  });

  useEffect(effectEvent);

  return ref;
};

export const Link = ({ href, prefetch = false, ...props }) => {
  const router = useRouter();
  const progress = useProgress();

  const foresightRef = useForesightRef({
    callback() {
      if (href && !prefetch) {
        progress.start();

        router.prefetch(href, {
          onInvalidate: this.callback,
        });

        progress.stop();
      }
    },
  });

  return (
    <FumadocsLink
      href={href}
      prefetch={prefetch}
      ref={foresightRef}
      {...props}
    />
  );
};
