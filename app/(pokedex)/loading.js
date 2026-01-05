import { Callout } from "fumadocs-ui/components/callout";

import { Pathname, RouterActions } from "@/components/client";
import { Pokedex } from "@/lib/pokedex-promise-v2";

export default () => (
  <Pokedex>
    <Callout title="Loading…">
      <Pathname />
      <RouterActions />
    </Callout>
  </Pokedex>
);
