import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsPage } from "fumadocs-ui/page";

import { Logo } from "@/components/logo";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const pokedexNavTree = [];

for (const [key, value] of Object.entries(Pokedex.api.routeMap)) {
  pokedexNavTree.push({
    name: titleCase(key),
    type: "separator",
  });

  for (const routeName of Object.keys(value))
    pokedexNavTree.push({
      name: `${titleCase(routeName)} (${
        (await Pokedex.api(routeName, "rootEndpoint")()).count
      })`,
      url: `/${routeName}`,
    });
}

export default ({ children }) => (
  <DocsLayout
    githubUrl={process.env.NEXT_PUBLIC_GITHUB_URL}
    nav={{
      title: <Logo />,
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
          name: "Random",
          url: "/random",
        },
        {
          children: [
            {
              name: "sitemap.xml",
              url: "/sitemap.xml",
            },
            {
              name: "robots.txt",
              url: "/robots.txt",
            },
            {
              children: [
                {
                  name: "local-data.js",
                  url: "/api/local-data",
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
