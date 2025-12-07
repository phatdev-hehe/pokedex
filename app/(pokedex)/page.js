import { Link, table, tabs } from "@/components";
import { Chart } from "@/components/chart";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const title = "Home";
const pageSeriesData = [];

let [groupCount, routeCount, pageCount] = [0, 0, 0];

const content = tabs(
  ...(await Promise.all(
    Object.entries(Pokedex.api.routeMap).map(async ([key, value]) => {
      ++groupCount;

      return [
        key,
        tabs(
          ...(await Promise.all(
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
          ))
        ),
      ];
    })
  ))
);

export const generateMetadata = () => ({ title });

export default () => (
  <Pokedex
    title={title}
    descriptions={[
      ["groups", groupCount],
      ["routes", routeCount],
      ["pages", pageCount],
      [
        "status",
        <Link href="https://pokeapi.statuspage.io/">
          <img
            style={{ margin: "initial" }}
            src="https://img.shields.io/badge/dynamic/json?label=PokeAPI&query=$.status.description&url=https://zlfyqp3hlvly.statuspage.io/api/v2/summary.json"
          />
        </Link>,
      ],
    ]}
  >
    {tabs(
      ["content", content],
      [
        "chart",
        <Chart
          series={[
            {
              type: "line",
              data: pageSeriesData,
              options: { name: "Page" },
            },
          ]}
        />,
      ]
    )}
  </Pokedex>
);
