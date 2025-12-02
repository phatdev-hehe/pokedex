import { Link, table } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";
import createDetailPage from "./create-detail-page";

export default {
  createListPage: async (apiGroup) => {
    const title = `${titleCase(`list of ${apiGroup}`)}(s)`;

    const names = (await Pokedex.api(apiGroup, "getList")()).results.map(
      (item) => item.name
    );

    return Object.assign(
      () => (
        <Pokedex title={title} descriptions={[["count", names.length]]}>
          {table.pagination(names, {
            renderFirstItem: ({ context }) => (
              <Link href={`/${apiGroup}/${context}`}>{titleCase(context)}</Link>
            ),
          })}
        </Pokedex>
      ),
      {
        generateMetadata: () => ({ title }),
      }
    );
  },
  createDetailPage,
};
