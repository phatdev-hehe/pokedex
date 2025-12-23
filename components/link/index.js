"use client";

import { useProgress } from "@bprogress/next";
import { compact } from "es-toolkit";
import FumadocsLink from "fumadocs-core/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const usePrefetchOnHover = (href) => {
  const router = useRouter();
  const progress = useProgress();

  const prefetchOnHover = useCallback(() => {
    progress.start();

    router.prefetch(href, {
      onInvalidate: prefetchOnHover,
    });

    progress.stop();
  }, [router, href]);

  return prefetchOnHover;
};

export const Link = ({ href, prefetch = false, ...props }) => {
  const prefetchOnHover = usePrefetchOnHover(href);
  const onMouseEnter = prefetch ? undefined : prefetchOnHover;

  return (
    <FumadocsLink
      href={href}
      onFocus={onMouseEnter}
      onMouseEnter={onMouseEnter}
      prefetch={prefetch}
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
