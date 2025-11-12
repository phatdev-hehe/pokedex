import { RouterActions } from "@/shared/router-actions";
import { Callout } from "fumadocs-ui/components/callout";
import { DocsBody } from "fumadocs-ui/page";

export default () => (
  <DocsBody>
    <Callout type="error" title="404">
      This page could not be found.
      <RouterActions />
    </Callout>
  </DocsBody>
);
