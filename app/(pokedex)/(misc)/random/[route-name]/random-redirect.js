"use client";

import { sample } from "es-toolkit";
import { Callout } from "fumadocs-ui/components/callout";
import { startTransition, useEffect, useEffectEvent, useState } from "react";

import { RouterActions, RouterPush } from "@/components/router";

export default ({ links }) => {
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
