import { Callout } from "fumadocs-ui/components/callout";

import { RouterActions } from "@/components/client";
import { Pokedex } from "@/lib/pokedex-promise-v2";

export default () => (
  <Pokedex>
    <Callout title="404" type="error">
      This page could not be found.
      <RouterActions />
    </Callout>
  </Pokedex>
);
