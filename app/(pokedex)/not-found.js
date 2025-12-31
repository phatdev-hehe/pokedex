import { Callout } from "fumadocs-ui/components/callout";
import { DocsBody } from "fumadocs-ui/page";

import { RouterActions } from "@/components/client";

export default () => (
  <DocsBody>
    <Callout title="404" type="error">
      This page could not be found.
      <RouterActions />
    </Callout>
  </DocsBody>
);
