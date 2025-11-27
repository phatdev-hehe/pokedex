import { Logo } from "@/(shared)/components/logo";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";
import { titleCase } from "@/(shared)/utils/title-case";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsPage } from "fumadocs-ui/page";

const createNavigationSection = async (name, ...apiGroups) => ({
  type: "folder",
  name: titleCase(name),
  children: await Promise.all(
    apiGroups.map(async (apiGroup) => ({
      name: `${titleCase(apiGroup)} (${
        (
          await Pokedex.api(apiGroup, "getList")()
        ).results.length
      })`,
      url: `/${apiGroup}`,
    }))
  ),
});

export default async ({ children }) => (
  <DocsLayout
    themeSwitch={{ mode: "light-dark-system" }}
    sidebar={{ defaultOpenLevel: 1 }}
    nav={{ title: <Logo /> }}
    githubUrl="https://github.com/phatdev-hehe/pokedex"
    tree={{
      children: [
        {
          name: `${(
            await Promise.all(
              Pokedex.api.groupNames.map(
                async (groupName) =>
                  (
                    await Pokedex.api(groupName, "getList")()
                  ).results.length
              )
            )
          ).reduce((a, b) => a + b, 0)} pages`,
          type: "folder",
          children: await Promise.all([
            createNavigationSection(
              "pokemon",
              "pokemon",
              "ability",
              "gender",
              "pokemon-form",
              "pokemon-species",
              "stat",
              "type",
              "egg-group",
              "growth-rate",
              "pokemon-shape"
            ),
            createNavigationSection("berries", "berry"),
            createNavigationSection("evolution", "evolution-trigger"),
            createNavigationSection("games", "generation", "pokedex"),
            createNavigationSection("items", "item"),
            createNavigationSection("moves", "move"),
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
