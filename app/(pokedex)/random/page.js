import { mapValues } from "es-toolkit";

import { table } from "@/components";
import { Link } from "@/components/link";
import { tabs } from "@/components/tabs";
import { Pokedex } from "@/lib/pokedex-promise-v2";

export default () => (
  <Pokedex canonical="/random" title="Random">
    {tabs(
      mapValues(Pokedex.api.routeGroups, (routes) =>
        table.pagination(Object.keys(routes), {
          renderRows: ({ context }) => {
            const href = `/random/${context}`;

            return [<Link href={href}>{href}</Link>];
          },
        })
      )
    )}
  </Pokedex>
);
