"use client";

import { RouterActions, RouterPush } from "@/components/router";
import { sample } from "es-toolkit";
import { Callout } from "fumadocs-ui/components/callout";
import { useEffect, useState } from "react";

export default ({ links }) => {
  const [state, setState] = useState();

  useEffect(() => {
    setState(sample(links));
  }, []);

  return (
    <Callout type="warn" title="Redirecting to">
      <RouterPush href={state} />
      <RouterActions />
    </Callout>
  );
};
