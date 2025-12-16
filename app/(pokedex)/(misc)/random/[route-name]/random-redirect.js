"use client";

import { sample } from "es-toolkit";
import { Callout } from "fumadocs-ui/components/callout";
import { useEffect, useState } from "react";

import { RouterActions, RouterPush } from "@/components/router";

export default ({ links }) => {
  const [state, setState] = useState();

  useEffect(() => {
    setState(sample(links));
  }, []);

  return (
    <Callout title="Redirecting to" type="warn">
      <RouterPush href={state} />
      <RouterActions />
    </Callout>
  );
};
