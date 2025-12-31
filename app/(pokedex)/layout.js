import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsPage } from "fumadocs-ui/page";

import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const pokedexNavTree = [];

for (const [routeGroup, routes] of Object.entries(Pokedex.api.routeGroups)) {
  pokedexNavTree.push({
    name: titleCase(routeGroup),
    type: "separator",
  });

  for (const route of Object.keys(routes))
    pokedexNavTree.push({
      name: `${titleCase(route)} (${
        (await Pokedex.api(route, "rootEndpoint")()).count
      })`,
      url: `/${route}`,
    });
}

export default ({ children, logo }) => (
  <DocsLayout
    githubUrl={process.env.NEXT_PUBLIC_GITHUB_URL}
    nav={{
      title: logo,
      url: "/random/pokemon",
    }}
    themeSwitch={{ mode: "light-dark-system" }}
    tree={{
      children: [
        {
          name: "Home",
          url: "/",
        },
        {
          children: [
            {
              name: "Random",
              url: "/random",
            },
            {
              children: [
                {
                  name: "Page",
                  url: "/api-page",
                },
                {
                  name: "names.js",
                  url: "/api/names",
                },
                {
                  name: "Feed",
                  type: "separator",
                },
                {
                  name: "rss2.xml",
                  url: "/api/feed/rss2",
                },
                {
                  name: "atom1.xml",
                  url: "/api/feed/atom1",
                },
                {
                  name: "json1.json",
                  url: "/api/feed/json1",
                },
              ],
              name: "API",
              type: "folder",
            },
            {
              name: "sitemap.xml",
              url: "/sitemap.xml",
            },
            {
              name: "robots.txt",
              url: "/robots.txt",
            },
          ],
          name: "More",
          type: "folder",
        },
        ...pokedexNavTree,
      ],
    }}
  >
    <div className="prose" style={{ width: "100%" }}>
      <DocsPage>{children}</DocsPage>
    </div>
  </DocsLayout>
);
