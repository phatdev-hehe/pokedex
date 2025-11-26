import { Link, table } from "@/(shared)/components";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";
import { titleCase } from "@/(shared)/utils/title-case";
import createListPage from "./create-detail-page";
import Layout from "./layout";

export default {
  createCollectionPage: async (apiGroup) => {
    const title = `${titleCase(`list of ${apiGroup}`)}(s)`;

    const names = (await Pokedex.api(apiGroup, "getList")()).results.map(
      (item) => item.name
    );

    return Object.assign(
      () => (
        <Layout title={title}>
          {table.pagination(names, {
            renderFirstItem: ({ context }) => (
              <Link href={`/${apiGroup}/${context}`}>{titleCase(context)}</Link>
            ),
          })}
        </Layout>
      ),
      {
        generateMetadata: () => ({ title }),
      }
    );
  },
  createListPage,
};
