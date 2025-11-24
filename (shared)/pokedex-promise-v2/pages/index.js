import { Link, table } from "@/(shared)/components";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";
import { titleCase } from "@/(shared)/utils/title-case";
import createDetailPage from "./create-detail-page";
import Layout from "./layout";

export default {
  createCollectionPage: async (apiEndpoint) => {
    const title = `${titleCase(`list of ${apiEndpoint}`)}(s)`;

    const names = (await Pokedex.api(apiEndpoint, "getList")()).results.map(
      (item) => item.name
    );

    return Object.assign(
      () => (
        <Layout title={title}>
          {table.pagination(names, {
            renderFirstItem: ({ context }) => (
              <Link href={`/${apiEndpoint}/${context}`}>
                {titleCase(context)}
              </Link>
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
