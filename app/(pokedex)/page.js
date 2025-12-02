import { Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const title = "Home";
let [routeCount, pageCount] = [0, 0];

const content = tabs(
  ...(await Promise.all(
    Pokedex.api.groupNames.map(async (groupName) => {
      const data = await Pokedex.api(groupName, "getList")();

      ++routeCount;
      pageCount += data.count;

      return [
        groupName,
        table.pagination(data.results, {
          renderFirstItem: ({ context }) => (
            <Link href={`/${groupName}/${context.name}`}>
              {titleCase(context.name)}
            </Link>
          ),
        }),
      ];
    })
  ))
);

export const generateMetadata = () => ({ title });

export default () => (
  <Pokedex
    title={title}
    descriptions={[
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
    {content}
  </Pokedex>
);
