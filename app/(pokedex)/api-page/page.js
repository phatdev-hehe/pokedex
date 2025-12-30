import { mapValues } from "es-toolkit";

import { table, tabs } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";

export const revalidate = 0;

export default () => (
  <Pokedex canonical="/api-page" title="API">
    {tabs(
      mapValues(Pokedex.api.routeMap, (value) =>
        tabs(
          mapValues(value, async (value, key) =>
            table.pagination(
              (await Pokedex.api(key, "rootEndpoint")()).results,
              {
                renderRows: ({ context }) => {
                  const href = `/api/${key}?name=${encodeURIComponent(
                    context.name
                  )}`;

                  return [<Link href={href}>{href}</Link>];
                },
              }
            )
          )
        )
      )
    )}
  </Pokedex>
);
