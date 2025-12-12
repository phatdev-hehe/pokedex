import { Callout } from "fumadocs-ui/components/callout";
import { DocsBody } from "fumadocs-ui/page";

import { CurrentPathname } from "@/components/current-pathname";
import { RouterActions } from "@/components/router";

export default () => (
  <DocsBody>
    <Callout title="Loading…">
      <CurrentPathname />
      <RouterActions />
    </Callout>
  </DocsBody>
);
