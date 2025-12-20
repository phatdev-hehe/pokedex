"use client";

import { sample } from "es-toolkit";
import { Callout } from "fumadocs-ui/components/callout";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useEffectEvent, useState } from "react";

import { Link, ul } from "@/components";

export { usePathname as Pathname } from "next/navigation";

export const RouterPush = ({ href }) => {
  const router = useRouter();

  const effectEvent = useEffectEvent(() => {
    if (href) router.push(href);
  });

  useEffect(effectEvent);

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

export const RandomLink = ({ children, links }) => {
  const router = useRouter();

  return (
    <a
      onClick={() => {
        router.push(sample(links));
      }}
    >
      {children}
    </a>
  );
};

export const RandomRedirect = ({ links }) => {
  const [state, setState] = useState();

  const effectEvent = useEffectEvent(() => {
    startTransition(() => {
      setState(sample(links));
    });
  });

  useEffect(effectEvent, []);

  return (
    <Callout title="Redirecting to" type="warn">
      <RouterPush href={state} />
      <RouterActions />
    </Callout>
  );
};
