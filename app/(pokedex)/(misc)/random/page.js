import { Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";

export default () => (
  <Pokedex
    canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/random`}
    title="Random"
  >
    {tabs(
      Object.fromEntries(
        Object.entries(Pokedex.api.routeMap).map(([key, value]) => [
          key,
          table.pagination(Object.keys(value), {
            renderRows: ({ context }) => {
              const href = `/random/${context}`;

              return [<Link href={href}>{href}</Link>];
            },
          }),
        ])
      )
    )}
  </Pokedex>
);
