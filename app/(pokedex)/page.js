import { Link, table, tabs } from "@/components";
import { Chart } from "@/components/chart";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const pageSeriesData = [];

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
    canonical={process.env.NEXT_PUBLIC_SITE_URL}
    descriptions={{
      groups: groupCount,
      routes: routeCount,
      pages: pageCount, // eslint-disable-line perfectionist/sort-objects
      status: (
        <Link href="https://pokeapi.statuspage.io/">
          <img
            src="https://img.shields.io/badge/dynamic/json?label=PokeAPI&query=$.status.description&url=https://zlfyqp3hlvly.statuspage.io/api/v2/summary.json"
            style={{ margin: "initial" }}
          />
        </Link>
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
