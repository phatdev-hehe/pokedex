"use client";

import { RouterActions } from "@/components/router-actions";
import { RouterPush } from "@/components/router-push";
import { randomItem } from "@/utils";
import { Callout } from "fumadocs-ui/components/callout";
import { useEffect, useState } from "react";

export const RandomRedirect = ({ links }) => {
  const [state, setState] = useState();

  useEffect(() => {
    setState(randomItem(links));
  }, []);

  return (
    <Callout type="warn" title="Redirecting to">
      <RouterPush href={state} />
      <RouterActions />
    </Callout>
  );
};
