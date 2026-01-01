"use client";

import { useRouter } from "next/navigation";
import { useEffectEvent } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { Link } from "@/components/link";

export default ({ children, href, keys }) => {
  const router = useRouter();

  const effectEvent = useEffectEvent(() => {
    router.push(href);
  });

  useHotkeys(keys, effectEvent);

  return (
    <Link href={href} prefetch>
      {children}
    </Link>
  );
};
