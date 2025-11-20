import { CurrentPath } from "@/(shared)/components/current-path";
import { RouterActions } from "@/(shared)/components/router-actions";
import { Callout } from "fumadocs-ui/components/callout";
import { DocsBody } from "fumadocs-ui/page";
import { Suspense } from "react";

export default () => (
  <DocsBody>
    <Callout title="Loading…">
      <Suspense>
        <CurrentPath />
      </Suspense>
      <RouterActions />
    </Callout>
  </DocsBody>
);
