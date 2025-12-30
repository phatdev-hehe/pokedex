import { mapValues } from "es-toolkit";

import { list, table, tabs } from "@/components";
import { Chart } from "@/components/chart";
import { Link } from "@/components/link";
import { RandomLink } from "@/components/router";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const pageSeriesData = [];

let pageCount = 0;

const content = tabs(
  mapValues(Pokedex.api.routeMap, (value) =>
    tabs(
      mapValues(value, async (value, key) => {
        const items = await Pokedex.api(key, "rootEndpoint")();

        pageCount += items.count;

        pageSeriesData.push({
          name: key,
          y: items.count,
        });

        return table.pagination(items.results, {
          renderRows: ({ context }) => [
            <Link href={`/${key}/${context.name}`}>
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
      groups: Object.keys(Pokedex.api.routeMap).length,
      routes: Pokedex.api.routeNames.length,
      pages: pageCount, // eslint-disable-line perfectionist/sort-objects
      // eslint-disable-next-line perfectionist/sort-objects
      links: list.inline(
        <RandomLink
          links={Pokedex.api.routeNames.map(
            (routeName) => `/random/${routeName}`
          )}
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
