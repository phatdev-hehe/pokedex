import { Link, table, tabs } from "@/components";
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
        <Layout title={title} descriptions={[["count", names.length]]}>
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
  createHomePage: async () => {
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

    return Object.assign(
      () => (
        <Layout
          title={title}
          descriptions={[
            ["routes", routeCount],
            ["pages", pageCount],
          ]}
        >
          {content}
        </Layout>
      ),
      {
        generateMetadata: () => ({ title }),
      }
    );
  },
};
