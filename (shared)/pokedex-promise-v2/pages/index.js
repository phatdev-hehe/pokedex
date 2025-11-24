import { Link, table } from "@/(shared)/components";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";
import { titleCase } from "@/(shared)/utils/title-case";
import createDetailPage from "./create-detail-page";
import Layout from "./layout";

export default {
  createCollectionPage: async (apiType) => {
    const title = `${titleCase(`list of ${apiType}`)}(s)`;

    const names = (await Pokedex.api(apiType, "getList")()).results.map(
      (item) => item.name
    );

    return Object.assign(
      () => (
        <Layout title={title}>
          {table.pagination(names, {
            renderFirstItem: ({ context }) => (
              <Link href={`/${apiType}/${context}`}>{titleCase(context)}</Link>
            ),
          })}
        </Layout>
      ),
      {
        generateMetadata: () => ({ title }),
      }
    );
  },
  createDetailPage,
};
