import { CurrentPath } from "@/shared/current-path";
import { RouterActions } from "@/shared/router-actions";
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
