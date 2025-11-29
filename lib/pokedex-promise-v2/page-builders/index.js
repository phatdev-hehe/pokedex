import { Link, table } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";
import createDetailPage from "./create-detail-page";
import Layout from "./layout";

export default {
  createListPage: async (apiGroup) => {
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
  createDetailPage,
};
