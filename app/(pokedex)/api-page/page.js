import { mapValues } from "es-toolkit";

import { table } from "@/components";
import { Link } from "@/components/link";
import { tabs } from "@/components/tabs";
import { Pokedex } from "@/lib/pokedex-promise-v2";

export const revalidate = 0;

export default () => (
  <Pokedex
    canonical="/api-page"
    descriptions={{
      revalidate,
      versionPath: process.env.NEXT_PUBLIC_API_VERSION_PATH,
    }}
    title="API"
  >
    {tabs(
      mapValues(Pokedex.api.routeGroups, (routes) =>
        tabs(
          mapValues(routes, async ({ rootEndpoint }, route) =>
            table.pagination((await Pokedex.api[rootEndpoint]()).results, {
              renderRows: ({ context }) => {
                const href = `/api/${route}?name=${encodeURIComponent(
                  context.name
                )}`;

                return [<Link href={href}>{href}</Link>];
              },
            })
          )
        )
      )
    )}
  </Pokedex>
);
