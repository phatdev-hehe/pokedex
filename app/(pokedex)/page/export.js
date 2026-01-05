import { list } from "@/components";
import { Chart } from "@/components/chart";
import { RandomLink } from "@/components/client";
import { tabs } from "@/components/tabs";
import { Pokedex } from "@/lib/pokedex-promise-v2";

import FuzzySearch from "./fuzzy-search";

const pageSeriesData = [];

let pageCount = 0;

for (const route of Pokedex.api.routes) {
  const items = await Pokedex.api(route, "rootEndpoint")();

  pageCount += items.count;

  pageSeriesData.push({
    name: route,
    y: items.count,
  });
}

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
          hrefs={Pokedex.api.routes.map((route) => `/random/${route}`)}
        >
          Random
        </RandomLink>
      ),
    }}
    title="Home"
  >
    {tabs({
      content: <FuzzySearch />,
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
