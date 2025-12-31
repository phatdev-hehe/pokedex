import { Callout } from "fumadocs-ui/components/callout";
import { DocsBody } from "fumadocs-ui/page";

import { Pathname, RouterActions } from "@/components/client";

export default () => (
  <DocsBody>
    <Callout title="Loading…">
      <Pathname />
      <RouterActions />
    </Callout>
  </DocsBody>
);
