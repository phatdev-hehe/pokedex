import { mapValues } from "es-toolkit";

import { table, tabs } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";

export default () => (
  <Pokedex canonical="/random" title="Random">
    {tabs(
      mapValues(Pokedex.api.routeMap, (value) =>
        table.pagination(Object.keys(value), {
          renderRows: ({ context }) => {
            const href = `/random/${context}`;

            return [<Link href={href}>{href}</Link>];
          },
        })
      )
    )}
  </Pokedex>
);
