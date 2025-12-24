"use client";

import { useProgress } from "@bprogress/next";
import { compact } from "es-toolkit";
import FumadocsLink from "fumadocs-core/link";
import { ForesightManager } from "js.foresight";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const useForesightRef = (options) => {
  const ref = useRef();

  useEffect(() => {
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
  }, [ref, options]);

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

export const UnnamedLink = ({ href }) => {
  if (href) {
    const [a, b] = compact(new URL(href).pathname.split("/")).slice(-2);

    href = `/${a}/${a}-${b}`;

    return <Link href={href}>{href}</Link>;
  }
};
