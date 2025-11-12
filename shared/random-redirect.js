"use client";

import { randomItem } from "@/shared/utils";
import { Callout } from "fumadocs-ui/components/callout";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

export const RandomRedirect = ({ path, items }) => {
  const router = useRouter();
  const [state, setState] = useState();

  useEffect(() => {
    setState(`/${path}/${randomItem(items)}`);
  }, []);

  const effectEvent = useEffectEvent(() => {
    if (state) router.push(state);
  });

  useEffect(effectEvent);

  return (
    <Callout type="warn" title="Redirecting to">
      {state}
    </Callout>
  );
};
