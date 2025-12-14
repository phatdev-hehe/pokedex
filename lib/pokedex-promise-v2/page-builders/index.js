import { Link, table } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { getOgUrl } from "@/utils";
import { titleCase } from "@/utils/title-case";

import createDetailPage from "./create-detail-page";

export default {
  createDetailPage,
  createListPage: async (routeName) => {
    const title = `${titleCase(`list of ${routeName}`)}(s)`;

    const names = (await Pokedex.api(routeName, "rootEndpoint")()).results.map(
      (item) => item.name
    );

    return Object.assign(
      () => (
        <Pokedex
          descriptions={[["count", names.length]]}
          ogUrl={getOgUrl({ title, topic: names.length })}
          title={title}
        >
          {table.pagination(names, {
            renderRows: ({ context }) => [
              <Link href={`/${routeName}/${context}`}>
                {titleCase(context)}
              </Link>,
            ],
          })}
        </Pokedex>
      ),
      {
        generateMetadata: () => ({ title }),
      }
    );
  },
};
