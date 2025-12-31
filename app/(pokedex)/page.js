import { mapValues } from "es-toolkit";

import { list, table, tabs } from "@/components";
import { Chart } from "@/components/chart";
import { RandomLink } from "@/components/client";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const pageSeriesData = [];

let pageCount = 0;

const content = tabs(
  mapValues(Pokedex.api.routeGroups, (routes) =>
    tabs(
      mapValues(routes, async (value, route) => {
        const items = await Pokedex.api(route, "rootEndpoint")();

        pageCount += items.count;

        pageSeriesData.push({
          name: route,
          y: items.count,
        });

        return table.pagination(items.results, {
          renderRows: ({ context }) => [
            <Link href={`/${route}/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        });
      })
    )
  )
);

export default () => (
  <Pokedex
    canonical="/"
    descriptions={{
      groups: Object.keys(Pokedex.api.routeGroups).length,
      routes: Pokedex.api.routes.length,
      pages: pageCount, // eslint-disable-line perfectionist/sort-objects
      // eslint-disable-next-line perfectionist/sort-objects
      links: list.inline(
        <RandomLink
          links={Pokedex.api.routes.map((route) => `/random/${route}`)}
        >
          Random
        </RandomLink>
      ),
    }}
    title="Home"
  >
    {tabs({
      content,
      // eslint-disable-next-line perfectionist/sort-objects
      chart: (
        <Chart
          series={[
            {
              data: pageSeriesData,
              options: { name: "Page" },
              type: "pie",
            },
          ]}
        />
      ),
    })}
  </Pokedex>
);
