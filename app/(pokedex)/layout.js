import { Logo } from "@/(shared)/components/logo";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";
import { titleCase } from "@/(shared)/utils/title-case";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsPage } from "fumadocs-ui/page";

const createNavigationSection = async (name, { options, apiTypes }) => ({
  type: "folder",
  name: titleCase(name),
  children: await Promise.all(
    apiTypes.map(async (apiType) => ({
      name: `${titleCase(apiType)} (${
        (
          await Pokedex.api(apiType, "getList")()
        ).results.length
      })`,
      url: `/${apiType}`,
    }))
  ),
  ...options,
});

export default async ({ children }) => (
  <DocsLayout
    nav={{ title: <Logo /> }}
    githubUrl="https://github.com/phatdev-hehe/pokedex"
    tree={{
      children: [
        {
          defaultOpen: true,
          name: `${(
            await Promise.all(
              Pokedex.api.endpoints.map(
                async (apiEndpoint) =>
                  (
                    await Pokedex.api(apiEndpoint, "getList")()
                  ).results.length
              )
            )
          ).reduce((a, b) => a + b, 0)} pages`,
          type: "folder",
          children: await Promise.all([
            createNavigationSection("pokemon", {
              options: { defaultOpen: true },
              apiTypes: [
                "pokemon",
                "ability",
                "gender",
                "pokemon-form",
                "pokemon-species",
                "stat",
                "type",
              ],
            }),
            createNavigationSection("berries", { apiTypes: ["berry"] }),
            createNavigationSection("evolution", {
              apiTypes: ["evolution-trigger"],
            }),
            createNavigationSection("games", {
              apiTypes: ["generation", "pokedex"],
            }),
            createNavigationSection("items", { apiTypes: ["item"] }),
            createNavigationSection("moves", { apiTypes: ["move"] }),
          ]),
        },
        {
          type: "folder",
          name: "More",
          children:
            // https://fumadocs.dev/docs/ui/rss
            [
              {
                name: "sitemap.xml",
                url: "/sitemap.xml",
              },
              {
                name: "robots.txt",
                url: "/robots.txt",
              },
              {
                name: "create-search-indexes.js",
                url: "/api/create-search-indexes",
              },
            ],
        },
      ],
    }}
  >
    <div
      className="prose" // https://fumadocs.dev/docs/ui/theme#typography
      style={{ width: "100%" }}
    >
      <DocsPage>{children}</DocsPage>
    </div>
  </DocsLayout>
);
