"use client";

import { sample } from "es-toolkit";
import { Callout } from "fumadocs-ui/components/callout";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent } from "react";

import { RouterActions } from "@/components/client";

export default ({ hrefs }) => {
  const router = useRouter();
  const href = sample(hrefs);

  const effectEvent = useEffectEvent(() => {
    router.push(href);
  });

  useEffect(effectEvent);

  return (
    <Callout title="Redirecting to" type="warn">
      {href}
      <RouterActions />
    </Callout>
  );
};
