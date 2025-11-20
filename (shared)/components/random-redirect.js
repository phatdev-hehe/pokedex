"use client";

import { RouterActions } from "@/(shared)/components/router-actions";
import { RouterPush } from "@/(shared)/components/router-push";
import { randomItem } from "@/(shared)/utils";
import { Callout } from "fumadocs-ui/components/callout";
import { useEffect, useState } from "react";

export const RandomRedirect = ({ path, items }) => {
  const [state, setState] = useState();

  useEffect(() => {
    setState(`/${path}/${randomItem(items)}`);
  }, []);

  return (
    <>
      <RouterPush href={state} />
      <Callout type="warn" title="Redirecting to">
        {state}
        <RouterActions />
      </Callout>
    </>
  );
};
