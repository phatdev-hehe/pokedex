"use client";

import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent } from "react";

import { Link, ul } from "@/components";

export { usePathname as Pathname } from "next/navigation";

export const RouterPush = ({ href }) => {
  const router = useRouter();

  const effectEvent = useEffectEvent(() => {
    if (href) router.push(href);
  });

  useEffect(effectEvent, [href]);

  return href;
};

export const RouterActions = () => {
  const router = useRouter();

  return ul(
    <Link href="/">Go to the homepage</Link>,
    <Link onClick={router.back}>Back</Link>,
    <Link onClick={router.forward}>Forward</Link>,
    <Link onClick={router.refresh}>Refresh</Link>
  );
};
