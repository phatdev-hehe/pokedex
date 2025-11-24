import { Logo } from "@/(shared)/components/logo";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";
import { titleCase } from "@/(shared)/utils/title-case";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsPage } from "fumadocs-ui/page";

const createNavigationSection = async (name, { options, apiEndpoints }) => ({
  type: "folder",
  name: titleCase(name),
  children: await Promise.all(
    apiEndpoints.map(async (apiEndpoint) => ({
      name: `${titleCase(apiEndpoint)} (${
        (
          await Pokedex.api(apiEndpoint, "getList")()
        ).results.length
      })`,
      url: `/${apiEndpoint}`,
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
                async (endpoint) =>
                  (
                    await Pokedex.api(endpoint, "getList")()
                  ).results.length
              )
            )
          ).reduce((a, b) => a + b, 0)} pages`,
          type: "folder",
          children: await Promise.all([
            createNavigationSection("pokemon", {
              options: { defaultOpen: true },
              apiEndpoints: [
                "pokemon",
                "ability",
                "gender",
                "pokemon-form",
                "pokemon-species",
                "stat",
                "type",
              ],
            }),
            createNavigationSection("berries", { apiEndpoints: ["berry"] }),
            createNavigationSection("evolution", {
              apiEndpoints: ["evolution-trigger"],
            }),
            createNavigationSection("games", {
              apiEndpoints: ["generation", "pokedex"],
            }),
            createNavigationSection("items", { apiEndpoints: ["item"] }),
            createNavigationSection("moves", { apiEndpoints: ["move"] }),
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
