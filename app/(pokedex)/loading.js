import { CurrentPath } from "@/(shared)/components/current-path";
import { RouterActions } from "@/(shared)/components/router-actions";
import { Callout } from "fumadocs-ui/components/callout";
import { DocsBody } from "fumadocs-ui/page";

export default () => (
  <DocsBody>
    <Callout title="Loading…">
      <CurrentPath />
      <RouterActions />
    </Callout>
  </DocsBody>
);
