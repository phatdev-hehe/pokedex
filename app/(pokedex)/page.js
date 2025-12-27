import { list, table, tabs } from "@/components";
import { Chart } from "@/components/chart";
import { Link } from "@/components/link";
import { RandomLink } from "@/components/router";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const pageSeriesData = [];
const routeNames = [];

let [groupCount, routeCount, pageCount] = [0, 0, 0];

const content = tabs(
  Object.fromEntries(
    await Promise.all(
      Object.entries(Pokedex.api.routeMap).map(async ([key, value]) => {
        ++groupCount;

        return [
          key,
          tabs(
            Object.fromEntries(
              await Promise.all(
                Object.keys(value).map(async (routeName) => {
                  const data = await Pokedex.api(routeName, "rootEndpoint")();

                  ++routeCount;
                  pageCount += data.count;

                  routeNames.push(routeName);

                  pageSeriesData.push({
                    name: routeName,
                    y: data.count,
                  });

                  return [
                    routeName,
                    table.pagination(data.results, {
                      renderRows: ({ context }) => [
                        <Link href={`/${routeName}/${context.name}`}>
                          {titleCase(context.name)}
                        </Link>,
                      ],
                    }),
                  ];
                })
              )
            )
          ),
        ];
      })
    )
  )
);

export default () => (
  <Pokedex
    canonical="/"
    descriptions={{
      groups: groupCount,
      routes: routeCount,
      pages: pageCount, // eslint-disable-line perfectionist/sort-objects
      // eslint-disable-next-line perfectionist/sort-objects
      links: list.inline(
        <RandomLink
          links={routeNames.map((routeName) => `/random/${routeName}`)}
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
