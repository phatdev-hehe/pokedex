import { DocsPage } from "fumadocs-ui/page";

import { LazyImage } from "@/components/client";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

import catDance from "./cat-dance.gif";
import DocsLayout from "./docs-layout";

const nav = [];

for (const [routeGroup, routes] of Object.entries(Pokedex.api.routeGroups)) {
  nav.push({
    name: titleCase(routeGroup),
    type: "separator",
  });

  for (const [route, { rootEndpoint }] of Object.entries(routes))
    nav.push({
      name: `${titleCase(route)} (${
        (await Pokedex.api[rootEndpoint]()).count
      })`,
      url: `/${route}`,
    });
}

export default ({ children }) => (
  <DocsLayout
    githubUrl={process.env.NEXT_PUBLIC_GITHUB_URL}
    nav={{
      title: (
        <LazyImage
          src={catDance}
          title={process.env.NEXT_PUBLIC_SITE_TITLE}
          width={30}
        />
      ),
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
        ...nav,
      ],
    }}
  >
    <div className="prose" style={{ width: "100%" }}>
      <DocsPage>{children}</DocsPage>
    </div>
  </DocsLayout>
);
