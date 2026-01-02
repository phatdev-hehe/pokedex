"use client";

import { sample } from "es-toolkit";
import { Callout } from "fumadocs-ui/components/callout";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent } from "react";

import { RouterActions } from "@/components/client";

const useRouterPush = (href) => {
  const router = useRouter();

  const effectEvent = useEffectEvent(() => {
    if (href) router.push(href);
  });

  useEffect(effectEvent);
};

export default ({ hrefs }) => {
  const href = sample(hrefs);

  useRouterPush(href);

  return (
    <Callout title="Redirecting to" type="warn">
      {href}
      <RouterActions />
    </Callout>
  );
};
